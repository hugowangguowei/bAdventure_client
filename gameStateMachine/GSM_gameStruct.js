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

    var os_game = new oS_game("gameS",300,50,600,350,false);
    os_game.addToLayer(gameLayer);

}