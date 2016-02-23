/**
 * Created by wgw on 2016/2/24.
 */
function connectToServer(){
    require(['socket/WS_manager'],
        function(wsManager){
            var WSM = wsManager.getInstance();
            WSM.connectToServer();
    });
}