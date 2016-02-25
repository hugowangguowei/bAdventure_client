/**
 * Created by wangguowei on 2001/1/11.
 */
define(function (require) {
    var WS_Manager = require('socket/WS_Manager');

    function BTN_E_getIntoARoom(){
        var roomID = _getChosenRoomID();
        var socket = WS_Manager.getInstance().webSocket;
        //var socket = getCurrentSocket();
        if(socket){
            socket.emit("askGetIntoRoom",roomID);
        }

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

    }

    function BTN_E_CLIENT_INPUT(){
        var inputText = document.createElement("input");
        inputText.setAttribute("type","text");
        inputText.setAttribute("id","client_input_1");
        inputText.style.position = "absolute";

        var btnClientInput = global.getSpriteById("btn_clientInput");
        inputText.style.top = btnClientInput.y + "px";
        inputText.style.left = btnClientInput.x + "px";
        inputText.style.height = btnClientInput.height - 5 + "px";
        inputText.style.width = btnClientInput.width -5 + "px";
        inputText.style.zIndex = 130;
        global.baseDiv.appendChild(inputText);
        inputText.focus();
    }

    function BTN_E_CLIENT_SUBMIT(){
        var input = document.getElementById("client_input_1");
        var value = input.value;

    }

    return{
        BTN_E_getIntoARoom : function(){ return BTN_E_getIntoARoom },
        BTN_E_startGame : function(){ return BTN_E_startGame },
        BTN_E_ROLL : function(){ return BTN_E_ROLL },
        BTN_E_CLIENT_INPUT : function(){ return BTN_E_CLIENT_INPUT },
        BTN_E_CLIENT_SUBMIT : function(){ return BTN_E_CLIENT_SUBMIT }
    }

})



