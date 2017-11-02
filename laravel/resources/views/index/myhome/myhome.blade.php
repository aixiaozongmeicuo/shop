<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>myhome</title>
    <link href="//img.yihaodianimg.com/myyhd/global/css/global_site_base.css?0" rel="stylesheet" type="text/css"/>
    <link href="//img.yihaodianimg.com/myyhd/member/css/myyhdindex.css?0" rel="stylesheet" type="text/css"/>
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
        })(false);
        <!--增加一个开关来控制是否显示搜索框下拉,为时才不调用-->
        <!--搜索热词开关-->
        <!--用于控制宽窄屏属性-->
        var isWidescreen = (screen.width >= 1280);
    </script>

</head>
<body id="comParamId" data-param='{"globalPageCode":"-1","currPageId":"-1"}'>
<!--头部-->
<div class="hd_header_wrap">
    <!-- top_bar -->
    <div class="hd_top_bar">
        <div class="wrap clearfix">
            <a href="/">
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
    <div class="mpc_header">
        <div class="wrap clearfix">
            <!-- logo -->
            <a href="/" class="mpc_header_logo">
                <img src="//img.yihaodianimg.com/myyhd/global/images/logo/hdLogo.png" width="100%" height="100%"> 我的个人中心
            </a>
            <!-- nav -->
            <div class="mpc_header_nav">
                <ul class="nav_list clearfix">
                    <li class="nav_item cur">
                        <a href="/" class="item">首页
                        </a>
                    </li>
                    <li class="nav_item">
                        <a href="javascript:;" class="item">个人设置
                            <i class="my_iconfont arrow_icon"></i> </a>
                        <div class="pull_list_wrap">
                            <div class="pull_list">
                                <a href="/index/myinformation/{{Auth::guard("reg")->user()->id}}" class="pull_list_item">个人资料</a>
                                <a href="/index/mychangepasswd/{{Auth::guard("reg")->user()->id}}" class="pull_list_item">修改密码</a>
                                <a href="/index/myaddress/{{Auth::guard("reg")->user()->id}}" class="pull_list_item">地址管理</a>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            {{--<div class="mpc_header_right simple_header_right clearfix">--}}
                {{--<div class="clearfix">--}}
                    {{--<div class="hd_header_search">--}}
                        {{--<input type="text" class="enter_box" placeholder="搜全站" id="keyword">--}}
                        {{--<i class="my_iconfont search_icon"></i>--}}
                    {{--</div>--}}
                {{--</div>--}}
            {{--</div>--}}
        </div>
    </div>
</div>
<!--头部结束-->

