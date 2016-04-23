/**
 * Created by wgw on 2016/2/19.
 */

define(function(require){
    "use strict";
    
    var io = require('dep/socket.io');

    var instance = null;

    var WSManager = function(global,WS_config,WS_msgDefine){
        if(!global){
            throw new Error("wsManager must depend on a global");
            return 0;
        }
        this.global = global;
        this.webSocket = null;
        this.msgHandleList = [];
        this.clientInfo = {};
        this.initialize(WS_config,WS_msgDefine);
    }

    WSManager.prototype = {
        initialize:function(WS_CONFIG,WS_msgDefine){
            this.global.WSM = this;
            //建立连接
            var url = WS_CONFIG.WS_URL;
            this.webSocket = io.connect(url);
            //添加自定义事件
            this.msgHandleList = WS_CONFIG.msgHandleList;
            for(var i = 0;i < this.msgHandleList.length;i++ ){
                var msgHandle_i = this.msgHandleList[i];
                this.webSocket.on(msgHandle_i.msgName,msgHandle_i.msgFunc);
            }
            instance = this;
        },
        getClientInfo:function(){
            //TODO 临时使用随机用户
            var userName = "user_" + Math.random();
            this.clientInfo.userName = userName;
            return this.clientInfo;
        },
        connectToServer:function(){
            var clientInfo = this.getClientInfo();
            this.webSocket.emit("basicConnect",clientInfo);
        },
        disConnect:function(){
        }
    }

    return {
        getInstance:function(global,config,msgDefine){
            if(!instance){
                instance = new WSManager(global,config,msgDefine);
            }
            return instance;
        }
    }

});