/**
 * Created by wgw on 2016/4/4.
 */
define(function(require){
    var baNode = require("baBasicLib/model/baNode");
    function MemIntroTag(id,scene,container){
        baNode.call(this);
        this.id = id;
        this.type = "MemIntroTag";
        this.scene = scene;
        this.container = container
        this.memIntroInfo = {};
    };
    MemIntroTag.prototype = new baNode();
    MemIntroTag.prototype.initialize = function(){
        if(this.scene){
            this.scene.addChild(this);
        }
        if(this.container){
            this.addToContainer(this.container);
        }
    }
    MemIntroTag.prototype.addToContainer = function(){
        this.container.addMemIntroTag(this);
    }
    MemIntroTag.prototype.updateToContainer = function(){
        this.container.updateMemIntroTag(this);
    }
    MemIntroTag.prototype.removeFromContainer = function(){
        this.container.removeMemIntroTag(this);
    }

    return MemIntroTag;
});