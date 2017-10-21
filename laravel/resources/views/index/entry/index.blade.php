<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>index</title>
    <!--css start-->
    <link href="../css/global_site_index.css?1b2fe31" rel="stylesheet" type="text/css">
    <link href="../css/index.css?1b2fe31" rel="stylesheet" type="text/css">
    <!--css end-->
    <!--js start-->
    <script type="text/javascript">
        var URLPrefix = {
            "shop": "//shop.yhd.com",
            "busystock": "//gps.yhd.com",
            "cms": "//cms.yhd.com",
            "img": "//image.yihaodian.com",
            "pms": "//pms.yhd.com",
            "my_statics": "//static.yihaodian.com/member",
            "passportmall": "https://passport.1mall.com",
            "shoping_pms": "//pms.yihaodian.com",
            "shoping_shop": "//shop.yhd.com",
            "search": "//search.yhd.com",
            "sitedomain": ".yhd.com",
            "tryUrl": "//try.yhd.com",
            "shoping_self": "//www.yhd.com",
            "tracker": "tracker.yhd.com",
            "commentZoneMall": "//e.1mall.com/front-pe",
            "productDetailHost": "//www.yhd.com",
            "central": "//www.yhd.com",
            "search_list": "//search.yhd.com",
            "cartDomain": "//cart.yhd.com",
            "footFriendLink": "//www.yhd.com/friendlink/index.do",
            "centralShop": "//shop.yhd.com",
            "shoping_passport": "https://passport.yhd.com",
            "shoping_my_statics": "//static.yihaodian.com/statics",
            "uploadPostUrl": "//upload.yihaodian.com/upload/UploadAction",
            "shoping_my": "//my.yhd.com",
            "shoping_search": "//search.yhd.com:80",
            "shoping_opposite": "//www.1mall.com",
            "shoping_central": "//www.yhd.com",
            "my": "//my.yhd.com",
//            "search_keyword": "//search.yhd.com",
            "mymall": "//my.1mall.com",
            "selfroot": "//www.yhd.com",
            "products_stock": "//gps.yhd.com/busystock",
            "sitedomainmall": ".1mall.com",
            "item": "//item.yhd.com/",
            "tuangou": "//www.yhd.com/tuangou/index.do",
            "commentZoneYhd": "//e.yhd.com/front-pe",
            "centralImgDomain": ".yihaodianimg.com",
            "productDetailUrl": "//www.yhd.com",
            "passport": "https://passport.yhd.com",
            "statics": "//img.yihaodianimg.com/front-homepage",
            "mobile": "http://m.yhd.com",
            "mall": "//www.1mall.com"
        };
        var headerType = "index_v1";
        var imagePath = "//img.yihaodianimg.com/front-homepage/global/images";
        var currSiteId = 1;
        var currSiteType = 1;
        var globalEnv = "PRODUCTION";
        var siteStyle = 1;
        var siteFlag = 0;
        var isIndex = 1;
        var indexFlag = 1;
        var currProvinceId = 1;
        var currVersionNum = "0dc2e39";
        var lazyLoadImageObjArry = lazyLoadImageObjArry || [];
        var isFixTopNav = true;
        (function (flag) {
            if (flag) {
                window.globalPrismFlag = '1';
                window.globalPrismFeedbackURL = '//cms.yhd.com/cms/view.do?topicId=43';
                window.globalPrismQRName = '';
                window.globalPrismQRTitle = '手机购物更优惠';
                window.globalPrismQRPng = '//img.yihaodianimg.com/front-homepage/index/images/qryhd.png';
                window.globalPrismMemberLink = '//home.yhd.com/myyhdindex/index.do';
                window.globalPrismCartLink = '//cart.yhd.com/cart/cart.do';
                window.globalPrismCouponLink = '//coupon.yhd.com/myCoupon';
            }
        })(true);
        <!--增加一个开关来控制是否显示搜索框下拉,为时才不调用-->
        <!--搜索热词开关-->
        <!--用于控制宽窄屏属性-->
        var isWidescreen = (screen.width >= 1280);
    </script>
    <!--js end-->
    <!-- head include start -->
    <script type="text/javascript">
        (function () {
            try {
                window.__flagPrivilege = 1;
            } catch (err) {
            }
        })();
    </script>
</head>
<body>

<!--公共头部-->
<div class="hd_header_wrap">
    <!--topbar-->
    <div class="hd_top_bar">
        <div class="wrap clearfix">
            <div class="hd_indxProvce hd_has_child" id="headerSelectProvince"></div>
            <div class="hd_topbar_right">
                <ul>
                    <li id="global_unlogin">
                        <div class="hd_unlogin">
                            <span class="hd_hi">Hi,请</span>
                            <a href="" class="hd_login_link">登录&nbsp;</a>
                            <a href="" class="hd_regist_link">&nbsp;注册</a>
                        </div>
                    </li>
                    <li id="global_login" class="hd_has_child" style="display:none" data-type="2017">
                        <div class="hd_login">
                            <span class="hd_hi">Hi,</span>
                            <i class="hd_iconfont"></i>
                        </div>
                        <div class="hd_user_privilege">
                            <a href="javascript:;" class="hd_login_out">退出</a>
                        </div>
                    </li>
                    <li>
                        <div class="hd_menu hd_notice" id="hdUserMsg" style="display: none" data-cfg="1">
                            <a href="" rel="nofollow" target="_blank">我的消息&nbsp;(<em class="hd_has_num">0</em>)</a>
                        </div>
                    </li>
                    <li>
                        <div class="hd_menu">
                            <a href="" target="_blank" rel="nofollow"><i class="hd_iconfont"></i>我的订单</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="wrap hd_header ">
        <div class="hd_logo_area">
            <a href="" class="hd_logo"><img
                    src="//d9.yihaodianimg.com/N09/M03/85/8D/ChEi11jziCeADU2FAAAcush2hwQ74100.png" alt=""></a>
        </div>
        <div class="hd_header_right">
            <div class="clearfix">
                <div class="hd_head_search">
                    <div class="hd_search_form" id="hdSearchForm">
                        <div class="hd_fixed_wrap">
                            <a href="" class="hd_fixed_logo"><img
                                    src="//d7.yihaodianimg.com/N09/M09/85/8D/ChEi11jziUSAOkn4AABJ2dwtrSw01400.jpg"
                                    alt="" width="205" height="70"></a>
                            <div class="hd_search_wrap clearfix">
                                <label for="keyword" style="display:none;">请输入关键词</label>
                                <input class="hd_search_ipt" name="keyword" id="keyword" type="text" value=""
                                       placeholder="请输入关键词" original="请输入关键词" url="" style="color:#333333;"
                                       maxlength="100" autocomplete="off" x-webkit-speech=""
                                       onwebkitspeechchange="emptySearchBar();" x-webkit-grammar="builtin:translate">
                                <button type="button" class="hd_search_btn" onclick="javascript:searchMeForClick();"><i
                                        class="hd_iconfont"></i></button>
                            </div>

                        </div>
                    </div>
                    <p id="hotKeywordsShow" class="hd_hot_search">
                        <a title="电热壶" target="_blank" href="">电热壶</a>
                    </p>
                    <!--搜索推荐-->
                </div>

                <!--购物车-->
                <div class="hd_mini_cart" id="miniCart" data-version="1">
                    <u class="hd_c_num none" id="in_cart_num" style="display: none;"></u>
                    <a class="hd_prism_cart" href="" data-ref="YHD_TOP_MINICART">
                        <em class="hd_iconfont"></em>
                        <span>购物车</span>
                    </a>
                    <div class="hd_cart_show none" id="showMiniCartDetail">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--轮播图部分-->
