/**
 * Created by wangguowei on 2001/1/11.
 */

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

function baLab_getRandomColor(){
    var c_r = parseInt(Math.random()*255);
    var c_g = parseInt(Math.random()*255);
    var c_b = parseInt(Math.random()*255);
    var color = 'rgb(' + c_r + "," + c_g + "," + c_b + ")";
    return color;
}