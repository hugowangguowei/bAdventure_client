/**
 * Created by wgw on 2016/4/18.
 */
define(function(require){

    var instance = null;

    function GeoManager(){
        this.type = "GeoManager";
    }
    GeoManager.prototype = {

    }

    return{
        getInstance: function () {
            if(!instance){
                instance = new GeoManager();
            }
            return instance;
        }
    }
});