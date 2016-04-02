/**
 * Created by wgw on 2016/4/2.
 */
define(function(require){

    var View = require("baBasicLib/view/View");
    function CSSView(div,model){
        View.call(this);
        this.div = null;
        this.model = null;
        this.initialize(div,model);
    };

    CSSView.prototype = new View();
    CSSView.prototype.initialize = function(div,model,width,height){
        this.baseDiv = div;
        var width = width||"1400px";
        var height = height||"700px";
        this.width = width;
        this.height = height;
        this.baseDiv.width = parseInt(width.replace("px",""));
        this.baseDiv.height = parseInt(height.replace("px",""));
        this.baseDiv.style.width = width;
        this.baseDiv.style.height = height;
        this.baseDiv.style.position = "relative";
        this.baseDiv.style.top = "0px";
        this.baseDiv.style.left = "0px";
        this.baseDiv.style.zIndex = 0;
    }
})