/**
 * Created by wangguowei on 2001/1/1.
 */
define(function(require){
   "use strict";
    var instance = null;
    var baEventSource = require("baBasicLib/baEventSource");

    function baGlobal(){
        baEventSource.call(this);
        /**
         * 层数组
         * @type {Array}
         */
        this.layerArray = [];
        /**
         * 游戏状态机
         * @type {baBasicLib/gameState}
         */
        this.GSM = null;
        /**
         * 连接管理器
         * @type {module:socket/WS_Manager}
         */
        this.WSM = null;
    }

    baGlobal.prototype = new baEventSource();
    baGlobal.prototype.setDIV = function(divElem,width,height){
        this.baseDiv = divElem;
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
        divElem.baGlobal = this;
    },
    //层管理========================================================================================================
    baGlobal.prototype.addLayer = function (layer,x,y,w,h){
        var canvasX = document.createElement("canvas");
        layer.x = x||0;
        layer.y = y||0;
        layer.width = w||this.baseDiv.width;
        layer.height = h||this.baseDiv.height;
        layer.parent = this;
        if(this.baseDiv){
            this.baseDiv.appendChild(layer.canvas);
            layer.canvas.width = layer.width;
            layer.canvas.height = layer.height;
        }else{
            throw new Error("baseDiv needed");
        }
        this.layerArray.push(layer);
    },
    baGlobal.prototype.getLayer = function(layerId){
        for(var i=0;i <this.layerArray.length;i++){
            if(this.layerArray[i].id == layerId){
                return this.layerArray[i];
            }
        }
        return 0;
    },
    baGlobal.prototype.removeLayer = function(layerId){
        for(var i =0;i<this.layerArray.length;i++){
            if(this.layerArray[i].id == layerId){
                this.layerArray[i].canvas.parentNode.removeChild(this.layerArray[i].canvas);
                this.layerArray.splice(i,1);
            }
        }
    },
    baGlobal.prototype.clearAllLayer = function(){
        for(var i = 0;i<this.layerArray.length;i++){
            var id = this.layerArray[i].id;
            this.removeLayer(id);
        }
    },
    baGlobal.prototype.hideLayer = function(obj){
        var cxt = obj.canvas.getContext('2d');
        cxt.clearRect(0,0,obj.canvas.width,obj.canvas.height);
        obj.hide();
    },
    baGlobal.prototype.hideAllLayer = function(){
        for(var i = 0;i< this.layerArray.length;i++){
            this.hideLayer(this.layerArray[i]);
        }
    },
    //状态机管理====================================================================================================
    baGlobal.prototype.startEngine = function () {

    },
    baGlobal.prototype.addGameStateMachine = function(gsm){
        gsm.obj = this;
        this.GSM = gsm;
    },
    baGlobal.prototype.getGameStateMachine = function(){
        return this.GSM;
    },
    baGlobal.prototype.getSpriteById = function(id){
        for(var i = 0;i<this.layerArray.length;i++){
            if(this.layerArray[i].childList[id]){
                return this.layerArray[i].childList[id];
            }
        }
        return 0;
    }

    return {
        getInstance:function(){
            if(!instance){
                instance = new baGlobal();
            }
            return instance;
        }
    }
});



























