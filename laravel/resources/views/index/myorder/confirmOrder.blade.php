<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <!--结算页面样式-->
    <script type="text/javascript" src="//img.yihaodianimg.com/trade/trade/js/libs/jquery-1.11.3.min.js"></script>
    <script type="text/javascript" src="//img.yihaodianimg.com/trade/shopping/misc/bak/jdf/1.0.0/unit/base/5.0.0/base.js"></script>
    <script type="text/javascript" src="//img.yihaodianimg.com/trade/shopping/misc/bak/jdf/1.0.0/unit/basePatch/1.0.0/basePatch.js"></script>
    <script type="text/javascript" src="//img.yihaodianimg.com/trade/shopping/misc/bak/user/purchase/2.0.0/js/cookieTrack_v4.js"></script>
    <script type="text/javascript" src="//img.yihaodianimg.com/trade/shopping/misc/js/dialog.js"></script>

    <script type="text/javascript" src="//img.yihaodianimg.com/trade/shopping/misc/js/order.common.js?v=20a52be"></script>
    <script type="text/javascript" src="//img.yihaodianimg.com/trade/shopping/misc/js/jquery.checkout.js?v=20a52be"></script>

    <!--yhd-->
    <link type="text/css" rel="stylesheet" href="//img.yihaodianimg.com/trade/shopping/misc/bak/user/purchase/2.0.0/widget/common/common.css">
    <link type="text/css" rel="stylesheet" href="//img.yihaodianimg.com/trade/shopping/misc/css/cartBase.css?v=20a52be">
    <link type="text/css" rel="stylesheet" href="//img.yihaodianimg.com/trade/shopping/misc/css/base.css?v=20a52be">
    <link type="text/css" rel="stylesheet" href="//img.yihaodianimg.com/trade/shopping/misc/css/style.css?v=20a52be">
    <link type="text/css" rel="stylesheet" href="//img.yihaodianimg.com/trade/shopping/misc/css/dialogBox.css?v=20a52be">
    <link href="//img.yihaodianimg.com/myyhd/global/css/global_site_base.css?0" rel="stylesheet" type="text/css"/>
    <link href="//img.yihaodianimg.com/myyhd/member/css/address.css?0" rel="stylesheet" type="text/css"/>
    <style>
        .hide {
            display: none;
        }
        .switch_tips_text {
            text-align: center;
        }
        .delivery_rel_cont .deliv_items  .de_itm_infolist .del_il_box .dib_other_info ul li .odr_tips{  position: relative; clear: both;  display: block; /*! width: 190px; */  height: 28px; padding: 0px 6px; margin-top: 7px;     /*! margin-left: 83px; */ line-height: 28px; background-color: #fff7d1;  border: 1px solid #e5debc; color: #666;   -moz-border-radius: 2px; -webkit-border-radius: 2px; border-radius: 2px; float: right;}
        .delivery_rel_cont .deliv_items  .de_itm_prodlist .de_ib_box .dib_con ul .goods-suit-tit{ margin-bottom: 10px;}
        .delivery_rel_cont .deliv_items  .de_itm_prodlist .de_ib_box .dib_con ul .suit-total{ text-align: right; margin-right: 15px; margin-top: -35px;}
        .delivery_rel_cont .deliv_items .de_itm_infolist .del_il_box .dib_style {
            border: 1px solid #e5e5e5;
        }
        .delivery_rel_cont .deliv_items .de_itm_infolist .del_il_box .curr {border: 1px solid #ff5e5e;}
    </style>
   <meta name="csrf-token" content="{{ csrf_token() }}">
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
</head>
<body id="mainframe">

<div class="order_header wrap">
    <h1 class="clearfix">
        <a class="logo" href="/"></a>
        <a class="logo_txt" href="javascript:;"></a>
    </h1>
</div>

<div class="website_tip wrap none">
    <div class="website_tip_rel" style="display: none;">
        <p></p>
    </div>
</div>

<!-- main -->
<div id="container">
    <div id="content" class="w">
        <!-- <div class="m"> -->
        <div class="orderInfo-tip hide" style="display: none;">
            <span class="wicon"></span>
            <span class="ftx-03"> </span>
            <span class="cls-btn" onclick="closeorderInfotip()">x</span>
        </div>

        <div class="same_module consignee_adr wrap">
            <div class="same_module_rel">
                <div class="mod_rel_head clearfix">
                    <span class="mr_tit">收货信息</span>
                    <a class="add_address mr_ctrlbtn" href="javascript:;" >新建地址</a>
                </div>
                <div class="consign_rel_cont">
                    <ul id="consignee-list" class="clearfix" style="height: 120px;">

                        @foreach($address as $v)
                            @if($v['is_default'] == 1)
                        <li id="consignee_index_118120102" class="consignee-item item-selected cur">
                            <input type="text" hidden value="{{$v['id']}}" class="aid">
                            <div class="total_info clearfix op-btns" id="consignee_index_div_118120102">
                                <i class="fl sprite_odr  adr_icon"></i>
                                <span class="fl tot_name">{{$v['addresstag']}}</span>
                                <em class="init_adrs" style="display: block;">默认</em>
                                <span class=" aa fr tot_edit " consigneeid="118120102" isoldaddress="false" style="display: none;">
                                    <a href="#none" class="edit ftx-05 edit-consignee">编辑</a>
                                    <a href="#none" class=" del ftx-05 del-consignee hide" style="display: block" fid="118120102">删除</a>
                                </span>
                            </div>
                            <div class="detail_info">
                                <p >
                                    <span class="recname">{{$v['recname']}}</span>
                                    <span class="phonenumber">{{$v['phonenumber']}}</span>
                                </p>
                                <p class="recaddress">{{$v['recaddress']}}</p>
                            </div>
                            <div class="sprite_odr is_choose"></div>
                        </li>
                            @else
                                <li id="consignee_index_118120102" class="consignee-item item-selected ">
                                    <input type="text" hidden value="{{$v['id']}}" class="aid">
                                    <div class="total_info clearfix op-btns" id="consignee_index_div_118120102">
                                        <i class="fl sprite_odr  adr_icon"></i>
                                        <span class="fl tot_name">{{$v['addresstag']}}</span>
                                        <em class="init_adrs" style="display: none;">默认</em>
                                        <span class=" aa fr tot_edit " consigneeid="118120102" isoldaddress="false" style="display: none;">
            <a href="#none" class="edit ftx-05 edit-consignee">编辑</a>
                                            <a href="#none" class=" del ftx-05 del-consignee hide" style="display: block" fid="118120102">删除</a>
        </span>
                                    </div>
                                    <div class="detail_info">
                                        <p >
                                            <span class="recname">{{$v['recname']}}</span>
                                            <span class="phonenumber">{{$v['phonenumber']}}</span>
                                        </p>
                                        <p class="recaddress">{{$v['recaddress']}}</p>
                                    </div>
                                    <div class="sprite_odr is_choose"></div>
                                </li>

                                @endif

                            @endforeach

                            <div class="orderConfirm_dialog delete_address_dialog" style="margin-left: -174px; top: 300px; display: none;">
                                <div class="od_cont">
                                    <div class="orderConfirm_dialog_tit">
                                        <span class="sprite_odr close_icon pop_close" onclick="$('.delete_address_dialog').hide();"></span>
                                    </div>
                                    <div class="orderConfirm_dialog_relbox">
                                        <div class="sprite_odr exclamation_tips_icon"></div>
                                        <div class="delete_tips_text">确认删除该地址？</div>
                                        <input type="text" hidden value="" class="hideaid">
                                        <!-- 按钮 -->
                                        <div class="dialog_btn">
                                            <a href="#none" onclick="$('.delete_address_dialog').hide();" class="btn white_btn pop_close">取消</a>
                                            <a href="#none"  class="btn save_btn pop_close">确认删除</a>

                                        </div>
                                    </div>
                                </div>
                            </div>
                    </ul>
                    <a class="cng_more" href="#none"  style=""><span>更多地址</span><em class="sprite_odr revolve"></em></a>

                </div>
            </div>
        </div>



        <script>
            $(function () {

                $(".cur").each(function () {

                    //把选中的地址信息赋值给结算的地址栏
                    var recname = $(this).find(".recname").html();
                    var phonenumber =$(this).find(".phonenumber").html();
                    var recaddress =$(this).find(".recaddress").html();
                    $(".pta_name").html(recname);
                    $(".pta_tel").html(phonenumber);
                    $(".area_Name").html(recaddress);
                })


                $(".item-selected").click(function () {
                    var id = $(this).find(".aid").val()
//                    alert(id)
                    $(this).addClass('cur').siblings(".item-selected").removeClass('cur');
                    $(this).find(".init_adrs").css("display","block");
                    $(this).siblings('.item-selected').find(".init_adrs").css("display","none");

                    //异步改变默认地址
                    $.ajax({
                        url:"/index/changedefault",
                        method:"post",
                        data:{morenid:id},
                        dataType:"json",
                        success:function (res) {
                            console.log(res)
                            if (res.valid){
                                alert("修改默认成功");
                            }
                        }


                    })
                    //把选中的地址信息赋值给结算的地址栏
                    var recname = $(this).find(".recname").html();
                    var phonenumber =$(this).find(".phonenumber").html();
                    var recaddress =$(this).find(".recaddress").html();
                    $(".pta_name").html(recname);
                    $(".pta_tel").html(phonenumber);
                    $(".area_Name").html(recaddress);
                })
            })
        </script>
        <div id="shipAndSkuInfo">
            <!--/ /widget/shopping-list/shopping-list.tpl -->
            <div class="same_module pay_method wrap">
                <div class="same_module_rel">
                    <div class="mod_rel_head clearfix">
                        <span class="mr_tit">支付方式</span>
                    </div>
                    <div type="hide"></div>
                    <input type="hidden" id="totalPriceVender" value="0">
                    <input type="hidden" id="totalNumVender" value="0">
                    <div class="plusProductListVender none">[]</div>
                    <div class="paymethd_rel_cont" id="payment-list">
                        <input type="hidden" id="instalmentPlan" value="false">
                        <span style="cursor: pointer;" onclick="save_Pay(1,0,1);">
				            <a class=" payment-item  online-payment " for="pay-method-1" payname="货到付款" payid="1" onlinepaytype="0"><b></b>货到付款 <i class="sprite_odr"></i></a>
			</span>
                        <span style="cursor: pointer;">
				            <a class=" payment-item item-selected cur online-payment " for="pay-method-4" payname="在线支付" payid="4" onlinepaytype="0"><b></b>在线支付<i class="sprite_odr"></i></a>
			</span>

                        <script>
                            $(".payment-item").click(function () {
                                $(this).addClass('cur').parent().siblings("span").find(".payment-item").removeClass("cur");
                            })

                            $('.online-payment')
                                .hover(function(){
                                    $(this).addClass('payment-item-hover');
                                },function(){
                                    $(this).removeClass('payment-item-hover');
                                });
                            if($("#payment-list li").length<=4){
                                $('#payment-less').hide();
                                $('#payment-more').hide();
                                var payid=[5,2,8];
                                for(var i in payid){
                                    $("#payment-list div[payid="+payid[i]+"]").show();
                                }
                            }
                            $('.payment-item-on').click(function(){
                                $('#payment-less').hide();
                                $('#payment-more').show();
                                var payid=[5,2,8];
                                for(var i in payid){
                                    var payment = $("#payment-list div[payid="+payid[i]+"]");
                                    if(!payment.hasClass("item-selected")){
                                        payment.hide(100);
                                    }
                                }
                            });
                            $('.payment-item-off').click(function(){
                                $('#payment-less').show();
                                $('#payment-more').hide();
                                var payid=[5,2,8];
                                for(var i in payid){
                                    var payment = $("#payment-list div[payid="+payid[i]+"]");
                                    if(!payment.hasClass("item-selected")){
                                        payment.show(100);
                                    }
                                }
                            });
                        </script>
                    </div>
                </div>
            </div>
            <div class="same_module delivery_list wrap">
                <div class="same_module_rel">
                    <div class="step-tit mod_rel_head clearfix">
                        <span class="mr_tit">配送清单</span>
                        <a href="/index/showcart" id="cartRetureUrl" class="return-edit ftx-05 mr_ctrlbtn">返回购物车修改</a>
                    </div>
                    <div class="step-cont" id="skuPayAndShipment-cont">
                        <!--添加商品清单 -->
                        <div class="shopping-lists" id="shopping-lists">
                            <!--定义大商品清单LIST-->

                            @foreach($huopins as $v)
                            <div class="delivery_rel_cont">
                                <div class="deliv_items clearfix">
                                    <div class="goods-list de_item_sub de_itm_prodlist">
                                        <div class="de_ib_box">
                                            <div class="dib_con">
                                                <ul class="clearfix ">
                                                    <li class="clearfix" goods-id="2157070" sx-type="0">
                                                        <input type="text" hidden value="{{$v->hid}}" class="hid">
                                                        <div class="dc_pic">
                                                            <a target="_blank" href="/index/item/{{$v->gid}}"><img src="{{$v->listImages}}" alt="" height="58" width="58"></a>
                                                        </div>
                                                        <div class="dc_info">
                                                            <p class="inf_name">
                                                                <a href="/index/item/{{$v->gid}}" target="_blank">{{$v->gname}}
                                                                    <b>{{$v->zuhe}}</b></a>
                                                            </p>
                                                            <p class="inf_tip clearfix"><i class="sprite_odr disable"></i><span>不支持7天无理由退货</span>
                                                            </p>
                                                        </div>
                                                        <div class="dc_price"><span><em>¥</em><b class="price"> {{$v->price}}</b></span></div>
                                                        <div class="dc_nums"><em>x</em><b class="goodsnum">{{$v->goodsnum}}</b></div>

                                                    </li>
                                                </ul>
                                            </div>
                                            <!-- 买家版运费险 -->
                                        </div>
                                    </div>
                                    <!--goods-list 结束-->
                                </div>
                            </div>
                                <!--shopping-list 结束-->
                            @endforeach
                        </div>
                        <!--shopping-lists 结束-->
                    </div>
                </div>
            </div>
        </div>
        <!--添加商品清单结束-->
    </div>

    <!-- 结算栏 开始-->
    <div class="settling_column_bar">
        <div class="pay_tools_bar tools_bar_bottom">
            <div class="pay_tools_inner clearfix">
                <div class="pay_tli_adr">
                    <p class="adr_name_tel">
                        <span class="pta_name">黄宝</span>
                        <span class="pta_tel">181****3877</span>
                    </p>
                    <p class="adr_detail"><i class="sprite_odr"> </i>
                        <span class="area_Name"> 安徽 合肥市 蜀山区 南岗镇  安徽省合肥市蜀山区望江西路555号（安徽新华学院）</span>
                    </p>
                </div>
                <!--定金预售 -->
                <div class="pay_tli_price">
                    <ul class="clearfix">
                        <li class="fl prod_jr">
                        </li>
                    </ul>
                </div>
                <div class="pay_tli_count">
                    <p class="ptc_tips">需支付</p>
                    <p id="payPrice" class="ptc_count"><em>¥</em><b class="total">99.00</b></p>
                </div>
                <a class="pay_btn_smbit " href="javascript:;" >提交订单</a>
            </div>
        </div>
    </div>

</div>
<script>
    $(function () {

        //自动计算总价的方法
        function total() {
            var sums=0;
            $(".dc_price").each(function () {
                sums  += $(this).children("span").find("b").html()*1 * $(this).siblings(".dc_nums").find("b").html()*1;
            })
            $(".total").html(sums);
        }
        total();


        //去结算效果
        $(".pay_btn_smbit").click(function () {
            //获得当前去结算货品的id，数量,价格小计
            var idnumpri='';
            $(".delivery_rel_cont").each(function () {
                idnumpri += $(this).find('.hid').val() +","+ $(this).find('.goodsnum').html() +","+ $(this).find('.goodsnum').html() * $(this).find(".price").html()   +"/";
            })
            idnumpri = idnumpri.substring(0,idnumpri.length - 1);
//            alert(idnumpri)
            //获得当前订单的总价
            var total =$(".total").html();
//            alert(total)
            //获得当前订单的默认地址id
            var aid = $(".cur").find('.aid').val();
//            alert(aid)
            //生成订单号
            var ordernum =Date.parse(new Date());
//            alert(ordernum)
//            alert(aid)
            //异步保存数据
            $.ajax({
                url:"/index/addMyorder",
                method:"post",
                data:{idnumpri:idnumpri,total:total,aid:aid,ordernum:ordernum},
                dataType:"json",
                success:function (res) {
                    console.log(res)
                    if (res.valid){
                        location.href="/index/pay/"+ordernum;
                    }else{
                        alert(res.message);
                    }
                }
            })
        })
    })

</script>



<div id="footer">
    <div class="bordertop_solid mt20 pb10">
        <div class="sitemap2">
            <ul>
                <li><a href="http://www.miibeian.gov.cn/" target="_blank" rel="nofollow">沪ICP备16050468号</a></li>
                <li class="gray ml5 mr5">|</li>
                <li><a href="http://d7.yihaodianimg.com/N09/M07/BD/7B/ChEi11kJnKaAJQMrAAK-LnhML4o60600.jpg" target="_blank">营业执照</a></li>
            </ul>
        </div>
        <div class="copyright">Copyright© 1号店网上超市 2007-2017， All Rights Reserved</div>
    </div>
</div>

<!-- footer end -->

<iframe id="globalLocalStorageAdaptorForGet" style="display:none"
        src="http://www.yhd.com/html/getLocalStorage.html?v=20171013" loaded="1"></iframe>
<div id="overlay" style="margin: 0px; padding: 0px; border: none; width: 100%; height: 100%; background: rgb(51, 51, 51); opacity: 0.6; z-index: 9999; position: fixed; top: 0px; left: 0px; display: none;"></div>

<div id="easyDialogBox" style="margin: -297px 0px 0px -411px; padding: 0px; border: none; z-index: 10000; position: fixed; top: 50%; left: 50%; display: none;">
    <div class="my_or_dialog hide" id="my_or_dialog" style="display: block; margin: 0px;">
        <div class="dialog_order_form">
            <h3 class="cell_h3">编辑收货地址信息</h3>
            <a href="javascript:;" class="close_window">关闭</a>
            <div class="dia_main">
                <form action="/index/myorderaddresssave" method="post">
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
<div class="huangbao"></div>
<script>
    $(function () {

//        添加
        $(".add_address").click(function () {
            $("#easyDialogBox").css("display","block");
            $("#overlay").css("display","block");
            $(".cell_h3").html("新建地址");
        })


//        关闭
        $(".close_window").click(function () {
            $("#easyDialogBox").css("display","none");
            $("#overlay").css("display","none");
        })

//        编辑
        $(".edit").click(function (e) {
            //获得当前编辑地址的序号
            var id= $(this).parent().parent().siblings(".aid").val();
            var html='';
            $.ajax({
                url:"/index/myordereditaddress/"+id,
                method:"get",
                dataType:"json",
                success:function (res) {
                    var aa =res.data['is_default'];
                    if (aa ==1){
                        dd = '<input type="checkbox"  value="'+res.data['is_default']+'" name="is_default" style="float: left; width: 20px" checked="checked">';
                    }else{
                        dd = '<input type="checkbox"  value="'+res.data['is_default']+'" name="is_default" style="float: left; width: 20px" >';
                    }
                    console.log(res.data)
                    html ='<div id="overlays" style="margin: 0px; padding: 0px; border: none; width: 100%; height: 100%; background: rgb(51, 51, 51); opacity: 0.6; z-index: 9999; position: fixed; top: 0px; left: 0px; display: block;"></div><div id="easyDialogBoxs" style="margin: -297px 0px 0px -411px; padding: 0px; border: none; z-index: 10000; position: fixed; top: 50%; left: 50%; display: blcok;"> <div class="my_or_dialog hide" id="my_or_dialog" style="display: block; margin: 0px;"> <div class="dialog_order_form"> <h3 class="cell_h3">编辑地址</h3> <a href="javascript:;" class="close_window" id="close" onclick="editClose()">关闭</a> <div class="dia_main"> <form action="/index/myordereditsave/'+res.data['id']+'" method="post">{{csrf_field()}}<input type="text" hidden name="userid" value="{{Auth::guard("reg")->user()->id}}"> <dl class="user_list clearfix"> <dd class="user_ddt"> <label class="user_name"><span>*</span>收 件 人：</label> <input type="text" name="recname" id="temp_name" value="'+res.data['recname']+'" maxlength="25" placeholder="请您填写收货人姓名"> </dd> <dd class="user_ddt four_address"> <label class="user_name"><span>*</span>收货地址：</label> <input type="text" id="userSelectProvinceId" value="'+res.data['recaddress']+'" name="recaddress" placeholder="街道名称/编号，楼宇名称，单位，房号"> </dd> <dd class="user_ddt"> <label class="user_name"><span>*</span>手机号码：</label> <input type="text" id="temp_mobile" placeholder="常用手机号码" style="width:200px;" maxlength="11" name="phonenumber" value="'+res.data['phonenumber']+'"> </dd> <dd class="user_ddt address_labels"> <label class="user_name">地址标签：</label> <div class="write_labels "> <input type="text" id="temp_addressName" placeholder="最多二十个字哟" maxlength="20" name="addresstag" value="'+res.data['addresstag']+'"> </div> </dd><dd> <label class="user_name"><span>*</span>默认地址：</label> '+dd+'</dd></dl> <p class="btn_layout"> <button class="btn_keeps clearfix" type="submit">保存</button> </p> </form> </div> </div> </div> </div>';
                    $('.huangbao').html(html);
                }
            })
            e.stopPropagation();
        })
//        显示编辑和删除按钮
        $(".consignee-item").hover(function(){
            $(this).children("#consignee_index_div_118120102").find(".aa").css("display","block");
        },function(){
            $(this).children("#consignee_index_div_118120102").find(".aa").css("display","none");
        });

//        删除
        $(".del").click(function (e) {
            //获得当前编辑地址的序号
            var id= $(this).parent().parent().siblings(".aid").val();
//            alert(id)
            $(this).parent().parent().parent().siblings(".orderConfirm_dialog").find(".hideaid").val(id);
            $(".orderConfirm_dialog").css("display","block");
            e.stopPropagation();
        })

        //确认删除
        $(".save_btn").click(function () {
            //获得当前编辑地址的序号
            var id= $(this).parent().siblings(".hideaid").val();
//            alert(id)
            $.ajax({
                url:"/index/myorderaddressdel/"+id,
                method:'get',
                success:function (res) {
                    if (res.valid){
                        alert(res.message);
                        location.href="/index/confirmOrder";
                    }
                }
            })
        })


        //单击更多地址效果
        $(".cng_more").click(function () {
            if ($("#consignee-list").css("height") =="120px"){
                $("#consignee-list").css("height","auto");
            }else{
                $("#consignee-list").css("height","120px");
            }
        })

    })

    function editClose(){
        $("#easyDialogBoxs").css("display","none");
        $("#overlays").css("display","none");
    }

</script>

</body>
</html>