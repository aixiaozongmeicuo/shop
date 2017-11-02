<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN""http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta name="renderer" content="webkit">
    <meta http-equiv="Cache-Control" content="no-transform"/>
    <meta http-equiv="Cache-Control" content="no-siteapp"/>
    <title>我的1号店--订单详情页</title>
    <!--css start-->
    <link href="//img.yihaodianimg.com/myyhd/global/css/global_site_base.css?0" rel="stylesheet" type="text/css"/>
    <link href="//img.yihaodianimg.com/myyhd/member/css/order_detail.css?0" rel="stylesheet" type="text/css"/>
    <!--css end-->
    <!--js start-->
    <script type="text/javascript">
        var URLPrefix = {
            "shop": "//shop.yhd.com",
            "busystock": "//gps.yhd.com",
            "TipDate": "2012-09-29",
            "cms": "//cms.yhd.com",
            "pms": "//pms.yhd.com",
            "my_statics": "//static.yihaodian.com/member",
            "passportmall": "https://passport.1mall.com",
            "mallImgDomain": ".51ap.cn",
            "shoping_pms": "//pms.yihaodian.com",
            "shoping_shop": "//shop.yhd.com",
            "search": "//search.yhd.com",
            "sitedomain": ".yhd.com",
            "tryUrl": "//try.yhd.com",
            "shoping_self": "//www.yhd.com",
            "commentZoneMall": "//e.1mall.com/front-pe",
            "tracker": "tracker.yhd.com",
            "productDetailHost": "//www.yhd.com",
            "central": "//www.yhd.com",
            "search_list": "//search.yhd.com",
            "cartDomain": "//cart.yhd.com",
            "centralShop": "//shop.yhd.com",
            "footFriendLink": "//www.yhd.com/friendlink/index.do",
            "shoping_my_statics": "//static.yihaodian.com/statics",
            "shoping_passport": "https://passport.yhd.com",
            "yaowang": "//www.111.com.cn",
            "uploadPostUrl": "//upload.yihaodian.com/upload/UploadAction",
            "shoping_my": "/home.yhd.com",
            "image": "//image.yihaodian.com",
            "shoping_search": "//search.yhd.com",
            "shoping_opposite": "//www.1mall.com",
            "shoping_central": "//www.yhd.com",
            "my": "//home.yhd.com",
            "search_keyword": "//search.yhd.com",
            "mymall": "//my.1mall.com",
            "my_h5": "//home.m.yhd.com",
            "selfroot": "//www.yhd.com",
            "products_stock": "//gps.yhd.com/busystock",
            "sitedomainmall": ".1mall.com",
            "item": "//item.yhd.com/",
            "tuangou": "//www.yhd.com/tuangou/index.do",
            "commentZoneYhd": "//e.yhd.com/front-pe",
            "centralImgDomain": ".yihaodianimg.com",
            "productDetailUrl": "//www.yhd.com",
            "passport": "https://passport.yhd.com",
            "statics": "//img.yihaodianimg.com/myyhd",
            "mobile": "//m.yhd.com",
            "mall": "//www.1mall.com"
        };
        var headerType = "base";
        var imagePath = "//img.yihaodianimg.com/myyhd/global/images";
        var currSiteId = 1;
        var currSiteType = 1;
        var globalEnv = "PRODUCTION";
        var siteStyle = 1;
        var siteFlag = 0;
        var isIndex = 0;
        var indexFlag = 0;
        var currProvinceId = 1;
        var currVersionNum = "0";
        var lazyLoadImageObjArry = lazyLoadImageObjArry || [];
        var isFixTopNav = true;
        (function (flag) {
            if (flag) {
                window.globalPrismFlag = '1';
                window.globalPrismFeedbackURL = '//www.yhd.com/survey/4/1/577.html';
                window.globalPrismQRName = '';
                window.globalPrismQRTitle = '';
                window.globalPrismQRPng = '';
                window.globalPrismMemberLink = '//home.yhd.com/myyhdindex/index.do';
                window.globalPrismCartLink = '//cart.yhd.com/cart/cart.do';
                window.globalPrismCouponLink = '//coupon.yhd.com/myCoupon';
                window.globalPrismTopAdvFlag = '0';
            }
        })(false);
        <!--增加一个开关来控制是否显示搜索框下拉,为时才不调用-->
        <!--搜索热词开关-->
        <!--用于控制宽窄屏属性-->
        var isWidescreen = (screen.width >= 1280);
        <!--过滤-->
    </script>
    <!--js end-->
