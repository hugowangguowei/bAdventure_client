/**
 * Created by wangguowei on 2001/1/11.
 */

function BTN_E_getIntoARoom(){
    var roomID = _getChosenRoomID();
    if(!BASIC_SOCKET){
        throw new Error("no webSocket found!");
        return 0;
    }
    BASIC_SOCKET.emit("askGetIntoRoom",roomID);

    function _getChosenRoomID(){
        var os1 = global.getSpriteById("outerS");
        var roomGroup = os1.nodeList["roomIntro"];
        if(!roomGroup){
            return 0;
        }

        var rList = roomGroup.list;
        var id = 0;
        for(var i = 0;i<rList.length;i++){
            var room_i = rList[i];
            if(room_i.isFocusOn){
                id = room_i._roomInfo.serverID;
                break;
            }
        }
        return id;
    }
}

function BTN_E_startGame(){

}