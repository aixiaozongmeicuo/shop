var loginFrameClientFunction;
var loginRegisterFrameType;
var srcUrl;
function passportLoginFrame(t, v, p, r) {
    loginFrameClientFunction = p;
    loginRegisterFrameType = r;
    var w = encodeURIComponent(returnUrl ? returnUrl : window.location.href);
    var n = window.location.protocol;
    var m = window.location.host;
    var q = n + "//" + m;
    if (v) {
        q = q + v
    }
    encodeCurrentDomain = encodeURIComponent(q);
    var x = "https://passport.yhd.com";
    var s = /([a-z0-9_-]+\.)*(yhd|yihaodian|1mall|111)\.(com\.hk)$/;
    if (s.test(m)) {
        x = "https://passport.yihaodian.com.hk"
    }
    srcUrl = x + "/publicPassport/loginFrame.do?fromDomain=" + encodeCurrentDomain + "&returnUrl=" + w;
    var o = '<iframe id="loginIframe" frameBorder=0 scrolling="no" style="border: 0px none;" width="763" height="270"></iframe>';
    loginPopup(URLPrefix.passport, o);
    var u = $("#loginIframe", document.body);
    u.focus()
}
function passportLoginFrameCallback(d, c) {
    closePopDiv();
    if (c) {
        window.location.href = decodeURIComponent(c)
    } else {
        loginFrameClientFunction(d)
    }
}
var isIELower = $.browser.msie && $.browser.version == 6 || false;
var isFirstOpen = false;
function loginPopup(i, k) {
    var j = $("#mod_login_pop_wrap");
    if (j.length <= 0) {
        var h = '<div id="mod_login_pop_wrap" style="' + getCssContent(i, "mod_login_pop_wrap") + '"><div id="login_pop_content" style="' + getCssContent(i, "login_pop_content") + '"><i id="close_btn" style="' + getCssContent(i, "close_btn") + '"></i></div></div>';
        $("body").append(h);
        isFirstOpen = true;
        j = $("#mod_login_pop_wrap");
        if (k != null) {
            $("#login_pop_content").append(k)
        }
    }
    var g = $(document).height();
    var l = $(window).scrollTop();
    $("body").append('<div id="loginPopup_mask" style="' + getCssContent(i, "login_mask") + '"></div>');
    $("#loginPopup_mask").css("height", g);
    if (isIELower) {
        animatePopDiv(j, true, l);
        $(window).scroll(function () {
            var a = $(window).scrollTop();
            j.css("top", a)
        })
    } else {
        animatePopDiv(j, true, 0)
    }
    $("#mod_login_pop_wrap").delegate("#close_btn", "click", function () {
        closePopDiv()
    })
}
function animatePopDiv(e, d, f) {
    if (d) {
        e.stop().animate({top: f}, 500, function () {
            $("#loginIframe").attr("src", srcUrl)
        })
    } else {
        e.stop().animate({top: f}, 500)
    }
}
function closePopDiv() {
    var c = $("#mod_login_pop_wrap");
    if (c.length <= 0) {
        return
    }
    if (isIELower) {
        var d = $(window).scrollTop();
        animatePopDiv(c, false, -368 - d);
        $(window).scroll(function () {
            var a = $(this).scrollTop();
            c.css("top", -368 - a)
        })
    } else {
        animatePopDiv(c, false, -368)
    }
    $("#loginPopup_mask").remove();
    return false
}
function getCssContent(c, d) {
    if (d === "login_mask") {
        return "position:absolute; top:0; left:0; z-index:100001; width:100%; background:#000;opacity:0.1;filter:alpha(opacity=10);"
    } else {
        if (d === "mod_login_pop_wrap") {
            return "position:fixed; _position:absolute; z-index:100002; top:-368px; left:50%;width:785px; padding:0 5px 5px 5px; margin-left:-397px;filter:progid:DXImageTransform.Microsoft.gradient(enabled='true',startColorstr='#33000000', endColorstr='#33000000');background-color:rgba(0,0,0,0.2);"
        } else {
            if (d === "login_pop_content") {
                return "padding:30px 20px 54px 0; position:relative;border:1px solid #b4b4b4;border-top:0 none; background:#FFF url(" + c + "/front-passport/passport/images/yhd_loading.gif) no-repeat center center;"
            } else {
                if (d === "close_btn") {
                    return "position:absolute; right:10px; top:10px; display:block; width:12px; height:12px; background:url(" + c + "/front-passport/passport/images/login_popup.png) no-repeat -340px 0; cursor:pointer;"
                }
            }
        }
    }
    return ""
};