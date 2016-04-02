/**
 * Created by wgw on 2016/4/1.
 */
define(function(){
    "use strict";
    function eventSource(){
        this._eventList = [];
    }
    eventSource.prototype = {
        addEvent:function(eventType,callback){
            this._eventList.push(eventType);
            this._eventList.push(callback);
        },
        removeEvent:function(){

        },
        fireEvent:function(){

        }
    }

    return eventSource;
})