<!--内容部分-->
<body style="background-color: #e9e9e9;">
<!-- 宽窄屏判断 -->
<div class="my_personl_center">
    <!-- header -->
    <!-- content -->
    <div class="mpc_cont">
        <div class="wrap clearfix">
            <!-- sideNav -->
            <!-- sideNav -->
            <div class="mpc_cont_sideNav">
                <dl>
                    <dt>
                        <i class="my_iconfont sidenav_icon">&#xe62b;</i>
                        <span>我的交易</span>
                    </dt>
                    <dd>
                        <a href="/index/myorderlist/{{Auth::guard('reg')->user()->id}}" >我的订单</a>
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
                        <a href='/index/mychangepasswd/{{Auth::guard("reg")->user()->id}}' >修改密码</a>
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
            <!-- main -->
            <div class="mpc_cont_main">
                <div class="myIndex_user_info myIndex_user_silver clearfix">
                    <!-- base info -->
                    <div class="user_base">
                        <!-- 头像 -->
                        <a target="_blank" href="javascript:;" class="private_userpic">
                            <img class="pic" src="http://d9.yihaodianimg.com/N10/M00/2F/59/ChEi21iJ3ayAHRRxAACBZMCLZII10800.jpg" width="74" height="74">
                        </a>
                        <!-- 用户名 -->
                        <div class="private_username">
                            <a target="_blank" href="">{{Auth::guard('reg')->user()->username}}</a>
                        </div>
                    </div>
                    <!-- account info -->
                    <div class="user_account">

                        <div class="user_account_bottom clearfix">
                            <!-- 账号安全 低：low 中：middle 高：up -->
                            <div class="user_account_safe low clearfix">
                                <label class="title">账户安全：</label>
                                <div class="progress_bar">
                                    <span class="progress" style="width:100%"></span>
                                </div>
                                <span class="safe_rank">高</span>
                                <a target="_blank" href="javascript:;" class="my_iconfont icon_set">&#xe628;</a>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- my main cont -->
                <div class="myIndex_main_cont clearfix">
                    <!-- about my -->
                    <div class="mmc_about">
                        <!-- orders -->
                        <div class="mmc_about_orders">
                            <!-- tab titles -->
                            <div class="mao_orders_title clearfix">
                                <a href="javascript:;" class="title cur">最近订单</a>
                                <!--
                                -->
                                <a target="_blank" href="/index/myorderlist/{{Auth::guard('reg')->user()->id}}" class="all_orders">全部订单<em>&gt;</em></a>
                            </div>
                            <!-- tab content -->
                            <div class="mao_orders_cont">
                                <!-- 最近订单 -->
                                @if($orders)

                                    <ul class="orders_list clearfix">
                                        <!-- 已完成 -->
                                        @foreach($orders as $v)
                                        <li class="orders_list_item orders_obligation">
                                            <!-- 详情页链接 -->
                                            <a href="javascript:;" class="detail_page_links"></a>
                                            <div class="list_item_wrap clearfix">
                                                <div class="oli_detail">
                                                    <!-- pic -->
                                                    <a target="_blank" href="/index/item/{{$v['orderList'][0]['goodsinfo']['id']}}" class="oli_detail_pic"> <img src="{{$v['orderList'][0]['goodsinfo']['listImages']}}" width="80" height="80">
                                                        <div class="lucency_bg"></div>
                                                        <div class="goods_num">{{count($v['orderList'])}}件商品</div>
                                                    </a>
                                                    <!-- 订单商品列表 -->
                                                    <div class="orders_goods_list" style="width: 180px; display: none;">
                                                        <div class="lucency_bg" style="width: 180px;"></div>
                                                        <div class="ogl_cont">
                                                            <a href="javascript:;" class="my_iconfont carousel_arrow carousel_prev" style="display: none;"></a>
                                                            <a href="javascript:;" class="my_iconfont carousel_arrow carousel_next" style="display: none;"></a>
                                                            <div class="scroll_list_wrap" style="width: 180px; padding: 20px 10px 20px 20px;">
                                                                <ul class="clearfix">
                                                                    @foreach($v['orderList'] as $vv)
                                                                    <li>
                                                                        <a target="_blank" href="/index/item/{{$vv['goodsinfo']['id']}}">
                                                                            <img src="{{$vv['goodsinfo']['listImages']}}" width="80" height="80">
                                                                        </a>
                                                                    </li>
                                                                    @endforeach

                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- info -->
                                                    <div class="oli_detail_info">
                                                        <!-- 订单状态 -->
                                                        <div class="status_wtap clearfix">
                                                            @if($v['status'] == 0)
                                                            <div class="dis_main">等待付款</div>
                                                            @elseif($v['status'] == 1)
                                                                <div class="dis_main">已支付</div>
                                                            @elseif($v['status'] == 2)
                                                                <div class="dis_main">已取消</div>
                                                            @endif
                                                            <div class="dis_price">
                                                                <em>¥</em>
                                                                <span>{{$v['total']}}</span>
                                                            </div>
                                                        </div>
                                                        <!-- 下单时间 -->
                                                        <div class="status_time">下单时间：{{$v['created_at']}}</div>
                                                    </div>
                                                </div>
                                                @if($v['status'] == 0)
                                                <div class="oli_state">
                                                    <div class="oli_state_time clearfix" id="time_63510161357">
                                                        <i class="my_iconfont icon_clock"></i>
                                                        <div class="count_time">
                                                            <span class="clock_time time_hour">04</span>
                                                            <i>:</i>
                                                            <span class="clock_time time_minit">55</span>
                                                            <i>:</i>
                                                            <span class="clock_time time_second">22</span>
                                                        </div>
                                                    </div>
                                                    <a href="/index/pay/{{$v['ordernumber']}}" class="btn once_pay_btn">立即付款</a>
                                                </div>
                                                @elseif($v['status'] == 1)
                                                    <div class="oli_state">
                                                    <a href="javascript:;" class="btn once_pay_btn">已支付</a>
                                                    </div>
                                                @elseif($v['status'] == 2)
                                                    <div class="oli_state">
                                                    <a href="javascript:;" class="btn once_pay_btn">已取消</a>
                                                    </div>
                                                    @endif
                                            </div>
                                        </li>
                                        @endforeach
                                        <!-- 查看更多 -->
                                        <li class="watch_more">
                                            <a href="/index/myorderlist/{{Auth::guard('reg')->user()->id}}" target="_blank" class="btn">查看更多</a>
                                        </li>
                                    </ul>

                                @else

                                <div class="orders_cont_info" style="display: block">
                                    <div class="orders_list_empty clearfix">
                                        <div class="empty_pic">
                                            <img src="/images/orderEmptyBg.png" width="100%" height="100%">
                                        </div>
                                        <div class="empty_tips">
                                            <div class="empty_tips_title">您还没有订单</div>
                                            <div class="empty_tips_text">好货这么多，快去买买买！</div>
                                        </div>
                                    </div>
                                </div>

                                @endif
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- 返回顶部 -->
<div class="prism_to_top">
    <a href="#" class="my_iconfont back_top">&#xe602;</a>
