/**
 * Created by wgw on 2016/2/19.
 */

define(function(require){
    "use strict";

    var WS_CONFIG = require('socket/WS_Config');
    var io = require('dep/socket.io');

    var instance = null;

    var WSManager = function(){
        this.isConnected = false;
        this.webSocket = null;
        this.msgHandleList = [];
        this.clientInfo = {};
        this.initialize();
    }

    WSManager.prototype = {
        initialize:function(){
            //建立连接
            var url = WS_CONFIG.WS_URL;
            this.webSocket = io.connect(url);
            //添加自定义事件
            this.msgHandleList = WS_CONFIG.msgHandleList;
            for(var i = 0;i < this.msgHandleList.length;i++ ){
                var msgHandle_i = this.msgHandleList[i];
                this.webSocket.on(msgHandle_i.msgName,msgHandle_i.msgFunc);
            }
        },
        getClientInfo:function(){
            var userName = document.getElementById("userNameInput").value + "aaSss";
            this.clientInfo.userName = userName;
            return this.clientInfo;
        },
        connectToServer:function(){
            if(this.isConnected){
                return 0;
            }
            var clientInfo = this.getClientInfo();
            this.webSocket.emit("basicConnect",clientInfo);
        },
        disConnect:function(){
        }
    }

    return {
        getInstance:function(){
            if(!instance){
                instance = new WSManager();
            }
            return instance;
        }
    }

});