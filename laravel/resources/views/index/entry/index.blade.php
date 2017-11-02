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
    <script src="/js/jquery.js"></script>
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


    <script>
        $(function () {
            $("#all .hd:nth-child(2)").removeClass("phone_electric").addClass("popular_store");
            $("#all .hd:nth-child(3)").removeClass("phone_electric").addClass("care_makeup");
            $("#all .hd:nth-child(4)").removeClass("phone_electric").addClass("home_life");
            $("#all .hd:nth-child(5)").removeClass("phone_electric").addClass("china_food");


        })
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
                    @if(!isset(Auth::guard('reg')->user()->username))
                    <li id="global_unlogin">
                        <div class="hd_unlogin">
                            <span class="hd_hi">Hi,请</span>
                            <a href="/index/login" class="hd_login_link">登录&nbsp;</a>
                            <a href="/index/reg" class="hd_regist_link">&nbsp;注册</a>
                        </div>
                    </li>
                    @else
                    <li id="global_login" class="hd_has_child" style="" data-type="2017">
                        <div class="hd_login">
                            <span class="hd_hi">Hi,</span>
                            <a href="" target="_blank" class="hd_login_name"></a>
                            {{Auth::guard('reg')->user()->username}}
                            <i class="hd_iconfont"></i>
                        </div>
                        <div class="hd_user_privilege">
                            <a href="/index/loginout" class="hd_login_out">退出登录</a>
                            <div class="clearfix">
                                <a href="/index/home" class="hd_avata_box">
                                    <img src="//d9.yihaodianimg.com/N10/M00/2F/59/ChEi21iJ3ayAHRRxAACBZMCLZII10800.jpg"
                                         alt=""></a>
                                <div class="fl"><a href="/index/home" title="用户名" class="hd_login_name">
                                        {{Auth::guard('reg')->user()->username}}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </li>
                        <li>
                            <div class="hd_menu">
                                <a href="/index/myorderlist/{{Auth::guard('reg')->user()->id}}" target="_blank" rel="nofollow"><i class="hd_iconfont"></i>我的订单</a>
                            </div>
                        </li>
                    @endif
                    <li class="hd_has_child" >
                        <div class="hd_menu">

                        </div>
                        <div class="hd_menu_list">

                        </div>
                    </li>

                </ul>
            </div>
        </div>
    </div>
    <div class="wrap hd_header ">
        <div class="hd_logo_area">
            <a href="javascript:;" class="hd_logo"><img
                    src="//d9.yihaodianimg.com/N09/M03/85/8D/ChEi11jziCeADU2FAAAcush2hwQ74100.png" alt=""></a>
        </div>
        <div class="hd_header_right">
            <div class="clearfix">
                <div class="hd_head_search">
                    <div class="hd_search_form" id="hdSearchForm">
                        <div class="hd_fixed_wrap">
                            <a href="/" class="hd_fixed_logo"><img
                                    src="//d7.yihaodianimg.com/N09/M09/85/8D/ChEi11jziUSAOkn4AABJ2dwtrSw01400.jpg"
                                    alt="" width="205" height="70"></a>
                            <div class="hd_search_wrap clearfix">
                                <form action="/index/search" method="post">
                                    {{csrf_field()}}
                                <label for="keyword" style="display:none;">请输入关键词</label>
                                <input class="hd_search_ipt" name="keyword" id="keyword" type="text" value="" placeholder="请输入关键词" >
                                <button type="submit" class="hd_search_btn"><i class="hd_iconfont"></i></button>
                                </form>
                            </div>

                        </div>
                    </div>
                    {{--<p id="hotKeywordsShow" class="hd_hot_search">--}}
                        {{--<a title="电热壶" target="_blank" href="">电热壶</a>--}}
                    {{--</p>--}}
                    <!--搜索推荐-->
                </div>

                <!--购物车-->
                <div class="hd_mini_cart" id="miniCart" data-version="1">
                    <u class="hd_c_num none" id="in_cart_num" style="display: none;"></u>
                    <a class="hd_prism_cart" href="/index/showcart" target="_blank" >
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
                        <span title="{{$v['cname']}}" target="_blank">{{$v['cname']}}</span>
                    </h3>
                    <div class="hd_show_sort hd_allsort clearfix">
                        <div class="hd_good_category">
                            @foreach($v['secondCategory'] as $vv)
                            <dl class="clearfix">
                                <dt>
                                    <a href="/index/lists/{{$vv['id']}}" >{{$vv['cname']}}</a><i> &gt;</i>
                                </dt>
                                <dd>
                                    @foreach($vv['threeCategory'] as $vvv)
                                        <a href="/index/lists/{{$vvv['id']}}"target="_blank">{{$vvv['cname']}}</a>
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
                <a id="index_account_icon_login" style="display: block;" href="javascript:;" target="_blank"><img src="http://d9.yihaodianimg.com/N10/M00/2F/59/ChEi21iJ3ayAHRRxAACBZMCLZII10800.jpg"></a>
                <a id="index_account_icon_unlogin" href="javascript:;" target="_blank" style="display: none;"></a>
            </div>
            <div class="info_wrap">
                @if(isset(Auth::guard("reg")->user()->username))
                <div class="login_box" style="display: block;" id="index_account_info_login">
                    <div class="user_info clearfix">
                        <em>Hi，{{Auth::guard("reg")->user()->username}}</em>
                    </div>
                </div>
                @else
                <div class="unlogin_box" id="index_account_info_unlogin" style="display: block;">
                    <div>Hi~你好!</div>
                    <div class="tips"></div>
                    <div class="btn_wrap">
                        <a href="/index/login" class="login_btn">登录</a>
                        <a href="/login/reg" class="regist_btn">注册</a>
                    </div>
                </div>
                @endif
            </div>
        </div>
        <!-- 个人中心结束 -->
    </div>

    <div class="mod_promo_show" id="promo_show">
        <div class="promo_wrapper">
            <ul id="slider" data-init="0" data-bgflag="1">
                <li style="background-color: rgb(249, 75, 41); position: absolute; z-index: 0; display: none;"
                    data-bgcolor="#f94b29" flag="1" data-advid="21971">
                    <a href="javascript:;" target="_blank" title="吃货节"
                       data-img="//img30.360buyimg.com/img/jfs/t10201/202/1379710493/157023/deeee1c/59e085d3N286174e6.jpg"
                       class="" data-tag="0" clstag="pageclick|keycount|home_201709224|10">
                        <div class="promo_img"
                             style="background-image: url(//img30.360buyimg.com/img/jfs/t10201/202/1379710493/157023/deeee1c/59e085d3N286174e6.jpg)"></div>
                    </a>
                </li>
                <li style="background-color: rgb(54, 168, 255); position: absolute; z-index: 0; display: none;"
                    data-bgcolor="#36a8ff" flag="2" data-advid="21972">
                    <a href="javascript:;" target="_blank" title="酒水饮料"
                       data-img="//img30.360buyimg.com/img/jfs/t10819/267/1128954520/79916/4663c8d7/59dc928aN0dec4d09.jpg"
                       class="" data-tag="0" clstag="pageclick|keycount|home_201709224|11">
                        <div class="promo_img"
                             style="background-image: url(//img30.360buyimg.com/img/jfs/t10819/267/1128954520/79916/4663c8d7/59dc928aN0dec4d09.jpg)"></div>
                    </a>
                </li>
                <li style="background-color: rgb(75, 89, 238); position: absolute; z-index: 0; display: none;"
                    data-bgcolor="#4b59ee" flag="3" data-advid="21973">
                    <a href="javascript:;" target="_blank" title="每满199减100"
                       data-img="//img30.360buyimg.com/img/jfs/t10834/312/1427437485/92986/4238ce4a/59e0a799N1a021fad.jpg"
                       class="" data-tag="0" clstag="pageclick|keycount|home_201709224|12">
                        <div class="promo_img"
                             style="background-image: url(//img30.360buyimg.com/img/jfs/t10834/312/1427437485/92986/4238ce4a/59e0a799N1a021fad.jpg)"></div>
                    </a>
                </li>
                <li style="background-color: rgb(71, 170, 235); position: absolute; z-index: 0; display: none;"
                    data-bgcolor="#47aaeb" flag="4" data-advid="21974">
                    <a href="javascript:;" target="_blank" title="都是全屏惹的祸"
                       data-img="//img30.360buyimg.com/img/jfs/t10099/65/1324936594/119797/91ccae03/59df4eddN7d329681.jpg"
                       class="" data-tag="0" clstag="pageclick|keycount|home_201709224|13">
                        <div class="promo_img"
                             style="background-image: url(//img30.360buyimg.com/img/jfs/t10099/65/1324936594/119797/91ccae03/59df4eddN7d329681.jpg)"></div>
                    </a>
                </li>
                <li style="background-color: rgb(111, 201, 254); position: absolute; z-index: 0; display: none;"
                    data-bgcolor="#6fc9fe" flag="5" data-advid="21975">
                    <a href="javascript:;"
                       target="_blank" title="不止五折"
                       data-img="//img1.360buyimg.com/da/jfs/t10993/122/1643511393/166241/167ed0a3/59e45e38N6dad8bd0.jpg"
                       class="" data-tag="0" clstag="pageclick|keycount|home_201709224|14" data-done="1">
                        <div class="promo_img"
                             style="background-image: url(//img1.360buyimg.com/da/jfs/t10993/122/1643511393/166241/167ed0a3/59e45e38N6dad8bd0.jpg)"></div>
                    </a>
                </li>
                <li style="background-color: rgb(211, 190, 145); position: absolute; z-index: 1; display: list-item;"
                    data-bgcolor="#d3be91" flag="6" data-advid="21976">
                    <a href="javascript:;" target="_blank" title="女装馆"
                       data-img="//img30.360buyimg.com/img/jfs/t9943/20/1181256357/143163/7c7ba4a1/59dd7f9aNd98f597d.jpg"
                       class="" data-tag="0" clstag="pageclick|keycount|home_201709224|15">
                        <div class="promo_img"
                             style="background-image: url(//img30.360buyimg.com/img/jfs/t9943/20/1181256357/143163/7c7ba4a1/59dd7f9aNd98f597d.jpg)"></div>
                    </a>
                </li>
                <li style="background-color: rgb(21, 11, 5); position: absolute; z-index: 0; display: none;"
                    data-bgcolor="#150b05" flag="7" data-advid="21977">
                    <a href="javascript:;" target="_blank" title="家电"
                       data-img="//img30.360buyimg.com/img/jfs/t8974/257/2622069952/132956/8fcd93c0/59df36daN2ea2e7d6.jpg"
                       class="" data-tag="0" clstag="pageclick|keycount|home_201709224|16">
                        <div class="promo_img"
                             style="background-image: url(//img30.360buyimg.com/img/jfs/t8974/257/2622069952/132956/8fcd93c0/59df36daN2ea2e7d6.jpg)"></div>
                    </a>
                </li>
                <li style="background-color: rgb(46, 26, 89); position: absolute; z-index: 0; display: none;"
                    data-bgcolor="#2e1a59" flag="8" data-advid="21978">
                    <a href="javascript:;" target="_blank" title="全球美食"
                       data-img="//img30.360buyimg.com/img/jfs/t7468/260/3397423205/88536/61455ec4/59e4787fN33017cb7.jpg"
                       class="" data-tag="0" >
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
    </a>
    <div class="seckill_list_wrap seckill_all_pro">
        <a href="javascript:;" class="hd_iconfont prev">
        </a>
        <div class="seckill_list">
            <ul class="clearfix" style="margin-left: 0px;">
                @foreach($qiangou as $v)
                <li class="prod" data-status="2">
                    <div class="dotted_line"></div>
                    <a href="/index/item/{{$v['id']}}" target="_blank" title="{{$v['gname']}}"
                       class="clearfix">
                        <div class="pro_detail">
                            <p class="pro_name">{{$v['gname']}}</p>
                            <p class="pro_price" grouponid="1067446" data-pricedone="1">¥<em>{{$v['price']}}</em></p>
                        </div>
                        <img src="{{$v['listImages']}}" alt="{{$v['gname']}}" class="pro_pic">
                    </a>
                </li>
                @endforeach
            </ul>
        </div>
        <a href="javascript:;" class="hd_iconfont next"></a></div>
