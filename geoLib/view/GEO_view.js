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
        var self = this;
        var prop = {
            id: this.id,
            class: "ori"
        };
        this.model.addListener("paperChange", prop, function (arg) {
            var paperInfo = self.model.paperInfo;
            self.drawPaper(paperInfo);

        });
    };
    GeoView.prototype.addBasicStruct = function(){
        var self = this;
        var outerStruct = $("<div></div>");
        outerStruct.attr("id","outS");
        outerStruct.html(
            "<canvas id = 'mainCanvas'></canvas>" +
            "<canvas id ='bottomCanvas'></canvas>" +
            "<canvas id ='rightCanvas'></canvas>"
        );
        $("#mainDiv").append(outerStruct);

        var $mainC = $("#mainCanvas");
        var canvas = $mainC[0];
        var c_w = canvas.width , c_h = canvas.height;
        canvas.addEventListener('mousedown',function(e){
            var loc = {x: e.layerX/c_w , y: e.layerY/c_h};
            self.mouseInput('mousedown',loc);
        },false)
        canvas.addEventListener('mousemove',function(e){
            var loc = {x: e.layerX/c_w , y: e.layerY/c_h};
            self.mouseInput('mousemove',loc);
        },false)
        canvas.addEventListener('mouseup',function(e){
            var loc = {x: e.layerX/c_w , y: e.layerY/c_h};
            self.mouseInput('mousemove',loc);
        },false)

    };
    GeoView.prototype.drawPaper = function(paperInfo){
        var canvas = $("#mainCanvas")[0];
        var cxt = canvas.getContext("2d");

    }
    return GeoView;
})