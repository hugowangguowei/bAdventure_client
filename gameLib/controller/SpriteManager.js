/**
 * Created by wgw on 2016/4/29.
 */
define(function (require) {
    var instance = null;

    function SpriteManager(){

    }
    SpriteManager.prototype ={
        generateSpriteByType:function(type){

        }
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