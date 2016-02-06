/**
 * Created by wangguowei on 2001/1/1.
 */

function baGlobal(){
    this.baseDiv = null;
    this.object = "";
    this.layerArray = [];
    this.width = null;
    this.height = null;
    this.GSM = null;
    this.GSMArray = [];
}

baGlobal.prototype = {
    setDIV:function(divElem,width,height){
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
    addLayer: function (layerName,zindex,x,y,w,h){
        var canvasX = document.createElement("canvas");
        canvasX.id = layerName;
        canvasX.width = w||this.baseDiv.width;
        canvasX.height = h||this.baseDiv.height;
        canvasX.style.position = "absolute";
        canvasX.style.top = "0px";
        canvasX.style.left = "0px";
        canvasX.style.zIndex = zindex;

        if(this.baseDiv){
            this.baseDiv.appendChild(canvasX);
        }else{
            throw new Error("baseDiv needed");
        }

        var layerX = new baLayer(layerName,zindex);
        layerX.canvas = canvasX;
        layerX.x = x;
        layerX.y = y;
        layerX.width =w;
        layerX.height = h;
        layerX.parent = this;
        this.layerArray.push(layerX);

        return layerX;
    },
    getLayer:function(layerId){
        for(var i=0;i <this.layerArray.length;i++){
            if(this.layerArray[i].id == layerId){
                return this.layerArray[i];
            }
        }
        return 0;
    },
    removeLayer:function(layerId){
        for(var i =0;i<this.layerArray.length;i++){
            if(this.layerArray[i].id == layerId){
                this.layerArray[i].canvas.parentNode.removeChild(this.layerArray[i].canvas);
                this.layerArray.splice(i,1);
            }
        }
    },
    clearAllLayer:function(){
        for(var i = 0;i<this.layerArray.length;i++){
            var id = this.layerArray[i].id;
            this.removeLayer(id);
        }
    },
    hideLayer:function(obj){
        var cxt = obj.canvas.getContext('2d');
        cxt.clearRect(0,0,obj.canvas.width,obj.canvas.height);
        obj.state = "hide";
    },
    hideAllLayer:function(){
        for(var i = 0;i< this.layerArray.length;i++){
            this.hideLayer(this.layerArray[i]);
        }
    },
    startEngine: function () {

    },
    //question
    addGameStateMachine:function(){
        var gsm = new gameStateMachine();
        gsm.obj = this;
        this.GSM = gsm;
    },
    getGameStateMachine:function(){
        return this.GSM;
    },
    getSpriteById:function(id){
        for(var i = 0;i<this.layerArray.length;i++){
            if(this.layerArray[i].childList[id]){
                return this.layerArray[i].childList[id];
            }
        }
        return 0;
    }
}
