</div>
<!--1号抢购结束-->

<div id="needLazyLoad">


<div id="all">
    @foreach($allCategory as $v)
    {{--手机家电--}}
    <div class="wrap mod_lift_floor mod_index_floor clearfix phone_electric hd" id="floorSJJD" lazyLoad_textarea="textareaFloorSJJD" style="height:430px;">
<textarea style="display:none;" autocomplete="off" id="textareaFloorSJJD">

        <div class="left_con">
            <h4><a title="{{$v['description']}}" href="" target="_blank">{{$v['cname']}} <i>&gt;</i></a></h4>
            <p class="en_tit">{{$v['description']}}</p>
            <div class="floor_silder">
                <ul>
                    <?php
                        $i =3;
                    ?>
                    @foreach($v['_data'] as $vv)
                         @if($i <6)
                        <li class="img_first" data-advid="22156" style="z-index: 100; width: 195px; height: 225px; left: 0px; top: 0px;">
                            <a title="{{$vv['description']}}" target="_blank" href="/index/lists/{{$vv['id']}}">
                                <p class="caption">{{$vv['cname']}}</p>
                                <p class="sub_tit">{{$vv['description']}}</p>
                                <img width="130" height="130" src="{{$vv['thumb']}}" alt="">
                            </a>
                            <div class="color_mask" style="opacity: 0;"></div>
                        </li>
                        @endif
                        <?php
                        $i++;
                        ?>
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
                   @foreach($v['_data'] as $vv)
                   @foreach($vv['_data'] as $vvv )
                     <li>
                        |<a target="_blank" href="">{{$vvv['cname']}}</a>
                    </li>
                    @endforeach
                    @endforeach
                </ul>
            </div>
            <div class="clearfix">
                @foreach($v['_data'] as $vv)
                    <div class="pro_wrap">
                        <a title="{{$vv['description']}}" target="_blank" href="/index/lists/{{$vv['id']}}">
                            <p class="pro_tit">{{$vv['cname']}}</p>
                            <p class="pro_sub_tit">{{$vv['description']}}</p>
                            <img src="{{$vv['thumb']}}"
                                 alt="{{$vv['cname']}}" width="130" height="130" >
                        </a>
                    </div>
                @endforeach
            </div>

        </div>
        <div class="hot_con">
            <p class="hot_tit">热门商品</p>
            <div class="rank_list">
                <ul class="hotgoods">
                    @foreach($v['hot'] as $vv)
                    <li data-singlemodule="1">
                        <a class="pro_img clearfix" title="{{$vv['gname']}}" target="_blank" href="/index/item/{{$vv['id']}}">
                            <img alt="{{$vv['gname']}}"
                                 src="{{$vv['listImages']}}"
                                 width="60" height="60" data-imgattr="original">
                            {{--<i>1</i>--}}
                            <div class="rank_detail">
                                <p class="pro_name">{{$vv['gname']}}</p>
                                <p class="pro_price" data-skuid="J_4538873" data-pricedone="1">¥<em>{{$vv['price']}}</em></p>
                            </div>
                        </a>
                    </li>
                    @endforeach
                </ul>
            </div>
        </div>
        </textarea>

    </div>

    @endforeach

