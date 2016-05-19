/**
 * Created by wgw on 2016/5/12.
 */

function init(){
    console.log("haha");
    $("#t1").val("添加小熊");
    $("#t2").val("连接服务器");
    $("#t3").val("开始游戏");
    $("#t3").attr('disabled','true');
}

function test1(){
    require(
        ['gameLib/script/revengerRoad/chapter_1/sprite/Bear'],
        function(Bear){
            for(var i = 0;i<10;i++){
                var bear = new Bear;
                gm.addSprite(bear);
            }
        })
}

function test2(){
    $("#t2").attr('disabled','true');
    $("#t3").removeAttr('disabled');
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

}

function test5(){

}