/**
 * Created by wgw on 2016/2/27.
 */
define(function(require){

    /**
     * 客户端发送信息名称
     * @constructor
     */
    function CLIENT_MSG_TYPE(){
        this.DISCONNECT = 'disconnect',
        this.BASIC_CONNECT = 'basicConnect',
        this.DEBUG = 'debug',
        this.START_GAME = 'startGame',
        this.JOIN_GAME = 'joinGame',
        this.GAME_INPUT = 'gameInput'
    }

    /**
     * 服务端接收消息名称
     * @constructor
     */
    function SERVER_MSG_TYPE(){
        this.SYSTEM_INFORM = "system_inform";
        this.BASIC_CONNECT_RETURN = "basicConnectReturn";
        this.GAME_INFO = 'gameInfo';
        this.GAME_SYN = 'gameSyn';
    }

    return {
        CMT:new CLIENT_MSG_TYPE(),
        SMT:new SERVER_MSG_TYPE()
    }
});