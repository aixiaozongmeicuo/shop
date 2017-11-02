<!doctype html>
<html lang="en">
<head>
    <script type="text/javascript" async="" src="//wl.jd.com/joya.js"></script>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta name="renderer" content="webkit">
    <meta http-equiv="Cache-Control" content="no-transform">
    <meta http-equiv="Cache-Control" content="no-siteapp">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>list</title>

    <!--css start-->

    <link href="/css/global_site_search.css" rel="stylesheet" type="text/css"/>
    {{--<link href="//search.yhd.com/statics/search3/css/search_table2.css?1200" rel="stylesheet" type="text/css"/>--}}
    <link href="/css/search_table2.css" rel="stylesheet" type="text/css"/>

    <!--css end-->
    <!--js start-->
    <script src="/js/jquery.js"></script>
    <script>
        $(function () {
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
        })
    </script>
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
            "coupon": "//coupon.yhd.com",
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
            "mymall": "//my.1mall.com",
            "selfroot": "//www.yhd.com",
            "products_stock": "//gps.yhd.com/busystock",
            "sitedomainmall": ".1mall.com",
            "item": "//item.yhd.com",
            "tuangou": "//www.yhd.com/tuangou/index.do",
            "commentZoneYhd": "//e.yhd.com/front-pe",
            "centralImgDomain": ".yihaodianimg.com",
            "productDetailUrl": "//www.yhd.com",
            "passport": "https://passport.yhd.com",
            "statics": "//search.yhd.com/statics",
            "mobile": "http://m.yhd.com",
            "mall": "//www.1mall.com"
        };
        var headerType = "base";
        var imagePath = "//search.yhd.com/statics/global/images";
        var currSiteId = 1;
        var currSiteType = 1;
        var globalEnv = "PRODUCTION";
        var siteStyle = 1;
        var siteFlag = 0;
        var isIndex = 0;
        var indexFlag = 0;
        var currProvinceId = 1;
        var currVersionNum = "1200";
        var lazyLoadImageObjArry = lazyLoadImageObjArry || [];
        var isFixTopNav = false;
        window.isBigWide = true;
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
        var isSearchKeyWords = 1;
        <!--用于控制宽窄屏属性-->
        var isWidescreen = (screen.width >= 1280);
    </script>
    <!--js end-->
    <script type="text/javascript" charset="UTF-8"
            src="//passport.yhd.com/front-passport/passport/js/login_frame_client.js?1200">
    </script>
    <script type="text/javascript">
        window.HASH = {
            longUrl: "//search.yhd.com/c1320-0-0/mbname-b/a-s1-v4-p1-price-d0-f0-m1-rt0-pid-mid0-color-size-k/",
            ajaxLongUrl: "//search.yhd.com/searchPage/c1320-0-0/mbname-b/a-s1-v4-p1-price-d0-f0-m1-rt0-pid-mid0-color-size-k/",
            isCorrectHash: function (_hash) {
                if (/page=[0-9]*&sort=[0-9]*/.test(_hash)) {
                    return true;
                } else {
                    return false;
                }
            },
            getRealHash: function () {
                var _hash = window.location.hash.substr(1);
                return _hash;
            },
            handleUrl: function (_hash, url) {
                if (_hash.indexOf("page") != -1) {
                    var page = _hash.replace(/page=([0-9]*).*/, "$1");
                    url = url.replace(/-p[0-9]*-/, "-p" + page + "-");
                }
                if (_hash.indexOf("sort") != -1) {
                    var sort = _hash.replace(/.*sort=([0-9]*).*/, "$1");
                    url = url.replace(/-s[0-9]*-/, "-s" + sort + "-");
                }
                if (_hash.indexOf("?") != -1) {
                    var suffix = _hash.substr(_hash.indexOf("?"), _hash.length);
                    url = url + suffix;
                }
                return url;
            }
        };
        (function () {
            var _hash = HASH.getRealHash();
            if (HASH.isCorrectHash(_hash)) {
                window.location.href = HASH.handleUrl(_hash, HASH.longUrl);
                return false;
            }
        })();
        var needMispellKw = "0";// 默认0，走纠错逻辑，1表示用户选择了不纠错,仍然艘错
        var loginedUserId = "0";
        var choosedAttrItemsCar = "";
        var searchCarUrl = "//search.yhd.com/c1320-0-0/mbname-b/a-s1-v4-p1-price-d0-f0-m1-rt0-pid-mid0-color-size-k/";
        var longUrl = "//search.yhd.com/c1320-0-0/mbname-b/a-s1-v4-p1-price-d0-f0-m1-rt0-pid-mid0-color-size-k/";
        var ajaxLongUrl = "//search.yhd.com/searchPage/c1320-0-0/mbname-b/a-s1-v4-p1-price-d0-f0-m1-rt0-pid-mid0-color-size-k/";
        var sortby = "1";
        var priceRangeMin = "-1"; //价格区间低价，供搜索悬浮条使用
        var priceRangeMax = "-1"; //价格区间高价，供搜索悬浮条使用
        var cateType = "0";
        var requestType = "30";
        var search_template = "0";
        var flagView = "4";
        var cateName = "0-0";
        var brandIdStr = "";
        var isWidescreen = 0;
        var respSearchKeyWord = "";
        var mispellWord = "";
        var mispellWordFromAction = "";
        var searchPageNo = "1";
        var pageCount = "50";
        var searchPageSize = "30";
        var categoryName = '0-0';
        var isSpecialType2 = "0"; //百分点
        var isSimilarCategory = "0"; //相似商品类目
        var isSimilarFromIntf = "0";
        var priceTemplateId = "0";
        var switchPreSale = '0'; // 过滤预售商品开关:0,close;1,open.
        var internalKeyword = '';
        var productCount = '666454';
        var topProductsId = '';
        var searchProductExposure = '';
        var showAdvertise = '1';
        var showOnway = '0';
        var advProducts = '';
        if (screen.width >= 1280) {
            isWidescreen = 1;
        }
        // smartPixel 获取搜索相关分类的类目名称
        var sp_keyword = ""; // 用于判断是否搜索页
        var isLongQuery = '0'; //用于判断是不是长查询或者是Less product recommend
        var sp_pcat = '';
        var specialProvinceIds = "";
        var isSearchKeyWords = "0"; //判断是搜词还是类目
        var isElectronicGiftCate = "0";
        var inputBrandId = "0";
        var inputBrandName = "";
        var isGuinnessLogic = "1";
        var colorAtributeId = "";
        var tags_expose_tracker_switch = "0";
        var isBrandOnlyReqNeed = "1"; //品牌多选区域一次性加载
        var largeImgCategoryFlag = "0"; // 当前类目是否为服装差异化类目:0,不是; 1,是
        var urlS2 = "";
        var bigPromotionCmsAd = "0";
        var bigPromotionCmsUrl = "//cms.yhd.com/cmsPage/getCmsMould.do?pageId=110003&mouldId=1631357&provinceId=1";
        var respBrandShopIds = "";
        var searchShowMarketPrice = "1"; //市场价开关
        var compareCategoryFlag = "0"; // 当前类目是否开放商品对比
        var expectCategoryId = "1320";
        var isShowShoppingGuide = "1";
        var isUsingPromoJson = "0";
        var selectedFilter = "0";//选中的筛选
        var ceCategoryServiceFlag = "0";
        var msiteCategoryIds = '';
        var navCategoryIds = '';
        var fashionCateType = "2"; //是否为流百类目
        var isOnlineCustomer = "0";//部分类目在线客服
        var onlineChatSwitch = "1"; //流百类在线客服开关
        var tagsSwitch = "0"; //闪购团购标签开关
        var advRef = "";
        var resultType = "0";
        var lazyLoadCategoryBrotherFlag = "0";
        var reqLongUrl = "//search.yhd.com/c1320-0-0/mbname-b/a-s1-v4-p1-price-d0-f0-m1-rt0-pid-mid0-color-size-k/";
        var firstPgAdSize = "0";
        var topHotRecommand = 'false';
        var isStockMonitor = "1";//库存监控开关
        var filterByMultiAreasFlag = "1"; // 当前类目是否开放三级区域筛选功能
        var secondAreaFlag = "0"; // 是否开放二级区域
        var samsMerchantIdsConfig = ""; // 山姆会员商家ID
        var seoShortUrl = "1"; //seo url短连接,1:类目页属性短连接
        var lessResultsRecProductsSize = "0"; //少结果推荐相似商品个数
        var detailYhdareas = "北京_密云区_城区";//四级区域地址
        //海购新域名
        var urlType = "0";
        var searchKeywordUrl = "//search.yhd.com";
        var searchCategoryUrl = "//search.yhd.com";
        var item = "//item.yhd.com";
        if (sp_keyword != '') {
            if (sp_pcat != '')
                sp_pcat = sp_pcat.substr(1);
        }
        var viewModeflag = 0;
    </script>
    <script>
        var urlSearchType = "";
    </script>
    <style>
        .hd{
            border: 1px solid red;
            cursor: pointer;
        }
    </style>
