/**
 * Created by wgw on 2016/4/2.
 */
define(function(require){

    var View = require("baBasicLib/view/View");
    var viewConfig = require("baBasicLib/view/ViewConfig");
    var listenerType = viewConfig.listenerType;


    function CSSView(div,model){
        View.call(this,div,model);
        this.div = null;
        this.model = null;
        this.initialize(div,model);
    };

    CSSView.prototype = new View();
    CSSView.prototype.initialize = function(div,model,width,height){
        this.model = model;
        this.setDIV(div,width,height);
        this.addListeners();
    }
    CSSView.prototype.setDIV = function(div,width,height){
        this.baseDiv = div;
        var width = width||1400;
        var height = height||700;
        this.width = width;
        this.height = height;
        this.baseDiv.width = width;
        this.baseDiv.height = height;
        this.baseDiv.style.width = width + "px";
        this.baseDiv.style.height = height + "px";
        this.baseDiv.style.position = "relative";
        this.baseDiv.style.top = "0px";
        this.baseDiv.style.left = "0px";
        this.baseDiv.style.zIndex = 0;
    },
    CSSView.prototype.addListeners = function(){
        var _this = this;
        this.model.addListener(listenerType.SCENE_CHANGE,function(arg){
            _this.changeScene(arg[0]);
        });

    }
    CSSView.prototype.changeScene = function(sceneName){
        switch (sceneName) {
            case "gameLoading":
                changeScene_gameLoading();
                break;
            case "mainShow":
                changeScene_mainShow();
                break;
            case "mainShowBasicStruct":
                changeScene_mainShowBasicStruct();
        }
        function changeScene_gameLoading(){
        }
        function changeScene_mainShow(){
            $('#mainDiv').html(
                "<div id = 'outS'>"+
                    "<div id = 'INIT_name'>"+
                    "<h2>Hi,YOU</h2>"+
                    "</div>"+
                    "<input id = 'INIT_connect' type='button' class='INIT_connect' value='connectToServer'>"+
                "</div>"
            )
            $('#INIT_connect').on('click',function(){
                console.log("hah");
                connectToServer();
            });
        }
        function changeScene_mainShowBasicStruct(){
            $('#outS').remove();
            $('#mainDiv').html(
                "<div id = 'outS'>"+
                    "<div id = 'MT_title'></div>"+
                    "<div id = 'MT_main'>"+
                        "<div id = 'MT_leftFrame1'></div>"+
                        "<div id = 'MT_leftFrame2'></div>"+
                        "<div id = 'MT_middleFrame'></div>"+
                        "<div id = 'MT_rightFrame1'></div>"+
                        "<div id = 'MT_rightFrame2'>"+
                            "<input type='button' id = 'MT_btn1' class='roomBtn' value='buildRoom'>"+
                            "<input type='button' id = 'MT_btn2' class='roomBtn' value='getIntoRoom'>"+
                            "<input type='button' id = 'MT_btn3' class='roomBtn' value='addMem'>"+
                            "<div id = 'MT_rF_buildRoom'></div>"+
                        "</div>"+
                    "</div>"+
                    "<div id = 'MT_bottom'>"+
                        "<div id = 'MT_bottomFrame'>"+
                            "<div id = 'MT_b_wrap'>"+
                            "</div>"+
                        "</div>"+
                    "</div>"+
                "</div>"
            );
            (function(){
                $("#MT_leftFrame2").hide();
                $("#MT_rightFrame1").hide();
                $("#MT_rF_buildRoom").hide();
                $("#MT_leftFrame1").on("click",function(){
                    $("#MT_leftFrame1").hide();
                    $("#MT_leftFrame2").show();
                });
                $("#MT_leftFrame2").on("click",function(){
                    $("#MT_leftFrame2").hide();
                    $("#MT_leftFrame1").show();
                });
                $("#MT_rightFrame1").on("click",function(){
                    $("#MT_rightFrame1").hide();
                    $("#MT_rightFrame2").show();
                });
                $("#MT_rightFrame2").on("click",function(){
                    $("#MT_rightFrame2").hide();
                    $("#MT_rightFrame1").show();
                });
                $("#MT_btn1").on("click",function(e){
                    var $MT_rF_buildRoom = $('#MT_rF_buildRoom');
                    if($MT_rF_buildRoom.is(":hidden")){
                        $MT_rF_buildRoom.show();
                    }
                    return false;
                });
                $("#MT_btn2").on("click",function(e){
                    return false;
                });
                $('#MT_btn3').on('click',function(e){
                    MT_addNewPlayer();
                    return false;
                });
                function MT_buildNewRoom(){
                    var $newRoom = $("<div></div>").addClass("roomIntro");
                    $newRoom.html(
                        "<div class='rI_b1'></div>" +
                        "<div class='rI_b2'></div>" +
                        "<div class='rI_b3'></div>"
                    )
                    $newRoom.click(function(e){
                        var roomIntroList = $('.roomIntro');
                        roomIntroList.removeClass("roomIntroSelected");
                        $(this).addClass("roomIntroSelected");
                    })
                    $("#MT_middleFrame").append($newRoom);
                }
                function MT_addNewPlayer(){
                    var $newRoom = $("<div></div>").addClass("MT_memIntro");
                    $newRoom.html(
                        "<div class='mI_img'></div>"
                    )
                    $("#MT_b_wrap").append($newRoom);
                }
            })();
        }
    }

    return CSSView;
})