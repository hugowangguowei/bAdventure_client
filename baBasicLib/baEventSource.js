/**
 * Created by wgw on 2016/4/1.
 */
define(function(){
    "use strict";
    function eventSource(){
        this._eventList = [];
    }
    eventSource.prototype = {
        addListener:function(eventType,listenerProp,callback){
            this._eventList.push(eventType);
            this._eventList.push(listenerProp);
            this._eventList.push(callback);
        },
        removeListener:function(args){

        },

        fireEvent:function(){
            if(!arguments.length){
                throw new Error("no arguments,you can't fire a event!");
                return;
            }
            var args = Array.prototype.slice.call(arguments);
            var eventType = args.shift();
            for(var i = 0,len = this._eventList.length;i<len;i+=3){
                if(eventType == this._eventList[i]){
                    this._eventList[i+2](args);
                }
            }
        }
    }

    return eventSource;
})
