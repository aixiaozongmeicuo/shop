<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>myorder-address</title>
    <!--css start-->
    <link href="//img.yihaodianimg.com/myyhd/global/css/global_site_base.css?0" rel="stylesheet" type="text/css"/>
    <link href="//img.yihaodianimg.com/myyhd/member/css/address.css?0" rel="stylesheet" type="text/css"/>

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
    <meta name="csrf-token" content="{{csrf_token()}}">
    <script>
        window.hdjs={};
        //组件目录必须绝对路径(在网站根目录时不用设置)
        window.hdjs.base = '/node_modules/hdjs';
        //上传文件后台地址
        window.hdjs.uploader = 'test/php/uploader.php?';
        //获取文件列表的后台地址
        window.hdjs.filesLists = 'test/php/filesLists.php?';
    </script>
    <script src="/node_modules/hdjs/static/requirejs/require.js"></script>
    <script src="/node_modules/hdjs/static/requirejs/config.js"></script>
    <script>
        $(function () {
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
        })
    </script>
</head>
<body id="comParamId" data-param="{&quot;globalPageCode&quot;:&quot;-1&quot;,&quot;currPageId&quot;:&quot;-1&quot;}" class="w980">
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
                           </p>
                        <!--搜索推荐-->
                    </div>
                    <div class="hd_mini_cart" id="miniCart" data-version="1">
                        <u class="hd_c_num none" id="in_cart_num"></u>
                        <a class="hd_prism_cart" href="/index/showcart" data-ref="YHD_TOP_MINICART">
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
<div id="layout_main" class="layout_w980_g18">
    <!-- sideNav -->
    <div class="mpc_cont_sideNav">
        <dl>
            <dt>
                <i class="my_iconfont sidenav_icon">&#xe62b;</i>
                <span>我的交易</span>
            </dt>
            <dd>
                <a href='/index/myorderlist/{{Auth::guard('reg')->user()->id}}' >我的订单</a>
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
    <div id="gridContent" class="grid_14" style="margin-bottom: 200px">
        <div class="mod_personal_head">
            <font class="tit">地址管理</font>
        </div>
        <div class="mod_address">
            <ul>
                @foreach($address as $v)
                <li>
                    @if($v['is_default']==1)
                    <span class="icon_com"><i></i><em>默认地址</em></span>
                    @else
                        <span ><i></i><em></em></span>
                    @endif
                    <span class="nickname">{{$v['recname']}}<em>收</em><em class="specific" style="max-width:100px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">{{$v['addresstag']}}</em></span>
                    <span class="addressname"><strong><em>{{$v['recaddress']}}</em></strong></span>
                    <span class="mobilenumber">{{$v['phonenumber']}}</span>
                    <div class="opera">
                        <a class="edit-address black fourMore" href="javascript:;">编辑</a>

                    </div>
                    <a class="li_p_del" href="javascript:void(0)">
                        <img src="//img.yihaodianimg.com/myyhd/member/images/my_order/del_icon.png">
                    </a>
                    <input type="hidden" name="addressId" value="{{$v['id']}}" class="addressId">
                </li>
                    @endforeach
            </ul>
            <a href="javascript:;" class="add_address">
                添加新地址
            </a>
        </div>
    </div>
</div>

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
<script type="text/javascript" src="//img.yihaodianimg.com/myyhd/global/js/global_base_top.js?0"
        charset="utf-8"></script>
<script type="text/javascript" src="//img.yihaodianimg.com/myyhd/member/js/order_list.js?0" charset="utf-8"></script>
<script type="text/javascript" src="//st.360buyimg.com/sso/synccookie.js?0" charset="utf-8"></script>

<iframe id="globalLocalStorageAdaptorForGet" style="display:none"
        src="http://www.yhd.com/html/getLocalStorage.html?v=20171013" loaded="1"></iframe>


<div id="overlay" style="margin: 0px; padding: 0px; border: none; width: 100%; height: 100%; background: rgb(51, 51, 51); opacity: 0.6; z-index: 9999; position: fixed; top: 0px; left: 0px; display: none;"></div>

