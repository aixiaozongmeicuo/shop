<!doctype html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="tp_page" content="3.0">
    <title>注册</title>
    <link href="https://passport.yhd.com/front-passport/passport/css/register_3.0.css?01ce9c7 " rel="stylesheet"
          type="text/css">
    <script src="https://passport.yhd.com/front-passport/passport/js/register_new.js?01ce9c7 "></script>
    <script type="text/javascript" async="" src="https://captcha.yhd.com/captcha/js/captcha.js?v=20170704"></script>
</head>
<body>
<link rel="shortcut icon" href="https://passport.yhd.com/front-passport/passport/images/yhd_favicon.ico">
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

<input type="hidden" id="validateSig">
<input type="hidden" name="returnUrl" value="http://www.yhd.com" id="returnUrl">
<input id="p" type="hidden" value="">
<input type="password" style="display:none">
<div class="y_regist_wrap">
    <!--背景小图标 -->
    <div class="r_icon1"></div>
    <div class="r_icon2"></div>
    <div class="r_icon3"></div>
    <div class="r_icon4"></div>
    <div class="r_icon5"></div>
    <div class="y_regist_model">

        <h4 class="y_regist_tit">1号店注册</h4>

        <div class="y_regist_form">
            <form action="/index/reg" method="post">
                {{ csrf_field() }}
            <ul class="clearfix">
                <li>
                    <div class="y_same_item">
                        <input class="ysame_input" type="text" value="" id="userName" name="username">
                        <span class="y_same_label">用户名</span>

                    </div>

                    <div class="y_regist_tips y_regist_tips_black" style="top: 16px;">
                        <div class="y_regtip_rel">
                            <i></i>
                            <div class="y_tips_words">

                            </div>
                        </div>
                    </div>

                    <div class="y_regist_right"></div>
                    <!--提示信息end -->
                </li>


                {{--<li class="ishort_li clearfix" style="display: block;" id="validCodeDiv">--}}
                    {{--<div class="fl y_same_item">--}}
                        {{--<input class="ysame_input" type="text" value="" id="validCode">--}}
                        {{--<span class="y_same_label">验证码</span>--}}
                    {{--</div>--}}
                    {{--<a class="fl r_yzm_code" href="javascript:;" id="changevalidate">--}}
                        {{--<img id="validateImg" width="124" height="50">--}}
                        {{--<span class="yzm_change_mask"><em></em><i>换一张</i></span>--}}
                    {{--</a>--}}
                    {{--<!-- -->--}}
                    {{--<div class="y_regist_tips y_regist_tips_red" style="top: 26px;">--}}
                        {{--<div class="y_regtip_rel">--}}
                            {{--<i></i>--}}
                            {{--<div class="y_tips_words">--}}
                                {{--请输入正确的验证码--}}
                            {{--</div>--}}
                        {{--</div>--}}
                    {{--</div>--}}
                {{--</li>--}}

                <li>
                    <div class="y_same_item">
                        <input class="ysame_input y_set_password" type="password" oncopy="return false;"
                               oncut="return false;" onpaste="return false;" autocomplete="off" id="password" name="password">
                        <span class="y_same_label">设置密码</span>
                    </div>
                    <div class="y_regist_tips y_regist_tips_red" style="top: 6px;">
                        <div class="y_regtip_rel">
                            <i></i>
                            <div class="y_tips_words">
                                6-20个大小
                            </div>
                        </div>
                    </div>

                    <div class="y_regist_tips_keywords strength_l">
                        <div class="y_regtip_rel">
                            <i></i>
                            <div class="y_tips_words y_tips_words_key">
                                <em class="em_redA"></em>
                                <em></em>
                                <em></em>
                                <b class="em_words">低</b>
                            </div>
                        </div>
                    </div>

                    <div class="y_regist_tips_keywords strength_m">
                        <div class="y_regtip_rel">
                            <i></i>
                            <div class="y_tips_words y_tips_words_key">
                                <em class="em_yellowA1"></em><em class="em_yellowA1"></em><em></em><b
                                    class="em_words">中</b>
                            </div>
                        </div>
                    </div>

                    <div class="y_regist_tips_keywords strength_h">
                        <div class="y_regtip_rel">
                            <i></i>
                            <div class="y_tips_words y_tips_words_key">
                                <em class="em_greenA1"></em><em class="em_greenA1"></em><em class="em_greenA1"></em><b
                                    class="em_words">高</b>
                            </div>
                        </div>
                    </div>
                </li>

                <li>
                    <div class="y_same_item">
                        <input class="ysame_input" type="password" oncopy="return false;" oncut="return false;"
                               onpaste="return false;" id="password2" name="confirmpassword">
                        <span class="y_same_label">确认密码</span>
                    </div>

                    <div class="y_regist_tips y_regist_tips_red" style="top: 6px;">
                        <div class="y_regtip_rel">
                            <i></i>
                            <div class="y_tips_words">
                                请再次输入密码
                            </div>
                        </div>
                    </div>

                    <div class="y_regist_right"></div>
                </li>

                <li>
                    <div class="y_agreement_word">点击注册，表示您同意1号店 <a href="http://cms.yhd.com/cms/view.do?topicId=10"
                                                                   target="_blank">《服务协议及隐私声明》</a></div>
                    <a class="y_agreement_btn" href="#">同意协议并注册</a>
                </li>
            </ul>
            </form>
            {{--@if(session('error'))--}}
                {{--<div class="alert alert-danger">--}}
                    {{--{{session('error')}}--}}
                {{--</div>--}}
            {{--@endif--}}
        </div>
    </div>
