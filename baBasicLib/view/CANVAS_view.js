/**
 * Created by wgw on 2016/4/2.
 */
define(function(require){
    var View = require("baBasicLib/view/View");

    function CANVASView(div,model){
        View.call(this,div,model);
        this.div = null;
        this.model = null;
        this.initialize(div,model);
    };

    CANVASView.prototype = new View();
    CANVASView.prototype.initialize = function(div,model,width,height){
        this.baseDiv = div;
        var width = width||1400;
        var height = height||700;
        this.width = width;
        this.height = height;
        this.baseDiv.width = width;
        this.baseDiv.height = height;
        this.baseDiv.style.width = width + "px";
        this.baseDiv.style.height = height + "px";
        this.baseDiv.style.position = "relative";
        this.baseDiv.style.top = "0px";
        this.baseDiv.style.left = "0px";
        this.baseDiv.style.zIndex = 0;
    };
    CANVASView.prototype.addListener = function(){
        this.obj.baseDiv.addEventListener("mousedown",CANVASView.prototype.doMouseDown,false);
        this.obj.baseDiv.addEventListener("mousemove",CANVASView.prototype.doMouseMove,false);
        this.obj.baseDiv.addEventListener("mouseup",CANVASView.prototype.doMouseUp,false);
        this.obj.baseDiv.onmousewheel = this.doMouseWheel;
        this.obj.baseDiv.oncontextmenu = function(event){
            var event = event||window.event;
            //!!
            this.baGlobal.GSM.mouseEventHandle("rightMouseDown",event);
            return false;
        }
        document.onkeydown = this.onKeyDown;
        document.onkeyup = this.onKeyUp;
    };
    CANVASView.prototype.onKeyDown = function (e) {
        var keyCode = e.which;
        var realKey = String.fromCharCode(keyCode);
        global.GSM.keyEvent({type:'keyDown',detail:realKey});
    };
    CANVASView.prototype.onKeyUp = function(e){
        var keyCode = e.which;
        var realKey = String.fromCharCode(keyCode);
        global.GSM.keyEvent({type:'keyUp',detail:realKey});
    };
    CANVASView.prototype.keyEvent = function(e){
    };
    CANVASView.prototype.doMouseDown = function(e){
        global.GSM.mouseEventHandle("mousedown",event);
    };
    CANVASView.prototype.doMouseMove = function(e){
        global.GSM.mouseEventHandle("mousemove",event);
    };
    CANVASView.prototype.doMouseUp = function(e){
        global.GSM.mouseEventHandle("mouseup",event);
    };
    CANVASView.prototype.doMouseWheel = function(e){
        var delta_y = event.deltaY;
    };
    CANVASView.prototype.getPointOnDiv =function(x,y){
        var obj = this.obj.baseDiv;
        var bBox = obj.getBoundingClientRect();
        return {
            x:x-bBox.left*(obj.width/bBox.width),
            y:y - bBox.top*(obj.height/bBox.height)
        };
    };
    CANVASView.prototype.getMouseDownObj = function(loc){
        var reflectArray = [];
        for(var i in this.obj.layerArray){
            if(this.obj.layerArray[i].state == "show"){
                for(var m in this.obj.layerArray[i].childList){
                    var sp = this.obj.layerArray[i].childList[m];
                    if(sp.reflectable&&sp.reflectBack(loc)){
                        reflectArray.push(sp);
                    }
                }
            }
        }
        var finalSprite = reflectArray[0];
        for(var i = 0;i<reflectArray.length;i++){
            if(reflectArray[i].parent.zindex > finalSprite.parent.zindex){
                finalSprite = reflectArray[i];
            }
        }
        return finalSprite;
    };
    CANVASView.prototype.mouseEventHandle = function(eventType,event){
        var self = this;
        var loc = this.getPointOnDiv(event.pageX,event.pageY);
        _mouseEvent(eventType,loc);

        function _mouseEvent(eventType,loc){
            switch (eventType){
                case "mousedown":
                    _mousedown(loc);
                    break;
                case "mousemove":
                    _mousemove(loc);
                    break;
                case "mouseup":
                    _mouseup(loc);
                    break;
            }
        }
        function _mousedown(loc){
            var obj = self.getMouseDownObj(loc);
            if(obj){
                console.log(obj.id);
                obj.inputEvent("mousedown");
                self.chosenObj = obj;
            }
            else{
                //console.log("no obj chosen");
            }
        }
        function _mousemove(loc){

        }
        function _mouseup(loc){
            var obj = self.chosenObj;
            if(obj){
                obj.inputEvent("mouseup");
                this.chosenObj = 0;
            }
        }
    };

    return CANVASView;
});

