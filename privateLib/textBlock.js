/**
 * Created by wgw on 2016/2/14.
 */
/**
 * Created by wangguowei on 2001/1/11.
 */

function textBlock(id,x,y,w,h){
    baSprite.call(this);
    this.id = id;
    this.type = "textBlock";
    this.x = x||0;
    this.y = y||0;
    this.width = w||100;
    this.height = h||100;
    this.isInit = false;
    this.textArea = null;
    this.isPrivate = false;
    this.isFocusOn = false;
    this.message = [];
}

textBlock.prototype = new baSprite();
textBlock.prototype.init = function(){

    this.isInit = true;
    if(document.getElementById("tA1")){
        return 0;
    }
    var tA = document.createElement("textArea");
    tA.setAttribute("id","tA1");
    tA.style.position = "absolute";
    tA.style.left = this.x + "px";
    tA.style.top = this.y + "px";
    tA.style.width = this.width + "px";
    tA.style.height = this.height + "px";
    tA.style.zIndex = 130;
    var mainDiv = document.getElementById("mainDiv");
    if(!mainDiv){
        throw new Error("not find the div");
        return;
    }
    mainDiv.appendChild(tA);
};
textBlock.prototype.draw = function(){
    if(!this.isInit){
        this.init();
    }
};
textBlock.prototype.hide = function(){

};
textBlock.prototype.delete = function(){

}





















