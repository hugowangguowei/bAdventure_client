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
            state:'up'
        };
        this.penInfo = {
            weight:20,
            radius:10
        }
        this.paperInfo = {
            width:100,
            height:100,
            dataArray:[]
        };
        this.colorInfo = {
            c1:{R:255,G:0,B:0,H:-255},
            c2:{R:0,G:255,B:0,H:0},
            c3:{R:0,G:0,B:255,H:255},
            colorList:[]
        }
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
        var x = parseInt(loc.x * self.paperInfo.width);
        var y = parseInt(loc.y * self.paperInfo.height);
        var penWeight = self.penInfo.weight;
        var penRadius = self.penInfo.radius;
        var t1 = new Date().getTime();
        for(var i = 0;i<penRadius*2;i++){
            var _x = x - penRadius + i;
            if(_x >= 0 && _x < width){
                for(var j = 0;j<penRadius*2;j++){
                    var _y = y - penRadius + j;
                    if(_y >= 0 && _y < height){
                        var c_r = (i-penRadius)*(i-penRadius) + (j-penRadius)*(j-penRadius);
                        var p = c_r/(penRadius*penRadius);
                        if(p<=1){
                            var _penWeight = (1-p) * penWeight;
                            //console.log(_x + "  " + _y + "  " + _y * width + _x);
                            self.paperInfo.dataArray[_y * width + _x] += _penWeight;
                        }
                    }
                }
            }
        }
        var t2 = new Date().getTime();
        console.log(t2 - t1);
        //self.paperInfo.dataArray[y * width + x] += penWeight;

        this.fireEvent("paperChange");
    }
    GeoManager.prototype.updateColor = function(c1,c2,c3){
        var cList = [];
        cList.push(c1);
        cList.push(c2);
        cList.push(c3);
        for(var i = 0;i<3;i++){
            var c_i = cList[i];
            if(c_i.H < cList[0].H){
                cList.splice(i,1);
                cList.unshift(c_i);
            }
            if(c_i.H > cList[2].H){
                cList.splice(i,1);
                cList.push(c_i);
            }
        }
        console.log(cList);
        var colorList = [];
        for(var i = 1;i<3;i++){
            var interval1= cList[i].H - cList[i-1].H;
            var iR1 = cList[i].R - cList[i-1].R;
            var iG1 = cList[i].G - cList[i-1].G;
            var iB1 = cList[i].B - cList[i-1].B;
            var iR1t,iG1t,iB1t;
            for(var m = 0;m<interval1;m++){
                iR1t = parseInt(parseInt(cList[i-1].R) + m*iR1/interval1);
                iG1t = parseInt(parseInt(cList[i-1].G) + m*iG1/interval1);
                iB1t = parseInt(parseInt(cList[i-1].B) + m*iB1/interval1);
                colorList.push("rgb(" + iR1t + "," + iG1t + "," + iB1t + ")");
            }
        }
        this.colorInfo.colorList = colorList;
        console.log(colorList);
        this.fireEvent("colorChange");
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