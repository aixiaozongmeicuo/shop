<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>item</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link href="//img.yihaodianimg.com/front-detail/global/css/global_site_base.css?2e115f3" rel="stylesheet" type="text/css"/>
    <link href="//img.yihaodianimg.com/front-detail/detail/css/productDetail.css?2e115f3" rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" href="/css/jqzoom.css">
    <script src="/js/jquery.js"></script>
    <script src="/js/jquery.jqzoom.js"></script>
    <!--js start-->
    <script type="text/javascript">
        var URLPrefix = {
            "shop": "//shop.yhd.com",
            "busystock": "//gps.yhd.com",
            "img": "//image.yihaodian.com",
            "jd_item_stock": "//c0.3.cn/stock?extraParam=%7B%22originid%22:%221%22%7D&ch=1",
            "h5HomeUrl": "//m.yhd.com",
            "h5Search": "//search.m.yhd.com",
            "shoping_pms": "//pms.yihaodian.com",
            "h5Search": "//search.m.yhd.com",
            "h5Search": "//search.m.yhd.com",
            "search": "//search.yhd.com",
            "jd_item_stocks": "//c0.3.cn/stocks?type=getstocks",
            "detailDomain": "//item.yhd.com",
            "jd_item_suit": "//c0.3.cn/recommend?methods=suitv2&count=6",
            "commentZoneMall": "//e.1mall.com/front-pe",
            "productDetailHost": "//www.yhd.com",
            "central": "//www.yhd.com",
            "search_list": "//search.yhd.com",
            "h5pe_yhd": "//e.m.yhd.com",
            "cartDomain": "//cart.yhd.com",
            "centralShop": "//shop.yhd.com",
            "shoping_my_statics": "//static.yihaodian.com/statics",
            "shoping_search": "//search.yhd.com:80",
            "homeUrl": "//www.yhd.com",
            "shoping_central": "//www.yhd.com",
//            "search_keyword": "//search.yhd.com",
            "sitedomainmall": ".1mall.com",
            "products_stock": "//gps.yhd.com/busystock",
//            "commentZoneYhd": "//e.yhd.com/front-pe",
            "tuangou": "//www.yhd.com/tuangou/index.do",
            "centralImgDomain": ".yihaodianimg.com",
            "statics": "//img.yihaodianimg.com/front-detail",
            "mobile": "http://m.yhd.com",
            "cms": "//cms.yhd.com",
            "pms": "//pms.yhd.com",
            "my_statics": "//static.yihaodian.com/member",
            "passportmall": "https://passport.1mall.com",
            "pe_yhd": "//item.yhd.com",
            "shoping_shop": "//shop.yhd.com",
            "h5DetaiDomain": "//item.m.yhd.com",
            "sitedomain": ".yhd.com",
            "tryUrl": "//try.yhd.com",
            "shoping_self": "//www.yhd.com",
            "tracker": "tracker.yhd.com",
            "footFriendLink": "//www.yhd.com/friendlink/index.do",
            "shoping_passport": "https://passport.yhd.com",
            "uploadPostUrl": "//upload.yihaodian.com/upload/UploadAction",
            "shoping_my": "//my.yhd.com",
            "shoping_opposite": "//www.1mall.com",
            "env": "PRODUCTION",
            "my": "//my.yhd.com",
            "mymall": "//my.1mall.com",
            "selfroot": "//www.yhd.com",
            "item": "//item.yhd.com/",
            "jd_item_yanbao": "//cd.jd.com/yanbao/v3",
            "productDetailUrl": "//www.yhd.com",
            "passport": "https://passport.yhd.com",
            "mall": "//www.1mall.com"
        };
        var headerType = "base";
        var imagePath = "//img.yihaodianimg.com/front-detail/global/images";
        var currSiteId = 1;
        var currSiteType = 1;
        var globalEnv = "PRODUCTION";
        var siteStyle = 1;
        var siteFlag = 0;
        var isIndex = 0;
        var indexFlag = 0;
        var currProvinceId = 1;
        var currVersionNum = "2e115f3";
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
        })(true);
        <!--增加一个开关来控制是否显示搜索框下拉,为时才不调用-->
        <!--搜索热词开关-->
        <!--用于控制宽窄屏属性-->
    </script>
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
    <!--js end-->
    <script>
        $(function () {
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
        })
    </script>
    <script>
        $(function () {
            $('.hideBox b').mouseenter(function () {
//                alert($('.hideBox b .detail_main_pic_class').src);
               $(this).addClass('cur').siblings().removeClass('cur');
               var imgsrc = $(this).find('img').attr('src');
                $('.proImg_border .proImg img').attr('src',imgsrc);
            })

        })


    </script>



