/**
 * Created by wgw on 2016/2/10.
 */

function GSM_gameStruct(_this){

    global.hideAllLayer();
    var gameLayer = global.addLayer("gameStructLayer",121);
    gameLayer.startMachine(24);

    var msg = _this._startGameMsg;
    switch (msg.playerType){
        case "leader":
            _buildLeaderStruct();
            break;
        case "normal":
            _buildNormalStruct();
            break;
    }

    function _buildLeaderStruct(){
        var bg = new baSprite("bg",0,0,gameLayer.canvas.width,gameLayer.canvas.height,false);
        bg.addToLayer(gameLayer);
        bg.draw = function (canvas) {
            var cxt = canvas.getContext("2d");
            cxt.fillStyle = "grey";
            cxt.fillRect(this.x,this.y,this.width,this.height);
        }

        //消息展示框========================================================================================================
        var os_ms = new outerStruct("os_msgShow",
            GAME_STRUCT_CLIENT_MSG_SHOW_X,
            GAME_STRUCT_CLIENT_MSG_SHOW_Y,
            GAME_STRUCT_CLIENT_MSG_SHOW_W,
            GAME_STRUCT_CLIENT_MSG_SHOW_H,
            false);
        os_ms.addToLayer(gameLayer);
        var textST = new textBlock("textShowTag",
            os_ms.showWindowConfig.x,
            os_ms.showWindowConfig.y,
            os_ms.showWindowConfig.w - 6,
            os_ms.showWindowConfig.h - 6);
        textST.addToLayer(gameLayer);

        //自控框============================================================================================================
        var os_sc = new oS_selfControl("os_sc",
            GAME_STRUCT_CLIENT_SELF_CONTROL_X,
            GAME_STRUCT_CLIENT_SELF_CONTROL_Y,
            GAME_STRUCT_CLIENT_SELF_CONTROL_W,
            GAME_STRUCT_CLIENT_SELF_CONTROL_H,
            false);
        os_sc.addToLayer(gameLayer);

        var btn_1 = new baButton("btn_roll");
        var locInfo = {
            x:os_sc.x+10,
            y:os_sc.y+5,
            width:40,
            height:40
        }
        btn_1.setLoc(locInfo);
        btn_1.bindEvent(BTN_E_ROLL);
        btn_1.upStateInfo.text = "roll";
        btn_1.addToLayer(gameLayer);

        var btn_clientInput = new baButton("btn_clientInput");
        var locInfo = {
            x:os_sc.x+10,
            y:os_sc.y+100,
            width:630,
            height:40
        }
        btn_clientInput.setLoc(locInfo);
        btn_clientInput.bindEvent(BTN_E_CLIENT_INPUT);
        btn_clientInput.upStateInfo.text = "pleaseInsert";
        btn_clientInput.addToLayer(gameLayer);

        var btn_clientSubmit = new baButton("btn_clientSubmit");
        var locInfo = {
            x:os_sc.x + 650,
            y:os_sc.y + 100,
            width:40,
            height:40
        }
        btn_clientSubmit.setLoc(locInfo);
        btn_clientSubmit.bindEvent(BTN_E_CLIENT_SUBMIT);
        btn_clientSubmit.upStateInfo.text = "commit";
        btn_clientSubmit.addToLayer(gameLayer);

        //成员列表==========================================================================================================
        var os_memShow = new oS_memShow("os_memS",
            GAME_STRUCT_CLIENT_MEM_LIST_X,
            GAME_STRUCT_CLIENT_MEM_LIST_Y,
            GAME_STRUCT_CLIENT_MEM_LIST_W,
            GAME_STRUCT_CLIENT_MEM_LIST_H,
            false);
        os_memShow.addToLayer(gameLayer);
        _buildMemList(msg,os_memShow);
    }

    function _buildNormalStruct(){
        var bg = new baSprite("bg",0,0,gameLayer.canvas.width,gameLayer.canvas.height,false);
        bg.addToLayer(gameLayer);
        bg.draw = function (canvas) {
            var cxt = canvas.getContext("2d");
            cxt.fillStyle = "grey";
            cxt.fillRect(this.x,this.y,this.width,this.height);
        }

        //消息展示框========================================================================================================
        var os_ms = new outerStruct("os_msgShow",
            GAME_STRUCT_CLIENT_MSG_SHOW_X,
            GAME_STRUCT_CLIENT_MSG_SHOW_Y,
            GAME_STRUCT_CLIENT_MSG_SHOW_W,
            GAME_STRUCT_CLIENT_MSG_SHOW_H,
            false);
        os_ms.addToLayer(gameLayer);
        var textST = new textBlock("textShowTag",
            os_ms.showWindowConfig.x,
            os_ms.showWindowConfig.y,
            os_ms.showWindowConfig.w - 6,
            os_ms.showWindowConfig.h - 6);
        textST.addToLayer(gameLayer);

        //自控框============================================================================================================
        var os_sc = new oS_selfControl("os_sc",
            GAME_STRUCT_CLIENT_SELF_CONTROL_X,
            GAME_STRUCT_CLIENT_SELF_CONTROL_Y,
            GAME_STRUCT_CLIENT_SELF_CONTROL_W,
            GAME_STRUCT_CLIENT_SELF_CONTROL_H,
            false);
        os_sc.addToLayer(gameLayer);

        var btn_1 = new baButton("btn_roll");
        var locInfo = {
            x:os_sc.x+10,
            y:os_sc.y+5,
            width:40,
            height:40
        }
        btn_1.setLoc(locInfo);
        btn_1.bindEvent(BTN_E_ROLL);
        btn_1.upStateInfo.text = "roll";
        btn_1.addToLayer(gameLayer);

        var btn_clientInput = new baButton("btn_clientInput");
        var locInfo = {
            x:os_sc.x+10,
            y:os_sc.y+100,
            width:630,
            height:40
        }
        btn_clientInput.setLoc(locInfo);
        btn_clientInput.bindEvent(BTN_E_CLIENT_INPUT);
        btn_clientInput.upStateInfo.text = "pleaseInsert";
        btn_clientInput.addToLayer(gameLayer);

        var btn_clientSubmit = new baButton("btn_clientSubmit");
        var locInfo = {
            x:os_sc.x + 650,
            y:os_sc.y + 100,
            width:40,
            height:40
        }
        btn_clientSubmit.setLoc(locInfo);
        btn_clientSubmit.bindEvent(BTN_E_CLIENT_SUBMIT);
        btn_clientSubmit.upStateInfo.text = "commit";
        btn_clientSubmit.addToLayer(gameLayer);

        //成员列表==========================================================================================================
        var os_memShow = new oS_memShow("os_memS",
            GAME_STRUCT_CLIENT_MEM_LIST_X,
            GAME_STRUCT_CLIENT_MEM_LIST_Y,
            GAME_STRUCT_CLIENT_MEM_LIST_W,
            GAME_STRUCT_CLIENT_MEM_LIST_H,
            false);
        os_memShow.addToLayer(gameLayer);
        _buildMemList(msg,os_memShow);
    }

    function _buildMemList(msg,os){
        //当前版本中，传入信息仅包括mem信息
        var msg_i;
        var memMsg = msg.mem;
        for(var i = 0;i<memMsg.length;i++){
            msg_i = memMsg[i];
            var id = getNewIdForMemPlayer();
            var memCtrl_i = new bB_memCtrl(id);
            memCtrl_i.name = msg_i.name;
            memCtrl_i.serverId = msg_i.serverId;
            memCtrl_i.level = msg_i.level;
            os.addNode(memCtrl_i);
            memCtrl_i.addToLayer(gameLayer);
        }
    }


}