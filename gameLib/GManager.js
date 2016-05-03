/**
 * Created by wgw on 2016/4/18.
 */
define(function(require){
    var spriteManager = require("gameLib/controller/SpriteManager");
    var Geo = require("gameLib/model/Geo");

    function GManager(initInfo){
        this.geoInfo = new Geo();
        this.spriteList = [];
        this.timer = {
            timerTask:null,
            frameSpeed:40
        }
        this.initialize(initInfo);
    }

    GManager.prototype = {
        initialize:function(initInfo){

        },
        loadChapter:function(chapterInfo,charaInfo,isLeader){
            if(isLeader){
                this.startLeaderEngine(chapterInfo);
            }else{
                this.startFollowerEngine(chapterInfo);
            }
        },
        startLeaderEngine:function(chapterInfo){
            if(chapterInfo.Map){
                this.geoInfo.generateByFile(chapterInfo.Map);
            }
            if(chapterInfo.Sprite){
                var spriteList = chapterInfo.Sprite;
                for(var i in spriteList){
                    var num = spriteList[i].num;
                    for(var m = 0;m<num;m++){
                        var sprite_i = spriteManager.generateSpriteByType(i);
                        sprite_i.addToGeo(this.geoInfo);
                        this.spriteList.push(sprite_i);
                    }
                }
            }

            this.timer.timerTask = setInterval(function(){
                for(var i = 0;i<this.spriteList.length;i++){
                    var sprite_i = this.spriteList[i];
                    sprite_i.action();
                }
            },this.timer.frameSpeed);
        },
        startFollowerEngine:function(chapterInfo){

        }

    }
});