</head>
<body class="w980">

<div class="hd_header_wrap">
    <!-- top_bar -->
    <div class="hd_top_bar">
        <div class="wrap clearfix">
            <a href="/" class="hd_topbar_home">
                <i class="hd_iconfont"></i>
                <span>1号店首页</span>
            </a>
            <div class="hd_indxProvce hd_has_child" id="headerSelectProvince" style="display: none;"></div>
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
                                <a href="" target="_blank" class="hd_login_name">
                                    {{Auth::guard('reg')->user()->username}}
                                </a>
                                <i class="hd_iconfont"></i>
                            </div>
                            <div class="hd_user_privilege">
                                <a href="/index/loginout" class="hd_login_out">退出登录</a>
                                <div class="clearfix">
                                    <a href="/index/home" class="hd_avata_box">
                                        <img src="//d9.yihaodianimg.com/N10/M00/2F/59/ChEi21iJ3ayAHRRxAACBZMCLZII10800.jpg"
                                             alt=""></a>
                                    <div class="fl"><a href="" title="用户名" class="hd_login_name">
                                            {{Auth::guard('reg')->user()->username}}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </li>
                    @endif
                    <li>
                        <div class="hd_menu hd_notice" id="hdUserMsg" style="display: none" data-cfg="1">
                            {{--<a href="" rel="nofollow" target="_blank">我的消息&nbsp;(<em class="hd_has_num">0</em>)</a>--}}
                        </div>
                    </li>
                    <li>
                        <div class="hd_menu">
                            <a href="" target="_blank" rel="nofollow"><i class="hd_iconfont"></i>我的订单</a>
                        </div>
                    </li>
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
    <!-- top_main -->
    <div class="wrap hd_header hd_cm_global">
        <div class="clearfix">
            <div class="hd_logo_area">
                <a href="/" class="hd_logo"><img
                            src="//d9.yihaodianimg.com/N10/M0A/DB/61/ChEi2lj4TqGAOjXwAAAbSq83IXA88700.png"
                            alt="基础头部logo"></a>
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
                        {{--<p id="hotKeywordsShow" class="hd_hot_search"><a title="角几" target="_blank" href="">角几</a></p>--}}
                        {{--<!--搜索推荐-->--}}
                    </div>
                    <div class="hd_mini_cart" id="miniCart" data-version="1">
                        <u class="hd_c_num none" id="in_cart_num" style="display: inline;">1</u>
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
    <!-- top_nav -->
    <div class="hd_cm_wrap">
        <div class="wrap">
            <div class="hd_cm_nav clearfix" id="headerNav">
                <div class="hd_cm_allsort_wrap" id="allSortbox"></div>
                <div class="hd_cm_nav_wrap">

                </div>
            </div>
        </div>
    </div>
