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
        this.model.addListener("geoChange",prop,function(){
            var geo = self.model.geoInfo;
            drawGeo(geo,self._geoCache);
            //self._geoCacheChanged = true;
            self.draw();
        });
        this.model.addListener("spriteChange", prop, function (arg) {
            var spriteList = self.model.spriteList;
            drawSpriteList(spriteList,self._spriteCache);
            //self._spriteCacheChanged = true;
            self.draw();
        });
        function drawGeo(geo,canvas){
            var dataArray = geo.dataArray;
            var d_w = geo.xNum;
            var d_h = geo.yNum;
            var c_w = canvas.width;
            var c_h = canvas.height;
            var _w = c_w/d_w;
            var _h = c_h/d_h;
            var cxt = canvas.getContext("2d");
            for(var i = 0,len = dataArray.length;i<len;i++){
                var x = i%d_w;
                var y = parseInt(i/d_w);
                var c = parseInt(dataArray[i]);
                if(c >= 255)c= 255;
                var cc = c.toString(16);
                if(c <16){
                    cc = "0" + cc;
                }
                cxt.strokeStyle = "#" + cc + cc + cc;
                cxt.strokeRect(x*_w,y*_h,_w,_h);
                cxt.stroke();
            }

        };
        function drawSpriteList(spriteList,canvas){
            var cxt = canvas.getContext("2d");
            cxt.clearRect(0,0,canvas.width,canvas.height);
            for(var i = 0,len = spriteList.length;i<len;i++){
                var sprite_i = spriteList[i];
                var spriteView = sprite_i.bindView;
                spriteView.draw(canvas);
            }
        }
    };
    GameView.prototype.draw = function(){
        var cxt = this.div.getContext("2d");
        cxt.clearRect(0,0,this.div.width,this.div.height);
        //if(this._geoCacheChanged){
            cxt.drawImage(this._geoCache,0,0);
            //this._geoCacheChanged = false;
        //}
        //if(this._spriteCacheChanged){
            cxt.drawImage(this._spriteCache,0,0);
            //this._spriteCacheChanged = false;
        //}
    }
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