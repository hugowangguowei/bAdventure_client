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
        var mainCache = document.createElement("canvas");
        mainCache.width = 1000;
        mainCache.height = 1000;
        self._mainCache = mainCache;

        var $mainC = $("#mainCanvas");
        var canvas = $mainC[0];
        canvas.width = 800;
        canvas.height = 800;
        var c_w = canvas.width , c_h = canvas.height;
        canvas.addEventListener('mousedown',function(e){
            var loc = {x: e.layerX/c_w , y: e.layerY/c_h};
            self.model.mouseInput('mousedown',loc);
        },false)
        canvas.addEventListener('mousemove',function(e){
            var loc = {x: e.layerX/c_w , y: e.layerY/c_h};
            self.model.mouseInput('mousemove',loc);
        },false)
        canvas.addEventListener('mouseup',function(e){
            var loc = {x: e.layerX/c_w , y: e.layerY/c_h};
            self.model.mouseInput('mouseup',loc);
        },false)

    };
    GeoView.prototype.drawPaper = function(paperInfo){
        var self = this;
        //var canvas = self._mainCache;
        var $mainC = $("#mainCanvas");
        var canvas = $mainC[0];
        var cxt = canvas.getContext("2d");
        var dataArray = paperInfo.dataArray;
        var width = paperInfo.width;
        var height = paperInfo.height;
        var bx = canvas.width/width;
        var by = canvas.height/height;
        for(var i = 0;i<dataArray.length;i++){
            var x = (i%width)*bx;
            var y = parseInt(i/width)*by;
            var h = dataArray[i];
            var color = getColorByH(h);
            cxt.fillStyle = color;
            cxt.fillRect(x,y,bx,by);
            cxt.fill();
        }



        function getColorByH(height){
            if(h >= 255)h = 255;
            var tem = h.toString(16);
            if(h <= 16){
                tem = "0" + tem;
            }
            var color = "#" + tem + tem + tem;
            return color;
        }


    }
    return GeoView;
})