<div class="first_screen_main">
    <!--大促皮肤 begin -->
    <div class="promotion_skin" id="promotion_skin"><!--窄屏下不用传大促背景图 -->
        <div class="left_promotion_skin" data-src="" style="background-image: url(&quot;&quot;);"></div>
        <div class="right_promotion_skin" data-src="" style="background-image: url(&quot;&quot;);"></div>
    </div>
    <div class="wrap position_wrap">
        <div class="mod_hd_allsort">
            <ul class="hd_allsort hd_more_allsort" id="allsort">
                @foreach($oneCategory as $v)
                <li data-mrt="1" categoryid="1741" index="1"  class="">
                    <h3 class="hd_gray_bg">
                        <i class="hd_iconfont hd_floor_color"></i>
                        <a title="{{$v['cname']}}" href="" target="_blank">{{$v['cname']}}</a>
                    </h3>
                    <div class="hd_show_sort hd_allsort clearfix">
                        <div class="hd_good_category">
                            @foreach($v['secondCategory'] as $vv)
                            <dl class="clearfix">
                                <dt>
                                    <a categoryid="5326" href="" target="_blank">{{$vv['cname']}}</a><i> &gt;</i>
                                </dt>
                                <dd>
                                    @foreach($vv['threeCategory'] as $vvv)
                                        <a categoryid="5327"href=""target="_blank">{{$vvv['cname']}}</a>
                                    @endforeach
                                </dd>
                            </dl>
                            @endforeach
                        </div>
                    </div>
                </li>
                @endforeach
            </ul>
        </div>
        <!-- 个人中心开始 -->
        <div class="mod_personal_center vip2_center" id="index_account">
            <div class="avata_pic_wrap">
                <a id="index_account_icon_login" style="display: none;" href="" target="_blank"></a>
                <a id="index_account_icon_unlogin" href="" target="_blank"></a>
            </div>
            <div class="info_wrap">
                <div class="login_box" style="display: none;" id="index_account_info_login">
                    <div class="user_info clearfix">
                        <em>Hi，__nickName__</em>
                        <a href="//vip.yhd.com" target="_blank" class="hd_vip">__gradeDesc__</a>
                    </div>
                </div>
                <div class="unlogin_box" id="index_account_info_unlogin" style="display:block;">
                    <div>Hi~你好!</div>
                    <div class="tips">
                    </div>
                    <div class="btn_wrap">
                        <a href="" class="login_btn">登录</a>
                        <a href="" class="regist_btn">注册</a>
                    </div>
                </div>
            </div>
        </div>
        <!-- 个人中心结束 --> </div>
    <div class="mod_promo_show" id="promo_show">
        <div class="promo_wrapper">
            <ul id="slider" data-init="0" data-bgflag="1">
                <li style="background-color: rgb(249, 75, 41); position: absolute; z-index: 0; display: none;"
                    data-bgcolor="#f94b29" flag="1" data-advid="21971">
                    <a href="//sale.yhd.com/act/ZGfFcrQW7q.html" target="_blank" title="吃货节"
                       data-img="//img30.360buyimg.com/img/jfs/t10201/202/1379710493/157023/deeee1c/59e085d3N286174e6.jpg"
                       class="" data-tag="0" clstag="pageclick|keycount|home_201709224|10">
                        <div class="promo_img"
                             style="background-image: url(//img30.360buyimg.com/img/jfs/t10201/202/1379710493/157023/deeee1c/59e085d3N286174e6.jpg)"></div>
                    </a>
                </li>
                <li style="background-color: rgb(54, 168, 255); position: absolute; z-index: 0; display: none;"
                    data-bgcolor="#36a8ff" flag="2" data-advid="21972">
                    <a href="//sale.yhd.com/act/u5tlWf4EQi1.html" target="_blank" title="酒水饮料"
                       data-img="//img30.360buyimg.com/img/jfs/t10819/267/1128954520/79916/4663c8d7/59dc928aN0dec4d09.jpg"
                       class="" data-tag="0" clstag="pageclick|keycount|home_201709224|11">
                        <div class="promo_img"
                             style="background-image: url(//img30.360buyimg.com/img/jfs/t10819/267/1128954520/79916/4663c8d7/59dc928aN0dec4d09.jpg)"></div>
                    </a>
                </li>
                <li style="background-color: rgb(75, 89, 238); position: absolute; z-index: 0; display: none;"
                    data-bgcolor="#4b59ee" flag="3" data-advid="21973">
                    <a href="//sale.yhd.com/act/W5toKbfainwjY7uT.html" target="_blank" title="每满199减100"
                       data-img="//img30.360buyimg.com/img/jfs/t10834/312/1427437485/92986/4238ce4a/59e0a799N1a021fad.jpg"
                       class="" data-tag="0" clstag="pageclick|keycount|home_201709224|12">
                        <div class="promo_img"
                             style="background-image: url(//img30.360buyimg.com/img/jfs/t10834/312/1427437485/92986/4238ce4a/59e0a799N1a021fad.jpg)"></div>
                    </a>
                </li>
                <li style="background-color: rgb(71, 170, 235); position: absolute; z-index: 0; display: none;"
                    data-bgcolor="#47aaeb" flag="4" data-advid="21974">
                    <a href="https://sale.yhd.com/act/jKCaxrF32JSRkvZL.html" target="_blank" title="都是全屏惹的祸"
                       data-img="//img30.360buyimg.com/img/jfs/t10099/65/1324936594/119797/91ccae03/59df4eddN7d329681.jpg"
                       class="" data-tag="0" clstag="pageclick|keycount|home_201709224|13">
                        <div class="promo_img"
                             style="background-image: url(//img30.360buyimg.com/img/jfs/t10099/65/1324936594/119797/91ccae03/59df4eddN7d329681.jpg)"></div>
                    </a>
                </li>
                <li style="background-color: rgb(111, 201, 254); position: absolute; z-index: 0; display: none;"
                    data-bgcolor="#6fc9fe" flag="5" data-advid="21975">
                    <a href="//ccc-x.jd.com/dsp/nc?ext=aHR0cHM6Ly9zYWxlLnloZC5jb20vYWN0L2tteVZJTXhncmwuaHRtbA&amp;log=vROB-S7ND34rnvkTGw8X3cMMEhoLoDHwunErZ_6bt4_rTyDSXjvXVyos9LfI87N7uVFULQFVK2VbepLXE52BVOWPRGKBe7KDau5deW5fnSqGeHT-RLT9XgAzcjsYQzO4Mb2uYDlAXCVHH-LtK18dMgTcr0zThpdOmeoYgPA80GQEkLDZWskFYfdxMqAndGeaSsx0ZehltnkQsRIUi92G8DSaY6zybHDhEJGkSsd5ywoTmZj9NqxHdqqObrk-Y_D_h4zivBS0ow8Rajc3wneJbQ&amp;v=404"
                       trackerurl="//im-x.jd.com/dsp/np?log=vROB+S7ND34rnvkTGw8X3cMMEhoLoDHwunErZ/6bt4891bT2fUM3X5zhAxWCuOgeQbaZWJuCI+2qBsK9hOeaGl+Ugb6z17wfKPsj2kn3CYENNKo9Nfq0XwZgy40JiLBOizRYv+lbGOE3Idv8a+/wB9P5DhAfFEvJxUI/UcDCYjbuewivbyGmnWLvaucFDgTXwsmYEGCelic1uq7QcbHSPfhbb0pw7KVtUmXA+dHOpx9BbxmOY4Nup2dte7V6v6TAYYy3eiT41sdwXARcHAB//cPkTZieYec4OiGs8zeC9n4=&amp;v=404"
                       target="_blank" title="不止五折"
                       data-img="//img1.360buyimg.com/da/jfs/t10993/122/1643511393/166241/167ed0a3/59e45e38N6dad8bd0.jpg"
                       class="" data-tag="0" clstag="pageclick|keycount|home_201709224|14" data-done="1">
                        <div class="promo_img"
                             style="background-image: url(//img1.360buyimg.com/da/jfs/t10993/122/1643511393/166241/167ed0a3/59e45e38N6dad8bd0.jpg)"></div>
                    </a>
                </li>
                <li style="background-color: rgb(211, 190, 145); position: absolute; z-index: 1; display: list-item;"
                    data-bgcolor="#d3be91" flag="6" data-advid="21976">
                    <a href="https://sale.yhd.com/act/PUiE8fXcK4.html" target="_blank" title="女装馆"
                       data-img="//img30.360buyimg.com/img/jfs/t9943/20/1181256357/143163/7c7ba4a1/59dd7f9aNd98f597d.jpg"
                       class="" data-tag="0" clstag="pageclick|keycount|home_201709224|15">
                        <div class="promo_img"
                             style="background-image: url(//img30.360buyimg.com/img/jfs/t9943/20/1181256357/143163/7c7ba4a1/59dd7f9aNd98f597d.jpg)"></div>
                    </a>
                </li>
                <li style="background-color: rgb(21, 11, 5); position: absolute; z-index: 0; display: none;"
                    data-bgcolor="#150b05" flag="7" data-advid="21977">
                    <a href="https://sale.yhd.com/act/1ZsylUBDoGL.html" target="_blank" title="家电"
                       data-img="//img30.360buyimg.com/img/jfs/t8974/257/2622069952/132956/8fcd93c0/59df36daN2ea2e7d6.jpg"
                       class="" data-tag="0" clstag="pageclick|keycount|home_201709224|16">
                        <div class="promo_img"
                             style="background-image: url(//img30.360buyimg.com/img/jfs/t8974/257/2622069952/132956/8fcd93c0/59df36daN2ea2e7d6.jpg)"></div>
                    </a>
                </li>
                <li style="background-color: rgb(46, 26, 89); position: absolute; z-index: 0; display: none;"
                    data-bgcolor="#2e1a59" flag="8" data-advid="21978">
                    <a href="//sale.yhd.com/act/qPrt1ni0fNoWG.html" target="_blank" title="全球美食"
                       data-img="//img30.360buyimg.com/img/jfs/t7468/260/3397423205/88536/61455ec4/59e4787fN33017cb7.jpg"
                       class="" data-tag="0" clstag="pageclick|keycount|home_201709224|17">
                        <div class="promo_img"
                             style="background-image: url(//img30.360buyimg.com/img/jfs/t7468/260/3397423205/88536/61455ec4/59e4787fN33017cb7.jpg)"></div>
                    </a>
                </li>
            </ul>
        </div>
        <div class="promonum_show">
            <ol class="clearfix" id="lunboNum" style="">
                <li flag="1" href="javascript:void(0);" data-advid="21971" class=""><i></i></li>
                <li flag="2" href="javascript:void(0);" data-advid="21972" class=""><i></i></li>
                <li flag="3" href="javascript:void(0);" data-advid="21973" class=""><i></i></li>
                <li flag="4" href="javascript:void(0);" data-advid="21974" class=""><i></i></li>
                <li flag="5" href="javascript:void(0);" data-advid="21975" class=""><i></i></li>
                <li flag="6" href="javascript:void(0);" data-advid="21976" class="cur"><i></i></li>
                <li flag="7" href="javascript:void(0);" data-advid="21977" class=""><i></i></li>
                <li flag="8" href="javascript:void(0);" data-advid="21978" class=""><i></i></li>
            </ol>
        </div>
        <a href="javascript:void(0);" class="show_next" style="display: none;"><i class="index_iconfont"></i></a>
        <a href="javascript:void(0);" class="show_pre" style="display: none;"><i class="index_iconfont"></i></a>
    </div>
</div>
<!--轮播图部分结束-->

