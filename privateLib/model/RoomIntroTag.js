/**
 * Created by wgw on 2016/4/4.
 */
define(function(require){
    var baNode = require("baBasicLib/model/baNode");
    var ID_Manager = require("config/ID_Manager").getInstance();
    function RoomIntroTag(id,scene,container){
        baNode.call(this);
        this.id = id;
        this.serverID = null;
        this.viewID = ID_Manager.getNewIdForRoomIntroView();
        this.type = "RoomIntroTag";
        this.scene = scene;
        this.container = container
        this._roomInfo = {};
        this._leaderIntro = {};
        this._memberIntro = {};
    };
    RoomIntroTag.prototype = new baNode();
    RoomIntroTag.prototype.initialize = function(){
        if(this.scene){
            this.scene.addChild(this);
        }
        if(this.container){
            this.addToContainer(this.container);
        }
    }
    RoomIntroTag.prototype.addToContainer = function(){
        this.container.addRoomIntroTag(this);
    }
    RoomIntroTag.prototype.updateToContainer = function(){
        this.container.updateRoomIntroTag(this);
    }
    RoomIntroTag.prototype.removeFromContainer = function(){
        this.container.removeRoomIntroTag(this);
    }

    return RoomIntroTag;
});