</div>
{{--@include('admin.public.error')--}}
{{--@include('flash::message')--}}
<script>
    $(function () {
        $(".y_agreement_btn").click(function () {
            $("form").submit();
        })
    })
</script>
<!--// y_regist_wrap ending -->
<script type="text/javascript" src="https://captcha.yhd.com/captcha/js/api.js?0.4643135839"></script>


<div id="simplefooter"><a href="http://www.miibeian.gov.cn/" target="_blank">沪ICP备16050468号</a>|<a>沪B2-20170039</a>|<a
        href="http://d7.yihaodianimg.com/N09/M07/BD/7B/ChEi11kJnKaAJQMrAAK-LnhML4o60600.jpg"
        data-ref="YHD_Footer_Licence" target="_blank">营业执照</a>
    <p>Copyright © 1号店网上超市 2007-2017，All Rights Reserved</p></div>
<script type="text/javascript">
    var showValidCodeWhenRegistByMobile = false;
    var registerValidateUserBehaviorSwitcher = true;
    jRegist.init();
</script>


<div id="__yct_container__" style="display: none; visibility: hidden;">
    <script src="https://captcha.yhd.com/public/getenv.do?f=gzMhFzMmNWY1U2N4cDOmlTYlJDNmJDZ2kjN3cTNmlTN&amp;callback=ccb&amp;t=1507775288864"></script>
</div>
<input type="hidden" id="__yct_str__" name="__yct_str__"
       value="VHJQNsn09RbD2svwi5opO2N7ihMHX0JXkVBKia%2F4UbH%2BYjtq3rkw3pS96SMeie%2FIH0GCt21AwDKHO9OFL3kN4ZOaSKGYPTsJUt5yfBE3qzi0HvPqRck6PJ9yPSODlGnO2ZItsAeyBqCsOJmb7A7F0YVeyBcjRMzkMiEAtQh%2FnGZHZllCE7JEWAF9zNgNNH3hFTDZL7AZglaJoqNGcXUIkRutCURMc5%2ByFlMOYbICr43SczxVk5sErFhg6yV7HZW4pYmK8JGrP3wYh8IQw0P0akft7UtbLvkKS5zlsI%2BLANThzSROXW3qCes0mAaZ47C6OBZiPKfdSvyhLgho1Qln7o3QrN2rXgwzzceVsqJF3492%2FF%2F7z8RsMywnhIpPI5zCoSnC6Pic90NyjyDSm6vECuImzgX2pcyr9eW1pO9i3tw%3D">
</body>
</html>