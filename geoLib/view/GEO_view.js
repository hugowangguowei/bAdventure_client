/**
 * Created by wgw on 2016/4/18.
 */
define(function(require){
    var View = require("baBasicLib/view/View");
    var viewConfig = require("geoLib/view/ViewConfig");
    var listenerType = viewConfig.listenerType;
    var listenerClass = viewConfig.listenerClass;
    var getGUID = require("baBasicLib/util/GUID");

    function GeoView(div,model){
        View.call(this,div,model);
        this.id = getGUID();
        this.div = null;
        this.model = null;
        this.initialize(div,model);
    };

    GeoView.prototype = new View();
    GeoView.prototype.initialize = function(div,model,width,height){
        this.model = model;
        this.setDIV(div,width,height);
        this.addOriListeners();
        this.addBasicStruct();
    }
    GeoView.prototype.setDIV = function(div,width,height){
        this.baseDiv = div;
        var width = width||900;
        var height = height||900;
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
    },
    GeoView.prototype.addOriListeners = function() {
        var _this = this;
        var prop = {
            id: this.id,
            class: "ori"
        };
        this.model.addListener(listenerType.SCENE_CHANGE, prop, function (arg) {
            _this.changeScene(arg[0]);
        });
    };
    GeoView.prototype.addBasicStruct = function(){
        var outerStruct = $("<div></div>");
        outerStruct.attr("id","outS");
        outerStruct.html(
            "<canvas id = 'mainCanvas'></canvas>" +
            "<canvas id ='bottomCanvas'></canvas>" +
            "<canvas id ='rightCanvas'></canvas>"
        );
        $("#mainDiv").append(outerStruct);
        var $mainC = $("#mainCanvas");
        $mainC[0].addEventListener('mousedown',function(e){
            console.log(e);
            console.log("mouseDown");
        },false)
        $mainC[0].addEventListener('mousemove',function(e){
            console.log('mousemove');
        },false)
        $mainC[0].addEventListener('mouseup',function(e){
            console.log('mouseup');
        },false)

    }
    return GeoView;
})