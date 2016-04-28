/**
 * Created by wgw on 2016/4/29.
 */
define(function (require) {
    var instance = null;

    function SpriteManager(){

    }
    SpriteManager.prototype ={

    }

    return {
        getInstance:function(){
            if(!instance){
                instance = new SpriteManager();
            }
            return instance;
        }
    }
})