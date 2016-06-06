/**
 * Created by wgw on 2016/5/12.
 */

function init(){
    console.log("haha");
    $("#t1").val("添加小熊");
    $("#t2").val("连接服务器");
    $("#t3").val("开始游戏");
    $("#t3").attr('disabled','true');
    $("#t4").val("加入游戏");
    $("#t4").attr('disabled','true');
}

function test1(){
    for(var i = 0;i<10;i++){
        var id = "bear_" + Math.random();
        var loc = {x:parseInt(Math.random()*1000),y:parseInt(Math.random()*800),direction:0};
        var info = {type:"addSprite",detail:{type:"bear",prop:{id:id,loc:loc}}};
        WSM.sendMsg("gameInput",info);
    }
}

function test2(){
    $("#t2").attr('disabled','true');
    $("#t3").removeAttr('disabled');
    $("#t4").removeAttr('disabled');
    require(
        ['baBasicLib/webSocket/WS_Manager',
        'gameLib/webSocket/WS_Config',
        'gameLib/webSocket/WS_msgDefine'],
        function(wsManager,wsConfig,wsMDF){
            WSM = wsManager.getInstance(gm,wsConfig,wsMDF);
            WSM.connectToServer();
        }
    )
}

function test3(){
    WSM.webSocket.emit('startGame');
}

function test4(){
    WSM.webSocket.emit('joinGame');
}

function test5(){

}

//gameInput消息格式示范
/*
var msg = {
    type:"XX",(refreshSprite)
    detail:{
        type:"acc",
        detail:""
    }
}
*/

$(document).keydown(function(event){
    console.log(event.keyCode);
    switch (event.keyCode){
        case 37:
            //turnLeft
            WSM.sendMsg("gameInput",{type:"refreshSprite",detail:{type:"turnLeft",detail:""}});
            break;
        case 38:
            //acc
            WSM.sendMsg("gameInput",{type:"refreshSprite",detail:{type:"acc",detail:""}});
            break;
        case 39:
            //turnRight
            WSM.sendMsg("gameInput",{type:"refreshSprite",detail:{type:"turnRight",detail:""}});
            break;
        case 40:
            //draw
            WSM.sendMsg("gameInput",{type:"refreshSprite",detail:{type:"draw",detail:""}});
            break;
    }
});