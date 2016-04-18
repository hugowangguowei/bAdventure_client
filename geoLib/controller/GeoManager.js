/**
 * Created by wgw on 2016/4/18.
 */
define(function(require){
    "use strict";
    var instance = null;
    var baEventSource = require("baBasicLib/baEventSource");
    function GeoManager(){
        baEventSource.call(this);
        this.type = "GeoManager";
    }
    GeoManager.prototype = new baEventSource();

    return{
        getInstance: function () {
            if(!instance){
                instance = new GeoManager();
            }
            return instance;
        }
    }
});