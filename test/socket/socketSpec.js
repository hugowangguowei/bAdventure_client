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
    require(['socket/WS_Manager','config/btn_event'],
        function(wsManager,btn_event){
            var roomName = document.getElementById('createRoomName').value;
            var roomMemberNum = document.getElementById("roomMemNum").value;
            var msg = {name:roomName,memNum:roomMemberNum};
            btn_event.BTN_E_createNewRoom()(msg);
        });
}