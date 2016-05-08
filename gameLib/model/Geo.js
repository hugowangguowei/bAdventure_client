/**
 * Created by wgw on 2016/4/30.
 */
define(function (require) {
    function Geo(){
        this.hasMap = false;
        this.width = 0;
        this.height = 0;
        this.xNum = 0;
        this.yNum = 0;
        this.backgroundPic = null;
        this.dataArray = [];
        this.objectArray = [];
    }

    Geo.prototype = {
        generateByFile:function(geoInfo){
            this.width = geoInfo.width;
            this.height = geoInfo.height;
            this.xNum = geoInfo.xNum;
            this.yNum = geoInfo.yNum;
            this.dataArray = geoInfo.dataArray;
            for(var i = 0;i<this.dataArray.length;i++){
                this.objectArray.push(0);
            }
        },
        getLocByNum:function(i){
            if(i <0 || i>this.dataArray.length){
                return null;
            }
            var x = i%this.width;
            var y = parseInt(i/this.height);
            var loc = {x:x,y:y};
            return loc;
        }
    }

    return Geo;
})