</head>
<body id="comParamId" data-param='{"globalPageCode":"-1","currPageId":"-1"}'>
<div class="hd_header_wrap">
    <!-- top_bar -->
    <div class="hd_top_bar">
        <div class="wrap clearfix">
            <a href="/" class="hd_topbar_home">
                <i class="hd_iconfont">&#xe623;</i>
                <span>1号店首页</span>
            </a>
            <div class="hd_indxProvce hd_has_child" id="headerSelectProvince"
                 clstag="pageclick|keycount|global_201709226|1">
                <a class="hd_topbar_city" id="currProvince" href="javascript:void(0);">
                    <i class="hd_iconfont">&#xe621;</i>
                    <span>送货地址：</span><em></em>
                </a>
                <div class="hd_city_select hd_city_opacity" style="display: none" id="hd_city_select">
                    <a href="javascript:;" class="hd_city_close">×</a>
                    <div class="hd_cur_city_wrap clearfix">
                        <span class="hd_cur_city">搜索城市：</span>
                        <div class="hd_city_search">
                            <div class="hd_city_input">
                                <em class="hd_iconfont"></em>
                                <input type="text" placeholder="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请输入城市名称">
                                <span class="hd_citys_close">x</span>
                            </div>
                            <div class="hd_city_suggest" style="display: none;">
                            </div>
                        </div>
                    </div>
                    <!--热门城市-->
                    <div class="hd_hot_city_wrap clearfix">
                        <em class="hd_hotcity_icon"></em>
                        <span class="hd_hot_city">热门城市：</span>
                        <div class="hd_hotcity_list clearfix">
                        </div>
                    </div>
                    <!--按字母查找-->
                    <div class="hd_letter_search clearfix">
                        <p class="hd_letter_tit">按字母查找</p>
                        <div class="hd_city_initial clearfix">
                        </div>
                    </div>
                    <div class="hd_city_list" id="hd_city_list_context">
                        <ul>
                            <li class="clearfix">
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
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
    <!-- top_main -->
    <div class="wrap hd_header hd_cm_global">
        <div class="clearfix">
            <div class="hd_logo_area" clstag="pageclick|keycount|2017091213|22">
            </div>
            <div class="hd_header_right">
                <div class="clearfix">
                    <div class="hd_head_search">
                        <div class="hd_search_form" id="hdSearchForm">
                            <div class="hd_fixed_wrap">
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
                        {{--<p id="hotKeywordsShow" class="hd_hot_search" clstag="pageclick|keycount|201708178|2">--}}
                        {{--</p>--}}
                        <!--搜索推荐-->
                    </div>
                    <div class="hd_mini_cart" id="miniCart" data-version="1">
                        <u class="hd_c_num none" id="in_cart_num"></u>
                        <a class="hd_prism_cart" href="/index/showcart" target="_blank">
                            <em class="hd_iconfont"></em>
                            <span>购物车</span>
                        </a>
                        <div class="hd_cart_show none" id="showMiniCartDetail">
                        </div>
                    </div>                </div>
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
</div><!--content start-->
<input id="orderCode" type="hidden" value="64603078511"/>
<div id="layout_main" class="layout_w980_g18">
    <div class="mod_bread_crumbs">
        <a class="one_tit" href="/">我的1号店</a><i class="icon_lgt"></i>
        <a class="one_tit" href="/index/myorderlist/{{Auth::guard('reg')->user()->id}}">我的订单</a><i class="icon_lgt"></i>
        <a class="two_tit" href="javascript:;">订单号{{$orders[0]["ordernumber"]}}</a>
    </div>
    <div class="grid_4">
        <div class="mod_order_detail_menu">
            <div class="content">
                <h3 class="big_title">编号：{{$orders[0]["ordernumber"]}} </h3>
                <div class="order_detail_info">
                    <div class="info_ly">
                        <p class="info">
                            <!--1.商品金额、运费、订单金额为0是依旧显示
                            2.其他信息，包括促销立减、 抵用券抵扣、 礼品卡支付、 返利支付、余额支付如果为0，则不展示对应的项目
                            -->
                            <label>商品总金额</label><span>￥{{$orders[0]["total"]}}</span>
                            <label>应支付金额</label><span>￥{{$orders[0]["total"]}}</span>
                            <label>运费金额</label><span>￥0</span>
                        </p>
                    </div>
                    <div class="payable_ly">
                        <p class="payable">
                            <label>实付金额</label><span><u>¥</u>{{$orders[0]["total"]}}.<u>00</u></span>
                        </p>
                    </div>
                    <div class="grb_bg">
                        <p class="paypal">
                            <label>在线支付</label>
                        </p>
                        <p class="pay_bottom">
                            &nbsp;
                        </p>
                    </div>
                </div>
                <div class="receiving_info">
                    <h5>收货信息：</h5>
                    <span>{{$orders[0]['address']['recname']}}</span>
                    <span class="address">{{$orders[0]['address']['recaddress']}}</span>
                    <span>{{$orders[0]['address']['phonenumber']}}</span>
                </div>
                <div class="invoice_info_dian clearfix"></div>
                <!-- 加个打印按钮 -->
            </div>
        </div>
    </div>
    <div id="gridContent" class="grid_14">
        <div class="mod_personal_head clearfix">
            <font class="tit">订单详情</font>
            <div class="recpt_bor"></div>
        </div>
        <div class="cell_tab_fixIE">
            <div class="cell_tab_list" style="display: none;">
                <div class="tab_list_border"></div>
                <div class="tab_list_border_hover" style="width: 196px; left: 0px; display: block;"></div>
                <div class="tab_list clearfix">
                    <div class="x_axis">
                        <ul id="x_lig" class="eval_w clearfix">
                            <li style="width: 198px;" class="selected">
                                <a href="javascript:void(0);" style="width: 195px;" class="selected"></a>
                                <p style="width: 195px;" class="selected">包裹1<span id="orderState"
                                                                                   style="display: none;">已取消</span></p>
                            </li>
                        </ul>
                    </div>
                    <div class="hover_tab hover_tab_no">
                    </div>
                </div>
            </div>
        </div>
        <!--Package information-->
        <div class="mod_package_info">
            <div class="package_status">
                <p>
                    @if($orders[0]["status"]==0)
                    <label>订单状态：</label><span class="publish">待支付</span>
                        @elseif($orders[0]["status"]==1)
                        <label>订单状态：</label><span class="publish">已支付</span>
                        @elseif($orders[0]["status"]==2)
                        <label>订单状态：</label><span class="publish">已取消</span>
                    @endif
                </p>
                <!--确认收货 申请退换货-->
                {{--<ul class="operating">--}}
                    {{--<input type="hidden" id="venderId" value="4">--}}
                    {{--<li class="org_sel"><a id="chatbtn" class="tusu_gray_btn" href="javascript:checkChat()">联系客服</a>--}}
                    {{--</li>--}}
                {{--</ul>--}}
            </div>
            <div class="package_basic">
                <p>
                    <label>订单金额：</label><span class="red">￥{{$orders[0]["total"]}}</span>
                </p>
                <p>
                    <label>配送方式：</label><span>普通快递</span>
                </p>
                <p>
                    <label>配送日期：</label><span>2017-10-28</span><span class="hrs">|</span><label>配送时间：</label><span
                            class="digital">09:00-15:00</span>
                    <span class="hrs">|</span><label>承运人：</label><span class="digital"></span><span class="hrs">|</span><label>货运单号：</label><span
                            class="digital"></span>
                </p>
            </div>
            <div class="order_log">
                <!--/2017.09.12 包裹-->
                <div class="order_package_status">
                    <!--2014.04.24 二维码改版-->
                    <div class="two_dimensional_code"></div>
                    <!--2014.04.24 二维码改版-->
                    <ul>
                        <li class="preTwo">
                            <div class="timer">
                                <span class="hour">{{$orders[0]["created_at"]}}</span>
                            </div>
                            <div class="time_item">
                                <a class="list_radio_checked list_radio_checked_hover " href="javascript:;"></a>
                                <div class="order_info order_info_hover">
                                    <p class="info_msg">
                                        {{$orders[0]["created_at"]}}
                                    </p>
                                    {{--<p class="info_method">--}}
                                        {{--您提交了订单，请等待系统确认--}}
                                    {{--</p>--}}
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <!--商品信息-->
            <div class="product_info">
                <h3>商品信息</h3>
                <div class="product_tab">
                    <table cellpadding="0" cellspacing="0">
                        <thead>
                        <tr>
                            <th class="one">商品信息</th>
                            <th class="six"><span></span>单价</th>
                            <th class="six"><span></span>数量</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($orders[0]['orderList'] as $v)
                        <tr>
                            <td>
                                <div class="img_list">
                                    <a class="img_pic" target="_blank" href="/index/item/{{$v['goodsinfo']['id']}}">
                                        <img alt="" src="{{$v['goodsinfo']['listImages']}}"/>
                                    </a>
                                </div>
                                <div class="img_info clearfix">
                                    <p class="title_p">
                                        <a class="tit" target="_blank" href="/index/item/{{$v['goodsinfo']['id']}}">
                                            <!--<i class="icon_cheng">赠品</i>-->
                                            <!--如果有 icon_save 或 icon_savew 就在span这里加 no_icon 让标题只显示一行 -->
                                            <span class="no_icon"
                                                  style="font: 12px Arial, SimSun, sans-serif;height:14px">&nbsp;{{$v['goodsinfo']['gname']}}  <b>{{$v['shuxing']}}</b></span>
                                        </a>
                                    </p>
                                </div>
                            </td>
                            <td class="sum_dia">￥{{$v['goodsinfo']['price']}}</td>
                            <td class="sum_dia"> {{$v['goodsnum']}}</td>
                        </tr>
                            @endforeach
                        </tbody>
                    </table>
                    <div class="tab_footer">
                        <label class="tab_footer5">
                        </label>
                        <p>
                            <label class="tab_footer2">
                                金额合计：<span class="red">￥{{$orders[0]["total"]}}</span>
                            </label>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="foreground_dialog cancel_order_dialog">
    <div class="dialog_box notice_dialog">
        <a href="javascript:;" class="dialog_close pop_close"></a>
        <h3 class="dialog_tit">确定要取消订单？</h3>
        <div class="dialog_btn_box">
            <a href="javascript:;" class="dialog_btn d_cancel_btn pop_close">点错了</a>
            <a href="javascript:cancelOrder()" class="dialog_btn d_sure_btn pop_close">确定</a>
        </div>
    </div>
    <div class="dialog_bg"></div>
