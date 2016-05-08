/**
 * Created by wgw on 2016/4/30.
 */
define(function (require) {
    var Sprite = require("gameLib/model/sprite/Sprite");
    var util = require("baBasicLib/util/baLib");
    var bearView = require("gameLib/script/revengerRoad/chapter_1/spriteView/BearView");
    function Bear(id){
        Sprite.call(this);
        this.id = id;
        this.type = "bear";
        this.bindView = new bearView(this);
        this.geoInfo = null;
        this.locInfo = {
            x:0,
            y:0,
            direction:0
        };
        this.viewInfo = {
            stamp:0,
            actInterval:2000,
            range:5,
            data:[]
        };
        this.aimInfo = {
            aimLoc:null
        }
        this.interfereInfo = {

        };
        this.moveInfo = {
            stamp:0,
            actInterval:200,
            stepLength:2,
            climbAbility:2
        };

    }

    Bear.prototype = new Sprite();
    Bear.prototype.addToGeo = function(geoInfo){
        this.geoInfo = geoInfo;

        var width = geoInfo.width;
        var height = geoInfo.height;
        var loc_x = parseInt((0.4 + Math.random()*0.2)*width);
        var loc_y = parseInt((0.4 + Math.random()*0.2)*height);
        var direction = Math.random()*Math.PI*2;
        this.locInfo.x = loc_x;
        this.locInfo.y = loc_y;
        this.locInfo.direction = direction;

    };
    Bear.prototype.action = function(){
        this.viewHandle();
        this.moveHandle();
    };
    Bear.prototype.viewHandle = function(){
        var viewInfo = this.viewInfo;
        var _t = new Date().getTime();
        if(_t - viewInfo.stamp < viewInfo.actInterval){
            return;
        }
        viewInfo.stamp = _t;
        var loc = this.locInfo;
        var geoInfo = this.geoInfo;
        //var mapWidth = geoInfo.width;
        //var mapHeight = geoInfo.height;
        //viewInfo.data = util.getCircleAreaInArray(mapWidth,mapHeight,loc.x,loc.y,viewInfo.range);
        //var aimInfo = this.aimInfo;
        //var len = viewInfo.data.length;
        //aimInfo.aimLoc = parseInt(Math.random()*len);

    };
    Bear.prototype.moveHandle = function () {
        var moveInfo = this.moveInfo;
        var _t = new Date().getTime();
        if(_t - moveInfo.stamp < moveInfo.actInterval){
            return;
        }
        moveInfo.stamp = _t;
        var loc = this.locInfo;
        var dir = loc.direction;
        var stepLength = moveInfo.stepLength;
        loc.x += stepLength * Math.cos(stepLength);
        loc.y += stepLength * Math.sin(stepLength);

    }
    Bear.prototype.getOutPut = function(){
        return{
            id:this.id,
            type:this.type,
            locInfo:this.locInfo,
            viewData:this.viewInfo.data
        }
    }

    return Bear;
})