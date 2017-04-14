/**
 * Created by 81964 on 2017/4/12.
 */
var i=0;
var timer;
$(function () {
    showAnimate();
    $(".animal-info").mouseenter(function(){
        clearInterval(timer)
    }).mouseleave(function(){
        showAnimate();
    })
});
function showAnimate(){
    var flag=true;
    timer = setInterval(function(){
        if(flag){
            i++;
            if(i>=2){
                flag=false;
            }
        }
        else{
            i--;
            if(i<=0){
                flag=true;
            }
        }
        $(".animal-info").css("marginTop",-270*i+"px");
    },2000)
}
