/**
 * Created by wgw on 2016/4/2.
 */
define(function(require){

    var View = require("baBasicLib/view/View");
    var viewConfig = require("baBasicLib/view/ViewConfig");
    var listenerType = viewConfig.listenerType;


    function CSSView(div,model){
        View.call(this,div,model);
        this.div = null;
        this.model = null;
        this.initialize(div,model);
    };

    CSSView.prototype = new View();
    CSSView.prototype.initialize = function(div,model,width,height){
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
    }
    CSSView.prototype.addListeners = function(){
        this.model.addListener(listenerType.SCENE_CHANGE,function(arg){
            switch (arg) {
                case "gameLoading":
                    console.log("gameLoading");
                    break;
                case "mainShow":
                    console.log("mainShow");
                    break;
            }
        })
    }

    return CSSView;
})