/**
 * Created by wgw on 2016/4/30.
 */
define(function (require) {
    var Sprite = require("gameLib/model/sprite/Sprite");
    var util = require("baBasicLib/util/baLib");
    var GUID = require("baBasicLib/util/GUID");
    var bearView = require("gameLib/script/revengerRoad/chapter_1/spriteView/BearView");
    function Bear(id){
        Sprite.call(this);
        this.id = id||GUID();
        this.type = "bear";
        this.AI = true;
        this.bindView = new bearView(this);
        this.geoInfo = null;
        this.quaTreeNode = null;
        this.loc = {
            x:0,
            y:0,
            direction:0
        };
        this.propInfo = {

        };
        this.viewInfo = {
            stamp:0,
            actInterval:200,
            range:50,
            data:[]
        };
        this.aimInfo = {
            aimLoc:null
        }
        this.interfereInfo = {

        };
        this.moveInfo = {
            stamp:0,
            actInterval:40,
            stepLength:2,
            climbAbility:2
        };
        this.testSignal = {
            watch:false
        }
    }

    Bear.prototype = new Sprite();
    Bear.prototype.addToGeo = function(geoInfo){
        this.geoInfo = geoInfo;

        var width = geoInfo.width;
        var height = geoInfo.height;
        var loc_x = parseInt((0.4 + Math.random()*0.2)*width);
        var loc_y = parseInt((0.4 + Math.random()*0.2)*height);
        var direction = Math.random()*Math.PI*2;
        this.loc.x = loc_x;
        this.loc.y = loc_y;
        this.loc.direction = direction;
        this.geoInfo.addQuaNode(this);

    };
    Bear.prototype.action = function(){
        if(this.AI){
            this.viewHandle();
            this.moveHandle();
        }
    };
    Bear.prototype.viewHandle = function(){
        //viewÊÂ¼þ´¥·¢ÅÐ¶Ï
        var viewInfo = this.viewInfo;
        var _t = new Date().getTime();
        if(_t - viewInfo.stamp < viewInfo.actInterval){
            return;
        }
        viewInfo.stamp = _t;
        viewInfo.actInterval += (Math.random()*300 - 150);


        var loc = this.loc;
        //loc.direction += (Math.random() - 0.5);
        var geoInfo = this.geoInfo;
        var viewObj = this.getObjInView();
    };
    Bear.prototype.getObjInView = function(){
        var loc = this.loc;
        var viewInfo = this.viewInfo;
        var quaTreeNode = this.quaTreeNode;
        if(!quaTreeNode)
            return null;
        var w = quaTreeNode.bounds.w;
        var spriteList = quaTreeNode.spriteList;
        var list = [];
        if(w <= viewInfo.range){
            list = spriteList;
        }
        else{
            for(var i = 0,len = spriteList.length;i<len;i++){
                var sprite_i = spriteList[i];
                if(util.getTwoSpriteDis(sprite_i,this) <= viewInfo.range){
                    list.push(sprite_i);
                }
            }
            if(list.length>1 && this.testSignal.watch){
                console.log(list);
            }
        }



        return list;
    };
    Bear.prototype.moveHandle = function () {
        var moveInfo = this.moveInfo;
        var _t = new Date().getTime();
        if(_t - moveInfo.stamp < moveInfo.actInterval){
            return;
        }
        moveInfo.stamp = _t;

        var loc = this.loc;
        var dir = loc.direction;
        var stepLength = moveInfo.stepLength;
        loc.x += stepLength * Math.cos(dir);
        loc.y += stepLength * Math.sin(dir);

        var geoInfo = this.geoInfo;
        if(loc.x <= 0||loc.x >= geoInfo.width){
            loc.direction = Math.PI - loc.direction;
        }
        if(loc.y <= 0||loc.y >= geoInfo.height){
            loc.direction = -1*loc.direction;
        }

        this.quaTreeNode.deleteSprite(this);
        this.geoInfo.addQuaNode(this);


    };
    Bear.prototype.getOutPut = function(){
        return{
            id:this.id,
            type:this.type,
            loc:this.loc,
            viewData:this.viewInfo.data
        }
    };

    return Bear;
})