</div>

<div class="searchwrap wrap mpwrap">
    <input type="hidden" id="csstype" name="csstype" value="search">
    <input id="searchword" type="hidden" value="" reqmode="0"><input id="searchCategory" type="hidden" value="0">
    <input id="curCategoryIdToGlobal" type="hidden" value="0">
    <input id="pflag" type="hidden" value="0">
    <input id="categoryIdForPms" type="hidden" value="0">
    <input id="categoryIdForAdv" type="hidden" value="0">
    <input id="matchCategoryIdForAdv" type="hidden" value="0">
    <input id="mandyRunable" type="hidden" value="0">
    <input id="ad_nextblockStartIndex" type="hidden" value="">
    <input id="ad_currentPageno" type="hidden" value="0">
    <input id="searchFlag" type="hidden" value="0">
    <div id="divAd_searchTopHotProducts" class="mod-search-cehot" style="display:none"
         data-tpa="SEARCH_MAIN_CEHOT">

    </div>
    <div class="mod_search_crumb" data-tpa="SEARCH_MAIN_CRUMB" clstag="pageclick|keycount|keyword_201709255|3">
        <div class="crumbSlide">
            <a class="c_btn c_prev iconSearch" href="javascript:;" title="上一页" style="display: none;"></a>
            <div class="crumbClip">
                <ul class="listCon clearfix" style="width: 409px;">
                    <li class="crumb_ico iconSearch"></li>
                    <!--s 面包屑导航分类1-->
                    <li class="crumb_list"> <span class="crumb_all_title clearfix">
