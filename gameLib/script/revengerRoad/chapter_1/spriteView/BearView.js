/**
 * Created by wgw on 2016/5/7.
 */
define(function(require){
    var spriteView = require("baBasicLib/view/SpriteView");
    var BearViewCache = document.createElement("canvas");
    initCache(BearViewCache);
    function initCache(canvas){
        canvas.width = 10;
        canvas.height = 10;
        var cxt = canvas.getContext("2d");
        cxt.fillStyle = "blue";
        cxt.fillRect(0,2,10,6);
    }

    function BearView(model){
        spriteView.call(this);
        this.type = "bearView";
        this.bindModel = model;
    }
    BearView.prototype = new spriteView();
    BearView.prototype.draw = function(canvas){
        var obj = this.bindModel;
        var loc = obj.loc;
        var geo = obj.geoInfo;
        var geoW = geo.width;
        var geoH = geo.height;
        var relX = loc.x/geoW;
        var relY = loc.y/geoH;
        var cW = canvas.width;
        var cH = canvas.height;
        var direction = loc.direction;
        var x = relX*cW;
        var y = relY*cH;
        var cxt = canvas.getContext("2d");
        cxt.save();
        cxt.translate(x, y);
        cxt.rotate(direction);//旋转47度
        cxt.drawImage(BearViewCache,-1*BearViewCache.width/2, -1*BearViewCache.height/2);
        cxt.restore();
        //cxt.fillStyle = "blue";
        //cxt.fillRect(x,y,4,4);
        //cxt.fill();
    }
    return BearView;
});