<!--1号抢购部分-->
<div class="wrap mod_seckill clearfix" id="qianggouMod" data-tpa="YHD_PCSY_QIANG">
    <a href="" target="_blank" class="count_down">
        <p class="count_down_tips">本场剩余</p>
        <div class="count_time" data-startdate="2017-10-12-08-00-00" data-enddate="2017-10-12-10-00-00" data-load="1">
            <span class="clock_time time_hour">01</span>
            <i>:</i>
            <span class="clock_time time_minit">32</span>
            <i>:</i><span class="clock_time time_second">59</span>
        </div>
        <p class="view_more">查看更多<i> &gt;</i></p>
    </a>
    <div class="seckill_list_wrap seckill_all_pro">
        <a href="javascript:;" class="hd_iconfont prev">
        </a>
        <div class="seckill_list">
            <ul class="clearfix" style="margin-left: 0px;">
                <li class="prod" data-status="2">
                    <div class="dotted_line"></div>
                    <a href="//qianggou.yhd.com/1-1067446" target="_blank" title="德国进口牛奶 德亚（Weidendorf）全脂 200ml*30"
                       class="clearfix">
                        <div class="pro_detail">
                            <p class="pro_name">德国进口牛奶 德亚（Weidendorf）全脂 200ml*30</p>
                            <p class="pro_price" grouponid="1067446" data-pricedone="1">¥<em>76</em></p>
                            <p class="reference_price">参考价：¥<span>195</span></p>
                        </div>
                        <img src="https://img12.360buyimg.com/mobilecms/s450x450_jfs/t5725/339/9007878255/424280/8c083797/59819709Nd61baf4e.jpg"
                             alt="德国进口牛奶 德亚（Weidendorf）全脂 200ml*30" class="pro_pic">
                        <div class="marking_label">已售1%</div>
                    </a>
                </li>
                <li class="prod" data-status="2">
                    <div class="dotted_line">

                    </div>
                    <a href="//qianggou.yhd.com/1-940885" target="_blank"
                       title="滴露（Dettol）健康沐浴露 滋润倍护 935克 双瓶装（身体沐浴乳 沐浴液 男女通用）" class="clearfix">
                        <div class="pro_detail">
                            <p class="pro_name">滴露（Dettol）健康沐浴露 滋润倍护 935克 双瓶装（身体沐浴乳 沐浴液 男女通用）</p>
                            <p class="pro_price" grouponid="940885" data-pricedone="1">¥<em>35.9</em></p>
                            <p class="reference_price">参考价：¥<span>65.9</span></p>
                        </div>
                        <img src="https://img10.360buyimg.com/mobilecms/s450x450_jfs/t4267/220/3226831626/147663/7a134254/58dce2adN84cec649.jpg"
                             alt="滴露（Dettol）健康沐浴露 滋润倍护 935克 双瓶装（身体沐浴乳 沐浴液 男女通用）" class="pro_pic">
                        <div class="marking_label">已售1%</div>
                    </a>
                </li>
                <li class="prod" data-status="2">
                    <div class="dotted_line"></div>
                    <a href="//qianggou.yhd.com/1-1424753" target="_blank"
                       title="滴露Dettol 健康抑菌洗手液 滋润倍护 特惠装 500g/瓶 送 300g补充装" class="clearfix">
                        <div class="pro_detail">
                            <p class="pro_name">滴露Dettol 健康抑菌洗手液 滋润倍护 特惠装 500g/瓶 送 300g补充装</p>
                            <p class="pro_price" grouponid="1424753" data-pricedone="1">¥<em>12.9</em></p>
                            <p class="reference_price">参考价：¥<span>21</span></p>
                        </div>
                        <img src="https://img12.360buyimg.com/mobilecms/s450x450_jfs/t7702/273/2484796546/186299/55b0e470/59afc0e6N68c1be89.jpg"
                             alt="滴露Dettol 健康抑菌洗手液 滋润倍护 特惠装 500g/瓶 送 300g补充装" class="pro_pic">
                        <div class="marking_label">已售2%</div>
                    </a>
                </li>
                <li class="prod" data-status="2">
                    <div class="dotted_line"></div>
                    <a href="//qianggou.yhd.com/1-1453137" target="_blank" title="鹰唛 花生油 5L (实惠装)" class="clearfix">
                        <div class="pro_detail">
                            <p class="pro_name">鹰唛 花生油 5L (实惠装)</p>
                            <p class="pro_price" grouponid="1453137" data-pricedone="1">¥<em>84.9</em></p>
                            <p class="reference_price">参考价：¥<span>105</span></p>
                        </div>
                        <img src="https://img12.360buyimg.com/mobilecms/s450x450_jfs/t5746/3/856213207/158500/e3464f13/59223bcfNd61d6a35.jpg"
                             alt="鹰唛 花生油 5L (实惠装)" class="pro_pic">
                        <div class="marking_label">已售53%</div>
                    </a>
                </li>
                <li class="prod" data-status="2">
                    <div class="dotted_line"></div>
                    <a href="//qianggou.yhd.com/1-829435" target="_blank"
                       title="苏泊尔（SUPOR）电压力锅 一锅双胆 一键排压 精准控温 CYSB50YCW10DJ-100 5L高压锅" class="clearfix">
                        <div class="pro_detail">
                            <p class="pro_name">苏泊尔（SUPOR）电压力锅 一锅双胆 一键排压 精准控温 CYSB50YCW10DJ-100 5L高压锅</p>
                            <p class="pro_price" grouponid="829435" data-pricedone="1">¥<em>219</em></p>
                            <p class="reference_price">参考价：¥<span>799</span></p>
                        </div>
                        <img src="https://img12.360buyimg.com/mobilecms/s450x450_jfs/t4114/12/1554619856/217892/c6fd7535/587dcdcbNbd055de4.jpg"
                             alt="苏泊尔（SUPOR）电压力锅 一锅双胆 一键排压 精准控温 CYSB50YCW10DJ-100 5L高压锅" class="pro_pic">
                        <div class="marking_label">已售5%</div>
                    </a>
                </li>
                <li class="prod" data-status="2">
                    <div class="dotted_line"></div>
                    <a href="//qianggou.yhd.com/1-1103631" target="_blank" title="老榨坊香醇菜籽油 非转基因 物理压榨 食用油5L"
                       class="clearfix">
                        <div class="pro_detail">
                            <p class="pro_name">老榨坊香醇菜籽油 非转基因 物理压榨 食用油5L</p>
                            <p class="pro_price" grouponid="1103631" data-pricedone="1">¥<em>39.9</em></p>
                            <p class="reference_price">参考价：¥<span>69.9</span></p>
                        </div>
                        <img src="https://img11.360buyimg.com/mobilecms/s450x450_jfs/t6061/117/4395935513/77517/1da3e551/5961d43aNd470da56.jpg"
                             alt="老榨坊香醇菜籽油 非转基因 物理压榨 食用油5L" class="pro_pic">
                        <div class="marking_label">已售3%</div>
                    </a>
                </li>
                <li class="prod" data-status="2">
                    <div class="dotted_line"></div>
                    <a href="//qianggou.yhd.com/1-1389385" target="_blank"
                       title="爱倍宠物狗主粮 狗粮天然成犬粮10kg金毛哈士奇萨摩耶拉布拉多德牧边牧专用中小" class="clearfix">
                        <div class="pro_detail">
                            <p class="pro_name">爱倍宠物狗主粮 狗粮天然成犬粮10kg金毛哈士奇萨摩耶拉布拉多德牧边牧专用中小</p>
                            <p class="pro_price" grouponid="1389385" data-pricedone="1">¥<em>89</em></p>
                            <p class="reference_price">参考价：¥<span>278</span></p>
                        </div>
                        <img src="https://img11.360buyimg.com/mobilecms/s450x450_jfs/t5869/207/4537238262/298679/5bc0db2a/5950ded8N7d9c9a3e.jpg"
                             alt="爱倍宠物狗主粮 狗粮天然成犬粮10kg金毛哈士奇萨摩耶拉布拉多德牧边牧专用中小" class="pro_pic">
                        <div class="marking_label">已售2%</div>
                    </a></li>
                <li class="prod" data-status="2">
                    <div class="dotted_line"></div>
                    <a href="//qianggou.yhd.com/1-1125061" target="_blank"
                       title="【1件59元 2件89元 3件109元】 秋季新款时尚印花圆领套头卫衣男 货到付款 74601黑 L" class="clearfix">
                        <div class="pro_detail"><p class="pro_name">【1件59元 2件89元 3件109元】 秋季新款时尚印花圆领套头卫衣男 货到付款 74601黑
                            L</p>
                            <p class="pro_price" grouponid="1125061" data-pricedone="1">¥<em>59</em></p>
                            <p class="reference_price">参考价：¥<span>199</span></p></div>
                        <img src="https://img12.360buyimg.com/mobilecms/s450x450_jfs/t10339/67/374359404/94422/8f99e89c/59cda08cN40563ffc.jpg"
                             alt="【1件59元 2件89元 3件109元】 秋季新款时尚印花圆领套头卫衣男 货到付款 74601黑 L" class="pro_pic">
                        <div class="marking_label">已售4%</div>
                    </a></li>
                <li class="prod" data-status="2">
                    <div class="dotted_line"></div>
                    <a href="//qianggou.yhd.com/1-1447568" target="_blank"
                       title="茅台 王子酱品优级酒 53度 酱香型 500ml*6瓶 整箱装白酒（内含3只礼品袋）" class="clearfix">
                        <div class="pro_detail"><p class="pro_name">茅台 王子酱品优级酒 53度 酱香型 500ml*6瓶 整箱装白酒（内含3只礼品袋）</p>
                            <p class="pro_price" grouponid="1447568" data-pricedone="1">¥<em>899</em></p>
                            <p class="reference_price">参考价：¥<span>1908</span></p></div>
                        <img src="https://img11.360buyimg.com/mobilecms/s450x450_jfs/t5626/92/1397941094/253894/7595c368/59264dc6Nf344e653.jpg"
                             alt="茅台 王子酱品优级酒 53度 酱香型 500ml*6瓶 整箱装白酒（内含3只礼品袋）" class="pro_pic">
                        <div class="marking_label">已售2%</div>
                    </a></li>
                <li class="prod" data-status="2">
                    <div class="dotted_line"></div>
                    <a href="//qianggou.yhd.com/1-679854" target="_blank"
                       title="注音版影响孩子一生的励志故事8册儿童读物7-10-11-14岁青少年读物三四五六年级课外书" class="clearfix">
                        <div class="pro_detail"><p class="pro_name">注音版影响孩子一生的励志故事8册儿童读物7-10-11-14岁青少年读物三四五六年级课外书</p>
                            <p class="pro_price" grouponid="679854" data-pricedone="1">¥<em>25.8</em></p>
                            <p class="reference_price">参考价：¥<span>120</span></p></div>
                        <img src="https://img10.360buyimg.com/mobilecms/s450x450_jfs/t8023/183/104612448/447629/30f7a664/59a0cffeN0396c285.jpg"
                             alt="注音版影响孩子一生的励志故事8册儿童读物7-10-11-14岁青少年读物三四五六年级课外书" class="pro_pic">
                        <div class="marking_label">已售6%</div>
                    </a></li>
                <li class="prod" data-status="2">
                    <div class="dotted_line"></div>
                    <a href="//qianggou.yhd.com/1-1081284" target="_blank" title="澳纽宝 新西兰牛腩块 1000g/袋 草饲牛肉"
                       class="clearfix">
                        <div class="pro_detail"><p class="pro_name">澳纽宝 新西兰牛腩块 1000g/袋 草饲牛肉</p>
                            <p class="pro_price" grouponid="1081284" data-pricedone="1">¥<em>49.9</em></p>
                            <p class="reference_price">参考价：¥<span>86</span></p></div>
                        <img src="https://img12.360buyimg.com/mobilecms/s450x450_jfs/t4627/194/4227114034/70355/feb7d7db/590c21feN392f084f.jpg"
                             alt="澳纽宝 新西兰牛腩块 1000g/袋 草饲牛肉" class="pro_pic">
                        <div class="marking_label">已售3%</div>
                    </a></li>
                <li class="prod" data-status="2">
                    <div class="dotted_line"></div>
                    <a href="//qianggou.yhd.com/1-1480026" target="_blank"
                       title="伊利奶粉 金领冠系列 幼儿配方奶粉 3段1200克特惠三联装新包装（1-3岁幼儿适用）" class="clearfix">
                        <div class="pro_detail"><p class="pro_name">伊利奶粉 金领冠系列 幼儿配方奶粉 3段1200克特惠三联装新包装（1-3岁幼儿适用）</p>
                            <p class="pro_price" grouponid="1480026" data-pricedone="1">¥<em>121</em></p>
                            <p class="reference_price">参考价：¥<span>187</span></p></div>
                        <img src="https://img11.360buyimg.com/mobilecms/s450x450_jfs/t8167/167/1752979478/344052/f3fed4a1/59bf5371N14ea79fb.jpg"
                             alt="伊利奶粉 金领冠系列 幼儿配方奶粉 3段1200克特惠三联装新包装（1-3岁幼儿适用）" class="pro_pic">
                        <div class="marking_label">已售1%</div>
                    </a></li>
            </ul>
        </div>
        <a href="javascript:;" class="hd_iconfont next"></a></div>
</div>
<!--1号抢购结束-->

