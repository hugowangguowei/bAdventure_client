/**
 * Created by wgw on 2016/2/23.
 */
define(function(){
    function baButton(id,x,y,w,h,reflectable){
        baSprite.call(this);
        this.id = id;
        this.name = id;
        this.type = "baButton";
        this.x = x||0;
        this.y = y||0;
        this.width = w||1;
        this.height = h||1;
        this.showState = "up";

        this.reflectable = reflectable||true;
        this.reflectRender = {left:this.x,right:this.x + this.width,top:this.y,bottom:this.y + this.height};
        this.eventResponseType = "mousedown";
        this.bindedEvent = null;
        this.bindedeEventArgs = [];

        this.upStateInfo = {
            isDefined:true,
            text:"",
            strokeColor:"white",
            fillColor:"black",
            bgPicInfo:{pic:0,x:this.x,y:this.y,width:this.width,height:this.height},
            fgPicInfo:{pic:0,x:this.x,y:this.y,width:this.width,height:this.height}
        };
        this.downStateInfo = {
            isDefined:false
        };
        this.hideStateInfo = {
            isDefined:false
        };
    }
    baButton.prototype = new baSprite();
    baButton.prototype.setLoc = function(loc){
        if(loc.x){
            this.x = loc.x;
        }
        if(loc.y){
            this.y = loc.y;
        }
        if(loc.width){
            this.width = loc.width;
        }
        if(loc.w){
            this.width = loc.w;
        }
        if(loc.height){
            this.height = loc.height;
        }
        if(loc.h){
            this.height = loc.h;
        }
        this.refreshBorder();
    }
    baButton.prototype.refreshBorder = function(){
        this.reflectRender = {
            left:this.x,
            right:this.x + this.width,
            top:this.y,
            bottom:this.y + this.height
        }
    }
    baButton.prototype.draw = function (canvas) {
        var self = this;
        switch (this.showState){
            case "hide":
                _drawBtnHide();
                break;
            case "up":
                _drawBtnUp();
                break;
            case "down":
                _drawBtnDown();
                break;
        }

        function _drawBtnHide(){
            var curStateInfo = self.upStateInfo;
            if(self.hideStateInfo.isDefined){
                curStateInfo = self.hideStateInfo;
            }
            _drawByState(curStateInfo);
        }
        function _drawBtnUp(){
            var curStateInfo = self.upStateInfo;
            _drawByState(curStateInfo);
        }
        function _drawBtnDown(){
            var curStateInfo = self.upStateInfo;
            if(self.downStateInfo.isDefined){
                curStateInfo = self.downStateInfo;
            }
            _drawByState(curStateInfo);
        }
        function _drawByState(si){
            var cxt = canvas.getContext("2d");

            if(si.bgPicInfo.pic){
                var bgPI = si.bgPicInfo;
                cxt.drawImage(bgPI.pic,bgPI.x,bgPI.y,bgPI.width,bgPI.height);
            }

            if(si.fgPicInfo.pic){
                var fgPI = si.fgPicInfo;
                cxt.drawImage(fgPI.pic,fgPI.x,fgPI.y,fgPI.width,fgPI.height);
            }

            cxt.fillStyle = si.fillColor;
            cxt.fillRect(self.x + 4,self.y + 3,self.width - 8,self.height -6);
            cxt.textBaseline = "center";
            cxt.textAlign = "center";
            cxt.fillStyle = si.strokeColor;
            cxt.fillText(si.text,self.x+ self.width/2,self.y + self.height/2);
        }
    }
    baButton.prototype.inputEvent = function(eventType){
        if(eventType!= this.eventResponseType){
            return 0;
        }
        if(this.bindedEvent){
            this.bindedEvent();
        }
    }
    baButton.prototype.bindEvent = function(func,args){
        this.bindedEvent = func;
        if(args){
            this.bindedeEventArgs = args;
        }
    }
    baButton.prototype.hide = function(){
        this.reflectable = false;
        this.showState = "hide";
        return this;
    }
    baButton.prototype.show = function(){
        this.reflectable = true;
        this.showState = "up";
        return this;
    }

    return baButton;
})