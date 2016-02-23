/**
 * Created by wgw on 2016/2/23.
 */
define(function(){
    'use strict';
    var wsConfig = function(){
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
                }}
            ]
        }

    }
    return wsConfig();
})