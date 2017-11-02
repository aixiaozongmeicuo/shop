<!DOCTYPE html>
<html lang="en">
<head>
    <script type="text/javascript" async="" src="//wl.jd.com/joya.js"></script>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <link href="//img.yihaodianimg.com/cart/global/css/global_site_simple.css?9e40998" rel="stylesheet" type="text/css"/>
    <link href="//img.yihaodianimg.com/cart/shopping/pc/css/cart_main.css?9e40998" rel="stylesheet" type="text/css"/>
    <title>cart</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <script src="/js/jquery.js"></script>
    {{--<link rel="stylesheet" href="/node_modules/hdjs/dist/hdjs.css">--}}
    <!--js start-->
    <script type="text/javascript">
        var URLPrefix = {"busystock":"//gps.yhd.com","cartDomain":"//cart.yhd.com","central":"//www.yhd.com","centralImgDomain":".yihaodianimg.com","centralShop":"//shop.yhd.com","cms":"//cms.yhd.com","commentZoneMall":"//e.1mall.com/front-pe","commentZoneYhd":"//e.yhd.com/front-pe","footFriendLink":"//www.yhd.com/friendlink/index.do","img":"//image.yihaodian.com","item":"//item.yhd.com/","mall":"//www.1mall.com","mobile":"http://m.yhd.com","my":"//my.yhd.com","my_statics":"//static.yihaodian.com/member","mymall":"//my.1mall.com","passport":"https://passport.yhd.com","passportmall":"https://passport.1mall.com","pms":"//pms.yhd.com","productDetailHost":"//www.yhd.com","productDetailUrl":"//www.yhd.com","products_stock":"//gps.yhd.com/busystock","search":"//search.yhd.com","search_keyword":"//search.yhd.com","search_list":"//search.yhd.com","selfroot":"//www.yhd.com","shop":"//shop.yhd.com","shoping_central":"//www.yhd.com","shoping_my":"//my.yhd.com","shoping_my_statics":"//static.yihaodian.com/statics","shoping_opposite":"//www.1mall.com","shoping_passport":"https://passport.yhd.com","shoping_pms":"//pms.yihaodian.com","shoping_search":"//search.yhd.com:80","shoping_self":"//www.yhd.com","shoping_shop":"//shop.yhd.com","sitedomain":".yhd.com","sitedomainmall":".1mall.com","statics":"//img.yihaodianimg.com/cart","tracker":"tracker.yhd.com","tryUrl":"//try.yhd.com","tuangou":"//www.yhd.com/tuangou/index.do","uploadPostUrl":"//upload.yihaodian.com/upload/UploadAction"};
        var headerType="base";
        var imagePath="//img.yihaodianimg.com/cart/global/images";
        var currSiteId=1;
        var currSiteType=1;
        var globalEnv="PRODUCTION";
        var siteStyle=1;
        var siteFlag=0;
        var isIndex = 0;
        var indexFlag= 0;
        var currProvinceId=0;
        var currVersionNum= "9e40998";
        var lazyLoadImageObjArry = lazyLoadImageObjArry || [];
        var isFixTopNav = false;


        (function(flag) {
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
        var isWidescreen=(screen.width>=1280);

    </script>
    <!--js end-->
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


<body>

<div class="hd_header_wrap">
    <div class="hd_top_bar">
        <div class="wrap clearfix">
            <a href="/" class="hd_topbar_home">
                <i class="hd_iconfont"></i>
                <span>1号店首页</span>
            </a>

            <div class="" id="headerSelectProvince" ></div>
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
                    @endif

                    <li>
                        <div class="hd_menu">
                            <a href="/index/myorderlist/{{Auth::guard('reg')->user()->id}}" target="_blank" rel="nofollow"><i class="hd_iconfont"></i>我的订单</a>
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
</div>


<!--<script>-->
    <!--$('.hd_login').mouseenter(function () {-->
        <!--$('.hd_user_privilege').show();-->
    <!--})-->
    <!--$('.hd_login').mouseleave(function () {-->
        <!--$('.hd_user_privilege').hide();-->
    <!--})-->
<!--</script>-->


<script type="text/javascript">
    console || function(){var console={};console.log=function(){};};
    function ready(fn){
        if(document.addEventListener) {
            document.addEventListener('DOMContentLoaded', function() {
                //注销事件, 避免反复触发
                document.removeEventListener('DOMContentLoaded',arguments.callee, false);
                fn();            //执行函数
            }, false);
        }else if(document.attachEvent) {        //IE
            document.attachEvent('onreadystatechange', function() {
                if(document.readyState == 'complete') {
                    document.detachEvent('onreadystatechange', arguments.callee);
                    fn();        //函数执行
                }
            });
        }
    };

    ready(function() {
        document.getElementById('headerSelectProvince').innerHTML='';
        document.getElementById('headerSelectProvince').setAttribute('class','');

        //网盟
        window.synccookie.dosync('unpl');
        var isSmallscreen=screen.width <= 1280;
        if(isSmallscreen){
            document.getElementsByTagName("body")[0].className="w980";
        }
    });
</script>
<div class="cart_header  wrap clearfix">
    <h1>
        <a href="" class="logo"></a>
        <a href="javascript:;" class="logo_txt"></a>
    </h1>
    <!-- 搜索框 start -->
    <div class="search">
        <input id="keyword" type="text" placeholder="请输入关键词"><a id="search" href="javascript:void(0);"
                                                                class="search_btn iconfont"><font
            style="vertical-align: inherit;"><font style="vertical-align: inherit;"></font></font></a>
    </div>
    <!-- 搜索框 end -->
</div>

<div id="cart_main_body" data-tpa="CART_BODY">
    <!-- 空购物车-->
    <div class="pop_serial_gift"></div>
    @if($goods)
    <div class="wrap" data-tpa="CART_ITEM_LIST">
        <div class="cart_list_header cart_wrap cart_tit">
            <span class="checkbox">
                <a href="javascript:;" class="check check_all checked " id="quanxuan1">
                <i class="iconfont"></i>
                </a>全选
            </span>
            <span class="tit">商品信息</span>
            <span class="price">单价（元）</span>
            <span class="num">数量</span>
            <span class="total">小计（元）</span>
            <span class="act">操作</span>
        </div>
        <div class="cart_list">
            <div class="cart_list_wrap zy">

                <!--展示加入购物车的商品-->
                <ul class="cart_item activity" id="tab">
                    @foreach($goods as $v)
                    <li class="item item_line main_item clearfix">
                        <div class="cart_prod clearfix">
                            <a href="javascript:;" class=" checkbox aa check check_item checked nofresh normal_item"><i class="iconfont"></i>
                            </a>
                            <a href="/index/item/{{$v->gid}}" target="_blank" class="item_pic">
                                <img src="{{$v->listImages}}" style="width: 75px;height: 75px;" max-width="75" max-height="75">
                            </a>
                            <a href="/index/item/{{$v->gid}}" target="_blank" class="item_tit">{{$v->gname}}
                            </a>

                            <!-- 单价及价格标签 -->
                            <div class="item_price"><b><p  class="price">{{$v->price}}元</p></b></div>

                            <!-- 数量 -->
                            <div class="item_num" data-sku-id="1317878">
                                <div class="num_act clearfix">
                                    <a href="javascript:;" class="min">−</a>
                                    <input type="text" class="input" value="{{$v->goodsnum}}" max="3" min="1">
                                    <a href="javascript:;" class="add" >+</a>
                                </div>
                                <span class="stock partial limit"></span>
                            </div>

                            <!--小计-->
                            <div class="item_amount">
                                <div class="item_a_money xiaoji">0</div>
                            </div>

                            <!--操作-->
                            <div class="item_act">
                                <a href="javascript:;" class="del_btn"><i class="iconfont"></i></a>
                                <input type="text" hidden value="{{$v->hid}}" class="hid">
                                <input type="text" hidden value="{{$v->id}}" class="cartid">
                                <input type="text" hidden value="{{$v->kucun}}" class="kucun">
                            </div>
                            <div class="prop_edit">
                                <div class="prop_server prop_server_gray"><i class="seven_icon"></i>
                                    <div class="server_tips">
                                        <div class="t_arrow t_arrow_top"><span></span><i></i></div>
                                        <span class="t_txt">不支持7天无理由退货</span>
                                    </div>
                                </div>
                                <div class="prop_txt tip_trigger"><span><strong>{{$v->zuhe}}</strong></span>
                                    <i class="iconfont"></i>
                                </div>
                            </div>
                        </div>
                    </li>
                    @endforeach

                </ul>
                <!--商品展示结束-->
            </div>
        </div>
    </div>
</div>
<div id="checkOutBar" class="settling_column_bar none" style="display: block; margin-bottom: 100px">
    <div class="pay_tools_bar" data-tpa="SETTLEMENT_INFO_BAR">
        <div class="pay_tools_inner clearfix">
            <div class="pay_tools_l clearfix">
                <span class="select_all checkbox clearfix">
                    <a class="pay_checkbox check check_all checked" id="quanxuan2" href="javascript:;"><i class="iconfont"></i></a>
                    <label class="all_checked_label ">全选（共<b class="goodnum"></b>件）</label>
                </span>|
                {{--<span><a class="l_a_tool lt_delete" href="javascript:;" onclick="del()">批量删除</a><span></span>--}}
                </span>
            </div>
            <div class="pay_tools_r clearfix">
                <a class="checkout_btn" id="jiesuan" href="/index/confirmOrder">去结算</a>
                <div class="r_price_total r_control_tip"> 合计：<span class="rpt_count">¥<b id="sums">0</b></span></div>
                <div class="r_prod_view r_control_tip">
                    <span class="rpv_count">已选商品<b class="goodnum">2</b>件</span>
                </div>
            </div>
        </div>
        <!-- 结算栏 总价 Tips弹框 Start  -->
    </div>
</div>
@else
    <div class="empty">
        <div class="no_prod clearfix">
            <div class="img_wrap">
                <img src="/images/no_goods.gif" width="300" height="300">
            </div>
            <div class="info"> <p>购物车还是空的呢，快去采购吧~</p>
                <div class="btn_box"> <a href="/" class="confirm">去逛逛</a></div>
            </div>
        </div>
    </div>
@endif


<script type="text/javascript">
    $(function(){
        var  num =$("#tab li").length;
        $(".goodnum").html(num);
        //判断input输入框的值是否大于库存数量
        $(".input").each(function () {
            var kucunnum = $(this).parent().parent().siblings('.item_act').find('.kucun').val();
            $(this).blur(function(){
                var inputnum = $(this).val();
                if (parseInt(inputnum) >= parseInt(kucunnum)){
                    $(this).val(kucunnum);
                }
            });
        })



//            商品数量的加减和总价的自动计算效果
        $(".add").click(function(){
            var t=$(this).parent().find('input[class*=input]');
            t.val(parseInt(t.val())+1)
            var num =t.val();
            //获得库存数量
            var kucun = $(this).parent().parent().siblings('.item_act').find('.kucun').val();
            if(num <=kucun){
                //异步改变购买数量
                var hid =$(this).parent().parent().siblings(".item_act").find(".hid").val();
                var cartid =$(this).parent().parent().siblings(".item_act").find(".cartid").val();
                $.ajax({
                    url:"/index/changenum",
                    method:"post",
                    data:{num:num,hid:hid,cartid:cartid},
                    dataType:"json",
                    success:function (res) {
                    }
                })
            }else{
                t.val(kucun)
            }
            var  m=parseInt($(this).siblings('.input').val()) *parseFloat($(this).parent().parent().siblings('.item_price').find('.price').html());
            $(this).parent().parent().siblings('.item_amount').find('.xiaoji').html(m+'.00');
            setTotal();

        })

        $(".min").click(function(){
            var t=$(this).parent().find('input[class*=input]');
            t.val(parseInt(t.val())-1)
            if(parseInt(t.val())< 1){
                t.val(1);
            }
            var  m=parseInt($(this).siblings('.input').val()) *parseFloat($(this).parent().parent().siblings('.item_price').find('.price').html());
//                alert(m);
            $(this).parent().parent().siblings('.item_amount').find('.xiaoji').html(m+'.00');
            setTotal();

            var cartid =$(this).parent().parent().siblings(".item_act").find(".cartid").val();
            var num =t.val();
            var hid =$(this).parent().parent().siblings(".item_act").find(".hid").val();
            $.ajax({
                url:"/index/changenum",
                method:"post",
                data:{num:num,hid:hid,cartid:cartid},
                dataType:"json",
                success:function (res) {
                    console.log(res)
                    if (res.valid){

                    }

                }

            })

        })


        function xiaoji() {
            var m=0;
            $("#tab li").each(function(){
                m=parseInt($(this).find('input[class*=input]').val()) *parseFloat($(this).find('p[class*=price]').html());
                $(this).find('.xiaoji').html(m+'.00');
            });
        }
        xiaoji();


        function setTotal(){
            var s=0;
            $("#tab li").each(function(){
                s+=parseInt($(this).find('input[class*=input]').val()) *parseFloat($(this).find('p[class*=price]').html());
            });
            $("#sums").html(s);
        }
        setTotal();

//            全选勾选效果
        $("#quanxuan1").click(function () {
            var  num =$("#tab li").length;
            if($(this).hasClass("checked")){
                $("#quanxuan1").removeClass('checked');
                $("#quanxuan2").removeClass('checked');
                $(".aa").removeClass('checked');
                $("#jiesuan").addClass('unable');
//                    $("#total").html(0);
                $("#sums").html(0);
                $(".goodnum").html(0);
            }else{
                $("#quanxuan1").addClass('checked');
                $("#quanxuan2").addClass('checked');
                $(".aa").addClass('checked');
                $("#jiesuan").removeClass('unable');
                $(".goodnum").html(num);
                setTotal();
            }
        })

        $("#quanxuan2").click(function () {
            var num =$("#tab li").length;
            if($(this).hasClass("checked")){
                $("#quanxuan1").removeClass('checked');
                $("#quanxuan2").removeClass('checked');
                $("#jiesuan").addClass('unable');
                $(".aa").removeClass('checked');
//                    $("#total").html(0);
                $("#sums").html(0);
                $(".goodnum").html(0);

            }else{
                $("#quanxuan1").addClass('checked');
                $("#quanxuan2").addClass('checked');
                $("#jiesuan").removeClass('unable');
                $(".aa").addClass('checked');
                $(".goodnum").html(num);
                setTotal();
            }
        })

        //红色勾选按钮
        $(".aa").click(function () {
            var num =$("#tab li").length;//总的商品个数
            if($(this).hasClass('checked')){//有默认的勾选效果
                $(this).removeClass('checked');//去掉勾选效果
                $("#quanxuan1").removeClass('checked');
                $("#quanxuan2").removeClass('checked');
                //把已勾选的数量减一
                var num= $(".goodnum").html()*1;
                $(".goodnum").html(num-1);
                //总价减去该商品的价格
                var sums=0;
                $("ul li .checked").each(function () {
                    sums += $(this).siblings('.item_amount').find('.xiaoji').html()*1;
                })
//                    alert(sums)
                if (sums*1){
                    $("#sums").html(sums);
                }else{
                    $("#jiesuan").addClass('unable');
                    $("#sums").html(0);
                }

            }else {
                $(this).addClass('checked');
                $("#jiesuan").removeClass('unable');
                var num= $(".goodnum").html()*1;
                $(".goodnum").html(num+1);
                var sum=$("#sums").html();
                var currentsum=$(this).siblings('.item_amount').find('.xiaoji').html();
                $("#sums").html(sum*1+currentsum*1);
            }

        })

        //删除商品
        $(".del_btn").click(function () {
            var cid = $(this).parents(".item_act").find('.cartid').val();
//               alert(cid)
            if (confirm("确认删除该商品吗")){
                $.ajax({
                    url:"/index/huopindelete/"+cid,
                    method:"get",
                    success:function (res) {
                        if (res.valid){
                            location.href="/index/showcart"
                        }else{
                            hdjs.message(res.message,'refresh','error');
                        }
                    }
                })
            }
        })


    })


</script>
<!--底部-->
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
                <dd><a href="javascript:;">购物流程</a></dd>
                <dd><a href="javascript:;">会员制度</a></dd>
                <dd><a href="javascript:;">订单查询</a></dd>
                <dd><a href="javascript:;">发票制度</a></dd>
            </dl>
            <dl>
                <dt>支付方式</dt>
                <dd><a href="javascript:;">货到付款</a></dd>
                <dd><a href="javascript:;">网上支付</a></dd>
                <dd><a href="javascript:;">银行转账</a></dd>
                <dd><a href="javascript:;">礼品卡支付</a></dd>
                <dd><a href="javascript:;">其它支付</a></dd>
            </dl>
            <dl>
                <dt>配送服务</dt>
                <dd><a href="javascript:;">配送进度查询</a></dd>
                <dd><a href="javascript:;">商品验货与签收</a></dd>
            </dl>
            <dl>
                <dt>售后保障</dt>
                <dd><a href="javascript:;">退换货政策</a></dd>
                <dd><a href="javascript:;">联系客服</a></dd>
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
            <a href="javascript:;">沪ICP备16050468号</a>
            |
            <a href="javascript:;">互联网药品交易服务资格证</a>
            |
            <a href="javascript:;">违法和不良信息举报电话：0514-85899118</a>
            |
            <a href="javascript:;">沪B2-20170039</a>
        </p>
        <p>Copyright© 1号店网上超市 2007-2017，All Rights Reserved</p>
        <small id="footerbanner2LazyLoad" class="ft_pic_link">
            <a href="javascript:;">
                <img alt="" src="//d6.yihaodianimg.com/N00/M01/1A/30/CgMBmVDzwyaAaIMBAAAJZgSEr6I65200.jpg">
            </a>
            <a href="javascript:;">
                <img alt="" src="//d6.yihaodianimg.com/N01/M08/19/94/CgQCrlDzwnKAUkfSAAAIPrrML6M92400.jpg">
            </a>
            <a href="javascript:;">
                <img alt="" src="//d8.yihaodianimg.com/N02/M05/19/94/CgQCsVDzw0GABUElAADHlvRfNUk94600.jpg">
            </a>
            <a href="javascript:;">
                <img alt="" src="//d9.yihaodianimg.com/N01/M0A/95/FD/CgQCr1PQy1CAF7vaAABDexsiEYM24800.jpg">
            </a>
            <a href="javascript:;">
                <img alt="" src="//d9.yihaodianimg.com/N08/M06/6C/9C/ChEi1VcfPl2AC1T8AAANFrEfJlw97300.jpg">
            </a>
            <a href="javascript:;">
                <img alt="" src="//d6.yihaodianimg.com/N10/M09/0E/1F/ChEi2lh171KAJrGlAAALl_uZt0E75600.jpg">
            </a>
            <a href="javascript:;">
                <img alt="" src="//d9.yihaodianimg.com/N08/M01/C7/7E/ChEi1FYXHcOAVk_WAAAL2r2-yfo10200.jpg">
            </a>
            <a href="javascript:;">
                <img alt="" src="//d9.yihaodianimg.com/N01/M03/A0/40/CgQCrlPYTqCASlHXAAAd82JE0eA31000.png">
            </a>
        </small>
    </div>
</div>
<!--js start-->
<!--无页面级头部js时, 全局头部js下移-->
<script type="text/javascript" src="//img.yihaodianimg.com/cart/global/js/global_simple_top.js?0ba4c59"  charset="utf-8"></script>
<script type="text/javascript" src="//img.yihaodianimg.com/cart/shopping/pc/js/cart_config.js?0ba4c59"  charset="utf-8"></script>
<script type="text/javascript" src="//st.360buyimg.com/sso/synccookie.js?0ba4c59"  charset="utf-8"></script>
<!-- foot include start -->
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
</script>
<!-- foot include end -->

</body>
</html>