<a href="javascript:;" >全部结果</a>
</span> </li>
                </ul>
            </div>
            <a class="c_btn c_next iconSearch" href="javascript:;" title="上一页" style="display: none;"></a>
        </div>
        <!-- 指定类目开启产品质量信息查询功能 -->
        <!--s 搜索结果数-->
        <small class="result_count">共{{count($data)}}条</small>
        <!--e 搜索结果数-->
    </div>
    <div class="clearfix"></div>
    <div class="mod_product_list clearfix" data-tpa="SEARCH_MAIN_LIST">
        <div class="list_width small spread clearfix" id="itemSearchList">
            @foreach($data as $v)
                <div class="mod_search_pro" defaultid="0" id="producteg_1383139" data-tcd="5.0" data-tcs="3.0"
                     data-tpc="2">
                    <div  class="itemBox" id="itemSearchResultCon_1383139"
                          comproid="1383139">
                        <input id="shop_1383139" type="hidden" value="0">
                        <input id="serise_1383139" type="hidden" value="0">
                        <input id="shop_pm_0" type="hidden" value="0">
                        <div class="proImg" id="searchProImg">
                            <p class="ico_abs">
                            </p>
                            <a class="img"  id="pdlink1_1383139" href="/index/item/{{$v->id}}" target="_blank">
                                <img style="width:230px;height:230px"
                                     src="{{$v->listImages}}">
                            </a>
                            <div class="sideUp styleBox" style="bottom: 0px;"></div>
                        </div>
                        <p class="proPrice">
                            <em class="num" id="price0_1383139" productid="1383139" adproductflag="0"
                                yhdprice="49.95" productunit="" diapernum="0" diapernumunit="">
                                <b>¥</b>{{$v->price}}
                            </em>
                            <span id="unit_price_1383139" class="unit_price"></span>
                        </p>
                        <p class="proName clearfix">
                            <a class="mainTitle" href="/index/item/{{$v->id}}"
                               target="_blank" title="{{$v->gname}}">
                                {{$v->gname}}
                            </a>
                        </p>
                        <div class="item_act clearfix" id="shopping_cart">
                            <div class="shopping_act fl" id="shopping_act_1383139" isnumbuy="0">
                                <a class="buy_btn" href="/index/item/{{$v->id}}"
                                   target="_blank">查看详情</a>
                            </div>
                        </div>
                        <p class="proPrice">
