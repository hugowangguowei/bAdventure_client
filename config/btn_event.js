/**
 * Created by wangguowei on 2001/1/11.
 */

function BTN_E_getIntoARoom(){
    var roomID = _getChosenRoomID();
    var socket = getCurrentSocket();
    if(socket){
        socket.emit("askGetIntoRoom",roomID);
    }
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
    var socket = getCurrentSocket();
    if(socket){
        socket.emit("startGame");
    }
}

/**
 * roll
 * @constructor
 */
function BTN_E_ROLL(){
    console.log("random Roll");
    var inputText = document.createElement("input");
    inputText.setAttribute("type","text");
    inputText.style.position = "absolute";

    var btnRoll = global.getSpriteById("btn_roll");
    console.log(btnRoll.x);
    console.log(btnRoll.y);
    inputText.style.top = btnRoll.y + "px";
    inputText.style.left = btnRoll.x + "px";
    inputText.style.zIndex = 130;
    global.baseDiv.appendChild(inputText);
    inputText.focus();

}