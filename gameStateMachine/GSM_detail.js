/**
 * Created by wangguowei on 2001/1/11.
 */

define(function(require){

        var baLayer = require('baBasicLib/baLayer');
        var baSprite = require('baBasicLib/baSprite');
        var baButton = require('baBasicLib/baSprites/baButton');
        var oS_roomList = require('privateLib/structs/oS_roomList');
        var btn_event = require('config/btn_event');

        function GSM_gameLoading(_this){
            var ldLayer = new baLayer("loadingLayer",120);
            global.addLayer(ldLayer);

            var cxt = ldLayer.canvas.getContext("2d");
            imageArray = [
                {imageName:"aa",src:"images/1.png"},
                {imageName:"bb",src:"images/2.png"}
            ]

            var imageNum = imageArray.length;
            var count = 0;
            var loadResource = {
                length:700,
                height:20,
                positionX:350,
                positionY:500
            };

            cxt.beginPath();
            cxt.strokeRect(loadResource.positionX,loadResource.positionY,loadResource.length,loadResource.height);
            cxt.stroke();
            for(var i = 0;i<imageArray.length;i++){
                var image_i = imageArray[i];
                eval(image_i.imageName +"= new Image();");
                eval(image_i.imageName +".src = '" + image_i.src + "';");
                eval(image_i.imageName +".addEventListener('load',show,false);");
            }
            console.log("finish");
            function show(){
                count++;
                var percent = count/imageNum;
                cxt.fillStyle = "blue";

                cxt.beginPath();
                cxt.clearRect(loadResource.positionX + loadResource.length + 1,
                    loadResource.positionY,50,20);
                cxt.fillRect(loadResource.positionX,loadResource.positionY,percent * loadResource.length,loadResource.height);
                cxt.font = "25px Arial";
                cxt.fillText(percent.toString(),loadResource.positionX + loadResource.length,
                    loadResource.positionY + loadResource.height);
                cxt.stroke();

                if(count >= imageArray.length){
                    console.log("finish loading");
                    _this.switchToNext("mainShow");
                }
            }
        }
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
        function GSM_mainShow(_this){
            global.hideAllLayer();
            if(global.getLayer("loadingLayer")){
                global.removeLayer("loadingLayer");
            }
            if(global.getLayer("mainShowLayer")){
                var mainShowLayer = global.getLayer("mainShowLayer");
                mainShowLayer.state = "show";
                return 0;
            }
            var mainShowLayer = new baLayer("mainShowLayer",120);
            global.addLayer(mainShowLayer);
            mainShowLayer.startMachine(60);

            var bg = new baSprite("bg",0,0,mainShowLayer.canvas.width,mainShowLayer.canvas.height,false);
            bg.addToLayer(mainShowLayer);
            bg.draw = function (canvas) {
                var cxt = canvas.getContext("2d");
                cxt.fillStyle = "grey";
                cxt.fillRect(this.x,this.y,this.width,this.height);
            }

            var singleProBtn = new baButton("singleProBtn",500,200,200,100,true);
            singleProBtn.upStateInfo.text = "connect Server";
            singleProBtn.addToLayer(mainShowLayer);
        }
        function GSM_mainShowBasicStruct(_this){
            _this.privateState.mainSHowBBSOn = true;
            var mainShowLayer = global.getLayer("mainShowLayer");
            var singleProBtn = mainShowLayer.getChildById("singleProBtn");
            mainShowLayer.removeChild(singleProBtn);

            var os_1 = new oS_roomList("outerS",300,50,600,350,false);
            os_1.addToLayer(mainShowLayer);

            var btn1 = new baButton("btn_mS_buildRoom");
            var btn1_loc = {
                x:os_1.x,
                y:os_1.y + os_1.height,
                width:os_1.width/4,
                height:50
            }
            btn1.setLoc(btn1_loc);
            btn1.upStateInfo.text = "buildRoom";
            btn1.addToLayer(mainShowLayer);
            os_1.addNode(btn1);

            var btn2 = new baButton("btn_mS_pickRoom");
            var btn2_loc = {
                x:os_1.x + os_1.width/2 - os_1.width/8,
                y:os_1.y + os_1.height,
                width:os_1.width/4,
                height:50
            }
            btn2.setLoc(btn2_loc);
            btn2.upStateInfo.text = "pickRoom";
            btn2.addToLayer(mainShowLayer);
            os_1.addNode(btn2);
            btn2.bindedEvent = btn_event.BTN_E_getIntoARoom();

            var btn3 = new baButton("btn_mS_randomRoom");
            var btn3_loc = {
                x:os_1.x + os_1.width - os_1.width/4,
                y:os_1.y + os_1.height,
                width:os_1.width/4,
                height:50
            }
            btn3.setLoc(btn3_loc);
            btn3.upStateInfo.text = "buildRoom";
            btn3.addToLayer(mainShowLayer);
            os_1.addNode(btn3);

            _this.doMouseWheel = function (event) {
                var delta_y = event.deltaY;
                var os_1 = global.getSpriteById("outerS");
                os_1.onMouseWheel(delta_y);
            }
        }

        return {
            gameLoading:function(){
                return GSM_gameLoading;
            },
            gameStruct:function(){
                return GSM_gameStruct;
            },
            mainShow:function(){
                return GSM_mainShow;
            },
            mainShowBasicStruct:function(){
                return GSM_mainShowBasicStruct;
            }
        }
    }
)
