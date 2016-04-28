/**
 * Created by wgw on 2016/4/18.
 */
define(function(require){
    //var RR_c1 = require("gameLib/script/revengerRoad/chapter_1");


    function GManager(initInfo){
        this.geoInfo = {
            hasMap:false,
            width:0,
            height:0,
            backgroundPic:null,
            dataArray:[]
        }
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
                this.startFallowerEngine(chapterInfo);
            }
        },
        startLeaderEngine:function(chapterInfo){
            if(chapterInfo.Map){
                this.geoInfo.width = chapterInfo.Map.width;
                this.geoInfo.height = chapterInfo.Map.height;
                this.geoInfo.dataArray = chapterInfo.Map.dataArray;
            }
            if(chapterInfo.Sprite){
                var spriteList = chapterInfo.Sprite;
                for(var i in spriteList){

                }
            }

            this.timer.timerTask = setInterval(function(){
                for(var i = 0;i<this.spriteList.length;i++){
                    var sprite_i = this.spriteList[i];
                    sprite_i.action();
                }
            },this.timer.frameSpeed);
        }

    }
});