</div>
<!--全球进口部分结束-->




<!--左侧边导航条-->

<!--左侧边导航条结束-->

<!--右侧导航条-->
<div id="prismWrap" class="yhd_prism_wrap">
    <div class="yhd_prism_nav">
        <div class="prism_top_ad">
            <div class="prism_nav_tab" data-type="adv" id="prismTopAdv"></div>
        </div>
        <div class="prism_nav_center">
            <div class="prism_nav_tab prism_icon_wrap" data-type="icon" id="prismPerson">
                <a href="/" target="_blank">
                    <span class="prism_icon_tab">
                        <em class="prism_iconfont"></em>n
                    </span>
                    <u class="prism_icon_text">个人中心</u>
                </a>
            </div>
            <div class="prism_nav_tab prism_cart_wrap" data-type="cart" id="prismCart">
                <a class="prism_cart_tab" href="/" target="_blank">
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
    <script type="text/javascript" src="//img.yihaodianimg.com/front-homepage/global/js/global_index_top.js?7b9fa80" charset="utf-8"></script>
    <script type="text/javascript" src="//img.yihaodianimg.com/front-homepage/index/js/index.js?7b9fa80" charset="utf-8"></script>
    <script type="text/javascript" src="//st.360buyimg.com/sso/synccookie.js?7b9fa80" charset="utf-8"></script>

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