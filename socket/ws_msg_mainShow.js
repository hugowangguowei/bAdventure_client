/**
 * Created by wangguowei on 2001/1/11.
 */

function ws_connectSuccess(msg){
    if(msg == "ok"){
        global.GSM.switchToNext("mainShowBasicStruct");
    }
}

function ws_createNewRoom(msg){
    var mainShowLayer = global.getLayer("mainShowLayer");
    var id = getNewIdForRoomIntro();
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

function ws_roomListRefresh(msg){
    var mainShowLayer = global.getLayer("mainShowLayer");
    var os1 = global.getSpriteById("outerS");
    var ri = getRoomObjByServerId(os1,msg.roomInfo.serverID);
    if(!ri){
        ws_createNewRoom(msg);
    }
    else{
        ri._roomInfo = msg.roomInfo;
        ri._leaderIntro = msg.leaderIntro;
        ri._memberIntro = msg.memberIntro;
        ri.cacheOutDate = true;
    }
}

function ws_intoARoom(msg){
    var mainShowLayer = global.getLayer("mainShowLayer");

    buildTheQueueRoom(msg.userType);
    var os2 = global.getSpriteById("outerS2");

    var leader = msg.leaderInfo;
    var id = getNewIdForMemIntro();
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
}


function ws_getAllRooms(msg){
    for(var i = 0;i<msg.length;i++){
        ws_createNewRoom(msg[i]);
    }
}

function ws_getOutTheRoom(){
    var os2 = global.getSpriteById("outerS2");
    os2.removeAllNodes();
}

function ws_startGame(msg){
    global.GSM._startGameMsg = msg;
    global.GSM.switchToNext("gameStruct");

}




