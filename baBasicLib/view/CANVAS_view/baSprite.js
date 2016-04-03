/**
 * Created by wangguowei on 2001/1/1.
 */
define(function(){
    function baSprite(id,x,y,w,h,reflectable){
        this.id = id;
        this.name = id;
        this.type = "normal";
        this.parent = null;
        this.logicParent = null;
        this.group = "";
        this.isPrivate = false;
        this.x = x||0;
        this.y = y||0;
        this.width = w||0;
        this.height = h||0;
        this.visible = true;
        this.reflectable = reflectable||false;
        this.reflectRender = {left:this.x,right:this.x + this.width,top:this.y,bottom:this.y + this.height};
        this.childList = {};
        this.logicChildList = [];
        this.struct = null;
    }
    baSprite.prototype = {
        addToLayer:function(arg){
            arg.addChild(this);
        },
        addToLogicParent:function(arg){
            if(this.logicParent){
                throw new Error("can't add logicParentNode,it's already exist");
                return 0;
            }
            this.logicParent = arg;
            arg.logicChildList.push(this);
        },
        delete:function(){
            //
        },
        hide:function(){
            //
        },
        removeLogicChild:function(arg){
            for(var i in this.logicChildList){
                if(this.logicChildList[i] == arg){
                    this.logicChildList.splice(i,1);
                    arg.logicParent = 0;
                    return 0;
                }
            }
            throw new Error("no such logicChild,can't remove");
        },
        //!!need edit
        removeAllLogicChildren:function(){
            this.logicChildList = [];
        },
        removeLogicParent:function(){
            if(this.logicParent){
                this.logicParent.removeLogicChild(this);
            }
        },
        removeFromLayer:function(){
            if(this.parent){
                this.parent.removeChild(this);
            }
        },
        reflectBack:function(loc){
            if(loc.x >= this.reflectRender.left&&
                loc.x <= this.reflectRender.right&&
                loc.y >= this.reflectRender.top&&
                loc.y <= this.reflectRender.bottom){
                return true;
            }
            return false;
        },
        addLogicChild:function(child){
            child.addToLogicParent(this);
        },
        checkChosen:function(){

        },
        inputEvent:function(eventType){
        }
    }
    return baSprite;
})























