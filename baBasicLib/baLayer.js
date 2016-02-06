/**
 * Created by wangguowei on 2001/1/1.
 */
function baLayer(layerId,zindex){
    this.id = layerId;
    this.name = layerId;
    this.zindex = zindex;
    this.parent = null;
    this.frameSpeed = 1000;
    this.dynamic_interval = 0;
    this.state = "show";
    this.showState = "static";
    this.childList = {};
    this.countBack = 0;
}

baLayer.prototype = {
    addChild:function(args){
        var id = args.id;
        if(!id){
            throw new Error("baLayer:addChild:you must name your sprite!")
            return 0;
        }
        if(this.childList[id]){
            throw new Error("sprite id is already exist!");
            return 0;
        }
        this.childList[id] = args;
        args.parent = this;
    },
    removeChild:function(args){
        if(!args){
            return 0;
        }
        for(var i in this.childList){
            if(this.childList[i] == args){
                delete this.childList[i];
                args.parent = null;
                if(args.logicChildList&&args.logicChildList.length>0){
                    for(var m in args.logicChildList){
                        var lC_m = args.logicChildList[m];
                        args.removeLogicChild(lC_m);
                    }
                }
                if(args.logicParent){
                    args.logicParent.removeLogicChild(args);
                }
                return 0;
            }
        }
    },
    removeChildAndTheTree: function (args) {

    },
    removeLeafSpotOfTheTree:function(args){

    },
    removeAllChild:function(){
        for(var i in this.childList){
            this.removeChild(this.childList[i]);
        }
        this.childList = {};
    },
    getChildById: function (id) {
        if(this.childList[id]){
            return this.childList[id];
        }
        return 0;
    },
    //not finished
    getSpriteByType:function(typeName){

    },
    draw:function(){
        var canvas = this.canvas;
        var cxt = canvas.getContext("2d");
        cxt.clearRect(0,0,this.canvas.width,this.canvas.height);
        var child_i;
        for(var i in this.childList){
            child_i = this.childList[i];
            if(!child_i.isPrivate){
                child_i.draw(canvas);
            }
        }
    },
    startMachine:function(frameSpeed){
        this.showState = "dynamic";
        var self = this;
        self.frameSpeed = frameSpeed||self.frameSpeed;

        this.dynamic_interval = window.setInterval(function(){
            if(self.childList){
                self._countBack = 1;
                self.draw();
            }else{
                if(self._countBack){
                    self.draw();
                    self._countBack = 0;
                }else{
                }
            }
        },parseInt(1000/frameSpeed));
    },
    closeMachine:function(){
        this.showState = "static";
        if(this.dynamic_interval){
            window.clearInterval(this.dynamic_interval);
        }
    }
}





















