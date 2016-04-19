/**
 * Created by wgw on 2016/4/18.
 */
define(function(require){
    "use strict";
    var instance = null;
    var baEventSource = require("baBasicLib/baEventSource");

    function GeoManager(){
        baEventSource.call(this);
        this.type = "GeoManager";
        this.mouseInfo = {
            state:'down'
        };
        this.penInfo = {
            weight:2,
            radius:5
        }
        this.paperInfo = {
            width:500,
            height:500,
            dataArray:[]
        };
        this.initialize();
    }
    GeoManager.prototype = new baEventSource();
    GeoManager.prototype.initialize = function(){
        var self = this;
        var len = self.paperInfo.width * self.paperInfo.height;
        for(var i = 0;i<len;i++){
            self.paperInfo.dataArray.push(0);
        }
    };
    GeoManager.prototype.mouseInput = function(type,loc){
        var self = this;
        switch (type){
            case "mousedown":
                this.mouseInfo.state = "down";
                break;
            case "mousemove":
                break;
            case "mouseup":
                this.mouseInfo.state = "up";
                break;
        };
        if(this.mouseInfo.state == "down"){
            mouseDownHandle(loc);
        };
        if(this.mouseInfo.state == "up"){
            mouseUpHandle(loc);
        };
        function mouseDownHandle(loc){
            self.draw(loc);
        }
        function mouseUpHandle(loc){

        }
    };
    GeoManager.prototype.draw = function(loc){
        var self = this;
        //传入的loc数据{x:x0,y:y0}，x0 和 y0是比例值
        var width = self.paperInfo.width;
        var height = self.paperInfo.height;
        var x = parseInt(loc.x * self.paperInfo.x);
        var y = parseInt(loc.y * self.paperInfo.y);
        var penWeight = self.penInfo.weight;
        self.paperInfo.dataArray[y * height + x] += penWeight;

        this.fireEvent("paperChange");
    }

    return{
        getInstance: function () {
            if(!instance){
                instance = new GeoManager();
            }
            return instance;
        }
    }
});