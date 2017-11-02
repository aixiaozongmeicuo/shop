<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
    <meta name="tp_page" content="2.0">
    <meta http-equiv="X-UA-Compatible" content="IE=8">
    <meta name="renderer" content="webkit">
    <title>登录</title>
    <link href="https://passport.yhd.com/front-passport/passport/css/pc_login_new.css?01ce9c7 " rel="stylesheet" type="text/css">
    <script type="text/javascript"
            src="https://passport.yhd.com/front-passport/passport/js/pc_login_new.js?01ce9c7 "></script>

    <script>
        var LOGIN_RESULT = {SUCCESS: 0, FAIL: 1};
        var REGISTER_RESULT = {SUCCESS: 10, FAIL: 11};
        var DOMAIN_TYPE = {YHD: 1, MALL: 2, YW_111: 3};
        var LOGIN_SOURCE = {NORMAL: 1, FRAME: 2};
        var URLPrefix = {
            "yhd_domain": ".yhd.com",
            "sam_passport_statics": "https://security.samsclub.cn/front-passport/passport",
            "chinese": "1号店",
            "passportother": "https://passport.1mall.com",
            "sam_domain": ".samsclub.cn",
            "sam_captcha_js_url": "https://security.samsclub.cn/captcha/js/api.js",
            "helpUrl": "http://www.yihaodian.com/cms/view.do?topicId=9864",
            "hk_passport_statics": "https://passport.yihaodian.com.hk/front-passport/passport",
            "yhd_captcha_host": "https://captcha.yhd.com",
            "tracker": "tracker.yhd.com",
            "sam_login_url": "https://security.samsclub.cn/customer/login_input.do",
            "sam_passport_host": "https://security.samsclub.cn",
            "central": "http://www.yhd.com",
            "out3wurl": "www.yihaodian.com",
            "yhd_passport_host": "https://passport.yhd.com",
            "sam_request_namespace": "/customer",
            "mySite": "http://my.yihaodian.com/member/my.do",
            "passport_statics": "https://passport.yhd.com/front-passport/passport",
            "yaowang": "http://www.111.com.cn",
            "sam_captcha_host": "https://security.samsclub.cn",
            "my": "http://my.yhd.com",
            "httpurl": "http://www.yihaodian.com",
            "mymall": "http://my.1mall.com",
            "yhd_login_url": "https://passport.yhd.com/passport/login_input.do",
            "agreementUrl": "http://cms.yhd.com/cms/view.do?topicId=10",
            "no3wUrl": "yhd.com",
            "h5AgreementUrl": "http://cms.yhd.com/cms/view.do?topicId=54",
            "yiwangauth": "http://mall.yiwang.cn",
            "webStaticResourceUrl": "http://image.yihaodianimg.com",
            "passport": "https://passport.yhd.com",
            "validCodeShowUrl": "https://captcha.yhd.com/public/validcode.do",
            "mall": "http://www.1mall.com"
        };
        var currSiteId = 1;

        var returnUrl = "http://www.yhd.com/1/?cityId=2816";
        var autoLoginFlag = "1";
        var valid_code_service_flag = "1";
        var showValidCode = "0";
        var mUrl = "";

        var no3wUrl = "yhd.com";
        var imgPath = "https://passport.yhd.com/front-passport/passport/images";
        var fromDomain = "";
        var resetIframeUrl = fromDomain + "/login/callback.do";

        var yhdUrl = "http://www.yhd.com";
        var yhdPassportUrl = "https://passport.yhd.com";
        var ywPassportUrl = "";
        var pubkey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDXQG8rnxhslm+2f7Epu3bB0inrnCaTHhUQCYE+2X+qWQgcpn+Hvwyks3A67mvkIcyvV0ED3HFDf+ANoMWV1Ex56dKqOmSUmjrk7s5cjQeiIsxX7Q3hSzO61/kLpKNH+NE6iAPpm96Fg15rCjbm+5rR96DhLNG7zt2JgOd2o1wXkQIDAQAB";
    </script>
    <script type="text/javascript" async="" src="https://captcha.yhd.com/captcha/js/captcha.js?v=20170704"></script>
    <link rel="shortcut icon" href="https://passport.yhd.com/front-passport/passport/images/yhd_favicon.ico">
</head>


<body>

