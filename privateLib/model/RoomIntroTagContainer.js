/**
 * Created by wgw on 2016/4/4.
 */
define(function(require){
    var baNode = require("baBasicLib/model/baNode");
    function RoomIntroTagContainer(id,scene){
        baNode.call(this);
        this.id = id;
        this.type = "RoomIntroTagContainer";
        this.scene = scene;
        this.roomIntroTagList = [];
        this.initialize();
    };
    RoomIntroTagContainer.prototype = new baNode();
    RoomIntroTagContainer.prototype.initialize = function(){
        if(this.scene){
            this.scene.addChild(this);
        }
    };
    RoomIntroTagContainer.prototype.addRoomIntroTag = function(rit){

    };
    RoomIntroTagContainer.prototype.updateRoomIntroTag = function(rit){

    };
    RoomIntroTagContainer.prototype.removeRoomIntroTag = function(rit){

    };
    return RoomIntroTagContainer;
});