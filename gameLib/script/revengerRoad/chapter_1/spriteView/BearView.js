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
        //计算位置
        var geo = obj.geoInfo;
        var geoW = geo.width , geoH = geo.height;
        var relX = loc.x/geoW , relY = loc.y/geoH;
        var cW = canvas.width , cH = canvas.height;
        var x = relX*cW;
        var y = relY*cH;
        //计算方向
        var direction = loc.direction;
        var propInfo = obj.propInfo;
        var scale = propInfo.life/propInfo.baseLife;
        var bearWidth = BearViewCache.width*scale , bearHeight = BearViewCache.height*scale;



        var cxt = canvas.getContext("2d");
        cxt.save();
        cxt.translate(x, y);
        cxt.rotate(direction);//旋转47度
        cxt.drawImage(BearViewCache,-1*bearWidth/2, -1*bearHeight/2,bearWidth,bearHeight);
        if(obj.testSignal.watch){
            cxt.strokeStyle = "red";
            cxt.strokeRect(-1*bearWidth/2 - 2, -1*bearHeight/2 - 1,bearWidth + 4,bearHeight + 2);
            cxt.stroke();
        }
        cxt.restore();
    }
    return BearView;
});
