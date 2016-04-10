/**
 * Created by wgw on 2016/4/10.
 */
define(function (require) {
   var listenerType = require("baBasicLib/view/ViewConfig").listenerType;
   function ReSure(){
      this.context = null;
      this.callbackTrue = null;
      this.callbackFalse = null;
   }
   ReSure.prototype = {
      check: function (context,callBackTrue,callBackFalse) {
         global.fireEvent(listenerType.RESURE_CHECK,{Y:"确定退出",N:"取消"});
      },
      returnCheckResult:function(result){
         this.fireEvent(listenerType.RESURE_CHECK_FINISH);
         switch (result){
            case true:
                 this.callbackTrue.call(this.context);
                 break;
            case false:
                 this.callbackFalse.call(this.context);
                 break;
         }
      }
   }

   return ReSure;
});