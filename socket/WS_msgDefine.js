/**
 * Created by wgw on 2016/2/27.
 */
define(function(require){

    /**
     * �ͻ��˷�����Ϣ����
     * @constructor
     */
    function CLIENT_MSG_TYPE(){
        this.CREAT_NEW_ROOM = 'createNewRoom';
        this.ASK_GET_INTO_ROOM = 'askGetIntoRoom';
        this.START_GAME = 'startGame';
        this.CLIENT_SUBMIT = 'clientSubmit';
        this.ROLL = 'roll';
    }

    /**
     * ����˽�����Ϣ����
     * @constructor
     */
    function SERVER_MSG_TYPE(){
        this.SYSTEM_INFORM = "system_inform";
        this.BASIC_CONNECT_RETURN = "basicConnectReturn";
        this.ROOM_LIST_REFRESH = 'roomListRefresh';
        this.INTO_A_ROOM = 'intoARoom';
        this.CLIENT_ROOM_INFO_INITIALIZE = 'clientRoomInfoInitialize';
        this.GET_OUT_THE_ROOM = 'getOutTheRoom';
        this.START_GAME = 'startGame';
        this.CLIENT_MSG_DISTRIBUTE = 'clientMsgDistribute';
    }

    return {
        CMT:new CLIENT_MSG_TYPE(),
        SMT:new SERVER_MSG_TYPE()
    }
});