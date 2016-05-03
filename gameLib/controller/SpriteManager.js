/**
 * Created by wgw on 2016/4/29.
 */
define(function (require) {
    var Bear = require('gameLib/script/revengerRoad/chapter_1/sprite/Bear');
    var instance = null;

    function SpriteManager(){

    }
    SpriteManager.prototype ={
        generateSpriteByType:function(type){
            var sprite;
            switch (type){
                case 'bear':
                    sprite = new Bear();
                    break;
            }

            return sprite;
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