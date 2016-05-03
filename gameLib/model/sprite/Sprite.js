/**
 * Created by wgw on 2016/4/18.
 */
define(function(require){
   function Sprite(id){
       this.id = id;
       this.geoInfo = {
           hasGeo:false,
           GeoLoc:{x:null,y:null}
       }
   }
    Sprite.prototype = {
        initialize:function(){

        },
        addToGeo:function(geoInfo){

        },
        action:function(){

        }
    }

    return Sprite;
});