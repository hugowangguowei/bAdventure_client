/**
 * Created by wangguowei on 2001/1/11.
 */
define(function(require){
    var basicBlock = require("privateLib/basicBlock");
    function bB_roomIntro(id,x,y,w,h){
        basicBlock.call(this);
        this.id = id;
        this.type = "roomIntro";
        this.x = x||0;
        this.y = y||0;
        this.width = w||496;
        this.height = h||70;
        this.isInit = false;
        this.cacheCanvas = document.createElement("canvas");
        this.cacheOutDate = false;
        this.isPrivate = true;
        this.isFocusOn = false;
        this._roomInfo = {};
        this._leaderIntro = {};
        this._memberIntro = {};
    }

    bB_roomIntro.prototype = new basicBlock();
    bB_roomIntro.prototype.cacheRefresh = function(){
        var self = this;
        _refreshRoomIntro(self);

        function _refreshRoomIntro(self){
            var canvas = self.cacheCanvas;
            var cxt = canvas.getContext("2d");
            cxt.clearRect(0,0,canvas.width,canvas.height);

            var roomInfo = this._roomInfo;
            cxt.fillStyle = "green";
            cxt.fillRect(0,0,canvas.width,canvas.height);
            var text = self._roomInfo.roomName;
            cxt.textAlign = "center";
            cxt.fillStyle = "white";
            cxt.fillText(text,canvas.height/2,canvas.height/2 - 10,canvas.height,canvas.height);
            text = "sysID: " + self._roomInfo.serverID;
            cxt.fillText(text,canvas.height/2,canvas.height/2 + 10,canvas.height,canvas.height);

            cxt.fillStyle = "blue";
            cxt.fillRect(canvas.height,0,canvas.height,canvas.height);
            cxt.fillStyle = "white";
            text = self._leaderIntro.leaderName;
            cxt.fillText(text,canvas.height*1.5,canvas.height/2,canvas.height,canvas.height);

            cxt.fillStyle = "black";
            cxt.fillRect(canvas.height *2,0,canvas.width -2*canvas.height,canvas.height);
            cxt.fillStyle = "white";
            text = "userNum: " + self._roomInfo.roomCurMem + "/" + self._roomInfo.roomMaxMem;
            cxt.fillText(text,canvas.height *3,canvas.height/2,canvas.height,canvas.height);

            if(!self.isFocusOn){
                cxt.strokeStyle = "grey";
            }else{
                cxt.strokeStyle = "yellow";
            }

            cxt.lineWidth = 2;
            cxt.strokeRect(1,1,canvas.width -2,canvas.height -2);
        }
    }

    return bB_roomIntro;
});






















