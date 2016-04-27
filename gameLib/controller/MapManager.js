/**
 * Created by wgw on 2016/4/27.
 */
define(function(require){

    var instance = null;
    function MapManager(){

    }
    MapManager.prototype = {
        initialize:function(){

        },
        getMap:function(mapName){
            return "ha";
        }
    }

    return {
        getInstance:function(){
            if(!instance){
                instance = new MapManager();
            }
            return instance;
        }
    }
});