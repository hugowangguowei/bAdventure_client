/**
 * Created by wgw on 2016/4/18.
 */
define(function(require){
    function GManager(initInfo){
        this.geoInfo = {
            hasMap:false,
            width:0,
            height:0,
            backgroundPic:null,
            mapArray:[]
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
            this.timer.timerTask = setInterval(function(){
                for(var i = 0;i<this.spriteList.length;i++){
                    var sprite_i = this.spriteList[i];
                    sprite_i.action();
                }
            },this.timer.frameSpeed);
        },
        loadChapter:function(chapterInfo,charaInfo){

        }

    }
});