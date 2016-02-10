/**
 * Created by wangguowei on 2001/1/11.
 */

var BASIC_SOCKET = 0;

function getCurrentSocket(){
    if(!BASIC_SOCKET){
        throw new Error("web socket not defined yet");
        return 0;
    }
    return BASIC_SOCKET;
}

function setCurrentSocket(socket){
    BASIC_SOCKET = socket;
}
var BASIC_SOCKET = 0;
