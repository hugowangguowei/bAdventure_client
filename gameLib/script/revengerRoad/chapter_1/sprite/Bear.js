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
            baseLife:10,
            life:10,
            accLength:4,
            accNum:5
        };
        this.viewInfo = {
            stamp:0,
            actInterval:200,
            range:50,
            data:[]
        };
        this.aimInfo = {
            aimLoc:null,
            aimObj:null,
            aimEmptyInterval:20,
            aimEmptySignal:20
        }
        this.interfereInfo = {

        };
        this.moveInfo = {
            stamp:0,
            actInterval:40,
            stepLength:0.5,
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
        //view事件触发判断
        var self = this;
        var viewInfo = this.viewInfo;
        var _t = new Date().getTime();
        if(_t - viewInfo.stamp < viewInfo.actInterval){
            return;
        }
        viewInfo.stamp = _t;
        viewInfo.actInterval += (Math.random()*300 - 150);

        var viewObjList = _getObjInView();
        var aimObj = _getAim(viewObjList);
        _setAim(aimObj);

        function _getObjInView(){
            var loc = self.loc;
            var viewInfo = self.viewInfo;
            var quaTreeNode = self.quaTreeNode;
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
                    if(util.getTwoSpriteDis(sprite_i,self) <= viewInfo.range){
                        list.push(sprite_i);
                    }
                }
                if(list.length>1 && self.testSignal.watch){
                    console.log(list);
                }
            }
            return list;
        };
        function _getAim(viewObjList){
            var len = viewObjList.length;
            if(!len){
                return 0;
            }
            var num = parseInt(Math.random() * len);
            var aimObj = viewObjList[num];
            if(aimObj == self){
                viewObjList.splice(num,1);
                aimObj = _getAim(viewObjList);
            }
            return aimObj;
        };
        function _setAim(aimObj){
            var aimInfo = self.aimInfo;
            aimInfo.aimObj = aimObj;
            if(aimObj){
                aimInfo.aimLoc = {x:aimObj.loc.x,y:aimObj.loc.y};
                aimInfo.aimEmptySignal = aimInfo.aimEmptyInterval;
            }
            else{
                aimInfo.aimEmptySignal--;
                console.log(aimInfo.aimEmptySignal);
                if(aimInfo.aimEmptySignal <= 0){
                    aimInfo.aimEmptySignal = aimInfo.aimEmptyInterval;
                    self.loc.direction = Math.random()* 0.6 - 0.3 + self.loc.direction;
                }
            }

        }
    };
    Bear.prototype.moveHandle = function () {
        var self = this;
        var moveInfo = this.moveInfo;
        var _t = new Date().getTime();
        if(_t - moveInfo.stamp < moveInfo.actInterval){
            return;
        }
        moveInfo.stamp = _t;

        var loc = this.loc;
        var speed = _getSpeed();
        var dir = _getDir();
        loc.x += speed * Math.cos(dir);
        loc.y += speed * Math.sin(dir);




        var geoInfo = this.geoInfo;
        if(loc.x <= 0||loc.x >= geoInfo.width){
            loc.direction = Math.PI - loc.direction;
        }
        if(loc.y <= 0||loc.y >= geoInfo.height){
            loc.direction = -1*loc.direction;
        }
        this.quaTreeNode.deleteSprite(this);
        this.geoInfo.addQuaNode(this);

        //获取当前目标的速度
        function _getSpeed(){
            var moveInfo = self.moveInfo;
            var aimInfo = self.aimInfo;
            var baseSpeed = moveInfo.stepLength;
            if(aimInfo.aimObj){
            }
            return baseSpeed;
        };
        //获取当前目标的方向
        function _getDir(){
            var aimInfo = self.aimInfo;
            var dir = 0;
            if(aimInfo.aimLoc){
                var aimLoc = aimInfo.aimLoc;
                var _x = aimLoc.x - loc.x , _y = aimLoc.y - loc.y;

                if(_y > 0){
                    dir = Math.atan(_y/_x);
                }
                else if(_y < 0){
                    dir = Math.PI + Math.atan(_y/_x);
                }else{
                    if(_x > 0){
                        dir = 0;
                    }else{
                        dir = Math.PI;
                    }
                }
                return dir;
            }else{
                return self.loc.direction;
            }
        }
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