<div id="easyDialogBox" style="margin: -297px 0px 0px -411px; padding: 0px; border: none; z-index: 10000; position: fixed; top: 50%; left: 50%; display: none;">
    <div class="my_or_dialog hide" id="my_or_dialog" style="display: block; margin: 0px;">
    <div class="dialog_order_form">
        <h3 class="cell_h3">添加新地址</h3>
        <a href="javascript:;" class="close_window">关闭</a>
        <div class="dia_main">
            <form action="/index/myaddresssave" method="post">
                {{csrf_field()}}
                <input type="text" hidden name="userid" value="{{Auth::guard("reg")->user()->id}}">
            <dl class="user_list clearfix">
                <dd class="user_ddt">
                    <label class="user_name"><span>*</span>收 件 人：</label>
                    <input type="text" name="recname" id="temp_name" value="" maxlength="25" placeholder="请您填写收货人姓名">
                </dd>
                <dd class="user_ddt four_address">
                    <label class="user_name"><span>*</span>收货地址：</label>
                    <input type="text" id="userSelectProvinceId" value="" name="recaddress" placeholder="街道名称/编号，楼宇名称，单位，房号">
                </dd>
                <dd class="user_ddt">
                    <label class="user_name"><span>*</span>手机号码：</label>
                    <input type="text" id="temp_mobile" placeholder="常用手机号码" style="width:200px;" maxlength="11" name="phonenumber">
                </dd>
                <dd class="user_ddt address_labels">
                    <label class="user_name">地址标签：</label>
                    <div class="write_labels ">
                        <input type="text" id="temp_addressName" placeholder="最多二十个字哟" maxlength="20" name="addresstag">
                    </div>
                </dd>
                <dd>
                    <label class="user_name"><span>*</span>默认地址：</label>
                    <input type="checkbox"  value="1" name="is_default" style="float: left; width: 20px" >
                </dd>
            </dl>
                <p class="btn_layout" style="margin-top: 80px">
                    <button class="btn_keeps clearfix" type="submit">保存</button>
                </p>
            </form>
        </div>

    </div>
    </div>
</div>
<div class="huangbao">

</div>
<script>
$(function () {
    //    添加
    $(".add_address").click(function () {
        $("#easyDialogBox").css("display","block");
        $("#overlay").css("display","block");
    })
//关闭
    $(".close_window").click(function () {
        $("#easyDialogBox").css("display","none");
        $("#overlay").css("display","none");
    })

//    编辑
    $(".edit-address").click(function () {
        //获得当前编辑地址的序号
        var id= $(this).parent().siblings(".addressId").val();
        var html='';
        $.ajax({
            url:"/index/editaddress/"+id,
            method:"get",
            dataType:"json",
            success:function (res) {
                console.log(res.data)
                html ='<div id="overlays" style="margin: 0px; padding: 0px; border: none; width: 100%; height: 100%; background: rgb(51, 51, 51); opacity: 0.6; z-index: 9999; position: fixed; top: 0px; left: 0px; display: block;"></div><div id="easyDialogBoxs" style="margin: -297px 0px 0px -411px; padding: 0px; border: none; z-index: 10000; position: fixed; top: 50%; left: 50%; display: blcok;"> <div class="my_or_dialog hide" id="my_or_dialog" style="display: block; margin: 0px;"> <div class="dialog_order_form"> <h3 class="cell_h3">编辑地址</h3> <a href="javascript:;" class="close_window" id="close" onclick="editClose()">关闭</a> <div class="dia_main"> <form action="/index/editsave/'+res.data['id']+'" method="post">{{csrf_field()}}<input type="text" hidden name="userid" value="{{Auth::guard("reg")->user()->id}}"> <dl class="user_list clearfix"> <dd class="user_ddt"> <label class="user_name"><span>*</span>收 件 人：</label> <input type="text" name="recname" id="temp_name" value="'+res.data['recname']+'" maxlength="25" placeholder="请您填写收货人姓名"> </dd> <dd class="user_ddt four_address"> <label class="user_name"><span>*</span>收货地址：</label> <input type="text" id="userSelectProvinceId" value="'+res.data['recaddress']+'" name="recaddress" placeholder="街道名称/编号，楼宇名称，单位，房号"> </dd> <dd class="user_ddt"> <label class="user_name"><span>*</span>手机号码：</label> <input type="text" id="temp_mobile" placeholder="常用手机号码" style="width:200px;" maxlength="11" name="phonenumber" value="'+res.data['phonenumber']+'"> </dd> <dd class="user_ddt address_labels"> <label class="user_name">地址标签：</label> <div class="write_labels "> <input type="text" id="temp_addressName" placeholder="最多二十个字哟" maxlength="20" name="addresstag" value="'+res.data['addresstag']+'"> </div> </dd><dd> <label class="user_name"><span>*</span>默认地址：</label> <input type="checkbox"  value="'+res.data['is_default']+'" name="is_default" style="float: left; width: 20px"> </dd></dl> <p class="btn_layout"> <button class="btn_keeps clearfix" type="submit">保存</button> </p> </form> </div> </div> </div> </div>';
                $('.huangbao').html(html);
            }
        })
    })
//    显示删除按钮
    $("li").hover(function(){
        $(this).find(".li_p_del").css("display","block");
    },function(){
        $(this).find(".li_p_del").css("display","none");
    });

    $(".li_p_del").click(function () {
        //获得当前编辑地址的序号
        var id= $(this).next(".addressId").val();
        require(['hdjs'], function (hdjs) {
            hdjs.confirm('确定删除该地址吗?', function () {
                $.ajax({
                    url:"/index/addressdel/"+id,
                    method:'get',
                    success:function (res) {
                        if (res.valid){
                            hdjs.message(res.message,'refresh','success');
                        }else{
                            hdjs.message(res.message,'refresh','error');
                        }

                    }
                })
            })
        })


    })

})
    function editClose(){
        $("#easyDialogBoxs").css("display","none");
        $("#overlays").css("display","none");
    }

</script>

</body>
</html>