<!--团购，排行榜部分-->
<div class="wrap mod_brand_sale clearfix">
    <div class="left_banner" data-tpa="YHD_PCSY_PPTM">
        <a title="每日上新！" target="_blank" href="">
            <img src="//img30.360buyimg.com/img/jfs/t10081/348/339864437/96933/885f0098/59cc6934Nf3144a5b.jpg"
                 alt="品牌特卖" data-imgattr="wideimg">
            <div class="brand_caption">
                <h4>品牌特卖</h4>
                <p class="cut_line"></p>
                <p class="sub_tit">每日10:00上新！</p>
            </div>
        </a>
    </div>
    <div class="group_buy" id="tuangouMod" data-tpa="YHD_PCSY_TUAN"
         style="background-image:url(//d8.yihaodianimg.com/N10/M02/92/0C/ChEi3FjCUa2ALuvGAAAG6sky0F026600.png);">
        <h4>
            <a title="团购" target="_blank" href="" data-tpc="CC_TG_LWBT">
                <em><u class="left_triangle"></u><u class="right_triangle"></u><i class="index_iconfont"></i>团购</em>
            </a>
        </h4>
        <div class="clearfix">
            <!--今日精选-->
            <div class="group_today" data-tpc="CC_TG_LWDT">
                <a title="今日精选" target="_blank" href="">
                    <img src="//img30.360buyimg.com/img/jfs/t8737/11/2478190100/26809/738c589c/59cf19cfN75ac0d47.jpg"
                         alt="今日精选" data-imgattr="wideimg">
                </a>
            </div>
            <!--量贩团-->
            <div class="fr">
                <div class="group_variety" data-tpc="CC_TG_LWXTS">
                    <a data-advtypedetail="0" data-advtype="9" title="量贩团" target="_blank" href="">
                        <p class="group_tit">量贩团</p>
                        <p class="sub_tit">加量不加价</p>
                        <img src="//img30.360buyimg.com/img/jfs/t8677/137/2451643752/18304/f4bb437a/59cf1fb1N5a778b0b.jpg"
                             alt="量贩团" width="110" height="110" data-imgattr="original">
                    </a>
                </div>

            </div>
        </div>
    </div>

    <!--排行榜-->
    <div class="area_rank"
         style="background-image: url(//d8.yihaodianimg.com/N10/M02/92/0C/ChEi3FjCUa2ALuvGAAAG6sky0F026600.png);"
         id="floorRank" data-tpa="YHD_PCSY_CC_PXB">
        <h4>
            <a href="" target="_blank"><em><u class="left_triangle"></u><u
                    class="right_triangle"></u><i class="index_iconfont"></i>排行榜</em></a>
            <a href="" class="more" target="_blank">查看更多<span>&gt;</span></a>
        </h4>
        <div class="area_rank_list" id="floorRanklist">
            <div class="rank_tab" id="floorRank_tab">
                <ul class="clearfix">
                    <li class="cur" categoryid="653"><a href="" target="_blank">手机通讯</a></li>
                </ul>
                <div class="cur_item"></div>
            </div>
            <div class="rank_content" id="rankContent_653" data-tpc="YHD_RANK_653">
                <ul class="clearfix">
                    <li><a href="" target="_blank"
                           title="苹果6 Apple iPhone6 手机 金色 全网通 (32GB)"><img
                            src="//img20.360buyimg.com/test/s200x200_jfs/t5821/323/1423764711/150231/a910e65c/5926976aN3943781d.jpg"
                            alt="苹果6 Apple iPhone6 手机 金色 全网通 (32GB)">
                        <p class="pro_name" title="苹果6 Apple iPhone6 手机 金色 全网通 (32GB)">苹果6 Apple iPhone6 手机 金色 全网通
                            (32GB)</p><i class="no_1">1</i></a></li>
                </ul>
            </div>
            <div class="rank_content none" id="rankContent_9856" data-tpc="YHD_RANK_9856">
                <ul class="clearfix"></ul>
            </div>
        </div>
    </div>
</div>

</div>
<!--团购，排行榜部分结束-->

<!--耍大牌，生活馆部分-->
<div class="wrap mod_on_new clearfix">
    <div class="left_banner">
        <a href="" title="爱上新" target="_blank">
            <img src="//img30.360buyimg.com/img/jfs/t8059/329/2474295321/54528/e1ea480b/59ceffe2Nf0cc904c.jpg" alt="爱上新"
                 data-imgattr="wideimg">
        </a>
    </div>
    <div class="brand_buy"
         style="background-image: url(//d8.yihaodianimg.com/N10/M02/92/0C/ChEi3FjCUa2ALuvGAAAG6sky0F026600.png);"><h4>
        <a href="" title="耍大牌" target="_blank"><em><u
                class="left_triangle"></u><u class="right_triangle"></u><i class="index_iconfont"></i>耍大牌</em></a>
    </h4>
        <div class="clearfix">
            <a title="耍大牌" href="" class="brand_banner" target="_blank"><img
                    src="//img30.360buyimg.com/img/jfs/t9751/234/1207204965/49130/1cb3c777/59ddf911N4df72ab9.jpg"
                    alt="品质滋养活力" data-imgattr="wideimg"></a>
            <div class="brand_right">
                <ul>
                    <li>
                        <a title="颜值控必备" href="" target="_blank">
                            <p class="pro_tit">糖果君</p>
                            <p class="pro_sub_tit">颜值控必备</p>
                            <img src="//img30.360buyimg.com/img/jfs/t10018/85/426241432/19889/58f5ddf9/59cf0859N009c2c5b.jpg"
                                 alt="糖果君" width="90" height="90" data-imgattr="original">
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="life_pie"
         style="background-image: url(//d8.yihaodianimg.com/N10/M02/92/0C/ChEi3FjCUa2ALuvGAAAG6sky0F026600.png);">
        <h4>
            <a href="" title="生活派" target="_blank"><em><u class="left_triangle"></u><u
                    class="right_triangle"></u><i class="index_iconfont"></i>生活派</em></a>
        </h4>
        <div class="clearfix">
            <a title="秋季烧烤攻略" href="" target="_blank" class="brand_banner">
                <img src="//img30.360buyimg.com/img/jfs/t8971/85/1832523009/31796/d10c7d22/59ca2a58N61ae77ea.jpg"
                     alt="品质厨房" data-imgattr="wideimg">
                <p class="pro_tit">品质厨房</p>
                <p class="pro_sub_tit">秋季烧烤攻略</p>
            </a>
            <div class="brand_right">
                <ul>
                    <li>
                        <a title="自制烧烤派对" href="" target="_blank">
                            <p class="pro_tit">烧烤指南</p>
                            <p class="pro_sub_tit">自制烧烤派对</p>
                            <img src="//img30.360buyimg.com/img/jfs/t10375/246/247424952/19908/5223b6a1/59ca2b64N33edc5df.jpg"
                                 alt="烧烤指南" width="90" height="90" data-imgattr="wideimg">
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="clearfix life_pic">

            <a title="特产中国-乡美味" class="specialty" href="" target="_blank">
                <img src="//img30.360buyimg.com/img/jfs/t9550/19/406480341/19488/f2f48343/59cf05c7N8ce506af.jpg"
                     alt="特产中国-乡美味" data-imgattr="original">
                <p>特产中国-乡美味</p>
                <p class="go">GO<em class="index_iconfont"></em></p>
            </a>
        </div>
    </div>
</div>
<!--耍大牌，生活馆部分结束-->

