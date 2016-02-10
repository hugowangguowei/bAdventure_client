/**
 * Created by wangguowei on 2001/1/11.
 */

function connectToServer(detail){
    var serverUrl = 'http://localHost:3000';
    var mainSocket = io.connect(serverUrl);
    BASIC_SOCKET = mainSocket;

    var userName = document.getElementById("userNameInput").value + "aaSss";
    var connectDetail = {};
    connectDetail.userName = userName;
    mainSocket.emit("basicConnect",connectDetail);

    mainSocket.on("basicConnectReturn",function(msg){
        console.log(msg);
        if(msg == "ok"){
            global.GSM.switchToNext("mainShowBasicStruct");
        }
    });
    mainSocket.on("createNewRoom", function (msg) {
        console.log("never happen");
    });
    mainSocket.on("roomListRefresh",function(msg){
        console.log("roomListRefresh:");
        console.log(msg);
        ws_roomListRefresh(msg);
    });
    mainSocket.on("intoARoom", function (msg) {
        console.log("intoARoom");
        console.log(msg);
        ws_intoARoom(msg);
    });
    mainSocket.on("clientRoomInfoInitialize", function (msg) {
        console.log("clientRoomInfoInitialize");
        console.log(msg);
        ws_getAllRooms(msg);
    });
    mainSocket.on("getOutTheRoom", function () {
        console.log("getOutTheRoom");
        ws_getOutTheRoom();
    });
    mainSocket.on("startGame", function () {
        console.log("startGame");
        ws_startGame();
    });
}