<div class="regist_header clearfix">
    <div class="wrap">
        <a href="javascript:;" class="logo"><img
                src="https://passport.yhd.com/front-passport/passport/images/loginlogo.jpg" height="55" alt="1号店"></a>
        <div class="regist_header_right clearfix">
            <!--<a href="#" class="english_edition" id="edition" style="display:none">English</a>-->
            <span class="fr">您好，欢迎光临1号店！ <a href="" class="blue_link">请登录</a></span>
        </div>
    </div>
</div>
<script type="text/javascript">
    var no3wUrl = "yhd.com";
    var currSiteId = 1;
    var URLPrefix = {
        "yhd_domain": ".yhd.com",
        "sam_passport_statics": "https://security.samsclub.cn/front-passport/passport",
        "chinese": "1号店",
        "passportother": "https://passport.1mall.com",
        "sam_domain": ".samsclub.cn",
        "sam_captcha_js_url": "https://security.samsclub.cn/captcha/js/api.js",
        "helpUrl": "http://www.yihaodian.com/cms/view.do?topicId=9864",
        "hk_passport_statics": "https://passport.yihaodian.com.hk/front-passport/passport",
        "yhd_captcha_host": "https://captcha.yhd.com",
        "tracker": "tracker.yhd.com",
        "sam_login_url": "https://security.samsclub.cn/customer/login_input.do",
        "sam_passport_host": "https://security.samsclub.cn",
        "central": "http://www.yhd.com",
        "out3wurl": "www.yihaodian.com",
        "yhd_passport_host": "https://passport.yhd.com",
        "sam_request_namespace": "/customer",
        "mySite": "http://my.yihaodian.com/member/my.do",
        "passport_statics": "https://passport.yhd.com/front-passport/passport",
        "yaowang": "http://www.111.com.cn",
        "sam_captcha_host": "https://security.samsclub.cn",
        "my": "http://my.yhd.com",
        "httpurl": "http://www.yihaodian.com",
        "mymall": "http://my.1mall.com",
        "yhd_login_url": "https://passport.yhd.com/passport/login_input.do",
        "agreementUrl": "http://cms.yhd.com/cms/view.do?topicId=10",
        "no3wUrl": "yhd.com",
        "h5AgreementUrl": "http://cms.yhd.com/cms/view.do?topicId=54",
        "yiwangauth": "http://mall.yiwang.cn",
        "webStaticResourceUrl": "http://image.yihaodianimg.com",
        "passport": "https://passport.yhd.com",
        "validCodeShowUrl": "https://captcha.yhd.com/public/validcode.do",
        "mall": "http://www.1mall.com"
    };
    var yhdUrl = "http://www.yhd.com";
    var yhdPassportUrl = "https://passport.yhd.com";
    var loli = window['loli'] || {};
    var valid_code_service_flag = "1";
</script>
<script type="text/javascript"
        src="https://passport.yhd.com/front-passport/passport/js/jquery.cookie.js?01ce9c7 "></script>

