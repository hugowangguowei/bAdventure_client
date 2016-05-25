/**
 * Created by wgw on 2016/4/18.
 */
define(function(require){
    var spriteManager = require("gameLib/controller/SpriteManager").getInstance();
    var Geo = require("gameLib/model/Geo");
    var baEventSource = require("baBasicLib/baEventSource");

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

        //this.timer.timerTask = setInterval(function(){
        //    var changedSprite = [];
        //    //console.log(self.spriteList.length);
        //    for(var i = 0;i<self.spriteList.length;i++){
        //        var sprite_i = self.spriteList[i];
        //        sprite_i.action();
        //        changedSprite.push(sprite_i.getOutPut());
        //    }
        //    self.fireEvent("spriteChange",changedSprite);
        //},this.timer.frameSpeed);
    };
    Game.prototype.startFollowerEngine = function(chapterInfo){
    };
    Game.prototype.input = function (type,info) {
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
            this.addSprite(sprite_i);
            this.fireEvent("spriteChange");
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
                }
            }
            self.fireEvent("spriteChange",info);
        };
        function _removeSprite(id){
            this.removeSpriteById(id);
        }
    }
    Game.prototype.addSprite = function(sprite_i){
        sprite_i.GM = this;
        sprite_i.addToGeo(this.geoInfo);
        this.spriteList[sprite_i.id] = sprite_i;
        this.spriteCount++;
    };
    Game.prototype.removeSprite = function(sprite){
        for(var i = 0;i<this.spriteList.length;i++){
            var sprite_i = this.spriteList[i];
            if(sprite_i == sprite){
                delete sprite_i;
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
            delete this.spriteList[id];
            this.spriteCount--;
            return true;
        }
        return false;
    }

    return Game;
});