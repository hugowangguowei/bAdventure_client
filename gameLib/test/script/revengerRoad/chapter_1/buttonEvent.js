/**
 * Created by wgw on 2016/5/12.
 */

function init(){
    console.log("haha");
    $("#t1").val("添加小熊");
}

function test1(){
    require(
        ['gameLib/script/revengerRoad/chapter_1/sprite/Bear'],
        function(Bear){
            var bear = new Bear;
            gm.addSprite(bear);
        })
}

function test2(){

}

function test3(){

}

function test4(){

}

function test5(){

}