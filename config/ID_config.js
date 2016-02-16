/**
 * Created by wangguowei on 2001/1/11.
 */

OUTER_STRUCT_ID = 0;
ROOM_INTRO_ID = 0;
MEM_INTRO_ID = 0;
MEM_PLAYER_ID = 0;

function getNewIdForOuterStruct(){
    OUTER_STRUCT_ID++;
    return "outerStruct_" + OUTER_STRUCT_ID;
}

function getNewIdForRoomIntro(){
    ROOM_INTRO_ID++;
    return "roomIntro_" + ROOM_INTRO_ID;
}

function getNewIdForMemIntro(){
    MEM_INTRO_ID++;
    return "memIntro_" + MEM_INTRO_ID;
}

function getNewIdForMemPlayer(){
    MEM_PLAYER_ID++;
    return "memPlayer_" + MEM_PLAYER_ID;
}