/**
 * Created by wangguowei on 2001/1/11.
 */

gameStateMachine.prototype.gameLoading = function(){
    var _this = this;
    global.addLayer("loadingLayer",120);
    var ldLayer = global.getLayer("loadingLayer");

    var cxt = ldLayer.canvas.getContext("2d");
    imageArray = [
        {imageName:"aa",src:"images/1.png"},
        {imageName:"bb",src:"images/2.png"}
    ]

    var imageNum = imageArray.length;
    var count = 0;
    var loadResource = {
        length:700,
        height:20,
        positionX:350,
        positionY:500
    };

    cxt.beginPath();
    cxt.strokeRect(loadResource.positionX,loadResource.positionY,loadResource.length,loadResource.height);
    cxt.stroke();
    for(var i = 0;i<imageArray.length;i++){
        var image_i = imageArray[i];
        eval(image_i.imageName +"= new Image();");
        eval(image_i.imageName +".src = '" + image_i.src + "';");
        eval(image_i.imageName +".addEventListener('load',show,false);");
    }

    function show(){
        count++;

        var percent = count/imageNum;
        cxt.fillStyle = "blue";

        cxt.beginPath();
        cxt.clearRect(loadResource.positionX + loadResource.length + 1,
            loadResource.positionY,50,20);
        cxt.fillRect(loadResource.positionX,loadResource.positionY,percent * loadResource.length,loadResource.height);
        cxt.font = "25px Arial";
        cxt.fillText(percent.toString(),loadResource.positionX + loadResource.length,
            loadResource.positionY + loadResource.height);
        cxt.stroke();

        if(count >= imageArray.length){
            console.log("finish loading");
            _this.switchToNext("mainShow");
        }
    }


}