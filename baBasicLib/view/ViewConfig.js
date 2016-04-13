/**
 * Created by wgw on 2016/4/2.
 */
define(function(){


    return {
        //注册事件名称
        listenerType:{
            //根事件
            SCENE_CHANGE:"scene_change",
            RESURE_CHECK:"resureCheck",
            RESURE_CHECK_FINISH:"resureCheckFinish",
            //房间列表界面事件
            ADD_ROOM_INTRO_TAG:"addRoomIntroTag",
            REFRESH_ROOM_INTRO_TAG:"refreshRoomIntroTag",
            REMOVE_ROOM_INTRO_TAG:"removeRoomIntroTag",
            ADD_MEM_INTRO_TAG:"addMemIntroTag",
            REFRESH_MEM_INTRO_TAG:"refreshMemIntroTag",
            REMOVE_MEM_INTRO_TAG:"removeMemIntroTag",
            INTO_WAITING_QUEUE:"intoWaitingQueue",
            OUT_WAITING_QUEUE:"outWaitingQueue",
            //游戏主界面事件
            ADD_TEXT:"addTest",
            ADD_MEM_TAG:"addMemTag",
            REFRESH_MEM_TAG:"refreshMemTag",
            REMOVE_MEM_TAG:"removeMemTag"
        },
        //注册事件类别
        listenerClass:{
            ORI:"ori",
            SCENE_MONOPOLY:"scene_monopoly"
        }
    }
});