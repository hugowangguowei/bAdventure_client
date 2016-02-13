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

    var os_sc = new oS_selfControl("os_sc",100,400,700,150,false);
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

    var btn_clientInput = new baButton("btn_clientInput");
    var locInfo = {
        x:os_sc.x+10,
        y:os_sc.y+100,
        width:630,
        height:40
    }
    btn_clientInput.setLoc(locInfo);
    btn_clientInput.bindEvent(BTN_E_CLIENT_INPUT);
    btn_clientInput.upStateInfo.text = "pleaseInsert";
    btn_clientInput.addToLayer(gameLayer);

    var btn_clientSubmit = new baButton("btn_clientSubmit");
    var locInfo = {
        x:os_sc.x + 650,
        y:os_sc.y + 100,
        width:40,
        height:40
    }
    btn_clientSubmit.setLoc(locInfo);
    btn_clientSubmit.bindEvent(BTN_E_CLIENT_SUBMIT);
    btn_clientSubmit.upStateInfo.text = "commit";
    btn_clientSubmit.addToLayer(gameLayer);




}