</div>
<div class="foreground_dialog alert_dialog">
    <div class="dialog_box notice_dialog">
        <a href="javascript:;" class="dialog_close pop_close"></a>
        <h3 id="errMsg" class="dialog_tit"></h3>
        <div class="dialog_btn_box">
            <a href="javascript:;" class="dialog_btn d_sure_btn pop_close">确定</a>
        </div>
    </div>
    <div class="dialog_bg"></div>
</div>
<!--content end-->
<div class="ft_wrap">
    <div id="globalBottomBrowseRelated" data-recordTracker="1"></div>
    <div class="wrap ft_service_link clearfix">
        <div id="bottomHelpLinkId" class="ft_help_list clearfix" data-tpa="YHD_GLOBAl_FOOTER_HELP">
        </div>
        <!--footer 二维码 begin -->
        <div class="ft_code_wrap clearfix" data-tpa="YHD_GLOBAl_HEADER_MOBILE" id="footerQRcode">
        </div>
    </div>
    <div id="footer">
        <p class="ft_footer_link">
        </p>
        <p class="ft_footer_link">
        </p>
    </div>
</div>
<!--js start-->
<!--无页面级头部js时, 全局头部js下移-->
{{--<script type="text/javascript" src="//img.yihaodianimg.com/myyhd/global/js/global_base_top.js?0"--}}
        {{--charset="utf-8"></script>--}}
<script type="text/javascript" src="//img.yihaodianimg.com/myyhd/member/js/order_detail.js?0" charset="utf-8"></script>
<script type="text/javascript" src="//st.360buyimg.com/sso/synccookie.js?0" charset="utf-8"></script>
</body>
</html>