</head>
<body id="comParamId" data-param="{&quot;globalPageCode&quot;:&quot;-1&quot;,&quot;currPageId&quot;:&quot;0&quot;}" class="w980">
<div class="hd_header_wrap">

    <!-- top_bar -->
    <div class="hd_top_bar">
        <div class="wrap clearfix">
            <a href="/" class="hd_topbar_home">
                <i class="hd_iconfont"></i>
                <span>本店首页</span>
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
                        src="//d9.yihaodianimg.com/N10/M0A/DB/61/ChEi2lj4TqGAOjXwAAAbSq83IXA88700.png"></a>
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
                <div class="hd_cm_nav_wrap"></div>
            </div>
        </div>
    </div>
</div><!--content start-->

<div class="detail_wrap">
    <!--面包屑-->
    <div class="mod_detail_crumb clearfix">
        <div class="crumb clearfix">
            <a  target="_blank" href="/"><em>{{$oneCategory['cname']}}</em><i class="iconDetail"></i></a>
            <a  target="_blank" href="/index/lists/{{$secCategory['id']}}"><em>{{$secCategory['cname']}}</em><i class="iconDetail"></i></a>
            <a  target="_blank" href="/index/lists/{{$thrCategory['id']}}"><em>{{$thrCategory['cname']}}</em><i class="iconDetail"></i></a>
            <span><em title="{{$goods['gname']}}">{{$goods['gname']}}</em></span>
        </div>
    </div>
    <!--第一屏-->
    <div class="fm_detail_one clearfix">
        <!--左侧主图区域-->
        <div class="l">
            <div class="mod_detail_preview clearfix" id="jsModDetailPreview">
                <!--左侧主图区域-->
                <!-- 大图 start -->
                <div class="proImg_border">
                    <div class="proImg">
                        <img id="J_prodImg" width="360" height="360" src="{{$goods['listImages']}}">
                        <div class="zoomCursor" style="display: none; left: 180px; top: 83px;"></div>
                        <div class="mask">
                        </div>
                    </div>
                </div>
                <!-- 大图 end -->
                <!-- middle img list start -->
                <div class="proCrumb clearfix" id="jsproCrumb">
                    <div class="hideBox">
                        <div class="mBox clearfix">
                            @foreach($photos as $v)
                            <b>
                                <img width="50" height="50" class="detail_main_pic_class" src="{{$v}}">
                            </b>
                                @endforeach
                        </div>
                    </div>
                </div>
                <div class="J_zoom" id="J_zoom" style="display: none;">
                    <img id="sub600600PicURL" width="600" height="600" alt="" src="{{$goods['listImages']}}" style="left: -50px; top: -59.2857px;"></div>
                <!-- middle img list end -->
            </div>
            <!-- btm start -->
            <div class="product_rel clearfix">
                <div class="prod_l">
                    <p class="product_id" id="pro_code"><span>商品编号</span>5064424</p>
                </div>
                <p class="product_share" id="product_share" clstag="pageclick|keycount|product_201709214|8">
                    <a class="share_tit" href="javascript:void(0);"><em class="iconDetail"></em>分享<i class="iconDetail"></i></a>

                </p>
            </div>
            <!-- btm end -->
        </div>
        <div class="main_content">
            <div class="detail_information" id="jsModInformation">
                <div class="mod_detailInfo_proName" id="detail_sku_main">
                    <h1 class="mh" id="productMainName">{{$goods['gname']}}</h1>
                </div>
                <div class="mod_detailInfo_priceSales ">
                    <div class="seckill_box clearfix none" id="oneRobBuyBanner">
                        <a href="javascript:void(0);" target="_blank" class="logo_enter seckill_enter">本抢购</a>
                        <span class="start_time none" id="oneRobBuyStartTime"></span>
                        <div class="countdown_box none" id="oneRobBuyContDown"></div>
                    </div>
                    <div class="price pb0" id="currentPriceArea">
                        <ul class="clearfix">
                            <li class="tag" id="price_lable">
                                价格
                            </li>
                            <li class="number inte_check">
                                <span id="current_price">￥{{$goods['price']}}</span>
                            </li>
                            <li class="pricing" id="bookprice"></li>
                        </ul>
                    </div>
                    <ul class="Msgsales clearfix" id="msgsales"></ul>
                </div>
                <div id="sku_unit" class="mod_detailInfo_tags warranty_box" style="padding-top: 10px;">
                    <div id="choose" class="clearfix p-choose-wrap" style="border-top:none;padding-top:0px;margin-top:0px;margin-bottom:5px;">
                        <div id="choose-attrs">

                            @foreach($attrs as $v)
                            <div id="choose-attr-1" class="li p-choose">
                                <div class="dt">选择{{$v['aname']}}：</div>
                                <div class="dd">

                                    @foreach($v['sonattr'] as $vv)
                                    <div class="item " hd="{{$vv['id']}}">
                                        <b></b>
                                        <a href="#none">
                                            <i>{{$vv['aname']}}</i>
                                        </a>
                                    </div>
                                    @endforeach

                                </div>
                            </div>
                                @endforeach
                        </div>
                    </div>
                    <script>
                        $(function () {

                            //页面已加载时判断
                            $(".p-choose").each(function () {
                                $(this).children('.dd').find('.item').eq(0).addClass('selected');
                            })

                            var shuxing ='';
                            $.each($(".selected"),function () {
                                    shuxing += $(this).attr('hd') + ',';
                            })
                            shuxing = shuxing.substring(0,shuxing.length - 1);
//                            alert(shuxing)
                            $.ajax({
                                url:'/index/panduan',
                                method:'post',
                                data:{zuhe:shuxing,cid:'{{$id}}'*1},
                                dataType:'json',
                                success:function (res) {
                                    console.log(res)
                                    if(!res.valid){
//                                        alert()
                                        $("#addCart").css("display","none");
                                        $("#sellOut").css("display","block");
                                        $(".kucun").val(0);
                                        $('.num').val(0);
                                        $(".num").blur(function(){
                                            $(".num").val(0);
                                        });
                                    }else{
//                                        alert()
                                        $("#addCart").css("display","block");
                                        $("#sellOut").css("display","none");
                                        $(".kucun").val(res.data[0]['kucun']);

                                        //判断input输入框的值是否大于库存数量
                                        var kucunnum = $('.kucun').val();
//                                        alert(kucunnum)
                                        $(".num").blur(function(){
                                            var inputnum = $(".num").val();
                                            if (parseInt(inputnum) >= parseInt(kucunnum)){
                                                $(".num").val(kucunnum);
                                            }
                                        });
                                    }

                                }
                            })



//                           手动选择之后判断
                            $(".item ").click(function () {
                                $(this).addClass('selected').siblings('.item').removeClass('selected');
                                var shuxing = '';
                                $.each($(".selected"),function () {
                                    if ($(this).attr('hd') != ''){
                                        shuxing += $(this).attr('hd') + ',';
                                    }
                                })
//                                alert(shuxing)
                                shuxing = shuxing.substring(0,shuxing.length - 1);
//                                alert(shuxing)
                                $.ajax({
                                    url:'/index/panduan',
                                    method:'post',
                                    data:{zuhe:shuxing,cid:'{{$id}}'*1},
                                    dataType:'json',
                                    success:function (res) {
                                        console.log(res)
                                        if(!res.valid){
                                            $("#addCart").css("display","none");
                                            $("#sellOut").css("display","block");
                                            $(".kucun").val(0);
                                            $('.num').val(0);
                                            $(".num").blur(function(){
                                                $(".num").val(0);
                                            });
                                        }else{
                                            $("#addCart").css("display","block");
                                            $("#sellOut").css("display","none");
                                            $(".kucun").val(res.data[0]['kucun']);
                                            $('.num').val(1);
                                            //判断input输入框的值是否大于库存数量
                                            var kucunnum = $('.kucun').val();
//                                            alert(kucunnum)
                                            $(".num").blur(function(){
                                                var inputnum = $(".num").val();
                                                if (parseInt(inputnum) >= parseInt(kucunnum)){
                                                    $(".num").val(kucunnum);
                                                }
                                            });
                                        }
                                    }
                                })

                            })
                        })
                    </script>
                    <div class="mod_choise_kit" id="firstScreenCombine" style="display:none;">
                    </div>
                </div>


                <div class="mod_cuputing clearfix" id="computingArea">
                    <div class="clearfix">

                        <div data-sel="num" class="computing_item" id="computing_item">
                            <div class="computing_num">
                                <input type="text" data-max="199" data-min="1" class="num" value="1" id="product_amount">
                            </div>

                            <div class="computing_act">
                                <input type="button" class="add">
                                <input type="button" class="no_reduce" id="jian">
                            </div>
                            <input type="text" value="" hidden class="kucun">
                        </div>
                        <script>
                            $(function () {


                                $('.add').click(function () {
                                    //获得当前选中货品的库存量
                                    var kucun =$(".kucun").val();
                                    //获得当前选购的数量
                                    var num = $('.num').val();
                                    if (num * 1>=kucun * 1){
                                        alert('您要购买的数量已超过库存数量');
//                                        require(['hdjs'], function (hdjs) {
//                                            hdjs.message('您要购买的数量已超过库存数量','','error');
//                                        })
                                        return false;
                                    }else{
                                        $('.num').val(num*1+1);
                                        var s= $('.num').val();
                                        if(s>1){
                                            $('#jian').attr('class','reduce');
                                        }else {
                                            $('#jian').attr('class','no_reduce');
                                        }
                                    }
                                });
                                $('#jian').click(function () {
                                    var num = $('.num').val();
                                    $('.num').val(num*1-1);
                                    var s= $('.num').val();
                                    if(s<1){
                                        $('.num').val(1);
                                    }
                                    if(s>1){
                                        $('#jian').attr('class','reduce');
                                    }else {
                                        $('#jian').attr('class','no_reduce');
                                    }
                                });

                            })

                        </script>
                        <div class="cartbox" id="BtnArea">

                            <a  href="javascript:void(0);"
                               class="buy_btn6 btn_init_class" rel="addCart" id="addCart" style="display: block"><span>加入购物车</span></a>
                            <a class="buy_btn3 btn_init_class" href="javascript:void(0);" style="display:none"
                               id="sellOut"><span>已售完</span></a>
                        </div>
                    </div>
                    <div class="in_tips" id="limitNum" style="display:none"></div>
                </div>
                <div class="mod_favlist" id="noGoodscommand" style="display:none;" data-tpa="DATAIL_NO_GOODS_RECOMMAND"></div>
                <dl class="mod_detailInfor_ensure clearfix" id="serviceGuarantee">
                    <dt>保障</dt>
                    <dd class="clearfix">
                        <div id="payServiceList">
                            <a id="7dayReturnTag" href="javascript:void(0);" target="_blank" style="" title="支持7天无理由退货"><i
                                    class="iconDetail"></i>支持7天无理由退货</a>
                            <a href="javascript:void(0);" target="_blank" style="" title="正品保障"><i
                                    class="iconDetail"></i>正品保障</a></div>
                    </dd>
                </dl>
            </div>
        </div>
        <div class="r" id="r_mod" style="">
            <div class="mod_change" id="r_mod_change">
                <div class="cha_t">看了还看<a  href="javascript:void(0);" id="r_cha_t"></a></div>
                <ul class="cha_m" id="r_cha_m">

                    @foreach($ALLgoods as $v)
                    <li data-needreflushtype="0" skuid="1592867721">
                        <a class="chaImg" target="_blank" href="/index/item/{{$v['id']}}">
                            <img src="{{$v['listImages']}}" width="120" height="120">
                        </a>
                        <p class="cha_tit">
                            <a target="_blank" title="{{$v['gname']}}"
                                              href="/index/item/{{$v['id']}}">{{$v['gname']}}</a>
                        </p>
                        <p class="cha_price">
                            <a target="_blank" href="/index/item/{{$v['id']}}">¥<span class="j_price">{{$v['price']}}</span></a>
                        </p>
                    </li>
                    @endforeach

                </ul>
            </div>
        </div>
    </div>

    <!--第二屏文描及其他框架-->
    <div class="fm_detail_two laymt clearfix">
        <div class="grid_4">
            <div id="leftLazyLoad"></div>
            <div id="detail_viewAndBuyRecomm" style="display: none;" class="mod_box mod_product_box">
            </div>
            <div id="detail_buyAndBuyRecomm" style="display: none" class="mod_box mod_product_box">
            </div>
        </div>
        <div class="grid_18">
            <div id="centerLazyLoad"></div>
            <dl id="detail_hot10Recomm" class="recommnad explosion clearfix" style="display: none">
            </dl>
            <div class="des_fixed" id="J_fixedDes">
                <div class="layout_wrap">
                    <div class="des">
                        <div class="des_search fl" >
                            <div class="shopdsr clearfix">
                                <p class="shopdsr_name">
                                    <a href="javascript:void(0);" title="" id="detail_desc_shopname_fixed"
                                       target="_blank"></a>
                                </p>
                                <p class="shopdsr_online self_support_enter">
                                    <em class="selfSupportIcon"></em>
                                </p>
                            </div>
                        </div>
                        <ul class="des_tab">
                            <li class="des_tabbox" id="detail_desc_tab_fixed">
                                <a  tabindex="0" href="javascript:void(0);" class="tab cur" id="spjs_fixed">商品介绍</a>
                                <a  tabindex="3" href="javascript:void(0);" class="tab"
                                   id="sppj_fixed">评价<em>&nbsp;&nbsp;1200+</em></a>
                                <a  tabindex="1" href="javascript:void(0);" class="tab" id="ggbz_fixed">规格及包装</a>
                                <a  tabindex="2" href="javascript:void(0);" class="tab" id="shfw_fixed">售后服务</a>
                            </li>
                            <li class="des_act">
                                <div class="des_buy">
                                    <div class="btnbox">
                                        <a  class="add_cart" style="" id="detail_desc_addCartBtn_fixed" href="javascript:void(0);"><span>加入购物车</span></a>
                                    </div>
                                    <div class="tab_buy_info">
                                        <a href="javascript:void(0);" target="_blank">
                                            <img src="">
                                        </a>
                                        <span class="tab_buy_tit">美乐佳 衣架 衣挂衣撑干湿两用晾晒衣服架（40支）</span>
                                        <span class="tab_price"><em>¥</em>29.90</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <script>
            $(function () {
                $('.des_tab li a').click(function () {
                   var c=$(this).index();
//                   alert(c);
                   $(this).addClass('cur').siblings('a').removeClass('cur');
                   $(this).parent().parent().siblings('#detail_desc_content').children('#prodDescTabContent').find('.desitem').eq(c).css('display','block').siblings('.desitem').css('display','none');
//                    $(this).parent().siblings('div').eq(c).siblings('div').hide();
                })
            })


            </script>
            <div id="product_desc_tab_div_mask"></div>
            <div id="descLazyLoad"></div>
            <div class="des" id="J_des">
                <ul class="des_tab">
                    <li class="des_tabbox" id="detail_desc_tab">
                        <a  tabindex="0" href="javascript:void(0);" class="tab cur" id="spjs">商品介绍</a>
                        <!--<a  tabindex="3" href="javascript:void(0);" class="tab" id="sppj">评价<em>&nbsp;&nbsp;800+</em></a>-->
                        {{--<a  tabindex="1" href="javascript:void(0);" class="tab" id="ggbz">规格及包装</a>--}}
                        <a  tabindex="2" href="javascript:void(0);" class="tab" id="shfw">售后服务</a>
                    </li>
                </ul>

                <div class="descon" id="detail_desc_content">
                    <div id="prodDescTabContent">
                        <div tabindex="0" class="desitem" style="display: block;" id="prodDetailCotentDiv">
                            <!-- 文描区域 -->
                            <div class="mod_des">
                                <style>/*C-B*/

                                .ssd-module-wrap {width: 750px; margin: 0 auto; position: relative; text-align: left; background-color: #ffffff; }
                                .ssd-module-wrap .ssd-module,.ssd-module-wrap .ssd-module-heading{ width: 750px; position:relative; overflow: hidden;  }
                                .ssd-module{background-repeat:no-repeat; background-position:left center; background-size:100% 100%;}
                                .ssd-module .ssd-widget-pic,.ssd-module .ssd-widget-text,.ssd-module .ssd-widget-line,.ssd-module-wrap .ssd-widget-rectangle,.ssd-module-wrap .ssd-widget-circle,.ssd-module-wrap .ssd-widget-triangle,.ssd-module-wrap .ssd-widget-table{ position: absolute; overflow: hidden; }
                                .ssd-module-wrap .ssd-widget-table th,.ssd-module-wrap .ssd-widget-table td{position:relative;}
                                .ssd-module .ssd-widget-pic img{display: block; width:100%; height:100% }
                                .ssd-module .ssd-widget-text{ position: absolute; overflow: hidden;}
                                .ssd-module .ssd-widget-text span{display:block;overflow:hidden; width:100%;  height:100%; padding:0; margin: 0; word-break:break-all; word-wrap:break-word; white-space:normal;}
                                .ssd-module .ssd-widget-link{ position: absolute; left: 0; top: 0; width: 100%; height: 100%; background: transparent;z-index:100 }
                                .ssd-module-wrap .ssd-widget-text{ line-height: 1.5; }
                                .ssd-module-wrap .ssd-cell-text{position:absolute;top:0;left:0;right:0;width: 100%;height: 100%;overflow: auto;}
                                .ssd-module-heading{background-repeat:no-repeat; background-position:left center; background-size:100% 100%; }
                                .ssd-module-heading .ssd-module-heading-layout{display:inline-block;}
                                .ssd-module-heading .ssd-widget-heading-ch{float: left;display: inline-block;margin-left: 15px; margin-right:6px; height: 100%;}
                                .ssd-module-heading .ssd-widget-heading-en{float: left;display: inline-block;margin-left: 6px; margin-right:15px; height: 100%;}
                                .ssd-module-wrap .ssd-widget-rectangle{box-sizing: border-box;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;}
                                /*C-E*/.ssd-module-wrap .M14697582139261{height:687px; width:750px; background-color:#fcfbdb; background-image:url()}
                                .ssd-module-wrap .W146976092395711{height:707px; border-radius:0px; width:750px; left:3px; z-index:1; top:-3px}
                                .ssd-module-wrap .M146976186860329{height:44px; width:750px; background-color:transparent; background-image:url(//img30.360buyimg.com/sku/jfs/t2638/110/3766097038/20501/ca2c9ac9/579ae9b4N8d6d6571.jpg)}
                                .ssd-module-wrap .W146976186860330{line-height:44px; height:44px; color:#ffffff; font-size:20px; font-style:normal; background-color:transparent; text-decoration:none; font-family:microsoft yahei; font-weight:normal}
                                .ssd-module-wrap .W146976186860431{line-height:44px; height:44px; color:#ffffff; font-size:18px; font-style:normal; background-color:transparent; text-decoration:none; font-family:microsoft yahei; font-weight:normal}
                                .ssd-module-wrap .M14951713174212{height:284px; width:750px; background-color:transparent; background-image:url()}
                                .ssd-module-wrap .W14951713174212I0{height:320px; border-radius:0px; width:320px; left:9px; z-index:1; top:9px}
                                .ssd-module-wrap .W14951713672863{letter-spacing:0px; width:200px; font-style:normal; background-color:transparent; font-weight:normal; z-index:2; line-height:1.5; height:239px; color:#000; font-size:20px; left:358px; font-family:microsoft yahei; text-decoration:none; top:49px}
                                .ssd-module-wrap .W14951713941614{letter-spacing:0px; width:272px; font-style:normal; background-color:transparent; font-weight:normal; z-index:3; line-height:1.5; height:192px; color:#000; font-size:20px; left:460px; font-family:microsoft yahei; text-decoration:none; top:48px}
                                .ssd-module-wrap .M146976788655668{height:44px; width:750px; background-color:transparent; background-image:url(//img30.360buyimg.com/sku/jfs/t2638/110/3766097038/20501/ca2c9ac9/579ae9b4N8d6d6571.jpg)}
                                .ssd-module-wrap .W146976788655669{line-height:44px; height:44px; color:#ffffff; font-size:20px; font-style:normal; background-color:transparent; text-decoration:none; font-family:microsoft yahei; font-weight:normal}
                                .ssd-module-wrap .W146976788655670{line-height:44px; height:44px; color:#ffffff; font-size:18px; font-style:normal; background-color:transparent; text-decoration:none; font-family:microsoft yahei; font-weight:normal}
                                .ssd-module-wrap .M14951717872445{height:339px; width:750px; background-color:transparent; background-image:url()}
                                .ssd-module-wrap .W14951717872445I0{height:337px; border-radius:0px; width:750px; left:-6px; z-index:1; top:8px}
                                .ssd-module-wrap .M14951718919957{height:301px; width:750px; background-color:transparent; background-image:url()}
                                .ssd-module-wrap .W14951718919957I0{height:288px; border-radius:0px; width:750px; left:5px; z-index:1; top:11px}
                                .ssd-module-wrap .M14951718618326{height:262px; width:750px; background-color:transparent; background-image:url()}
                                .ssd-module-wrap .W14951718618326I0{height:279px; border-radius:0px; width:750px; left:-11px; z-index:1; top:-12px}
                                .ssd-module-wrap .M146976821356182{height:44px; width:750px; background-color:transparent; background-image:url(//img30.360buyimg.com/sku/jfs/t2638/110/3766097038/20501/ca2c9ac9/579ae9b4N8d6d6571.jpg)}
                                .ssd-module-wrap .W146976821356183{line-height:44px; height:44px; color:#ffffff; font-size:20px; font-style:normal; background-color:transparent; text-decoration:none; font-family:microsoft yahei; font-weight:normal}
                                .ssd-module-wrap .W146976821356184{line-height:44px; height:44px; color:#ffffff; font-size:18px; font-style:normal; background-color:transparent; text-decoration:none; font-family:microsoft yahei; font-weight:normal}
                                .ssd-module-wrap .M146976821637185{height:268px; width:750px; background-color:transparent; background-image:url()}
                                .ssd-module-wrap .W146977132559513{height:241px; border-radius:0px; width:750px; left:0px; z-index:1; top:16px}
                                </style>
                                <div class="desbox">
                                    <div align="center">{!! $goods['details'] !!}</div>
                                </div>
                            </div>
                        </div>
                        <!-- 规格及包装tab内容 -->
                        
                        <div tabindex="2" class="desitem desqoute" id="detail_desc_fwcl" style="display: none;">
                            <p class="tit">本店承诺</p>
                            <p class="con">本店平台卖家销售并发货的商品，由平台卖家提供发票和相应的售后服务。请您放心购买！<br>注：因厂家会在没有任何提前通知的情况下更改产品包装、产地或者一些附件，本司不能确保客户收到的货物与商城图片、产地、附件说明完全一致。只能确保为原厂正货！并且保证与当时市场上同样主流新品一致。若没有及时更新，请大家谅解！</p>
                            <p class="tit">全国联保</p>
                            <p class="con">凭质保证书及本店发票，可享受全国联保服务（奢侈品、钟表除外；奢侈品、钟表由本店联系保修，享受法定三包售后服务），与您亲临商场选购的商品享受相同的质量保证。本店还为您提供具有竞争力的商品价格和运费政策，请您放心购买！</p>
                            <p class="tit">权利声明</p>
                            <p class="con">本店上的所有商品信息、客户评价、商品咨询、网友讨论等内容，是本店重要的经营资源，未经许可，禁止非法转载使用。<br>注：本站商品信息均来自于合作方，其真实性、准确性和合法性由信息拥有者（合作方）负责。本站不提供任何保证，并不承担任何法律责任。</p><p class="tit">价格说明</p>
                            <p class="con"><strong>本店价：</strong>商品在本店平台上，不参加降价让利促销团购等活动时的常规销售价格。<br><strong>参考价：</strong>商品展示的参考价，可能是品牌专柜标价、商品吊牌价或由品牌供应商提供的正品零售价（如厂商指导价、建议零售价等）或该商品在本店平台曾经展示过的销售价；由于地区、时间的差异性和市场行情波动，品牌专柜标价、商品吊牌价、销售商门店曾经展示过的销售价等可能会与您购物时展示的不一致，该价格仅供您参考。<br><strong>问题反馈：</strong>如有疑问，建议您在购买前联系客服咨询。
                            </p>
                        </div>
                    </div>


                </div>
            </div>

            <div class="clearfix" id="buyer_-experience">
                <div id="productExperience" name="productExperience" class="tab"></div>
            </div>
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
        <p>Copyright© 本店网上超市 2007-2017，All Rights Reserved</p>
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
<script type="text/javascript" src="//img.yihaodianimg.com/front-detail/detail/js/productDetail.js?2e115f3"
        charset="utf-8"></script>
<script type="text/javascript" src="//st.360buyimg.com/sso/synccookie.js?2e115f3" charset="utf-8"></script>


<script type="text/javascript">
    var jaq = jaq || [];
    jaq.push(['account', 'JA2017_111805']); //站点编号
    jaq.push(['domain', 'yhd.com']); //站点域名
    var extParams = encodeURI("skuId=5064424");
    jaq.push(['extParams', extParams]);
    (function () {
        var ja = document.createElement('script');
        ja.type = 'text/javascript';
        ja.async = true;
        ja.src = '//wl.jd.com/joya.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(ja, s);
    })();
</script>
<div id="prismWrap" class="yhd_prism_wrap">
    <div class="yhd_prism_nav">
        <div class="prism_top_ad">
            <div class="prism_nav_tab" data-type="adv" id="prismTopAdv"></div>
        </div>
        <div class="prism_nav_center">
            <div class="prism_nav_tab prism_icon_wrap" clstag="" data-type="icon" id="prismPerson"><a
                    href="//home.yhd.com/myyhdindex/index.do" target="_blank"><span class="prism_icon_tab"><em
                    class="prism_iconfont"></em></span><u class="prism_icon_text">个人中心</u></a></div>
            <div class="prism_nav_tab prism_cart_wrap" clstag="pageclick|keycount|lengjing_201709227|2" data-type="cart"
                 id="prismCart"><a class="prism_cart_tab" href="//cart.yhd.com/cart/cart.do" target="_blank"><em
                    class="prism_iconfont"></em>
                <div class="prism_cart_text">购物车</div>
                <p id="prismCartNum" class="prism_cart_num none"><u></u></p></a></div>
            <div class="prism_nav_tab prism_icon_wrap" clstag="pageclick|keycount|lengjing_201709227|3" data-type="icon"
                 id="prismCoupon"><a href="//coupon.yhd.com/myCoupon" target="_blank"><span class="prism_icon_tab"><em
                    class="prism_iconfont"></em></span><u class="prism_icon_text">抵用券</u></a></div>
        </div>
        <div class="prism_nav_btm">
            <div class="prism_nav_tab prism_icon_wrap" clstag="" data-type="icon" id="prismIm" style="display: none;"><a
                    href="javascript:;"><span class="prism_icon_tab"><em class="prism_iconfont"></em></span><u
                    class="prism_icon_text">咨询客服</u></a></div>
            <div class="prism_nav_tab prism_icon_wrap" clstag="pageclick|keycount|lengjing_201709227|5" data-type="icon"
                 id="prismFeedback"><a href="//cms.yhd.com/cms/view.do?topicId=43" target="_blank"><span
                    class="prism_icon_tab"><em class="prism_iconfont"></em></span><u
                    class="prism_icon_text">用户反馈</u></a></div>
            <div class="prism_nav_tab prism_icon_wrap" clstag="pageclick|keycount|lengjing_201709227|6" data-type="icon"
                 id="prismQRCode" style="display: block;"><a href="javascript:;"><span class="prism_icon_tab"><em
                    class="prism_iconfont"></em></span><u class="prism_icon_text none">二维码</u></a>
                <div class="prism_tips_wrap prism_yhd_code none"><p style="text-align:center;"><br>手机购物更优惠</p><img
                        src="//img.yihaodianimg.com/front-homepage/index/images/qryhd.png"><em class="tips_arrow"></em>
                </div>
            </div>
            <div class="prism_nav_tab prism_icon_wrap" clstag="pageclick|keycount|lengjing_201709227|7" data-type="icon"
                 id="prismBacktop"><a href="javascript:;"><span class="prism_icon_tab"><em class="prism_iconfont"></em></span><u
                    class="prism_icon_text">返回顶部</u></a></div>
        </div>
    </div>
</div>
<iframe id="globalLocalStorageAdaptorForGet" style="display:none"
        src="http://www.yhd.com/html/getLocalStorage.html?v=20171013" loaded="1"></iframe>

<div class="mask_tcdiv" style="display: none; position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px; z-index: 100001; width: 100%; height: 6039px; background: rgb(0, 0, 0); opacity: 0.4;"></div>

<div class="popGeneral" style="left: 430px; top: 50%; bottom: auto; margin-top: -91.5px; display: none;">
    <div id="addCartPopWin" class="hd_cart_pop" data-tpa="AI_REAL_TIME_LANDINGPAGE">
        <div class="hd_pop_content">
            <span class="hd_colse_btn"></span>
            <p class="hd_pop_tips"><i></i>已成功加入购物车</p>
            <div class="hd_pop_btn">
                <a href="javascript:;" class="hd_btn_l" >继续购物</a>
                <a href="/index/showcart" class="hd_btn_r" >查看购物车
                </a>
            </div>
        </div>
    </div>
</div>
<script>
    $(function () {
        //加入购物车效果
        $("#addCart").click(function () {
//            alert()
            //属性的组合数据
            var shuxing="";
            $.each($(".selected"),function () {
                shuxing += $(this).attr('hd') + ',';
            })
            shuxing = shuxing.substring(0,shuxing.length - 1);
//            alert(shuxing)
//          加入购物车的货品数量
            var num ="";
            num = $(".num").val();
            $.ajax({
                url:'/index/addcart',
                method:'POST',
                data:{zuhe:shuxing,gid:'{{$id}}'*1 ,goodsnum:num,},
                dataType:'json',
                success:function (res) {
                    console.log(res)
                    if (res.valid){
                        $(".mask_tcdiv").css("display","block");
                        $(".popGeneral").css("display","block");
                    }else{
                        alert(res.message);
//                        require(['hdjs'], function (hdjs) {
//                            hdjs.message(res.message,'refresh','error');
//                        })
                    }

                }
            })

        })

        $(".hd_colse_btn").click(function () {
            $(".mask_tcdiv").css("display","none");
            $(".popGeneral").css("display","none");
        })
        $(".hd_btn_l").click(function () {
            $(".mask_tcdiv").css("display","none");
            $(".popGeneral").css("display","none");
        })

    })
</script>
</body>
</html>