<span class="comment">
<a id="pdlinkcomment_1383139"  href="javascript:;" target="_blank">
<i class="iconSearch"></i>{{$v->numLook}}</a>
</span>
                            <span class="positiveRatio" title="好评率98%"><i class="iconSearch"></i>98%</span>
                        </p>
                        <p class="storeName limit_width">
                            <sapn class="o_1" target="_blank" title="自营-心相印官方旗舰店">自营-心相印官方旗舰店</sapn>
                        </p>
                        <div class="bg_border bg_01" style="display: none;"></div>
                        <div class="bg_border bg_02" style="display: none;"></div>
                    </div>
                </div>
            @endforeach
        </div>
    </div>

    <!--======e 对比功能栏======-->
    <div id="divAd_SEARCH_SCATTERED_TOP_DEFAULT" class="banner980x60 mt5" style="display:none"></div>
</div>

<div class="ft_wrap">
    <div id="globalBottomBrowseRelated" data-recordtracker="1"></div>
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
            <a href="//cms.yhd.com/cms/view.do?topicId=16" target="_blank">经营证照</a>
            |
            <a href="//d9.yihaodianimg.com/N10/M05/00/A9/ChEi2lkQGRaAfaeeAAIhVwT2TYo18400.jpg" target="_blank">互联网药品信息服务资格证</a>
            |
            <a target="_blank">违法和不良信息举报电话：0514-85899118</a>
            |
            <a href="//d9.yihaodianimg.com/N11/M04/76/1C/ChEwoVnfFfeAfzKUAAg9urXNqaA12000.jpg" target="_blank">沪B2-20170039</a>
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
<script type="text/javascript" src="/js/global_search_top.js" charset="utf-8"></script>
{{--系统异常报错的js被注释掉了--}}
{{--<script type="text/javascript" src="//search.yhd.com/statics/search3/js/search_shop.js?1200" charset="utf-8"></script>--}}
<script type="text/javascript" src="//st.360buyimg.com/sso/synccookie.js?1200" charset="utf-8"></script>
</body>
</html>
<script>
    //精准化营销取值用
    var brand = 0;
    var brandId = 0;
    if (brand <= 0) {
        brandId = 84830;
    }
    var category = 1320;
    var searchKey = encodeURI(encodeURI(''));
    $(document).ready(function () {
        var l = 0, w = parseInt($('.searchProList').width());
        var num = Math.floor($('.searchProList li').length / 5);
        var maxnum = Math.ceil($('.searchProList li').length / 5);
        $('.searchPro_pre').click(function (e) {
            e.preventDefault();
            if (l == 0) {
                l = num;
                if (l != maxnum)
                    spPosition();
                return;
            }
            l--;
            spPosition();
        });
        $('.searchPro_next').click(function (e) {
            e.preventDefault();
            if (l == num) {
                l = 0;
                spPosition();
                return;
            }
            l++;
            if (l != maxnum)
                spPosition();
        });
        function spPosition() {
            $('.searchProList').animate({'marginLeft': '-' + l * w + 'px'}, 'fast');
        }
    });
</script>
<noscript>
    <div style="display:inline;">
        <img id="smartPixel" height="1" width="1" style="border-style:none;" alt=""
             src="http//googleads.g.doubleclick.net/pagead/viewthroughconversion/1025835260/?value=0&amp;label=PJg_CKCEtwMQ_IGU6QM&amp;guid=ON&amp;script=0"/>
    </div>
</noscript>
<script type="text/javascript">
    //京东打点 页面pv
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
</script>
</body>
</html>