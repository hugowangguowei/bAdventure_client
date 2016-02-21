/**
 * Created by wangguowei on 2001/1/11.
 */

define(function(){
    function GSM_mainShow(_this){
        global.hideAllLayer();
        if(global.getLayer("loadingLayer")){
            global.removeLayer("loadingLayer");
        }
        if(global.getLayer("mainShowLayer")){
            var mainShowLayer = global.getLayer("mainShowLayer");
            mainShowLayer.state = "show";
            return 0;
        }

        var mainShowLayer = global.addLayer("mainShowLayer",120);
        mainShowLayer.startMachine(60);

        var bg = new baSprite("bg",0,0,mainShowLayer.canvas.width,mainShowLayer.canvas.height,false);
        bg.addToLayer(mainShowLayer);
        bg.draw = function (canvas) {
            var cxt = canvas.getContext("2d");
            cxt.fillStyle = "grey";
            cxt.fillRect(this.x,this.y,this.width,this.height);
        }

        var singleProBtn = new baButton("singleProBtn",500,200,200,100,true);
        singleProBtn.upStateInfo.text = "connect Server";
        singleProBtn.addToLayer(mainShowLayer);
    }
    return GSM_mainShow;
})























