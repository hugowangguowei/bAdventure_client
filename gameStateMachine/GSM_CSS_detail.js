/**
 * Created by wgw on 2016/3/15.
 */
/**
 * Created by wangguowei on 2001/1/11.
 */

define(function(require){

        var baScene = require('baBasicLib/model/baScene');
        var btn_event = require('config/btn_event');
        var ID_Manager = require('config/ID_Manager').getInstance();
        var baNode = require("baBasicLib/model/baNode");
        var MemIntroTag = require("privateLib/model/MemIntroTag");
        var MemIntroTagContainer = require("privateLib/model/MemIntroTagContainer");
        var RoomIntroTag = require("privateLib/model/RoomIntroTag");
        var RoomIntroTagContainer = require("privateLib/model/RoomIntroTagContainer");

        var viewConfig = require('baBasicLib/view/ViewConfig');
        var listenerType = viewConfig.listenerType;

        /**
         * 游戏资源加载画面
         * @param _this
         * @constructor
         */
        function GSM_gameLoading(_this){
            _this.obj.fireEvent(listenerType.SCENE_CHANGE,"gameLoading");
            imageArray = [
                {imageName:"aa",src:"images/1.png"},
                {imageName:"bb",src:"images/2.png"}
            ]
            var imageNum = imageArray.length;
            for(var i = 0;i<imageArray.length;i++){
                var image_i = imageArray[i];
                eval(image_i.imageName +"= new Image();");
                eval(image_i.imageName +".src = '" + image_i.src + "';");
                eval(image_i.imageName +".addEventListener('load',show,false);");
            }
            var count = 0;
            function show(){
                count++;
                var percent = count/imageNum;
                _this.obj.fireEvent("loadingProcess",percent);
                if(count >= imageArray.length){
                    console.log("finishLoading");
                    _this.switchToNext("mainShow");
                }
            }
        }
        /**
         * 游戏主界面
         * @param _this
         * @constructor
         */
        function GSM_gameStruct(_this){

            global.hideAllLayer();
            var gameLayer = new baLayer("gameStructLayer",121);
            global.addLayer(gameLayer);
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
                    oS_config.CLIENT_MSG_SHOW_X,
                    oS_config.CLIENT_MSG_SHOW_Y,
                    oS_config.CLIENT_MSG_SHOW_W,
                    oS_config.CLIENT_MSG_SHOW_H,
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
                    oS_config.CLIENT_SELF_CONTROL_X,
                    oS_config.CLIENT_SELF_CONTROL_Y,
                    oS_config.CLIENT_SELF_CONTROL_W,
                    oS_config.CLIENT_SELF_CONTROL_H,
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
                btn_1.bindEvent(btn_event.BTN_E_ROLL());
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
                btn_clientInput.bindEvent(btn_event.BTN_E_CREATE_CLIENT_INPUT());
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
                btn_clientSubmit.bindEvent(btn_event.BTN_E_CLIENT_SUBMIT());
                btn_clientSubmit.upStateInfo.text = "commit";
                btn_clientSubmit.addToLayer(gameLayer);

                //成员列表==========================================================================================================
                var os_memShow = new oS_memShow("os_memS",
                    oS_config.CLIENT_MEM_LIST_X,
                    oS_config.CLIENT_MEM_LIST_Y,
                    oS_config.CLIENT_MEM_LIST_W,
                    oS_config.CLIENT_MEM_LIST_H,
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
                    oS_config.CLIENT_MSG_SHOW_X,
                    oS_config.CLIENT_MSG_SHOW_Y,
                    oS_config.CLIENT_MSG_SHOW_W,
                    oS_config.CLIENT_MSG_SHOW_H,
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
                    oS_config.CLIENT_SELF_CONTROL_X,
                    oS_config.CLIENT_SELF_CONTROL_Y,
                    oS_config.CLIENT_SELF_CONTROL_W,
                    oS_config.CLIENT_SELF_CONTROL_H,
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
                btn_1.bindEvent(btn_event.BTN_E_ROLL());
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
                btn_clientInput.bindEvent(btn_event.BTN_E_CREATE_CLIENT_INPUT());
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
                btn_clientSubmit.bindEvent(btn_event.BTN_E_CLIENT_SUBMIT());
                btn_clientSubmit.upStateInfo.text = "commit";
                btn_clientSubmit.addToLayer(gameLayer);

                //成员列表==========================================================================================================
                var os_memShow = new oS_memShow("os_memS",
                    oS_config.CLIENT_MEM_LIST_X,
                    oS_config.CLIENT_MEM_LIST_Y,
                    oS_config.CLIENT_MEM_LIST_W,
                    oS_config.CLIENT_MEM_LIST_H,
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
                    var id = ID_Manager.getNewIdForMemPlayer();
                    var memCtrl_i = new bB_memCtrl(id);
                    memCtrl_i.name = msg_i.name;
                    memCtrl_i.serverId = msg_i.serverId;
                    memCtrl_i.level = msg_i.level;
                    os.addNode(memCtrl_i);
                    memCtrl_i.addToLayer(gameLayer);
                }
            }
        }
        /**
         * 游戏初始化界面
         * @param _this
         * @returns {number}
         * @constructor
         */
        function GSM_mainShow(_this){
            var scene_mainShow = new baScene("mainShowScene",_this.obj);
            var rContainer = new RoomIntroTagContainer("rContainer",scene_mainShow);
            var mContainer = new MemIntroTagContainer("mContainer",scene_mainShow);
            _this.obj.fireEvent(listenerType.SCENE_CHANGE,"mainShow");
        }
        /**
         * 房间列表画面
         * @param _this
         * @constructor
         */
        function GSM_mainShowBasicStruct(_this){
            _this.obj.fireEvent(listenerType.SCENE_CHANGE,"mainShowBasicStruct");
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
