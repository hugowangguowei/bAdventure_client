/**
 * Created by wangguowei on 2001/1/11.
 */

function createNewRoom(){
    var roomName = document.getElementById('createRoomName').value;
    var roomMemberNum = document.getElementById("roomMemNum").value;

    if(!BASIC_SOCKET){
        return 0;
    }
    BASIC_SOCKET.emit("createNewRoom",{name:roomName,memNum:roomMemberNum});
}