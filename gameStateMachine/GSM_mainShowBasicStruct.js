/**
 * Created by wangguowei on 2001/1/11.
 */
define(function(){
    function GSM_mainShowBasicStruct(_this){
        _this.privateState.mainSHowBBSOn = true;
        var mainShowLayer = global.getLayer("mainShowLayer");
        var singleProBtn = mainShowLayer.getChildById("singleProBtn");
        mainShowLayer.removeChild(singleProBtn);

        var os_1 = new oS_roomList("outerS",300,50,600,350,false);
        os_1.addToLayer(mainShowLayer);

        var btn1 = new baButton("btn_mS_buildRoom");
        var btn1_loc = {
            x:os_1.x,
            y:os_1.y + os_1.height,
            width:os_1.width/4,
            height:50
        }
        btn1.setLoc(btn1_loc);
        btn1.upStateInfo.text = "buildRoom";
        btn1.addToLayer(mainShowLayer);
        os_1.addNode(btn1);

        var btn2 = new baButton("btn_mS_pickRoom");
        var btn2_loc = {
            x:os_1.x + os_1.width/2 - os_1.width/8,
            y:os_1.y + os_1.height,
            width:os_1.width/4,
            height:50
        }
        btn2.setLoc(btn2_loc);
        btn2.upStateInfo.text = "pickRoom";
        btn2.addToLayer(mainShowLayer);
        os_1.addNode(btn2);
        btn2.bindedEvent = BTN_E_getIntoARoom;

        var btn3 = new baButton("btn_mS_randomRoom");
        var btn3_loc = {
            x:os_1.x + os_1.width - os_1.width/4,
            y:os_1.y + os_1.height,
            width:os_1.width/4,
            height:50
        }
        btn3.setLoc(btn3_loc);
        btn3.upStateInfo.text = "buildRoom";
        btn3.addToLayer(mainShowLayer);
        os_1.addNode(btn3);

        _this.doMouseWheel = function (event) {
            var delta_y = event.deltaY;
            var os_1 = global.getSpriteById("outerS");
            os_1.onMouseWheel(delta_y);
        }
    };
    return GSM_mainShowBasicStruct;
})