<!--全球进口-->
<div id="needLazyLoad">

    {{--全球进口--}}
    <div class="wrap mod_lift_floor mod_global_imported" id="floorJKLC"><h4>
        <a href="" target="_blank" title="全球进口">全球进口<i class="index_iconfont"></i></a>
    </h4>
        <div class="clearfix">
            <div class="global_food"
                 style="background: #b96131;background: -webkit-linear-gradient(#b96131 0%, #6a452b 100%);background: -o-linear-gradient(#b96131 0%, #6a452b 100%);background: linear-gradient(#b96131 0%, #6a452b 100%);filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#b96131', endColorstr='#6a452b',GradientType=0 );">
                <div class="left_banner">
                    <a title="全球进口馆"
                       href=""
                       target="_blank"><img alt="全球进口馆"
                                            src="//img30.360buyimg.com/img/jfs/t10132/197/399248330/75111/3dc142ae/59ce012cN47980de7.jpg"
                                            class="banner_pic" width="316" height="450" data-imgattr="wideimg"></a>
                    <div class="banner_link">
                        <ul class="clearfix">
                            <li><a title="进口饼干" target="_blank" href="">进口饼干</a>
                            </li>

                        </ul>
                    </div>
                </div>
                <div class="center_con">
                    <div class="fl">
                        <a title="全球美味 决战味蕾" href="" target="_blank" class="global_pic"><img
                                src="//img30.360buyimg.com/img/jfs/t9649/175/403957495/60497/78797747/59ce0b24N324537b6.jpg"
                                alt="全球美味 决战味蕾" data-imgattr="original"></a>
                        <div class="pro_item_wrap clearfix">
                            <div class="pro_shoppe">
                                <a title="中外名酒" href="" target="_blank"
                                   clstag="">
                                    <p class="pro_tit">进口酒会所</p>
                                    <p class="pro_sub_tit">中外名酒</p>
                                    <img src="//img30.360buyimg.com/img/jfs/t8191/73/2400387138/17835/d467d1a/59ce0c00N35a2a6cf.jpg"
                                         width="130" height="130" alt="进口酒会所" data-imgattr="original">
                                </a>
                            </div>

                        </div>
                    </div>
                    <div class="right_con">
                        <div class="pro_shoppe">
                            <a title="1号店进口牛奶" href="" target="_blank">
                                <p class="pro_tit">进口牛奶乳制品</p>
                                <p class="pro_sub_tit">健康浓醇之选</p>
                                <img src="//img30.360buyimg.com/img/jfs/t8266/70/2448167441/22426/30ecdedb/59ce122fN43d0046d.jpg"
                                     width="130" height="130" alt="进口牛奶乳制品" data-imgattr="original">
                            </a>
                        </div>

                    </div>
                </div>
            </div>
            <div class="global_category">
                <ul class="clearfix">
                    <li class="jk_mh">
                        <a title="进口美护" href="" target="_blank">
                            <p class="pro_tit">进口美护</p>
                            <p class="pro_sub_tit">BEAUTY</p>
                            <p class="pro_color"></p>
                            <img src="//img30.360buyimg.com/img/jfs/t9595/84/64213009/41267/803aee13/59c4c08aN792b99ef.png"
                                 width="130" height="130" alt="进口美护" data-imgattr="original">
                        </a>
                    </li>
                    <li class="jk_my">
                        <a title="进口母婴" href="" target="_blank">
                            <p class="pro_tit">进口母婴</p>
                            <p class="pro_sub_tit">MOM&amp;BABY</p>
                            <p class="pro_color"></p>
                            <img src="//img30.360buyimg.com/img/jfs/t9358/263/2082541551/63330/5218cec5/59c4c112N672f7c4a.png"
                                 width="130" height="130" alt="进口母婴" data-imgattr="original">
                        </a>
                    </li>

                </ul>
            </div>
        </div>
    </div>

 {{--国产食品  --}}
    <div class="wrap mod_lift_floor mod_index_floor clearfix china_food" id="floorGCSP" lazyLoad_textarea="textareaFloorGCSP" style="height:430px;">
    <textarea style="display:none;" autocomplete="off" id="textareaFloorGCSP">
        <div class="left_con" >
            <h4><a title="{{$gcmodel['cname']}}" href="" target="_blank">{{$gcmodel['cname']}} <i>&gt;</i></a></h4>
            <p class="en_tit">{{$gcmodel['cname']}}</p>
            <div class="floor_silder">
                <ul>
                    @foreach($threechildgc as $v)
                    <li class="img_first" data-advid="22033" style="z-index: 100; width: 195px; height: 225px; left: 0px; top: 0px;">
                        <a title="{{$v['cname']}}" target="_blank" href="">
                            <p class="caption">{{$v['cname']}}</p>
                            <p class="sub_tit">{{$v['description']}}</p>
                            <img width="130" height="130" src="{{$v['thumb']}}" alt="{{$v['cname']}}" data-imgattr="original">
                        </a>
                        <div class="color_mask" style="opacity: 0;"></div>
                    </li>
                    @endforeach

                </ul>
                <div class="turn_show clearfix">
                    <div class="prev_btn index_iconfont"></div>
                    <div class="show_num"><span>1</span> / <em>3</em></div>
                    <div class="next_btn index_iconfont"></div>
                </div>
            </div>
            <div class="comment">
                <div class="comment_left"><i class="index_iconfont"></i></div>
                <div class="comment_list">
                    <ul>
                    </ul>
                </div>
            </div>
        </div>
        <div class="center_con">
            <div class="keywords">
                <ul class="clearfix">
                    <li>
                        |<a title="坚果炒货" target="_blank" href="" data-ref="22039_47504314_1">坚果炒货
                    </a>
                    </li>
                </ul>
            </div>
                <div class="clearfix">
                    @foreach($childgc as $v)
                    <div class="pro_wrap">
                        <a title="{{$v['cname']}}" target="_blank" href="">
                            <p class="pro_tit">{{$v['cname']}}</p>
                            <p class="pro_sub_tit">{{$v['description']}}</p>
                            <img src="{{$v['thumb']}}"
                                 alt="{{$v['cname']}}" width="130" height="130">
                        </a>
                    </div>
                    @endforeach
                </div>
        </div>
        <div class="hot_con">
            <p class="hot_tit">热门商品</p>
            <div class="rank_list">
                <ul>
                    <li data-singlemodule="1">
                        <a class="pro_img clearfix" title="乐事（Lay’s）薯片 休闲零食 美国经典原味 145g（新老包装随机发货）" target="_blank"
                           href="" data-ref="22059_47504329_1">
                            <img alt="乐事（Lay’s）薯片 休闲零食 美国经典原味 145g（新老包装随机发货）"
                                 src="//img30.360buyimg.com/img/s120x120_jfs/t5614/353/3823048786/245244/7f603393/59424a31N01a47b3a.jpg"
                                 width="60" height="60" data-imgattr="original">
                            <i>1</i>
                            <div class="rank_detail">
                                <p class="pro_name">乐事（Lay’s）薯片 休闲零食 美国经典原味 145g（新老包装随机发货）</p>
                                <p class="pro_price" data-skuid="J_2409310" data-pricedone="1">¥<em>9.90</em></p>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </textarea>
    </div>




    <div class="wrap mod_columns_wrap mod_lift_floor clearfix">
        <div class="fl mod_columns_floor live_fresh" id="floorHSSX" lazyLoad_textarea="textareaFloorHSSX">
    <textarea style="display:none;" autocomplete="off" id="textareaFloorHSSX">

        {{--一号生鲜--}}
        <div class="fl mod_columns_floor live_fresh" id="floorHSSX">
            <div class="floor_tit clearfix">
                <h4>
                    <a href="" target="_blank" title="1号生鲜">1号生鲜<em>&gt;</em></a>
                </h4>
                <div class="keywords">
                    <ul class="clearfix">
                        <li><a title="冷冻速食" target="_blank" href="">冷冻速食</a>|
                        </li>
                    </ul>
                </div>
            </div>
            <div class="clearfix">
                <div class="left_slider">
                    <ul>
                        <li class="" data-advid="22190" style="display: none;">
                            <a title="防秋燥 购鲜品" href="https://sale.yhd.com/act/aA27QwsW5YtquKV4.html" target="_blank" clstag="pageclick|keycount|home_201709222|15">
                                <p class="caption">防秋燥 购鲜品</p>
                                <p class="sub_tit">满199减100</p>
                                <img src="//img30.360buyimg.com/img/jfs/t9775/270/1942160162/41264/efc13ef/59e9694bNdb423136.jpg" alt="防秋燥 购鲜品" data-imgattr="original">
                            </a>
                        </li>
                        <li data-advid="22191" class="" style="display: none;">
                            <a title="酸奶满减" href="https://sale.yhd.com/act/0V2ogANZIQh3.html" target="_blank" clstag="pageclick|keycount|home_201709222|16">
                                <p class="caption">卓德酸奶</p>
                                <p class="sub_tit">卓德品牌活动</p>
                                <img src="//img30.360buyimg.com/img/jfs/t9115/118/2429360835/89115/626cf068/59cde6f8Nfacb80f6.jpg" alt="卓德酸奶" data-imgattr="original">
                            </a>
                        </li>
                        <li data-advid="22192" style="display: list-item;" class="cur">
                            <a title="家的味道" href="https://sale.yhd.com/act/jvO6bWsZzDeE2r0.html" target="_blank" clstag="pageclick|keycount|home_201709222|17">
                                <p class="caption">湾仔码头家的味道</p>
                                <p class="sub_tit">新品上市</p>
                                <img src="//img30.360buyimg.com/img/jfs/t8014/236/2494413556/52843/a8f5816e/59cf2c45N0a087f2d.jpg" alt="湾仔码头家的味道" data-imgattr="original">
                            </a>
                        </li>
                    </ul>
                    <div class="slider_nav clearfix">
                        <a href="javascript:;" class="" data-advid="22190"><em></em></a>
                        <a href="javascript:;" data-advid="22191" class=""><em></em></a>
                        <a href="javascript:;" data-advid="22192" class="cur"><em></em></a>
                    </div>
                </div>
                <div class="pro_con" data-tpc="YHD_HSSX_HDGG_1">
                    <div class="pro_wrap">
                        <a title="中国冬枣之乡" href="" target="_blank">
                            <p class="pro_tit">中国冬枣之乡</p>
                            <p class="pro_sub_tit">买两份立减</p>
                            <img src="//img30.360buyimg.com/img/jfs/t8866/130/2405435678/13538/fac45b71/59cc65c8Nbddcc63e.jpg"
                                 alt="中国冬枣之乡" width="105" height="105" data-imgattr="original">
                        </a>
                    </div>
                </div>
                <div class="pro_con" data-tpc="YHD_HSSX_HDGG_2">
                    <div class="pro_wrap">
                        <a title="优诺酸奶" href="" target="_blank">
                            <p class="pro_tit">优诺酸奶</p>
                            <p class="pro_sub_tit">10.9元起</p>
                            <img src="//img30.360buyimg.com/img/jfs/t9511/304/434918704/3462/fe8ee9ba/59cf14caNb6b26b15.jpg"
                                 alt="优诺酸奶" width="105" height="105" data-imgattr="original">
                        </a>
             </div>
        </div>
    </div>
    </textarea>
        </div>


        {{--酒水饮料--}}
        <div class="fr mod_columns_floor wine_drink" id="floorJSYL" lazyLoad_textarea="textareaFloorJSYL" >
        <textarea style="display:none;" autocomplete="off" id="textareaFloorJSYL">

            <div class="floor_tit clearfix">
                <h4>
                    <a href="" target="_blank" title="酒水饮料">酒水饮料<em>&gt;</em></a>
                </h4>
                <div class="keywords">
                    <ul class="clearfix">
                        <li><a title="茗茶" target="_blank"
                               href="//search.yhd.com/c0-0-0/mbname-b/a-s1-v4-p1-price-d0-f06-m1-rt0-pid-mid0-color-size-k%E8%8C%97%E8%8C%B6/"
                               data-ref="22203_47504310_1">茗茶</a>|
                        </li>


                    </ul>
                </div>
            </div>
            <div class="clearfix">
                <div class="left_slider">
                    <ul>
                        <li class="cur" data-advid="22205" style="display: list-item;">
                            <a title="酒水饮料" href="https://sale.yhd.com/act/SMbW63xgXPwKZ.html" target="_blank"
                               clstag="pageclick|keycount|home_201709222|24">
                                <p class="caption">酒水饮料</p>
                                <p class="sub_tit">金秋酒饮 动感10.1</p>
                                <img src="//img30.360buyimg.com/img/jfs/t8197/204/2455105897/58245/93391d54/59ce21b0N094ff126.jpg"
                                     alt="酒水饮料" data-imgattr="original">
                            </a>
                        </li>
                        <li data-advid="22206" class="" style="display: none;">
                            <a title="冲饮中心" href="https://sale.yhd.com/act/Bpfc0CYmzAwd847G.html" target="_blank"
                               clstag="pageclick|keycount|home_201709222|25">
                                <p class="caption">冲饮中心</p>
                                <p class="sub_tit">不要亏欠你的胃</p>
                                <img src="//img30.360buyimg.com/img/jfs/t9469/116/2443116994/72778/bb5648d6/59ce2291Na704b65c.jpg"
                                     alt="冲饮中心" data-imgattr="original">
                            </a>
                        </li>
                        <li data-advid="22207" class="" style="display: none;">
                            <a title="酒类中心" href="https://sale.yhd.com/act/fTQcYNnkWEaJwK.html" target="_blank"
                               clstag="pageclick|keycount|home_201709222|26">
                                <p class="caption">酒类中心</p>
                                <p class="sub_tit">全球好酒 一站购齐</p>
                                <img src="//img30.360buyimg.com/img/jfs/t10765/41/386483357/79390/d2316e19/59ce23bbNc9096d98.jpg"
                                     alt="酒类中心" data-imgattr="original">
                            </a>
                        </li>
                    </ul>
                    <div class="slider_nav clearfix">
                        <a href="javascript:;" class="cur"><em></em></a>
                        <a href="javascript:;" class=""><em></em></a>
                        <a href="javascript:;" class=""><em></em></a>
                    </div>
                </div>
                <div class="pro_con">

                    <div class="pro_wrap">
                        <a title="伊利超品日" href="//sale.yhd.com/act/zZdyrSL4bqO7M.html" target="_blank"
                           clstag="pageclick|keycount|home_201709222|28">
                            <p class="pro_tit">伊利超品日</p>
                            <p class="pro_sub_tit">满199减100</p>
                            <img src="//img30.360buyimg.com/img/jfs/t9862/60/1203622267/12187/b549f68d/59dddc3eN625f8118.jpg"
                                 alt="伊利超品日" width="105" height="105" data-imgattr="original">
                        </a>
                    </div>
                </div>
                <div class="pro_con">
                    <div class="pro_wrap">
                        <a title="酒类中心" href="https://sale.yhd.com/act/fTQcYNnkWEaJwK.html" target="_blank"
                           clstag="pageclick|keycount|home_201709222|29">
                            <p class="pro_tit">酒类中心</p>
                            <p class="pro_sub_tit">乐享全球美酒</p>
                            <img src="//img30.360buyimg.com/img/jfs/t9877/237/390986289/18590/5e9738d9/59ce26b2N93168a0d.jpg"
                                 alt="酒类中心" width="105" height="105" data-imgattr="original">
                        </a>
                    </div>
                    <div class="brand_wrap">
                        <div class="brand_cover">
                            <ul>
                                <li data-advid="22211">
                                    <a title="可口可乐"
                                       href="//search.yhd.com/c1320-0-0/mbname-b/a-s1-v4-p1-price-d0-f06-m1-rt0-pid-mid0-color-size-k%E5%8F%AF%E5%8F%A3%E5%8F%AF%E4%B9%90/"
                                       target="_blank"><img
                                            src="//img30.360buyimg.com/img/jfs/t8092/6/2453619374/10221/52799b0/59ce2c50N1ded0012.jpg"
                                            alt="可口可乐" clstag="pageclick|keycount|home_201709222|30"
                                            data-imgattr="original"></a>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            </textarea>
        </div>
