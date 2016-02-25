/**
 * Created by wgw on 2016/2/23.
 */
define(function(require){
    'use strict';

    var btn_event = require('config/btn_event');
    var ID_manager = require('config/ID_Manager').getInstance();
    var baButton = require('baBasicLib/baSprites/baButton');
    var bB_roomIntro = require('privateLib/blocks/bB_roomIntro');
    var bB_memCtrl = require('privateLib/blocks/bB_memCtrl');
    var bB_memIntro = require('privateLib/blocks/bB_memIntro');
    var oS_memShow = require('privateLib/structs/oS_memShow');
    var oS_roomList = require('privateLib/structs/oS_roomList');
    var oS_roomMem = require('privateLib/structs/oS_roomMem');
    var oS_selfControl = require('privateLib/structs/oS_selfControl');


    return {
        WS_URL:'http://localHost:3000',
        msgHandleList:[
            {msgName:"system_inform",msgFunc:function(msgInfo){
                console.log(msgInfo);
            }},
            {msgName:"basicConnectReturn",msgFunc:function(msg){
                if(msg == "ok"){
                    global.GSM.switchToNext("mainShowBasicStruct");
                }
            }},
            {msgName:"roomListRefresh",msgFunc:function(msg){
                console.log("roomListRefresh");
                var mainShowLayer = global.getLayer("mainShowLayer");
                var os1 = global.getSpriteById("outerS");
                var ri = _getRoomObjByServerId(os1,msg.roomInfo.serverID);
                if(!ri){
                    _createNewRoom(msg);
                }
                else{
                    ri._roomInfo = msg.roomInfo;
                    ri._leaderIntro = msg.leaderIntro;
                    ri._memberIntro = msg.memberIntro;
                    ri.cacheOutDate = true;
                }
                function _createNewRoom(msg){
                    var mainShowLayer = global.getLayer("mainShowLayer");
                    var id = ID_manager.getNewIdForRoomIntro();
                    var ri_new = new bB_roomIntro(id);
                    ri_new._roomInfo = msg.roomInfo;
                    ri_new._leaderIntro = msg.leaderIntro;
                    ri_new._memberIntro = msg.memberIntro;

                    var os1 = global.getSpriteById("outerS");
                    if(os1){
                        os1.addNode(ri_new);
                        ri_new.addToLayer(mainShowLayer);
                    }else{
                        throw new Error("outerStruct not defined");
                    }
                }
                function _getRoomObjByServerId(os,id){
                    var group_roomIntro = os.nodeList["roomIntro"];
                    if(!group_roomIntro){
                        return 0;
                    }
                    var g_roomList = group_roomIntro.list;
                    var room_i;
                    for(var i = 0;i<g_roomList.length;i++){
                        room_i = g_roomList[i];
                        if(room_i._roomInfo.serverID ==id){
                            return room_i;
                        }
                    }
                    return 0;
                }
            }},
            {msgName:"intoARoom",msgFunc:function(msg){
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
                    var id = getNewIdForMemIntro();
                    var mI_mem = new bB_memIntro(id);
                    mI_mem._userInfo = mem_i;
                    os2.addNode(mI_mem);
                    mI_mem.addToLayer(mainShowLayer);
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
            }},
            {msgName:"clientRoomInfoInitialize",msgFunc:function(msg){
                for(var i = 0;i<msg.length;i++){
                    ws_createNewRoom(msg[i]);
                }
            }},
            {msgName:"getOutTheRoom",msgFunc:function(msg){
                var os2 = global.getSpriteById("outerS2");
                os2.removeAllNodes();
            }},
            {msgName:"startGame",msgFunc:function(msg){
                global.GSM._startGameMsg = msg;
                global.GSM.switchToNext("gameStruct");
            }}
        ]
    }
})