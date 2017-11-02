<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>myorder</title>
    <!--css start-->
    <link href="//img.yihaodianimg.com/myyhd/global/css/global_site_base.css?0" rel="stylesheet" type="text/css"/>
    <link href="//img.yihaodianimg.com/myyhd/member/css/order_list.css?0" rel="stylesheet" type="text/css"/>
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
            "statics": "//img.yihaodianimg.com/myyhd",
            "mobile": "http://m.yhd.com",
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
        var isFixTopNav = false;
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
        })(false);
        <!--增加一个开关来控制是否显示搜索框下拉,为时才不调用-->
        <!--搜索热词开关-->
        <!--用于控制宽窄屏属性-->
    </script>
    <!--js end-->

</head>
<body id="comParamId" data-param="{&quot;globalPageCode&quot;:&quot;-1&quot;,&quot;currPageId&quot;:&quot;-1&quot;}"
      class="w980">
<div class="hd_header_wrap">
    <!-- top_bar -->
    <div class="hd_top_bar">
        <div class="wrap clearfix">
            <a href="/" class="hd_topbar_home">
                <i class="hd_iconfont"></i>
                <span>1号店首页</span>
            </a>
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
                                <a href="/" class="hd_fixed_logo"><img src="//d7.yihaodianimg.com/N09/M09/85/8D/ChEi11jziUSAOkn4AABJ2dwtrSw01400.jpg" alt="" width="205" height="70"></a>
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
                        {{--<p id="hotKeywordsShow" class="hd_hot_search" ><a title="电视柜茶几" target="_blank" href="">电视柜茶几</a>--}}
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
<!--content start-->
<div id="layout_main" class="mpc_cont">
    <div class="wrap clearfix">
        <!-- sideNav -->
        <div class="mpc_cont_sideNav">
            <dl>
                <dt>
                    <i class="my_iconfont sidenav_icon">&#xe62b;</i>
                    <span>我的交易</span>
                </dt>
                <dd>
                    <a href='' target="_blank">我的订单</a>
                </dd>
            </dl>
            <dl>
                <dd>
                    <a href='/index/myinformation/{{Auth::guard("reg")->user()->id}}' >个人资料</a>
                </dd>
                <dd>
                    <a href='/index/myaddress/{{Auth::guard("reg")->user()->id}}' >地址管理</a>
                </dd>
                <dd>
                    <a href='/index/mychangepasswd/{{Auth::guard("reg")->user()->id}}'>修改密码</a>
                </dd>
            </dl>
            {{--<dl>--}}
                {{--<dt>--}}
                    {{--<i class="my_iconfont sidenav_icon">&#xe62e;</i>--}}
                    {{--<span>我的评论</span>--}}
                {{--</dt>--}}
                {{--<dd>--}}
                    {{--<a href='' target="_blank">评论商品</a>--}}
                {{--</dd>--}}
            {{--</dl>--}}

        </div>
        <script type="text/javascript" src="//img.yihaodianimg.com/myyhd/member/js/jquery.min.js"></script>
        <script type="text/javascript" src="//img.yihaodianimg.com/myyhd/member/index/js/leftmenu.js"></script>
        <div id="layout_main" class="mpc_cont_main layout_w1200">
            <div id="gridContent" class="grid_14">
                <!-- header-S -->
                <div class="mod_personal_head clearfix">
                    <!-- tab title -->
                    <div class="tit_tab clearfix">
                        <div class="title cur clearfix">
                            <a href="javascript:;">最近订单<i class="triggle_icon"></i></a>
                        </div>
                        {{--<div class="title clearfix">--}}
                            {{--<a href="" target="_blank">历史订单<i class="triggle_icon"></i></a>--}}
                        {{--</div>--}}
                    </div>
                    <!--搜索前的条件选择-->
                    {{--<div class="condition_select">--}}
                        {{--<a class="hd_order_menu" _dateid="a1_1" href="javascript:;">--}}
                            {{--<span>全部状态<u></u></span>--}}
                            {{--<i class="up_img"></i>--}}
                        {{--</a>--}}
                        {{--<div class="hd_order_list hide">--}}
                            {{--<p data-orderstatus="4096" class="hover">全部订单</p>--}}
                            {{--<p data-orderstatus="1">待付款订单 0</p>--}}
                            {{--<p data-orderstatus="128">待收货订单 0</p>--}}
                        {{--</div>--}}
                    {{--</div>--}}
                </div>
                <!-- header-E -->
                <!--one-S-->
                @if($orders)
                @foreach($orders as $v)
                <div class="mod_my_order_list">
                    <dl class="clearfix">
                        <!--one 单个订单+跟踪包裹-->
                        <dt>
                            <input type="hidden" name="orderId" value="63496278510" data-status="1">
                            <label class="list_info">
                                <span class="hour">{{$v['created_at']}}</span>
                                <br>
                                <span class="price_sen">¥</span>
                                <span class="price">{{$v['total']}}</span>

                                <br>
                                <span class="fukuan">在线支付</span>
                            </label>
                            <a class="list_radio" href="javascript:;"></a><u class="jiao"></u>
                            <label class="icon_list_c clearfix">
                            </label>
                        </dt>
                        <dd>
                            <div class="list_border">
                                <div class="border_li">
                                    <ul class="orders_one clearfix">
                                        <li class="li_right" style="height: 186px;">
                                            <div class="border_link clearfix">
                                                <input type="hidden" class="vanderCode" value="4" order="63496278510">
                                                <a href="javascript:;" class="plat" style="max-width:100px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis" data-vanderid="4">1号店</a>
                                                <a id="chat_show_63496278510" class="service" style="cursor: pointer" onclick="checkChat('63496278510','4')"></a>
                                                <a id="chat_hide_63496278510" class="contact disable" onclick="checkChat('63496278510','4')" style="display: none;">
                                                    <img src="/statics/member/images/my_order/server_disable.png" witdth="21" height="20">
                                                </a>
                                                @if($v['status'] == 0)
                                                <span class="condition">等待付款</span>
                                                    <span class="carriage">您提交了订单，请等待系统确认</span>
                                                @elseif($v['status'] == 1)
                                                    <span class="condition">已支付</span>
                                                @elseif($v['status'] == 2)
                                                    <span class="condition">已取消</span>
                                                @endif

                                                <!-- 包裹跟踪信息 START-->
                                                <div class="logistics_information">
                                                    {{--<a class="blue_link lo_text">跟踪包裹</a>--}}
                                                    <div class="lo_info" style="display: none;">
                                                        <i class="triggle_icon"></i>
                                                        <div class="lo_info_wrap">
                                                            <ul>
                                                                <li class="detail_info">
                                                                    <div class="address">您提交了订单，请等待系统确认</div>
                                                                    <div class="time">2017-10-16 14:31:40</div>
                                                                    <i class="circle_icon"></i>
                                                                </li>
                                                            </ul>
                                                            <div class="opreate_btn">
                                                                <a href="" target="_blank" class="blue_link see_more">查看更多</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- 包裹跟踪信息 END-->
                                                <!-- 收货人信息 START -->
                                                <div class="user">
                                                    <a href="javascript:;" class="user_name"><i class="person_icon"></i>{{$v['address']['recname']}}</a>
                                                    <div class="tips_box" style="display: none;">
                                                        <i class="triggle_icon"></i>
                                                        <div class="cont">
                                                            <div class="name">{{$v['address']['recname']}}</div>
                                                            <div class="address">{{$v['address']['recaddress']}}</div>
                                                            <div class="num">{{$v['address']['phonenumber']}}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- 收货人信息 END -->
                                            </div>
                                            <!-- 订单商品列表 START-->
                                            <ul class="orderList orderList_hover">
                                                @foreach($v['orderList'] as $vv)
                                                <li>
                                                    <div class="puv">
                                                        <a class="puvA" href="/index/item/{{$vv['goodsinfo']['id']}}" target="_blank">
                                                            <img alt="" title="商品" src="{{$vv['goodsinfo']['listImages']}}">
                                                        </a>
                                                    </div>
                                                    <div class="orderV">
                                                        <div class="orderPai">
                                                            <div class="float_layout">
                                                                <a href="/index/item/{{$vv['goodsinfo']['id']}}" class="text" target="_blank">{{$vv['goodsinfo']['gname']}}     <b>{{$vv['shuxing']}}</b></a>
                                                                <div class="buy_info clearfix">
                                                                    <div class="price">￥<b>{{$vv['goodsinfo']['price']}}</b></div>
                                                                    <div class="num">×{{$vv['goodsnum']}}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                @endforeach
                                            </ul>
                                            <!-- 订单商品列表 END-->
                                            <!-- 评论|确认收货 -->
                                        </li>
                                        <li class="li_p" style="height: 186px;">
                                            <div class="list_operating">
                                                <!--订单支付剩余时间 -->
                                                @if($v['status'] == 0)
                                                    <span class="timer">23:58:38</span>
                                                @elseif($v['status'] == 1)

                                                @elseif($v['status'] == 2)

                                                @endif

                                                <form action="https://comepay.jd.com/gopay/saveOrder" method="post" id="payform63496278510">
                                                    <input type="hidden" name="orderId" value="63496278510">
                                                    <input type="hidden" name="orderType" value="0">
                                                    <input type="hidden" name="orderJson" value="649f91cc1a21569801012cee9a0f081a962ff7da30d3f151fb438432121f2295e8d023abc704669412d9ca9fc4841a5a57e28e4d32d9282589a9bcd7903b7bb4ff95330db913e779ef6b8e193344f4f0bbb70683d235adeaa81c22448c190e2d40a72148143dec55698550d4ef6df3e3b6ee896c420ce9c80b5ba92e25345fcddb805c16fcfd72c4d0293d32c1b20dacb73ca9781d955c61b30f32f2adc39653678da1883a3529a9ea503f86f07b0ca95b145cec2c15ae0426e4a6a6f1728a1346cb268721374168962a77e3076faf52a84725492a3bde3ce9397ed85fea7c1ca0c5b347f3e52dd2e060b25976eea3b383b6371a304f7b90ace6f032d8bf107fb925acf9f3de7fe4c8f969520540e5946b79e24f432bf4414104bf001ce8f1c153eec6f894f55b58c43f30f72481cdf9">
                                                    <input type="hidden" name="sign" value="EA4BDC7A07108F777EB07A28F29E5CE6">
                                                </form>
                                                @if($v['status'] == 0)
                                                    <a class="input_btn" href="/index/pay/{{$v['ordernumber']}}">立即支付</a>
                                                    @elseif($v['status'] == 1)
                                                    <a class="input_btn" href="javascript:;">已支付</a>
                                                     @elseif($v['status'] == 2)
                                                    <a class="input_btn" href="javascript:;">已取消</a>
                                                    @endif
                                                <a class="blue_line" href="/index/orderdetail/{{$v['ordernumber']}}" target="_blank">订单详情</a>
                                                <!-- 取消订单 -->
                                                @if($v['status'] == 0)
                                                    <input type="text" hidden value="{{$v['id']}}" class="oid">
                                                    <a class="quxiao" href="javascript:;" style="display:block;text-decoration:none;color:#333;font-size:12px;font-family:SimSun;padding:8px 0 0;*padding:12px 0 0;text-align:center">取消订单</a>
                                                @elseif($v['status'] == 1)

                                                @elseif($v['status'] == 2)

                                                @endif
                                                <div class="cancel_orders">
                                                </div>
                                                <span class="order_num clearfix">
                                                    <b class="num clearfix"><em class="text">订单号：</em></b>
                                                    <a class="blue_line" href="javascript:;">{{$v['ordernumber']}}</a>
                                                </span>
                                            </div>
                                            <!-- 删除订单-->
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </dd>
                    </dl>



                </div>

                @endforeach
                    @else
                        <div class="mod_my_order_list">
                            <div class="orders_emptyConditon">
                                <div class="pic"></div>
                                <div class="tips">最近暂无订单</div>
                                </div>
                        </div>
                @endif
                <!-- one-E -->
            </div>
            <!-- 右侧主体内容-E -->
        </div>
    </div>
</div>


<script>

    $(function () {
        $(".quxiao").click(function () {
            if(confirm("去确认取消吗？")){
                var oid =$(this).parent().find(".oid").val();
//                alert(oid)
                $.ajax({
                    url:"/index/quxiao/"+oid,
                    method:"get",
                    success:function (res) {
                        console.log(res)
                        if (res.valid){
                           alert(res.message);
                           location.reload();
                        }
                    }

                })
            }

        })
    })
</script>

<!--content end-->
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
                <img src="//img.yihaodianimg.com/front-homepage/index/images/qryhd.png?1=1" alt="APP更优惠二维码">
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
<script type="text/javascript" src="/js/global_base_top.js"
        charset="utf-8"></script>
<script type="text/javascript" src="//img.yihaodianimg.com/myyhd/member/js/order_list.js?0" charset="utf-8"></script>
<script type="text/javascript" src="//st.360buyimg.com/sso/synccookie.js?0" charset="utf-8"></script>
<iframe id="globalLocalStorageAdaptorForGet" style="display:none"
        src="http://www.yhd.com/html/getLocalStorage.html?v=20171013" loaded="1"></iframe>
</body>
</html>