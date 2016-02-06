/**
 * Created by wangguowei on 2001/1/1.
 */

function basicBlock(id,x,y,w,h){
    baSprite.call(this);
    this.id = id;
    this.type = "basicBlock";
    this.group = "";
    this.structParent = null;
    this.x = x||0;
    this.y = y||0;
    this.width = w||1;
    this.height = h||1;
    this.isInit = false;
    this.cacheCanvas = document.createElement("canvas");
    this.cacheOutDate = false;
    this.isPrivate = true;
    this.isFocusOn = false;
    this.reflectable = true;
}

basicBlock.prototype = new baSprite();
basicBlock.prototype.setBasicInfo = function(x,y,w,h){
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
}
basicBlock.prototype.init = function(){
    this.cacheCanvas.width = this.width;
    this.cacheCanvas.height = this.height;
    this.cacheRefresh();
    this.isInit = true;
}
basicBlock.prototype.draw = function(canvas,relativeLoc,parentWindowConfig){
    var self = this;
    if(!this.isInit){
        this.init();
    }
    _drawDetail(canvas,relativeLoc);
    _drawCount(relativeLoc,parentWindowConfig);

    function _drawDetail(canvas,loc){
        var cxt = canvas.getContext("2d");
        if(self.cacheOutDate){
            self.cacheRefresh();
            self.cacheOutDate = false;
        }
        cxt.drawImage(self.cacheCanvas,loc.x,loc.y,loc.w,loc.h);
    }
    function _drawCount(loc,pWC){
        var d_reflectBorder = {x:loc.x,y:loc.y,w:loc.w,h:loc.h};
        if(loc.y < 0){
            d_reflectBorder.y = 0;
            d_reflectBorder.h += loc.y;
        }
        if(loc.y - pWC.h > 0){
            var d_y = pWC.h - loc.y;
            d_reflectBorder.h += d_y;
        }
        var RB = {
            x:d_reflectBorder.x + pWC.x,
            y:d_reflectBorder.y + pWC.y,
            w:d_reflectBorder.w,
            h:d_reflectBorder.h
        }
        self.reflectRender = {
            left:RB.x,
            right:RB.x + RB.w,
            top:RB.y,
            bottom:RB.y + RB.h
        }
    }
}
basicBlock.prototype.cacheRefresh = function () {

}
basicBlock.prototype.focusChange = function(type){
    this.isFocusOn = !this.isFocusOn;
    this.cacheOutDate = true;
    if(type == "command"){
        this.structParent.nodeFocusChange(this);
    }
}
basicBlock.prototype.inputEvent = function(eventType){
    switch (eventType){
        case "mousedown":
            this.focusChange("command");
            break;
        case "mousemove":
            break;
        case "mouseup":
            break;
    }
}


























