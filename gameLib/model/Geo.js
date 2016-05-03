/**
 * Created by wgw on 2016/4/30.
 */
define(function (require) {
    function Geo(){
        this.hasMap = false,
        this.width = 0,
        this.height = 0,
        this.backgroundPic = null,
        this.dataArray = [],
        this.objectArray = []
    }

    Geo.prototype = {
        generateByFile:function(geoInfo){
            this.width = geoInfo.width;
            this.height = geoInfo.height;
            this.dataArray = geoInfo.dataArray;
            this.objectArray = [];
            for(var i = 0;i<this.dataArray.length;i++){
                this.objectArray.push(0);
            }
        }
    }

    return Geo;
})