/**
 * Created by wgw on 2016/2/23.
 */
define(function(require){
    'use strict';

    var SMT = require('socket/WS_msgDefine').SMT;
    var listenerType = require('baBasicLib/view/ViewConfig').listenerType;
    var ID_manager = require('config/ID_Manager').getInstance();
    var RoomIntroTag = require('privateLib/model/RoomIntroTag');

    function _createNewRoom(msg){
        var id = ID_manager.getNewIdForRoomIntro();
        var mainShowScene = global.getScene("mainShowScene");
        var rContainer = mainShowScene.getChildById("rContainer");
        var ri_new = new RoomIntroTag(id,mainShowScene,rContainer);
        ri_new._roomInfo = msg.roomInfo;
        ri_new._leaderIntro = msg.leaderIntro;
        ri_new._memberIntro = msg.memberIntro;
        global.fireEvent(listenerType.ADD_ROOM_INTRO_TAG,ri_new);
    }
    function _refreshRoom(room,msg){
        room._roomInfo = msg.roomInfo;
        room._leaderIntro = msg.leaderIntro;
        room._memberIntro = msg.memberIntro;
        global.fireEvent(listenerType.REFRESH_ROOM_INTRO_TAG,room);
    }
    function _buildTheQueueRoom(userType){
        var mainShowLayer = global.getLayer("mainShowLayer");
        var os2;
        os2 = global.getSpriteById("outerS2");
        if(os2){
            os2.removeAllNodes();
        }else{
            os2 = new oS_roomMem("outerS2",300,500,600,100,false);
            os2.addToLayer(mainShowLayer);
        }

        switch (userType){
            case "leader":
                _buildLeaderBtns();
                break;
            case "normalMem":
                _buildNormalBtns();
                break;
        }

        function _buildLeaderBtns(){
            var btn1 = new baButton("btn_mS_cancelRoom");
            var btn1Loc = {
                x:os2.x,
                y:os2.y + os2.height,
                width:os2.width/5,
                height:40
            }
            btn1.setLoc(btn1Loc);
            btn1.upStateInfo.text = 'cancelRoom';
            btn1.addToLayer(mainShowLayer);
            os2.addNode(btn1);

            var btn2 = new baButton("btn_mS_kickOut");
            var btn2Loc = {
                x:os2.x + os2.width/2 - os2.width/10,
                y:os2.y + os2.height,
                width:os2.width/5,
                height:40
            }
            btn2.setLoc(btn2Loc);
            btn2.upStateInfo.text = 'kickOut';
            btn2.addToLayer(mainShowLayer);
            os2.addNode(btn2);

            var btn3 = new baButton("btn_mS_startGame");
            var btn3Loc = {
                x:os2.x + os2.width - os2.width/5,
                y:os2.y + os2.height,
                width:os2.width/5,
                height:40
            }
            btn3.setLoc(btn3Loc);
            btn3.upStateInfo.text = 'startGame';
            btn3.addToLayer(mainShowLayer);
            btn3.bindEvent(btn_event.BTN_E_startGame());
            os2.addNode(btn3);
        }

        function _buildNormalBtns(){
            var btn1 = new baButton("btn_mS_quitRoom");
            var btn1Loc = {
                x:os2.x,
                y:os2.y + os2.height,
                width:os2.width/5,
                height:40
            }
            btn1.setLoc(btn1Loc);
            btn1.upStateInfo.text = 'quitRoom';
            btn1.addToLayer(mainShowLayer);
            os2.addNode(btn1);

            var btn3 = new baButton("btn_mS_readyGame");
            var btn3Loc = {
                x:os2.x + os2.width - os2.width/5,
                y:os2.y + os2.height,
                width:os2.width/5,
                height:40
            }
            btn3.setLoc(btn3Loc);
            btn3.upStateInfo.text = 'readyGame';
            btn3.addToLayer(mainShowLayer);
            os2.addNode(btn3);
        }
    }
    return {
        WS_URL:'http://localHost:3000',
        msgHandleList:[
            {msgName:SMT.SYSTEM_INFORM,msgFunc:function(msgInfo){
                console.log(msgInfo);
            }},
            {msgName:SMT.BASIC_CONNECT_RETURN,msgFunc:function(msg){
                if(msg == "ok"){
                    global.GSM.switchToNext("mainShowBasicStruct");
                }
            }},
            {msgName:SMT.ROOM_LIST_REFRESH,msgFunc:function(msgFuck){
                console.log("haha");
                //var mainShowScene = global.getScene("mainShowScene");
                //var rContainer = mainShowScene.getChildById("rContainer");
                //var ri = rContainer.getRoomIntroTagByServerID(msg.roomInfo.serverID);
                //if(!ri){
                //    _createNewRoom(msg);
                //}
                //else{
                //    _refreshRoom(ri,msg);
                //}
            }},
            {msgName:SMT.INTO_A_ROOM,msgFunc:function(msg){
                var mainShowLayer = global.getLayer("mainShowLayer");

                _buildTheQueueRoom(msg.userType);
                var os2 = global.getSpriteById("outerS2");

                var leader = msg.leaderInfo;
                var id = ID_manager.getNewIdForMemIntro();
                var mI_leader = new bB_memIntro(id);
                mI_leader._userInfo = leader;
                os2.addNode(mI_leader);
                mI_leader.addToLayer(mainShowLayer);

                var memInfo = msg.memInfo;
                for(var i = 0;i<memInfo.length;i++){
                    var mem_i = memInfo[i];
                    var id = ID_manager.getNewIdForMemIntro();
                    var mI_mem = new bB_memIntro(id);
                    mI_mem._userInfo = mem_i;
                    os2.addNode(mI_mem);
                    mI_mem.addToLayer(mainShowLayer);
                }


            }},
            {msgName:SMT.CLIENT_ROOM_INFO_INITIALIZE,msgFunc:function(msg){
                for(var i = 0;i<msg.length;i++){
                    _createNewRoom(msg[i]);
                }
            }},
            {msgName:SMT.GET_OUT_THE_QUEUE,msgFunc:function(msg){
                var os2 = global.getSpriteById("outerS2");
                os2.removeAllNodes();
            }},
            {msgName:SMT.GET_OUT_THE_GAME,msgFunc:function(msg){
                //TODO
            }},
            {msgName:SMT.START_GAME,msgFunc:function(msg){
                global.GSM._startGameMsg = msg;
                global.GSM.switchToNext("gameStruct");
            }},
            {msgName:SMT.CLIENT_MSG_DISTRIBUTE,msgFunc:function(msg){
                var textB = global.getSpriteById("textShowTag");
                if(textB){
                    textB.addText(msg);
                }
            }},
            {msgName:SMT.ROOM_DELETE,msgFunc:function(msg){
            }},
            {msgName:"test",msgFunc:function(msg){
                console.log(msg);
            }}
        ]
    }
})