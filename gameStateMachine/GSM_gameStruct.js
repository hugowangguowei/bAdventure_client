/**
 * Created by wgw on 2016/2/10.
 */

gameStateMachine.prototype.gameStruct = function(){

    global.hideAllLayer();
    var gameLayer = global.addLayer("gameStructLayer",121);
    gameLayer.startMachine(24);

    var bg = new baSprite("bg",0,0,gameLayer.canvas.width,gameLayer.canvas.height,false);
    bg.addToLayer(gameLayer);
    bg.draw = function (canvas) {
        var cxt = canvas.getContext("2d");
        cxt.fillStyle = "grey";
        cxt.fillRect(this.x,this.y,this.width,this.height);
    }

    var os_sc = new oS_selfControl("os_sc",100,300,700,250,false);
    os_sc.addToLayer(gameLayer);

    var btn_1 = new baButton("btn_roll");
    var locInfo = {
        x:os_sc.x+10,
        y:os_sc.y+5,
        width:40,
        height:40
    }
    btn_1.setLoc(locInfo);
    btn_1.bindEvent(BTN_E_ROLL);
    btn_1.upStateInfo.text = "roll";
    btn_1.addToLayer(gameLayer);





}