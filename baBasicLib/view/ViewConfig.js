/**
 * Created by wgw on 2016/4/2.
 */
define(function(){


    return {
        //注册事件名称
        listenerType:{
            SCENE_CHANGE:"scene_change",
            RESURE_CHECK:"resureCheck",
            RESURE_CHECK_FINISH:"resureCheckFinish",
            ADD_ROOM_INTRO_TAG:"addRoomIntroTag",
            REFRESH_ROOM_INTRO_TAG:"refreshRoomIntroTag",
            REMOVE_ROOM_INTRO_TAG:"removeRoomIntroTag",
            ADD_MEM_INTRO_TAG:"addMemIntroTag",
            REFRESH_MEM_INTRO_TAG:"refreshMemIntroTag",
            REMOVE_MEM_INTRO_TAG:"removeMemIntroTag",
            INTO_WAITING_QUEUE:"intoWaitingQueue",
            OUT_WAITING_QUEUE:"outWaitingQueue",
            ADD_TEXT:"addTest"
        },
        //注册事件类别
        listenerClass:{
            ORI:"ori",
            SCENE_MONOPOLY:"scene_monopoly"
        }
    }
});