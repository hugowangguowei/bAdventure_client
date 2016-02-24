/**
 * Created by wangguowei on 2001/1/11.
 */
define(function(require){

    var instance = null;
    function ID_Manager(){
        this.OUTER_STRUCT_ID = 0;
        this.ROOM_INTRO_ID = 0;
        this.MEM_INTRO_ID = 0;
        this.MEM_PLAYER_ID = 0;
        this.initialize();
    }
    ID_Manager.prototype = {
        initialize:function(){
            instance = this;
        },
        getNewIdForOuterStruct:function(){
            this.OUTER_STRUCT_ID++;
            return "outerStruct_" + this.OUTER_STRUCT_ID;
        },
        getNewIdForRoomIntro:function(){
            this.ROOM_INTRO_ID++;
            return "roomIntro_" + this.ROOM_INTRO_ID;
        },
        getNewIdForMemIntro:function(){
            this.MEM_INTRO_ID++;
            return "memIntro_" + this.MEM_INTRO_ID;
        },
        getNewIdForMemPlayer:function(){
            this.MEM_PLAYER_ID++;
            return "memPlayer_" + this.MEM_PLAYER_ID;
        }
    }

    return {
        getInstance:function(){
            if(!instance){
                instance = new ID_Manager();
            }
            return instance;
        }
    }
})
