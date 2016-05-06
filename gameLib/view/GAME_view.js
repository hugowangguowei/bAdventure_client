/**
 * Created by wgw on 2016/5/5.
 */
define(function(require){
    var View = require("baBasicLib/view/View");
    var viewConfig = require("geoLib/view/ViewConfig");
    var listenerType = viewConfig.listenerType;
    var listenerClass = viewConfig.listenerClass;
    var getGUID = require("baBasicLib/util/GUID");
    var baLib = require("baBasicLib/util/baLib");

    function GameView(div,model){
        View.call(this,div,model);
        this.id = getGUID();
        this.div = null;
        this.model = null;
        this.initialize(div,model);
    };
    GameView.prototype = new View();
    GameView.prototype.initialize = function(div,model){
        this.div = div;
        this.model = model;
        this.addOriListeners();
        this.addBasicStruct();
    }
    GameView.prototype.addOriListeners = function() {
        var self = this;
        var prop = {
            id: this.id,
            class: "ori"
        };
        this.model.addListener("geoChange",function(){
            var geo = this.model.geoInfo;
            drawGeo(geo,self._geoCache);
        });
        this.model.addListener("spriteChange", prop, function (arg) {
            var msg = arg[0];

        });
        function drawGeo(geo,canvas){
            var dataArray = geo.dataArray;
            var d_w = geo.width;
            var d_h = geo.height;
            var c_w = canvas.width;
            var c_h = canvas.height;

        }
    };
    GameView.prototype.addBasicStruct = function(){
        var self = this;
        var c_w = 800,c_h = 800;

        var canvas = this.div;
        canvas.width = c_w;
        canvas.height = c_h;

        self._geoCache = document.createElement("canvas");
        self._geoCache.width =c_w;
        self._geoCache.height = c_h;

        self._spriteCache = document.createElement('canvas');
        self._spriteCache.width = c_w;
        self._spriteCache.height = c_h;

    };
    return GameView;
})