</div>




{{--美妆个护--}}
    <div class="wrap mod_lift_floor mod_index_floor clearfix care_makeup" id="floorGHMZ" lazyLoad_textarea="textareaFloorGHMZ" style="height:430px;">
<textarea style="display:none;" autocomplete="off" id="textareaFloorGHMZ">

        <div class="left_con">
            <h4><a title="{{$fxmodel['description']}}" href="" target="_blank">{{$fxmodel['cname']}} <i>&gt;</i></a></h4>
                <p class="en_tit">{{$fxmodel['description']}}</p>
    <div class="floor_silder">
        <ul>
            @foreach($threechildfx as $v)
                <li class="img_first" data-advid="22156" style="z-index: 100; width: 195px; height: 225px; left: 0px; top: 0px;">
                <a title="{{$v['description']}}" target="_blank" href="">
                    <p class="caption">{{$v['cname']}}</p>
                    <p class="sub_tit">{{$v['description']}}</p>
                     <img width="130" height="130" src="{{$v['thumb']}}" alt="" data-imgattr="original">
                </a>
                <div class="color_mask" style="opacity: 0;"></div>
             </li>
            @endforeach
        </ul>
        <div class="turn_show clearfix">
        <div class="prev_btn index_iconfont"></div>
        <div class="show_num"><span>1</span> / <em>3</em></div>
        <div class="next_btn index_iconfont"></div>
        </div>
        </div>
        <div class="comment">
        <div class="comment_left"><i class="index_iconfont"></i></div>
        <div class="comment_list">
        <ul>
        </ul>
        </div>
        </div>
        </div>
        <div class="center_con">
            <div class="keywords">
                <ul class="clearfix">
                    <li>
                        |<a title="女装新品" target="_blank" href="">
                        女装新品
                    </a>
                    </li>

                </ul>
            </div>
            <div class="clearfix">
                @foreach($childfx as $v)
                    <div class="pro_wrap">
                    <a title="{{$v['description']}}" target="_blank" href="">
                        <p class="pro_tit">{{$v['cname']}}</p>
                        <p class="pro_sub_tit">{{$v['description']}}</p>
                        <img src="{{$v['thumb']}}"
                             alt="{{$v['cname']}}" width="130" height="130" >
                    </a>
                </div>
                @endforeach
            </div>

        </div>
        <div class="hot_con">
            <p class="hot_tit">热门商品</p>
            <div class="rank_list">
                <ul>
                    <li data-singlemodule="1">
                        <a class="pro_img clearfix" title="沙宣洗护套装修护水养(洗发水500ml*2+护400ml)送洗50ml*3+护50ml*2(新老装随机发 男女士通用)"
                           target="_blank" href="//item.yhd.com/1989509.html">
                            <img alt="沙宣洗护套装修护水养(洗发水500ml*2+护400ml)送洗50ml*3+护50ml*2(新老装随机发 男女士通用)"
                                 src="//img30.360buyimg.com/img/s120x120_jfs/t6574/60/61305840/145066/5adb7ccf/5938c228N0c0ac82c.jpg"
                                 width="60" height="60" data-imgattr="original">
                            <i>1</i>
                            <div class="rank_detail">
                                <p class="pro_name">沙宣洗护套装修护水养(洗发水500ml*2+护400ml)送洗50ml*3+护50ml*2(新老装随机发 男女士通用)</p>
                                <p class="pro_price" data-skuid="J_1989509" data-pricedone="1">¥<em>125.00</em></p>
                            </div>
                        </a>
                    </li>

                </ul>
            </div>
        </div>
    </textarea>
    </div>




{{--母婴玩具--}}
    <div class="wrap mod_columns_wrap mod_lift_floor clearfix">
        <div class="fl mod_columns_floor baby_toy" id="floorMYWJ">
            <div class="floor_tit clearfix">
                <h4>
                    <a href="https://sale.yhd.com/act/VwKQZXJWq5Yj.html" title="母婴玩具" target="_blank"
                       data-ref="22215_47504291_1">母婴玩具<em>&gt;</em></a>
                </h4>
                <div class="keywords">
                    <ul class="clearfix">
                        <li><a title="孕妈专区" target="_blank" href="" data-ref="22222_47504348_1">孕妈专区</a>|
                        </li>

                    </ul>
                </div>
            </div>
            <div class="clearfix">
                <div class="left_slider">
                    <ul>
                        <li class="" data-advid="22223" style="display: none;">
                            <a title="享乐季" href="https://sale.yhd.com/act/BNUgujdY2m.html" target="_blank"
                               data-ref="22223_47503973_1" clstag="pageclick|keycount|home_201709222|36">
                                <p class="caption">带娃生活</p>
                                <p class="sub_tit">享乐季</p>
                                <img src="//img30.360buyimg.com/img/jfs/t8749/164/2426920907/100847/5bb16762/59cdc3beN47e7b267.jpg"
                                     alt="带娃生活" data-imgattr="original">
                            </a>
                        </li>
                        <li data-advid="22224" class="cur" style="display: list-item;">
                            <a title="孕妈中心" href="https://sale.yhd.com/act/Jp342kiVPN7whb.html" target="_blank"
                               data-ref="22224_47503977_1" clstag="pageclick|keycount|home_201709222|37">
                                <p class="caption">孕妈中心</p>
                                <p class="sub_tit">孕妈中心</p>
                                <img src="//img30.360buyimg.com/img/jfs/t10846/138/410753061/25191/27b97110/59ce18bfN34e73330.jpg"
                                     alt="孕妈中心" data-imgattr="original">
                            </a>
                        </li>

                    </ul>
                    <div class="slider_nav clearfix">
                        <a href="javascript:;" class="" data-advid="22223"><em></em></a>
                        <a href="javascript:;" data-advid="22224" class="cur"><em></em></a>
                        <a href="javascript:;" data-advid="22225" class=""><em></em></a>
                    </div>
                </div>
                <div class="pro_con">
                    <div class="pro_wrap">
                        <a title="宝宝吃货联盟" href="https://sale.yhd.com/act/e4lEuPIV8jOc.html" target="_blank"
                           data-ref="22226_47503976_1" clstag="pageclick|keycount|home_201709222|39">
                            <p class="pro_tit">宝宝吃货联盟</p>
                            <p class="pro_sub_tit">好货优选</p>
                            <img src="//img30.360buyimg.com/img/jfs/t9685/177/391230920/17508/72cdb527/59cdf19eNb0b6daaa.jpg"
                                 alt="宝宝吃货联盟" width="105" height="105" data-imgattr="original">
                        </a>
                    </div>

                </div>

            </div>
        </div>
        <div class="fr mod_columns_floor kitchen_clean" id="floorCWQJ">
            <div class="floor_tit clearfix">
                <h4>
                    <a href="" target="_blank" title="厨卫清洁" data-ref="22230_47504198_1">厨卫清洁<em>&gt;</em></a>
                </h4>
                <div class="keywords">
                    <ul class="clearfix">
                        <li><a title="百洁布" target="_blank" href=""
                               data-ref="22237_47504142_1">百洁布</a>|
                        </li>

                    </ul>
                </div>
            </div>
            <div class="clearfix">
                <div class="left_slider">
                    <ul>
                        <li class="" data-advid="22238" style="display: none;">
                            <a title="清洁大作战" href="" target="_blank"
                               data-ref="22238_47503991_1">
                                <p class="caption">清洁大作战</p>
                                <p class="sub_tit">守护洁净生活</p>
                                <img src="//img30.360buyimg.com/img/jfs/t10774/142/383778168/84644/74a189d2/59cde3b1Nb1030777.jpg"
                                     alt="清洁大作战" data-imgattr="original">
                            </a>
                        </li>
                        <li data-advid="22239" class="cur" style="display: list-item;">
                            <a title="去污之路" href="" target="_blank"
                               data-ref="22239_47503998_1">
                                <p class="caption">去污之路</p>
                                <p class="sub_tit">厨卫好货优选</p>
                                <img src="//img30.360buyimg.com/img/jfs/t10888/331/388743488/83043/ade32db2/59cde452N2e1bb72b.jpg"
                                     alt="去污之路" data-imgattr="original">
                            </a>
                        </li>

                    </ul>
                    <div class="slider_nav clearfix">
                        <a href="javascript:;" class="" data-advid="22238"><em></em></a>
                        <a href="javascript:;" data-advid="22239" class="cur"><em></em></a>

                    </div>
                </div>
                <div class="pro_con">
                    <div class="pro_wrap">
                        <a title="纸品中心" href="" target="_blank"
                           data-ref="22241_47504029_1">
                            <p class="pro_tit">纸品中心</p>
                            <p class="pro_sub_tit">2.5折起</p>
                            <img src="//img30.360buyimg.com/img/jfs/t10438/98/372415644/17014/a1dc2930/59cde5c5N065c7802.jpg"
                                 alt="纸品中心" width="105" height="105" data-imgattr="original">
                        </a>
                    </div>

                </div>

            </div>
        </div>
    </div>


    {{--家具生活--}}
    <div class="wrap mod_lift_floor mod_index_floor clearfix home_life" id="floorJJSH" lazyLoad_textarea="textareaFloorJJSH" style="height:430px;">
<textarea style="display:none;" autocomplete="off" id="textareaFloorJJSH">

        <div class="left_con">
            <h4><a title="{{$jjmodel['description']}}" href="" target="_blank">{{$jjmodel['cname']}} <i>&gt;</i></a></h4>
            <p class="en_tit">{{$jjmodel['description']}}</p>
            <div class="floor_silder">
                <ul>
                    @foreach($threechildjj as $v)
                        <li class="img_first" data-advid="22156" style="z-index: 100; width: 195px; height: 225px; left: 0px; top: 0px;">
                            <a title="{{$v['description']}}" target="_blank" href="">
                                <p class="caption">{{$v['cname']}}</p>
                                <p class="sub_tit">{{$v['description']}}</p>
                                <img width="130" height="130" src="{{$v['thumb']}}" alt="" data-imgattr="original">
                            </a>
                            <div class="color_mask" style="opacity: 0;"></div>
                        </li>
                    @endforeach
                </ul>
                <div class="turn_show clearfix">
                    <div class="prev_btn index_iconfont"></div>
                    <div class="show_num"><span>1</span> / <em>3</em></div>
                    <div class="next_btn index_iconfont"></div>
                </div>
            </div>
            <div class="comment">
                <div class="comment_left"><i class="index_iconfont"></i></div>
                <div class="comment_list">
                    <ul>
                    </ul>
                </div>
            </div>
        </div>
        <div class="center_con">
            <div class="keywords">
                <ul class="clearfix">
                    <li>
                        |<a title="女装新品" target="_blank" href="">
                            女装新品
                        </a>
                    </li>

                </ul>
            </div>
            <div class="clearfix">
                @foreach($childjj as $v)
                    <div class="pro_wrap">
                        <a title="{{$v['description']}}" target="_blank" href="">
                            <p class="pro_tit">{{$v['cname']}}</p>
                            <p class="pro_sub_tit">{{$v['description']}}</p>
                            <img src="{{$v['thumb']}}"
                                 alt="{{$v['cname']}}" width="130" height="130" >
                        </a>
                    </div>
                @endforeach
            </div>

        </div>
        <div class="hot_con">
            <p class="hot_tit">热门商品</p>
            <div class="rank_list">
                <ul>
                    <li data-singlemodule="1">
                        <a class="pro_img clearfix" title="炊大皇不粘炒锅34cm无烟炒锅电磁炉通用CKN4634BF赠送木铲" target="_blank" href="">
                            <img alt="炊大皇不粘炒锅34cm无烟炒锅电磁炉通用CKN4634BF赠送木铲"
                                 src="//img30.360buyimg.com/img/s120x120_jfs/t3112/198/5110304941/139909/fee5e735/5864d642Na99ce90b.jpg"
                                 width="60" height="60" data-imgattr="original">
                            <i>1</i>
                            <div class="rank_detail">
                                <p class="pro_name">炊大皇不粘炒锅34cm无烟炒锅电磁炉通用CKN4634BF赠送木铲</p>
                                <p class="pro_price" data-skuid="J_931177" data-pricedone="1">¥<em>99.00</em></p>
                            </div>
                        </a>
                    </li>

                </ul>
            </div>
        </div>
        </textarea>

    </div>



    {{--手机家电--}}
    <div class="wrap mod_lift_floor mod_index_floor clearfix phone_electric" id="floorSJJD" lazyLoad_textarea="textareaFloorSJJD" style="height:430px;">
