/**
 * Created by wgw on 2016/4/27.
 * chapter1 猎熊者
 */

define(function(require){
    var mapManager = require('gameLib/controller/MapManager');

    return{
        Map:mapManager.getMap("RR_c1"),
        Sprite:{
            //"leader":{num:1},
            //"follower":{num:4},
            "bear":{num:1}
        }
    }
})