</div>
<script>
    $(document).ready(function(){
        $("#yesiknow").click(function(){
            $("#gbanniu")[0].click();
        })
    })
    function govippage(){
        window.location.href="//vip.yhd.com/card/myVip.do";
    }
</script>
<!--content end-->
<div class="ft_wrap">
    <div id="globalBottomBrowseRelated" data-recordTracker="1"></div>
    <div class="wrap ft_footer_service clearfix" id="footerIcon" data-tpa="YHD_GLOBAl_FOOTERICON">
        <a target="_blank">
            <img alt="" src="//d8.yihaodianimg.com/N05/M0B/39/F3/CgQI0lWskgmADBnsAAAPZvcSh3E68900.jpg"/>
            <b>正品保障</b>
            <span>正品行货 放心选购</span>
        </a>
        <a target="_blank">
            <img alt="" src="//d6.yihaodianimg.com/N05/M09/96/23/ChEbulWsk4iADa_aAAAM544hHN818600.jpg"/>
            <b>满86包邮</b>
            <span>满86元 免运费</span>
        </a>
        <a target="_blank">
            <img alt="" src="//d9.yihaodianimg.com/N07/M00/2D/8B/CgQIz1WslI-Adao3AAAN5b_ut2I80100.jpg"/>
            <b>售后无忧</b>
            <span>7天无理由退货</span>
        </a>
        <a target="_blank">
            <img alt="" src="//d8.yihaodianimg.com/N09/M06/08/C8/ChEi11WsyiyALBbiAAAN9lEEK5M33200.jpg"/>
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
                <img src="//img.yihaodianimg.com/front-homepage/index/images/qryhd.png?1=1" alt="APP更优惠二维码"/>
            </div>
            <div class="ft_mobile_code clearfix">
                <p>加微信查订单</p>
                <img src="//d6.yihaodianimg.com/N10/M01/EC/6D/ChEi3Fj518KAFF5SAABtGRNmQM062100.jpg" alt="加微信查订单二维码"/>
            </div>
        </div>
    </div><div id="footer">
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
        <a href="https://online.unionpay.com/" target="_blank" >
            <img alt="" src="//d6.yihaodianimg.com/N00/M01/1A/30/CgMBmVDzwyaAaIMBAAAJZgSEr6I65200.jpg">
        </a>
        <a href="http://www.gsxt.gov.cn/index.html" target="_blank" >
            <img alt="" src="//d6.yihaodianimg.com/N01/M08/19/94/CgQCrlDzwnKAUkfSAAAIPrrML6M92400.jpg">
        </a>
        <a href="http://www.zx110.org/" target="_blank" >
            <img alt="" src="//d8.yihaodianimg.com/N02/M05/19/94/CgQCsVDzw0GABUElAADHlvRfNUk94600.jpg">
        </a>
        <a href="http://net.china.com.cn/index.htm" target="_blank" >
            <img alt="" src="//d9.yihaodianimg.com/N01/M0A/95/FD/CgQCr1PQy1CAF7vaAABDexsiEYM24800.jpg">
        </a>
        <a href="http://shwg.dianping.com/index.html" target="_blank" >
            <img alt="" src="//d9.yihaodianimg.com/N08/M06/6C/9C/ChEi1VcfPl2AC1T8AAANFrEfJlw97300.jpg">
        </a>
        <a href="http://www.shjbzx.cn" target="_blank" >
            <img alt="" src="//d6.yihaodianimg.com/N10/M09/0E/1F/ChEi2lh171KAJrGlAAALl_uZt0E75600.jpg">
        </a>
        <a href="https://search.szfw.org/cert/l/CX20150608010268010812" target="_blank" >
            <img alt="" src="//d9.yihaodianimg.com/N08/M01/C7/7E/ChEi1FYXHcOAVk_WAAAL2r2-yfo10200.jpg">
        </a>
        <a href="https://ss.knet.cn/verifyseal.dll?sn=e13050631010040492h5mq000000&ct=df&a=1&pa=500267" target="_blank" >
            <img alt="" src="//d9.yihaodianimg.com/N01/M03/A0/40/CgQCrlPYTqCASlHXAAAd82JE0eA31000.png">
        </a>
    </small>
</div></div><!--js start-->

<!--内容部分结束-->

<!--无页面级头部js时, 全局头部js下移-->
<script type="text/javascript" src="//img.yihaodianimg.com/myyhd/global/js/global_base_top.js?0" charset="utf-8"></script>
<script type="text/javascript" src="//img.yihaodianimg.com/myyhd/member/js/myyhdindex.js?0" charset="utf-8"></script>
<script type="text/javascript" src="//st.360buyimg.com/sso/synccookie.js?0" charset="utf-8"></script>
</body>
</html>