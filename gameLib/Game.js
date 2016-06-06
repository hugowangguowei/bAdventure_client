/**
 * Created by wgw on 2016/4/18.
 */
define(function(require){
    var spriteManager = require("gameLib/controller/SpriteManager").getInstance();
    var Geo = require("gameLib/model/Geo");
    var baEventSource = require("baBasicLib/baEventSource");
    var errorCheck = require("gameLib/webSocket/WS_errorCheck");

    function Game(initInfo){
        baEventSource.call(this);
        this.geoInfo = new Geo();
        this.spriteList = {};
        this.spriteCount = 0;
        this.timer = {
            timerTask:null,
            frameSpeed:40
        }
        this.initialize(initInfo);
    }
    //《疯狂HTML5+CSS+JAVASCRIPT》
    Game.prototype = new baEventSource();
    Game.prototype.initialize = function(initInfo){
    };
    Game.prototype.loadChapter = function(chapterInfo,charaInfo,isLeader){
        if(isLeader){
            this.startLeaderEngine(chapterInfo);
        }else{
            this.startFollowerEngine(chapterInfo);
        }
    };
    Game.prototype.startLeaderEngine = function(chapterInfo){
        var self = this;
        if(chapterInfo.Map){
            this.geoInfo.generateByFile(chapterInfo.Map);
            self.fireEvent('geoChange');
        }
        if(chapterInfo.Sprite){
            var spriteList = chapterInfo.Sprite;
            for(var i in spriteList){
                var num = spriteList[i].num;
                for(var m = 0;m<num;m++){
                    var sprite_i = spriteManager.generateSpriteByType(i);
                    sprite_i.id = i + "_" + m;
                    sprite_i.testSignal.watch = true;
                    this.addSprite(sprite_i);
                }
            }
        }

        //判断是否为单机测试
        //如果为真，启动循环
        if(isSingle){
            this.timer.timerTask = setInterval(function(){
                var changedSprite = [];

                for(var i in self.spriteList){
                    var sprite_i = self.spriteList[i];
                    sprite_i.action();
                    changedSprite.push(sprite_i.getOutPut());
                }
                self.fireEvent("spriteChange",changedSprite);
            },this.timer.frameSpeed);
        }

    };
    Game.prototype.startFollowerEngine = function(chapterInfo){
    };
    Game.prototype.getSyn = function (msg) {
        var self = this;
        if(!msg.length){
            return false;
        }
        var id,type,detail;
        outerLoop:
        for(var i in self.spriteList){
            var sprite_i = self.spriteList[i];
            var isExist = false;
            innerLoop:
            for(var m = 0;m < msg.length;m++){
                var sInfo_m = msg[m];
                if(sprite_i.id == sInfo_m.id){
                    isExist = true;
                    break innerLoop;
                }
            }
            if(!isExist){
                self.removeSprite(sprite_i);
            }
        }
        for(var i = 0;i<msg.length;i++){
            var sInfo_i = msg[i];
            if(!self.spriteList[sInfo_i.id]){
                type = sInfo_i.type;
                id = sInfo_i.id;
                detail = {type:type,prop:{id:id}};
                var sprite_i = spriteManager.generateSpriteByDetail(detail);
                self.addSprite(sprite_i);
            }
        }
    }
    Game.prototype.input = function (type,info,packNum) {
        var self = this;
        switch (type){
            case "addSprite":
                _addSprite(info);
                break;
            case "refreshSprite":
                _refreshSprite(info);
                break;
            case "removeSprite":
                _removeSprite(info);
                break;
        }

        function _addSprite(info){
            var sprite_i = spriteManager.generateSpriteByDetail(info);
            self.addSprite(sprite_i);
            self.fireEvent("spriteChange");
        };
        function _refreshSprite(info){
            for(var i = 0;i<info.length;i++){
                var sInfo = info[i];
                var id = sInfo.id;
                var sprite = self.spriteList[id];
                if(sprite){
                    for(var m in sInfo){
                        sprite[m] = sInfo[m];
                    }
                    sprite.refreshGeo();
                }else{
                    //之所以会有{！sprite}事件的发生，是因为角色死亡事件立刻触发
                    //但是角色更新操作需要当前所有对象更新完成后才会触发事件
                    //所以有可能当一个角色先执行了动作，该动作会被推送入refreshList
                    //然后在同一帧，该角色被杀死了，就会出现这个问题
                    //更新机制还需要改进。
                    //console.log("error!!  " + packNum);
                    //errorCheck.checkPack(packNum);
                }
            }
            self.fireEvent("spriteChange",info);
        };
        function _removeSprite(id){
            self.removeSpriteById(id);
            self.fireEvent("spriteChange",info);
        };
    };
    Game.prototype.addSprite = function(sprite_i){
        sprite_i.GM = this;
        sprite_i.addToGeo(this.geoInfo);
        this.spriteList[sprite_i.id] = sprite_i;
        this.spriteCount++;
    };
    Game.prototype.removeSprite = function(sprite){
        for(var i in this.spriteList){
            console.log("lost One Sprite");
            var sprite_i = this.spriteList[i];
            if(sprite_i == sprite){
                delete this.spriteList[i];
                this.spriteCount--;
                return true;
            }
        }
        return false;
    };
    Game.prototype.getSpriteById = function(id){
        for(var i in this.spriteList){
            var sprite_i = this.spriteList[i];
            if(sprite_i.id == id){
                return sprite_i;
            }
        }
        return false;
    };
    Game.prototype.removeSpriteById = function(id){
        if(this.spriteList[id]){
            this.spriteList[id].removeFromGeo();
            delete this.spriteList[id];
            this.spriteCount--;
            return true;
        }
        return false;
    };
    return Game;
});