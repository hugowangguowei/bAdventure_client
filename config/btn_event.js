/**
 * Created by wangguowei on 2001/1/11.
 */
define(function (require) {

    var CMT = require('socket/WS_msgDefine').CMT;

    /**
     * 请求创建房间
     * @param roomInfo
     * @constructor
     */
    function BTN_E_createNewRoom(roomInfo){
        _submitMsg(CMT.CREAT_NEW_ROOM,roomInfo);
    }

    /**
     * 请求进入房间
     * @constructor
     */
    function BTN_E_getIntoARoom(){
        var roomID = _getChosenRoomID();
        _submitMsg(CMT.ASK_GET_INTO_ROOM,roomID);

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

    /**
     * 请求开始游戏
     * @constructor
     */
    function BTN_E_startGame(){
        _submitMsg(CMT.START_GAME);
    }

    /**
     * roll点
     * @constructor
     */
    function BTN_E_ROLL(){
        console.log("random Roll");
        _submitMsg(CMT.ROLL);
    }

    /**
     * 创建玩家输入框
     * @constructor
     */
    function BTN_E_CREATE_CLIENT_INPUT(){
        var inputCircle = document.getElementById("client_input_1");

        if(!inputCircle){
            var inputText = document.createElement("input");
            inputText.setAttribute("type","text");
            inputText.setAttribute("id","client_input_1");
            inputText.style.position = "absolute";

            var btnClientInput = global.getSpriteById("btn_clientInput");
            inputText.style.top = btnClientInput.y + "px";
            inputText.style.left = btnClientInput.x + "px";
            inputText.style.height = btnClientInput.height - 5 + "px";
            inputText.style.width = btnClientInput.width -5 + "px";
            inputText.style.zIndex = 200;
            global.baseDiv.appendChild(inputText);
            inputText.focus();
        }else{
            inputCircle.value = "";
            inputCircle.focus();

        }
    }

    /**
     * 玩家输入信息提交
     * @constructor
     */
    function BTN_E_CLIENT_SUBMIT(){
        var input = document.getElementById("client_input_1");
        var value = input.value;
        if(value == ""){
            return 0;
            console.log("输入了空白信息");
        }else{
            console.log("准备输入信息" + CMT.CLIENT_SUBMIT);
            _submitMsg(CMT.CLIENT_SUBMIT,value);
            //_submitMsg("test");
        }
    }

    /**
     * 向服务器提交请求
     * @param msgName
     * @param msgDetail
     * @private
     */
    function _submitMsg(msgName,msgDetail){
        var msgName = msgName||"default";
        var msgDetail = msgDetail||"";

        var socket = global.WSM.webSocket;
        try{
            socket.emit(msgName,msgDetail);
        }catch(e){
            throw new Error(e.name);
        }

    }

    return{
        BTN_E_createNewRoom : function(){ return BTN_E_createNewRoom },
        BTN_E_getIntoARoom : function(){ return BTN_E_getIntoARoom },
        BTN_E_startGame : function(){ return BTN_E_startGame },
        BTN_E_ROLL : function(){ return BTN_E_ROLL },
        BTN_E_CREATE_CLIENT_INPUT : function(){ return BTN_E_CREATE_CLIENT_INPUT },
        BTN_E_CLIENT_SUBMIT : function(){ return BTN_E_CLIENT_SUBMIT }
    }
})



