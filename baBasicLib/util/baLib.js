/**
 * Created by wangguowei on 2016/1/11.
 */
define(function(require){
    function cloneObject(obj){
        if(typeof obj === "object"){
            if(Object.prototype.toString.call(obj) === '[object Array'){
                var newArray = [];
                for(var i = 0;i<obj.length;i++){
                    newArray.push(cloneObject(obj[i]));
                }
                return newArray;
            }
            else{
                var newObj = {};
                for(var key in obj){
                    newObj[key] = this.cloneObject(obj[key]);
                }
                return newObj;
            }
        }
        else{
            return obj;
        }
    }

    function isEmpty(obj){
        for(var i in obj){
            return false;
        }
        return true;
    }

    function isOwnEmpty(obj){
        for(var i in obj){
            if(obj.hasOwnProperty(i)){
                return false;
            }
        }
        return true;
    }

    function getRandomColor(){
        var c_r = parseInt(Math.random()*255);
        var c_g = parseInt(Math.random()*255);
        var c_b = parseInt(Math.random()*255);
        var color = 'rgb(' + c_r + "," + c_g + "," + c_b + ")";
        return color;
    }

    function getPointOnDiv(x,y,obj){
        var bBox = obj.getBoundingClientRect();
        return {
            x:x-bBox.left*(obj.width/bBox.width),
            y:y - bBox.top*(obj.height/bBox.height)
        };
    }

    return {
        cloneObject:cloneObject,
        isEmpty:isEmpty,
        isOwnEmpty:isOwnEmpty,
        getRandomColor:getRandomColor,
        getPointOnDiv:getPointOnDiv
    }
})