<textarea style="display:none;" autocomplete="off" id="textareaFloorSJJD">

        <div class="left_con">
            <h4><a title="{{$phonemodel['description']}}" href="" target="_blank">{{$phonemodel['cname']}} <i>&gt;</i></a></h4>
            <p class="en_tit">{{$phonemodel['description']}}</p>
            <div class="floor_silder">
                <ul>
                    @foreach($threechildphone as $v)
                        <li class="img_first" data-advid="22156" style="z-index: 100; width: 195px; height: 225px; left: 0px; top: 0px;">
                            <a title="{{$v['description']}}" target="_blank" href="">
                                <p class="caption">{{$v['cname']}}</p>
                                <p class="sub_tit">{{$v['description']}}</p>
                                <img width="130" height="130" src="{{$v['thumb']}}" alt="" data-imgattr="original">
                            </a>
                            <div class="color_mask" style="opacity: 0;"></div>
                        </li>
                    @endforeach
                </ul>
                <div class="turn_show clearfix">
                    <div class="prev_btn index_iconfont"></div>
                    <div class="show_num"><span>1</span> / <em>3</em></div>
                    <div class="next_btn index_iconfont"></div>
                </div>
            </div>
            <div class="comment">
                <div class="comment_left"><i class="index_iconfont"></i></div>
                <div class="comment_list">
                    <ul>
                    </ul>
                </div>
            </div>
        </div>
        <div class="center_con">
            <div class="keywords">
                <ul class="clearfix">
                    <li>
                        |<a title="女装新品" target="_blank" href="">
                            女装新品
                        </a>
                    </li>

                </ul>
            </div>
            <div class="clearfix">
                @foreach($childphone as $v)
                    <div class="pro_wrap">
                        <a title="{{$v['description']}}" target="_blank" href="">
                            <p class="pro_tit">{{$v['cname']}}</p>
                            <p class="pro_sub_tit">{{$v['description']}}</p>
                            <img src="{{$v['thumb']}}"
                                 alt="{{$v['cname']}}" width="130" height="130" >
                        </a>
                    </div>
                @endforeach
            </div>

        </div>
        <div class="hot_con">
            <p class="hot_tit">热门商品</p>
            <div class="rank_list">
                <ul>
                    <li data-singlemodule="1">
                        <a class="pro_img clearfix" title="荣耀9 全网通 标配版 4GB+64GB 幻夜黑 移动联通电信4G手机 双卡双待" target="_blank"
                           href="">
                            <img alt="荣耀9 全网通 标配版 4GB+64GB 幻夜黑 移动联通电信4G手机 双卡双待"
                                 src="//img30.360buyimg.com/img/s120x120_jfs/t5824/87/6801843207/234407/f5cde5b4/596c7157N852de046.jpg"
                                 width="60" height="60" data-imgattr="original">
                            <i>1</i>
                            <div class="rank_detail">
                                <p class="pro_name">荣耀9 全网通 标配版 4GB+64GB 幻夜黑 移动联通电信4G手机 双卡双待</p>
                                <p class="pro_price" data-skuid="J_4538873" data-pricedone="1">¥<em>2299.00</em></p>
                            </div>
                        </a>
                    </li>

                </ul>
            </div>
        </div>
        </textarea>

    </div>





    {{--服饰鞋包--}}
    <div class="wrap mod_lift_floor mod_index_floor clearfix popular_store" id="floorLXBH" lazyLoad_textarea="textareaFloorLXBH" style="height:430px;">
    <textarea style="display:none;" autocomplete="off" id="textareaFloorLXBH">
        <div class="left_con">
            <h4><a title="{{$fxmodel['description']}}" href="" target="_blank">{{$fxmodel['cname']}} <i>&gt;</i></a></h4>
                <p class="en_tit">{{$fxmodel['description']}}</p>
    <div class="floor_silder">
        <ul>
            @foreach($threechildfx as $v)
            <li class="img_first" data-advid="22156" style="z-index: 100; width: 195px; height: 225px; left: 0px; top: 0px;">
                <a title="{{$v['description']}}" target="_blank" href="">
                    <p class="caption">{{$v['cname']}}</p>
                    <p class="sub_tit">{{$v['description']}}</p>
                     <img width="130" height="130" src="{{$v['thumb']}}" alt="" data-imgattr="original">
                </a>
                <div class="color_mask" style="opacity: 0;"></div>
             </li>
            @endforeach
        </ul>
        <div class="turn_show clearfix">
        <div class="prev_btn index_iconfont"></div>
        <div class="show_num"><span>1</span> / <em>3</em></div>
        <div class="next_btn index_iconfont"></div>
        </div>
        </div>
        <div class="comment">
        <div class="comment_left"><i class="index_iconfont"></i></div>
        <div class="comment_list">
        <ul>
        </ul>
        </div>
        </div>
        </div>
        <div class="center_con">
            <div class="keywords">
                <ul class="clearfix">
                    <li>
                        |<a title="女装新品" target="_blank" href="">
                        女装新品
                    </a>
                    </li>

                </ul>
            </div>
            <div class="clearfix">
                @foreach($childfx as $v)
                <div class="pro_wrap">
                    <a title="{{$v['description']}}" target="_blank" href="">
                        <p class="pro_tit">{{$v['cname']}}</p>
                        <p class="pro_sub_tit">{{$v['description']}}</p>
                        <img src="{{$v['thumb']}}"
                             alt="{{$v['cname']}}" width="130" height="130" >
                    </a>
                </div>
                @endforeach
            </div>

        </div>
        <div class="hot_con">
            <p class="hot_tit">热门商品</p>
            <div class="rank_list">
                <ul>
                    <li data-singlemodule="1">
                        <a class="pro_img clearfix" title="卓诗尼休闲鞋女小白鞋2017秋季新款舒适系带运动鞋中跟平跟单鞋女鞋132720543 豆沙粉色 36"
                           target="_blank" href="">
                            <img alt="卓诗尼休闲鞋女小白鞋2017秋季新款舒适系带运动鞋中跟平跟单鞋女鞋132720543 豆沙粉色 36"
                                 src="//img30.360buyimg.com/img/s120x120_jfs/t8065/54/4731331/129463/9bc6da3f/599e9ea6N094fd7f6.jpg"
                                 width="60" height="60" data-imgattr="original">
                            <i>1</i>
                            <div class="rank_detail">
                                <p class="pro_name">卓诗尼休闲鞋女小白鞋2017秋季新款舒适系带运动鞋中跟平跟单鞋女鞋132720543 豆沙粉色 36</p>
                                <p class="pro_price" data-skuid="J_13517060953" data-pricedone="1">¥<em>199.00</em></p>
                            </div>
                        </a>
                    </li>

                </ul>
            </div>
        </div>
        </textarea>
    </div>
</div>
<!--全球进口部分结束-->

<!--单品展示部分-->
<div class="wrap mod_lift_floor mod_you_like" id="floor_knowU" style="display: block !important;"
     lazyload_textarea="textareafloor_knowU">
    <h4><u></u><span>懂你想要</span><i></i></h4>
    <div class="you_like_list you_like_complete" style="display: block;">
        <ul class="clearfix">
            <li data-skuid="J_2542885" data-pricedone="1"><a href="" target="_blank">
                <div class="flip_wrap">
                    <div class="pro_pic"><img
                            src="//m.360buyimg.com/n1/s220x220_jfs/t3763/5/658980659/301237/3a9eab92/58108645Nd7f541f2.jpg">
                    </div>
                    <div class="pro_name"><p class="pro_mask"></p>三只松鼠 蜜饯果干 休闲零食 草莓干106g/袋</div>
                    <p class="pro_price">19.90</p></div>
            </a></li>

        </ul>
        <div class="global_loading" style="display: none;"></div>
        <div class="loading_status none" style="display: block;"><span>已经到底啦</span></div>
    </div>
</div>
<!--单品展示部分结束-->

<!--左侧边导航条-->
<div class="mod_floor_lift" id="floor_lift" data-tpa="YHD_PCSY_FLOORNAV" style="display: block;">
    <ul>
        <li class="">
            <a href="javascript:;" class="floor_link0">全球进口</a>
        </li>
        <li class="">
            <a href="javascript:;" class="floor_link1">国产食品</a>
        </li>
        <li class="">
            <a href="javascript:;" class="floor_link2">活色生鲜</a>
        </li>
        <li class="">
            <a href="javascript:;" class="floor_link4">个护美妆</a>
        </li>
        <li class="">
            <a href="javascript:;" class="floor_link5">母婴玩具</a>
        </li>
        <li class="">
            <a href="javascript:;" class="floor_link7">家居生活</a>
        </li>
        <li class="">
            <a href="javascript:;" class="floor_link8">手机家电</a>
        </li>
        <li class="cur">
            <a href="javascript:;" class="floor_link9">服饰鞋包</a>
        </li>
        <li class="">
            <a href="javascript:;" class="floor_link10">懂你想要</a>
        </li>
    </ul>
</div>
<!--左侧边导航条结束-->

