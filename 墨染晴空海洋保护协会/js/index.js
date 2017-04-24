/**
 * Created by 81964 on 2017/4/13.
 */
$(function () {
    var i, j, k;
    var f1 = 0, f2 = 0;
    var h;
    var txt;
    var chat = 0;
    var fx = 1;
    var tt = 0;
    var hi = $("body").height();
    var hi1 = $(".txt").height();
    var hi2 = $(".center").height();
    var hi3 = $(".content1").height();
    var hi4 = $(".us").height();
    var img_1 = $(".img_1").height();
    var wi = $("body").width();

    var isphone = hi / wi;
    var npc = "<div><img src='image/npc.png' alt=''/></div>";
    var wo = "<div><img src='image/wo.png' alt=''/></div>";
    //如果是手机 显示所有内容
    if (isphone > 1) {
        $(".center_1").fadeIn(500).animate({"opacity": "0.9", "filter": "alpha(opacity:90)"}, 1000, "linear");
        $(".img_1").eq(0).animate({"marginLeft": -10 + "px", "opacity": "1"}, 1000, "linear");
        $(".img_1").eq(1).animate({"marginRight": -10 + "px", "opacity": "1"}, 1000, "linear");
        $(".img_1").eq(2).animate({"marginLeft": -10 + "px", "opacity": "1"}, 1000, "linear");
        $(".img_1").eq(3).animate({"marginRight": -10 + "px", "opacity": "1"}, 1000, "linear");
        $(".text_1").eq(0).animate({"marginRight": -10 + "px", "opacity": "1"}, 1000, "linear");
        $(".text_1").eq(1).animate({"marginLeft": -10 + "px", "opacity": "1"}, 1000, "linear");
        $(".text_1").eq(2).animate({"marginRight": -10 + "px", "opacity": "1"}, 1000, "linear");
        $(".text_1").eq(3).animate({"marginLeft": -10 + "px", "opacity": "1"}, 1000, "linear");
    }
    if(wi<768){
        $(".li_list").click(function(){
            $(this).parents("ul").fadeToggle();
        })
    }
    if(wi>=768) {
        if(img_1>200) {
            $(".text_1").css("height", img_1+"px");
        }
    }
    /* 窗口大小变化触发事件*/
    $(window).resize(function () {
        wi = $("body").width();
        if(wi>768){
            img_1 = $(".img_1").height();
            $(".text_1").css("height", img_1+"px");
        }
        hi = $("body").height();
        hi1 = $(".txt").height();
        hi2 = $(".center").height();
        hi3 = $(".content1").height();
        hi4 = $(".us").height();
    });
    //id
    $(".idt li").each(function (index) {
        $(this).hover(function () {
            $(".guodu").eq(index).css({"border": "100px solid #A6D0EC"});
            setTimeout(function () {
                $(".info").eq(index).show();
            }, 300)
        }, function () {
            $(".info").stop().hide();
            $(".guodu").eq(index).css({"border": "1px solid silver"});
        });
    });
    //机器人动画
    setInterval(function () {
        //$(".rob").animate({"transform":"rotate("+-20*fx+"deg)"},500);
        $(".rob").css({"transform": "rotate(" + -10 * fx + "deg)"});
        if (fx == 1) {
            fx = -1;
            $(".rob img").attr("src", "image/robot2.png");
        } else {
            fx = 1;
            $(".rob img").attr("src", "image/robot.png");
        }
    }, 1420);
    //机器人ajax
    $(".rob").click(function () {
        $(".chat li").eq(0).html(npc + "<span style='font-size: 20px'>&nbsp;&nbsp;&nbsp;嗨，有什么想对我聊聊么<span>");
        $(this).fadeOut();
        $(".npc").fadeIn();
    });
    $("#chat_1").focus(function () {
        $(this).val("");
        $(this).css("color", "black");
    });
    document.onkeydown = function (event) {
        if (event.keyCode == 13) {
            txt = $("#chat_1").val();
            $("#chat_1").val("");
            showdata(txt);
        }
    };
    $("#chat_2").click(function () {
        txt = $("#chat_1").val();
        $("#chat_1").val("");
        showdata(txt);
    });
    $(".bit").click(function () {
        $(".npc").fadeOut();
        $(".rob").fadeIn();
        $(".chat li").eq(0).html("");
        $(".chat li").eq(1).html("");
    });
    function showdata(txt) {
        $.post({
            type: "post",
            data: {
                "key": "859b266b0846413d8e1c0d4b7436d080",
                "info": txt,
                "userid": "12345"
            },
            url: "http://www.tuling123.com/openapi/api",
            success: function (data) {
                $(".chat li").eq(0).html(wo + "&nbsp;&nbsp;&nbsp;" + txt);
                $(".chat li").eq(1).html(npc + "&nbsp;&nbsp;&nbsp;" + data.text);
                chat++;
            }
        });
    }

    //禁止变为蓝色
    document.ondragstart = document.onselectstart = function () {
        return false;
    };
    $(document).on("scroll", scroll_Y);
    $(document).on("scroll", scroll_W);
    h = $(".li_list").css("height");
    $(".li_list").css("lineHeight", h);
    function scroll_W() {
        if(wi>768) {
            if ($(document).scrollTop() > 40) {
                h = $(".title").height();
                $(".li_list").css("lineHeight", h + "px");
                $(".title").css({"backgroundColor": " rgba(0,0,0,0.8)", "height": 6 + "%"});
            } else {
                h = $(".title").height();
                $(".title").css({"backgroundColor": " rgba(0,0,0,0)", "height": 7 + "%"});
                $(".li_list").css("lineHeight", h * 7 / 5 + "px");
            }
        }else{
            $(".title").css({"backgroundColor": " rgba(0,0,0,0)", "height": 7 + "%"});
        }
        if ($(document).scrollTop() > hi * 0.2) {
            $(".center_1").fadeIn(500).animate({"opacity": "0.9", "filter": "alpha(opacity:90)"}, 1000, "linear");
            $(".rob").fadeIn();
        }
        if ($(document).scrollTop() < hi * 0.3) {
            $(".li_list").css("color", "#DDDDDD");
        }
    }

    function scroll_Y() {
        //list出现与消失

        //下滑对应list变色
        if ($(document).scrollTop() > hi1 + hi2 + hi3 - hi * 0.3) {
            $(".li_list").eq(3).css("color", "#4282CA").siblings().css("color", "#DDDDDD");
        } else if ($(document).scrollTop() > hi1 + hi2 - hi * 0.2) {
            $(".li_list").eq(2).css("color", "#4282CA").siblings().css("color", "#DDDDDD");
        } else if ($(document).scrollTop() > hi1 - hi1 * 0.2) {
            $(".li_list").eq(1).css("color", "#4282CA").siblings().css("color", "#DDDDDD");
        }
        //下滑对应模块出现
        if($(document).scrollTop()>100){
            $(".txt_1").css("opacity",0);
        }else{
            $(".txt_1").css("opacity",1);
        }
        //console.log($(document).scrollTop());
        console.log(hi1);
        console.log(hi2);
        console.log(hi3);
        if ($(document).scrollTop() > hi1 + hi2 + hi3 * 0.5) {
            $(".img_1").eq(3).animate({"marginRight": -10 + "px"}, 1000, "linear");
            $(".text_1").eq(3).animate({"marginLeft": -10 + "px"}, 1000, "linear");
        }
        if ($(document).scrollTop() > hi1 + hi2 + hi3 * 0.3) {
            $(".img_1").eq(2).animate({"marginLeft": -10 + "px"}, 1000, "linear");
            $(".text_1").eq(2).animate({"marginRight": -10 + "px"}, 1000, "linear");
        }
        if ($(document).scrollTop() > hi1 + hi2 + hi3 * 0.2) {
            $(".img_1").eq(1).animate({"marginRight": -10 + "px"}, 1000, "linear");
            $(".text_1").eq(1).animate({"marginLeft": -10 + "px"}, 1000, "linear");
        }
        if ($(document).scrollTop() > hi1 + hi2) {
            $(".img_1").eq(0).animate({"marginLeft": -10 + "px"}, 1000, "linear");
            $(".text_1").eq(0).animate({"marginRight": -10 + "px"}, 1000, "linear");
        }
        if ($(document).scrollTop() > hi + hi2 * 0.8) {
            $(".center_11").fadeIn(500).animate({
                "paddingTop": 3 + "%",
                "opacity": "0.9",
                "filter": "alpha(opacity:90)"
            }, 1000, "linear");
        }
        if ($(document).scrollTop() > hi) {
            $(".center_4").show(1000);
        }
        if ($(document).scrollTop() > hi * 0.7) {
            setTimeout(function () {
                $(".center_3").show(1000);
            }, 100);
        }
    }

    scroll_Y();
    //点击list到达指定位置
    $(".li_list").each(function (index) {
        $(this).click(function () {
            switch (index) {
                case 0:
                    $("body,html").animate({"scrollTop": 0}, 500);
                    break;
                case 1:
                    $("body,html").animate({"scrollTop": hi1}, 500);
                    break;
                case 2:
                    $("body,html").animate({"scrollTop": hi1 + hi2 + 0.1 * hi1}, 500);
                    break;
                case 3:
                    $("body,html").animate({"scrollTop": hi1 + hi2 + hi3 + 0.3 * hi1}, 500);
                    break;
                case 4:
                    break;
            }
            $(".li_list").css("color", "#DDDDDD");
            if (index != 0) {
                $(".li_list").eq(index).css("color", "#4282CA");
            }
        })
    });
    //图片选中效果
    $(".center_31").each(function (index) {
        $(this).css({"z-index": 3 - index});
        $(this).attr({"alt": index});
        if (index != 0) {
            $(this).css({"marginLeft": "-5%"});
        } else {
            $(this).css({"marginLeft": "17.5%"});
        }
        $(this).mouseenter(function () {
            j = 0;
            k = 0;
            if (f1 == 0) {
                f1 = 1;
                setTimeout(function () {
                    f1 = 0;
                }, 300);
                $(this).css("box-shadow", "0px 0px 5px #888888,0 0 10px #C4A87E  inset").siblings().css("box-shadow", "0px 0px 0px #888888, 0 0 10px #C4A87E  inset");
                $(this).css("z-index", 3).css("marginTop", "0%");
                for (i = 0; i < 4; i++) {
                    if ($(".center_31").eq(i).attr("alt") < $(this).attr("alt")) {
                        $(".center_31").eq(i).css("z-index", i);
                        $(".center_31").eq(i).css("marginTop", 1.5 - i * 0.5 + "%");
                        j++;
                    }
                    if ($(".center_31").eq(i).attr("alt") > $(this).attr("alt")) {
                        $(".center_31").eq(i).css("z-index", 2 - k);
                        $(".center_31").eq(i).css("marginTop", 1.5 - (2 - k) * 0.5 + "%");
                        k++;
                    }
                }
                $(".center_31").eq(0).css({"marginLeft": "10%"});
                $(".center_31").eq(1).css({"marginLeft": "0"});
                $(".center_31").eq(2).css({"marginLeft": "0"});
                $(".center_31").eq(3).css({"marginLeft": "0"});
                setTimeout(function () {
                    $(".center_31").eq(0).css({"marginLeft": "17.5%"});
                    $(".center_31").eq(1).css({"marginLeft": "-5%"});
                    $(".center_31").eq(2).css({"marginLeft": "-5%"});
                    $(".center_31").eq(3).css({"marginLeft": "-5%"});
                }, 400)
            }
        });
        $(this).mouseleave(function () {
            $(".center_31").css("box-shadow", "0px 0px 0px #888888,0 0 10px #C4A87E  inset");
            $(".center_31").css({"marginTop": "1.5%"});
        })
    });
    $(".center_32").each(function (index) {
        $(this).css({"z-index": 3 - index});
        $(this).attr({"alt": index});

        if (index != 0) {
            $(this).css({"marginLeft": "-5%"});
        } else {
            $(this).css({"marginLeft": "17.5%"});
        }
        $(this).mouseenter(function () {
            j = 0;
            k = 0;
            if (f2 == 0) {
                f2 = 1;
                setTimeout(function () {
                    f2 = 0;
                }, 300);
                $(this).css("box-shadow", "0px 0px 5px #888888,0 0 10px #C4A87E  inset").siblings().css("box-shadow", "0px 0px 0px #888888, 0 0 10px #C4A87E  inset");
                $(this).css("z-index", 3).css("marginTop", "0%");
                for (i = 0; i < 4; i++) {
                    if ($(".center_32").eq(i).attr("alt") < $(this).attr("alt")) {
                        $(".center_32").eq(i).css("z-index", i);
                        $(".center_32").eq(i).css("marginTop", 1.5 - i * 0.5 + "%");
                        j++;
                    }
                    if ($(".center_32").eq(i).attr("alt") > $(this).attr("alt")) {
                        $(".center_32").eq(i).css("z-index", 2 - k);
                        $(".center_32").eq(i).css("marginTop", 1.5 - (2 - k) * 0.5 + "%");
                        k++;
                    }
                }
                $(".center_32").eq(0).css({"marginLeft": "10%"});
                $(".center_32").eq(1).css({"marginLeft": "0"});
                $(".center_32").eq(2).css({"marginLeft": "0"});
                $(".center_32").eq(3).css({"marginLeft": "0"});
                setTimeout(function () {
                    $(".center_32").eq(0).css({"marginLeft": "17.5%"});
                    $(".center_32").eq(1).css({"marginLeft": "-5%"});
                    $(".center_32").eq(2).css({"marginLeft": "-5%"});
                    $(".center_32").eq(3).css({"marginLeft": "-5%"});
                }, 400)
            }
        });
        $(this).mouseleave(function () {
            $(".center_32").css("box-shadow", "0px 0px 0px #888888,0 0 10px #C4A87E  inset");
            $(".center_32").css({"marginTop": "1.5%"});
        })
    })
    //点击图标
    $(".tu").click(function () {
        $(".ul_1").slideToggle();
    });
});
