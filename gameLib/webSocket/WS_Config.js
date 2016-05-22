/**
 * Created by wgw on 2016/2/23.
 */
define(function(require){
    'use strict';

    var SMT = require('gameLib/webSocket/WS_msgDefine').SMT;

    return {
        WS_URL:'http://localHost:3002',
        msgHandleList:[
            {msgName:SMT.SYSTEM_INFORM,msgFunc:function(msgInfo){
                console.log(msgInfo);
            }},
            {msgName:SMT.BASIC_CONNECT_RETURN,msgFunc:function(msg){
                if(msg == "ok"){
                }
            }},
            {msgName:"event_msg",msgFunc:function(msg){
                //console.log(msg);
                gm.input(msg[0],msg[1]);
            }},
            {msgName:"test",msgFunc:function(msg){
                console.log(msg);
            }}
        ]
    }
})