<!--右侧导航条-->
<div id="prismWrap" class="yhd_prism_wrap">
    <div class="yhd_prism_nav">
        <div class="prism_top_ad">
            <div class="prism_nav_tab" data-type="adv" id="prismTopAdv"></div>
        </div>
        <div class="prism_nav_center">
            <div class="prism_nav_tab prism_icon_wrap" data-type="icon" id="prismPerson">
                <a href="" target="_blank">
                    <span class="prism_icon_tab">
                        <em class="prism_iconfont"></em>
                    </span>
                    <u class="prism_icon_text">个人中心</u>
                </a>
            </div>
            <div class="prism_nav_tab prism_cart_wrap" data-type="cart" id="prismCart">
                <a class="prism_cart_tab" href="" target="_blank">
                    <em class="prism_iconfont"></em>
                    <div class="prism_cart_text">购物车</div>
                    <p id="prismCartNum" class="prism_cart_num none"><u></u></p>
                </a>
            </div>
            <div class="prism_nav_tab prism_icon_wrap" data-type="icon" id="prismBacktop">
                <a href="javascript:;">
                    <span class="prism_icon_tab">
                        <em class="prism_iconfont"></em>
                    </span>
                    <u class="prism_icon_text">返回顶部</u>
                </a>
            </div>
        </div>
    </div>
</div>
<!--右侧导航条结束-->
<!--公共底部-->

<div class="ft_wrap">
    <div class="wrap ft_footer_service clearfix" id="footerIcon" data-tpa="YHD_GLOBAl_FOOTERICON">
        <a target="_blank">
            <img alt="" src="//d8.yihaodianimg.com/N05/M0B/39/F3/CgQI0lWskgmADBnsAAAPZvcSh3E68900.jpg">
            <b>正品保障</b>
            <span>正品行货 放心选购</span>
        </a>
        <a target="_blank">
            <img alt="" src="//d6.yihaodianimg.com/N05/M09/96/23/ChEbulWsk4iADa_aAAAM544hHN818600.jpg">
            <b>满86包邮</b>
            <span>满86元 免运费</span>
        </a>
        <a target="_blank">
            <img alt="" src="//d9.yihaodianimg.com/N07/M00/2D/8B/CgQIz1WslI-Adao3AAAN5b_ut2I80100.jpg">
            <b>售后无忧</b>
            <span>7天无理由退货</span>
        </a>
        <a target="_blank">
            <img alt="" src="//d8.yihaodianimg.com/N09/M06/08/C8/ChEi11WsyiyALBbiAAAN9lEEK5M33200.jpg">
            <b>准时送达</b>
            <span>收货时间由你做主</span>
        </a>
    </div>
    <div class="wrap ft_service_link clearfix">
        <div id="bottomHelpLinkId" class="ft_help_list clearfix" data-tpa="YHD_GLOBAl_FOOTER_HELP">
            <dl>
                <dt>新手入门</dt>
                <dd><a href="//cms.yhd.com/cms/view.do?topicId=12" target="_blank">购物流程</a></dd>
                <dd><a href="//cms.yhd.com/cms/view.do?topicId=17" target="_blank">会员制度</a></dd>
                <dd><a href="//cms.yhd.com/cms/view.do?topicId=38" target="_blank">订单查询</a></dd>
                <dd><a href="//cms.yhd.com/cms/view.do?topicId=36" target="_blank">发票制度</a></dd>
            </dl>
            <dl>
                <dt>支付方式</dt>
                <dd><a href="//cms.yhd.com/cms/view.do?topicId=25" target="_blank">货到付款</a></dd>
                <dd><a href="//cms.yhd.com/cms/view.do?topicId=26" target="_blank">网上支付</a></dd>
                <dd><a href="//cms.yhd.com/cms/view.do?topicId=27" target="_blank">银行转账</a></dd>
                <dd><a href="//cms.yhd.com/cms/view.do?topicId=28" target="_blank">礼品卡支付</a></dd>
                <dd><a href="//cms.yhd.com/cms/view.do?topicId=29" target="_blank">其它支付</a></dd>
            </dl>
            <dl>
                <dt>配送服务</dt>
                <dd><a href="//cms.yhd.com/cms/view.do?topicId=21" target="_blank">配送进度查询</a></dd>
                <dd><a href="//cms.yhd.com/cms/view.do?topicId=20" target="_blank">商品验货与签收</a></dd>
            </dl>
            <dl>
                <dt>售后保障</dt>
                <dd><a href="//cms.yhd.com/cms/view.do?topicId=31" target="_blank">退换货政策</a></dd>
                <dd><a href="//cms.yhd.com/cms/view.do?topicId=43" target="_blank">联系客服</a></dd>
            </dl>
        </div>
        <!--footer 二维码 begin -->
        <div class="ft_code_wrap clearfix" data-tpa="YHD_GLOBAl_HEADER_MOBILE" id="footerQRcode">
            <div class="ft_mobile_code clearfix">
                <p>APP更优惠</p>
                <img src="//d9.yihaodianimg.com/N01/M01/0D/7A/CgQCr1KW1juAFH9YAAAatCrcuRI48200.png" alt="APP更优惠二维码">
            </div>
            <div class="ft_mobile_code clearfix">
                <p>加微信查订单</p>
                <img src="//d6.yihaodianimg.com/N10/M01/EC/6D/ChEi3Fj518KAFF5SAABtGRNmQM062100.jpg" alt="加微信查订单二维码">
            </div>
        </div>
    </div>
    <div id="footer">
        <p class="ft_footer_link">
        </p>
        <p class="ft_footer_link">
            <a href="http://www.miibeian.gov.cn/" target="_blank">沪ICP备16050468号</a>
            |
            <a href="//d6.yihaodianimg.com/N05/M0A/A9/D6/CgQI0lQRE_OATEfzAAO0AcF4zkQ56000.jpg" target="_blank">互联网药品交易服务资格证</a>
            |
            <a target="_blank">违法和不良信息举报电话：0514-85899118</a>
            |
            <a target="_blank">沪B2-20170039</a>
        </p>
        <p>Copyright© 1号店网上超市 2007-2017，All Rights Reserved</p>
        <small id="footerbanner2LazyLoad" class="ft_pic_link">
            <a href="https://online.unionpay.com/" target="_blank">
                <img alt="" src="//d6.yihaodianimg.com/N00/M01/1A/30/CgMBmVDzwyaAaIMBAAAJZgSEr6I65200.jpg">
            </a>
            <a href="http://www.gsxt.gov.cn/index.html" target="_blank">
                <img alt="" src="//d6.yihaodianimg.com/N01/M08/19/94/CgQCrlDzwnKAUkfSAAAIPrrML6M92400.jpg">
            </a>
            <a href="http://www.zx110.org/" target="_blank">
                <img alt="" src="//d8.yihaodianimg.com/N02/M05/19/94/CgQCsVDzw0GABUElAADHlvRfNUk94600.jpg">
            </a>
            <a href="http://net.china.com.cn/index.htm" target="_blank">
                <img alt="" src="//d9.yihaodianimg.com/N01/M0A/95/FD/CgQCr1PQy1CAF7vaAABDexsiEYM24800.jpg">
            </a>
            <a href="http://shwg.dianping.com/index.html" target="_blank">
                <img alt="" src="//d9.yihaodianimg.com/N08/M06/6C/9C/ChEi1VcfPl2AC1T8AAANFrEfJlw97300.jpg">
            </a>
            <a href="http://www.shjbzx.cn" target="_blank">
                <img alt="" src="//d6.yihaodianimg.com/N10/M09/0E/1F/ChEi2lh171KAJrGlAAALl_uZt0E75600.jpg">
            </a>
            <a href="https://search.szfw.org/cert/l/CX20150608010268010812" target="_blank">
                <img alt="" src="//d9.yihaodianimg.com/N08/M01/C7/7E/ChEi1FYXHcOAVk_WAAAL2r2-yfo10200.jpg">
            </a>
            <a href="https://ss.knet.cn/verifyseal.dll?sn=e13050631010040492h5mq000000&amp;ct=df&amp;a=1&amp;pa=500267"
               target="_blank">
                <img alt="" src="//d9.yihaodianimg.com/N01/M03/A0/40/CgQCrlPYTqCASlHXAAAd82JE0eA31000.png">
            </a>
        </small>
    </div>
</div>
<!--js start-->
<!--无页面级头部js时, 全局头部js下移-->
<script type="text/javascript" src="//img.yihaodianimg.com/front-homepage/global/js/global_index_top.js?0dc2e39"
        charset="utf-8"></script>
<script type="text/javascript" src="//img.yihaodianimg.com/front-homepage/index/js/index.js?0dc2e39"
        charset="utf-8"></script>
<script type="text/javascript" src="//st.360buyimg.com/sso/synccookie.js?0dc2e39" charset="utf-8"></script>
<!-- foot include start -->
<script>
    (function ($) {
        try {
            (function () {
                function a() {
                    var b = "timg" + new Date().getTime();
                    window[b] = new Image(1, 1);
                    window[b].src = "//gum.criteo.com/sync?c=144&r=1&a=1&u=%2f%2fdsp.yhd.com%2fdsp%2fcookiemapping%3fdsp%3dcrto%26tid%3d%40USERID%40"
                }

                setTimeout(a, 30 * 1000)
            })();
        } catch (err) {
        }
        try {
            function sendGtags() {
                var a = $.cookie("guid");
                var c = $.cookie("provinceId");
                if ($.trim(a) != "" && $.trim(c) != "") {
                    var b = new Image();
                    b.src = "//cms.gtags.net/p?a=13&xid=" + a + "&yhd_cityid=" + c
                }
            }

            $(function () {
                setTimeout(sendGtags, 30 * 1000)
            });
        } catch (err) {
        }
        try {
            (function () {
                function a() {
                    var b = $.cookie("guid");
                    if ($.trim(b) != "") {
                        var c = "timg" + new Date().getTime();
                        window[c] = new Image(1, 1);
                        window[c].src = "//cm.pos.baidu.com/dmpcm?userid=10644715&local_cookie=" + b + "×tamp=" + new Date().getTime()
                    }
                }

                setTimeout(a, 30 * 1000)
            })();
        } catch (err) {
        }
        try {
            $(function () {
                function a() {
                    var b = $.cookie("guid");
                    if ($.trim(b) != "") {
                        var c = new Image();
                        c.src = "//cm.jd.com/yhd?uid=" + b
                    }
                }

                setTimeout(a, 5 * 1000)
            });
            var aObj = $("#hotKeywordsShow a");
            if (aObj && aObj.length > 0) {
                if (!aObj.eq(0).text()) {
                    aObj.eq(0).text("金币抵现")
                }
            }
            __flagPrivilege = 1;
            var url = $("#keyword").attr("url");
            if (url) {
                if (url.indexOf && url.indexOf("http") != 0 && url.indexOf("//") != 0) {
                    var placeholder = $("#keyword").attr("placeholder");
                    if (placeholder.indexOf("http") == 0 || placeholder.indexOf("//") == 0) {
                        $("#keyword").attr("url", placeholder);
                        $("#keyword").attr("placeholder", url)
                    }
                }
            }
            var __testCache = 0;
            try {
                $('[data-tpa="YHD_PCSY_COUPON"]').hide()
            } catch (e) {
            }
            ;
        } catch (err) {
        }
    })(jQuery)
</script>
<script type="text/javascript">
    var jaq = jaq || [];
    jaq.push(['account', 'JA2017_111805']); //站点编号
    jaq.push(['domain', 'yhd.com']); //站点域名
    (function () {
        var ja = document.createElement('script');
        ja.type = 'text/javascript';
        ja.async = true;
        ja.src = '//wl.jd.com/joya.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(ja, s);
    })();
</script><!-- foot include end -->


</body>
</html>