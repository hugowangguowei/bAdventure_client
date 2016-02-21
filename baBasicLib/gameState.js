/**
 * Created by wangguowei on 2001/1/1.
 */

define(function(){
    var gameStateMachine = function(){
        this.obj = "";
        this.gameStateArray = [];
        this.currentState = null;
        this.chosenObj = null;
        this.userID = "hugo";
        this.currentObj = null;
        this.privateState = {};
        this._startGameMsg = null;
    };
    gameStateMachine.prototype = {
        addListener:function(){
            this.obj.baseDiv.addEventListener("mousedown",gameStateMachine.prototype.doMouseDown,false);
            this.obj.baseDiv.addEventListener("mousemove",gameStateMachine.prototype.doMouseMove,false);
            this.obj.baseDiv.addEventListener("mouseup",gameStateMachine.prototype.doMouseUp,false);
            this.obj.baseDiv.onmousewheel = this.doMouseWheel;
            this.obj.baseDiv.oncontextmenu = function(event){
                var event = event||window.event;
                //!!
                this.baGlobal.GSM.mouseEventHandle("rightMouseDown",event);
                return false;
            }
            document.onkeydown = this.onKeyDown;
            document.onkeyup = this.onKeyUp;
        },
        onKeyDown: function (e) {
            var keyCode = e.which;
            var realKey = String.fromCharCode(keyCode);
            global.GSM.keyEvent({type:'keyDown',detail:realKey});
        },
        onKeyUp:function(e){
            var keyCode = e.which;
            var realKey = String.fromCharCode(keyCode);
            global.GSM.keyEvent({type:'keyUp',detail:realKey});
        },
        keyEvent:function(e){

        },
        doMouseDown:function(e){
            global.GSM.mouseEventHandle("mousedown",event);
        },
        doMouseMove:function(e){
            global.GSM.mouseEventHandle("mousemove",event);
        },
        doMouseUp:function(e){
            global.GSM.mouseEventHandle("mouseup",event);
        },
        doMouseWheel:function(e){
            var delta_y = event.deltaY;
        },
        getPointOnDiv:function(x,y){
            var obj = this.obj.baseDiv;
            var bBox = obj.getBoundingClientRect();
            return {
                x:x-bBox.left*(obj.width/bBox.width),
                y:y - bBox.top*(obj.height/bBox.height)
            };
        },
        getMouseDownObj:function(loc){
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
        },
        mouseEventHandle:function(eventType,event){
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
                    console.log("no obj chosen");
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
        },

        initRoutine:function(){
            this.addListener();

            if(!this.gameStateArray.length){
                throw new Error("gameStateArray is not add yet!");
                return 0;
            }
            this.currentState = this.gameStateArray[0];
            this.currentState.stateFunction(this);
        },
        switchToNext:function(stateName){
            var stateChanged = false;
            for(var i = 0;i<this.gameStateArray.length;i++){
                if(this.gameStateArray[i].stateName == stateName){
                    this.currentState = this.gameStateArray[i];
                    stateChanged = true;
                }
            }

            if(!stateChanged){
                throw new Error("gsm set wrong");
            }
            else{
                this.currentState.stateFunction(this);
                console.log("LISTEN: " + this.currentState.stateName);
            }
        },
    };

    return gameStateMachine;
});

