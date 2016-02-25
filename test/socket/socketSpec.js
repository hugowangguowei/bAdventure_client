/**
 * Created by wgw on 2016/2/24.
 */

/**
 * ���ӷ�����
 */
function connectToServer(){
    require(['socket/WS_Manager'],
        function(wsManager){
            var WSM = wsManager.getInstance(global);
            WSM.connectToServer();
    });
}

/**
 * ��������
 */
function createNewRoom(){
    require(['socket/WS_Manager'],
        function(wsManager){
            console.log("haha");
            var roomName = document.getElementById('createRoomName').value;
            var roomMemberNum = document.getElementById("roomMemNum").value;
            var WSM = wsManager.getInstance();
            var socket = WSM.webSocket;
            if(socket){
                socket.emit("createNewRoom",{name:roomName,memNum:roomMemberNum});
            }
        });
}