<div class="login_wrap">
    <div class="wrap clearfix">
        <div class="mod_login_wrap">
            <div class="login_pc">
                <p id="error_tips" class="error_tips" style="display:none">您填写的账户名不存在请核对后重新填写</p>
                <div class="clearfix">
                    <h3>1号店用户登录</h3>
                    <a href="/index/reg" class="regist_new blue_link">注册新账号</a>
                </div>

                <div class="login_form">
                    <form action="/index/login" method="post">
                        {{ csrf_field() }}
                    <div class="form_item_wrap">
                        <div class="form_item">
                            <label class="user_ico">&nbsp;</label>
                            <input id="un" type="text" name="username" class="ipt ipt_username gay_text" style="outline: none;" value="">
                        </div>
                        <div class="form_item">
                            <label class="paswd_ico">&nbsp;</label>
                            <input id="pwd" type="password"  name="password" class="ipt ipt_password gay_text" placeholder="密码 " style="outline: none;">

                        </div>
                        {{--<div id="vcd_div" class="verify_code clearfix" style="display: block;">--}}
                            {{--<input id="validateSig" type="hidden">--}}
                            {{--<div class="form_item cur_right">--}}
                                {{--<label class="verify_ico">&nbsp;</label>--}}
                                {{--<input id="vcd" type="text" name="validCode" maxlength="4" tabindex="1" value="验证码"--}}
                                       {{--class="ipt ipt_code gay_text"--}}
                                       {{--onblur="javascript: jsLoginValidatCode.checkValidCodeOnBlur()"--}}
                                       {{--onkeyup="javascript: jsLoginValidatCode.checkValidCodeOnKeyUp();">--}}
                                {{--<span tabindex="-1" class="code_right" id="code_right"></span>--}}
                                {{--<span tabindex="-1" class="code_wrong" id="code_wrong"></span>--}}
                            {{--</div>--}}
                            {{--<a class="verify_code_box"--}}
                               {{--onclick="jsLoginValidatCode.passport_refresh_valid_code();return false;" href="#">--}}
                                {{--<img id="valid_code_pic" name="valid_code_pic">--}}
                                {{--<i tabindex="-1" class="btn_change">换一张</i>--}}
                            {{--</a>--}}
                        {{--</div>--}}

                        <div class="auto_login clearfix">
                            {{--<p class="clearfix">--}}
                                {{--<a id="check_agreement" href="#" class="uncheck_agreement">自动登录</a>--}}
                                {{--<input id="autoLoginCheck" type="hidden">--}}
                                {{--<span id="agreement_tips" class="auto_tips" style="display: none;">请勿在公用电脑上启用</span>--}}
                            {{--</p>--}}
                            <p class="service_agreement">点击登录，表示您同意1号店<a
                                    href="http://cms.yhd.com/cms/view.do?topicId=10" class="blue_link" target="_blank">《服务协议及隐私声明》</a>
                            </p>
                            {{--<a href="" target="_blank" class="forget_pswd" tabindex="-1">忘记密码？</a>--}}
                        </div>
                        @if(session('error'))
                            <div class="alert alert-danger">
                                {{session('error')}}
                            </div>
                        @endif
                        <button id="login_button" type="submit" class="login_btn">登录</button>

                    </div>
                    </form>
                </div>
            </div>
            <div class="login_switch" style="display: none;">
                <em></em>
                <a href="javascript:;" class="two_dimension_code"></a>
                <a href="javascript:;" class="static_pc"></a>
            </div>
        </div>
        <div class="mod_left_banner"><a id="imgLink" target="_blank"><img id="img"
                                                                          src="https://passport.yhd.com/front-passport/passport/images/login_pic.png"></a>
        </div>
    </div>
</div>

<div class="mod_login_bindmb_point"></div>


<div id="simplefooter"><a href="http://www.miibeian.gov.cn/" target="_blank">沪ICP备16050468号</a>|<a>沪B2-20170039</a>|<a
        href="http://d7.yihaodianimg.com/N09/M07/BD/7B/ChEi11kJnKaAJQMrAAK-LnhML4o60600.jpg"
        data-ref="YHD_Footer_Licence" target="_blank">营业执照</a>
    <p>Copyright © 1号店网上超市 2007-2017，All Rights Reserved</p></div>

<script type="text/javascript" src="https://captcha.yhd.com/captcha/js/api.js?0.249035566"></script>


<script>
    pageInit();


    $(document).ready(function () {
        var isIE = !!window.ActiveXObject;
        var isIE6 = isIE && !window.XMLHttpRequest;
        if (isIE6) {
            $(".login_switch").hide();
        }
        if (0 == 0) {
            $(".login_switch").hide();
        }

        jsLoginFed.loadImageUrl("1", "Passport_Login_Ad_Click");

        var host = window.location.host;
        var reg_host = /([a-z0-9_-]+\.)*(yhd|yihaodian|1mall|111)\.(com\.hk)$/;
        if (reg_host.test(host)) {
            var requestUrl = URLPrefix.passport + "/passport/cookie_rurl_synchronization.do";
            cookie_sync.cookieRURLSynchronization(requestUrl);

            if (window.addEventListener) {
                window.addEventListener("message", handMessage, false);
            }
            else {
                window.attachEvent("onmessage", handMessage);
            }

            $(".login_switch").hide();
        }
    });

    function handMessage(event) {
        event = event || window.event;
        if (event.origin === 'https://passport.yhd.com') {
            var obj = eval('(' + event.data + ')');
            window.location = obj.returnUrl;
        }
    }
</script>
</body>
</html>