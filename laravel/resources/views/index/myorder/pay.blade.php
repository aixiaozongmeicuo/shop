<!DOCTYPE html>
<html style="background:#fff">
<head>
    <meta charset="utf-8">
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <title>京东支付</title>
    <link rel="icon" href="//static.360buyimg.com/finance/payment/receivable/1.2.0/css/i/ico.ico" type="image/x-icon">
    <link rel="stylesheet" type="text/css" href="//sp.jd.com/payment/1.2.0/css/bankList.css">
    <script type="text/javascript" src="//static.360buyimg.com/finance/payment/receivable/1.1.0/js/lib/jquery-1.6.4-min.js"></script>
    <script type="text/javascript" src="//static.360buyimg.com/finance/payment/receivable/1.1.0/js/common.js"></script>
    <link rel="stylesheet" type="text/css" href="//static.360buyimg.com/finance/payment/receivable/1.2.0/css/main.css">
    <!-- <link rel="stylesheet" type="text/css" href="//static.360buyimg.com/finance/payment/receivable/1.1.0/css/main.css"> -->

    <script>
        //js全局变量
        var globalVar={
            bankCardIsChecked:true,//银行卡产品被选中
            quickPayIsChecked:true,//快捷绑定银行卡
            canBeSubmit:true,//是否可提交
            isVaildCVV2:false,//是否需要验证cvv2
            isSignPay:false,//签约支付
            isUseBalance:false,//是否勾选余额支付
            isUserBank:false,//是否勾选银行卡
            isUseBaiTiao:false, //是否勾选白条
            isUseBaiTiaoFQ:false, //是否勾选白条分期
            isUseBaiTiaoOne:false, //是否勾选白条1期
            isUseXJK:false,//是否勾选小金库
            isUseXJKFin:false,//是否勾选小金库理财账户
            isNetBank:false//是否勾选网银
        }
    </script>



</head>
<body class="yhd" onload="leftTimer()">
<!-- shortcut -->
<div class="p-header">
    <div class="w clearfix">
        <div id="logo" class="fl">
            <a href="/"><img width="153" height="42" src="//static.360buyimg.com/finance/payment/receivable/1.2.0/css/i/logo-yhd.png" alt="一号店收银台"></a>
        </div>
        <div class="fr mt15">
        </div>
    </div>
</div>
<!-- shortcut end -->
<div class="main cravenOrder" style="background:#fff">
    <div class="w">
        <!-- order 订单信息 -->
        <div class="order">
            <div class="o-left">
                <h3 class="o-title">1号店订单提交成功，请您尽快付款！</h3>
                <p class="o-tips">
                    订单信息：1号店
                </p>



                <p class="o-tips">
                    请您在提交订单后 <b> 24小时</b>  内完成支付，否则订单会自动取消。
                </p>
            </div>
            <div class="o-right">
                <div class="o-price">
                    <em>应付金额</em><strong>{{$data[0]['total']}}.00</strong><em>元</em>
                </div>


                <div class="o-detail"><a href="javascript:;" id="a_orderDetail">订单详情</a></div>

            </div>
            <span class="clr"></span>
            <div class="o-list j_orderList" style="display: block">
                <!-- 单笔订单 -->
                <div class="o-list-info">
                    <div class="o-list-info-item">收款方：1号店</div>
                    <div class="o-list-info-item">订单信息：1号店</div>
                    <div class="o-list-info-item">商户订单号： {{$data[0]['ordernumber']}}</div>
                    <div class="o-list-info-item">创建时间：{{$data[0]['created_at']}}</div>
                </div>
            </div>
        </div>
        <script type='text/javascript'>
            var _jaq = _jaq || [];
            _jaq.push(['_setAccount', 'UA-JRPC-3Cashier']);
            _jaq.push("orderInfo");
            (function() {
                var ja = document.createElement('script'); ja.type = 'text/javascript'; ja.async = true;
                ja.src ="//ag.jd.com/resource/psa-ag.js";
                var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ja, s);
            })();
        </script>

        <div class="payment"></div>

        <input type="hidden" id="otherPaymentType" value="login">
        <!-- payment 支付方式选择 end -->
        <div class="payment payment-other">
            <!-- payment-change 变更支付方式 -->
            <div class="payment-change">
                <div class="o-icon-wrap">
                    <span class="o-icon"></span>
                    <!--<span class="o-p-tips">以下支付方式不支持合并支付</span>-->
                </div>
                <div class="pc-wrap clearfix">
                    <div class="pc-w-left">
                        <a class="pc-item-weixin" href="javascript:void(0);" onclick="otherPayment.weixinQRCode()"><i></i>微信支付</a>
                        <span>|</span>
                        <a class="pc-item-unionpay" href="javascript:void(0);" onclick="otherPayment.unionPay()"><i></i>银联在线支付</a>
                    </div>
                </div>

            </div>
            <!-- payment-change 变更支付方式 end -->
        </div>
        <a class="input_btn" href="/index/changestatus/{{$data[0]['ordernumber']}}" style="background: url('/images/my_order_sprite.jpg') no-repeat scroll 0 -129px;color: #fff;display: block;font-family: 'Microsoft YaHei';font-size: 14px;height: 28px;line-height: 28px;margin: 80px auto 0;text-align: center;text-decoration: none; width: 92px;">立即支付</a>
    </div>

</div>



<script>
//    var start = 120,preDiff = 0;
//    var startTime = Date.now();
//    var t1 = setInterval(function(){
//        var tempTime = Date.now();
//        var diff = (tempTime - startTime)/1000 >> 0;
//        if(diff >= start){
//            clearInterval(t1);
//            show(0);
//            alert("支付失败！！请返回购物车重新添加商品");
//            return;
//        }
//        if(preDiff === diff) return;
//        preDiff = diff;
//        show(start - diff);
//    },1);
//    function show(n){
//        var hundredPalce = n/100 >> 0;
//        var tenPalce = (n - hundredPalce * 100)/10 >> 0;
//        var singlePalce = n%10;
//        var spans = document.querySelectorAll("span");
//        spans[1].innerHTML= hundredPalce;
//        spans[2].innerHTML = tenPalce;
//        spans[3].innerHTML = singlePalce;
//    }
</script>
<script type='text/javascript'>
    var _jaq = _jaq || [];
    _jaq.push(['_setAccount', 'UA-JRPC-3Cashier']);
    _jaq.push("login");
    (function() {
        var ja = document.createElement('script'); ja.type = 'text/javascript'; ja.async = true;
        ja.src ="//ag.jd.com/resource/psa-ag.js";
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ja, s);
    })();
</script>



<!-- 一号店 footer -->
<div class="p-footer" style="background:#fff">
    <div class="pf-wrap w">
        <div class="pf-line">
            <div class="copyright">Copyright© 1号店网上超市 2007-2017， All Rights Reserved</div>
        </div>
    </div>
</div>

<!-- 问卷调查 -->
<div class="feedback">
    <a href='//ur.jr.jd.com/survey/show?id=153&u=login%3Fkey%3D112901817101615191905347_1013150816716047050495&no=110246516014,1013150816716047050495,null' target="_blank">&nbsp;</a>
</div>

<!--京东风控 需要放到所有js的最后-->
<!-- 设备指纹 -->
<script language="javaScript">
    var orderId="";
</script>
<input type="hidden" name="deviceId" id="deviceId" value="" autocomplete="off"><input type="hidden" name="fingerprint" id="fingerprint" value="" autocomplete="off"><input type="hidden" name="udfp" id="udfp" value="" autocomplete="off">
<!--风控js 最新-->
{{--<script src="//payrisk.jd.com/js/tdpay.js"></script>--}}

<script language="javaScript">
    try{
        getJdEid(function(eid,fp,udfp){
            var orderId=$("#orderId").val();
            $("#deviceId").val(eid);
            $("#fingerprint").val(fp);
            $("#udfp").val(JSON.stringify(udfp));
        });
    }catch(e){

    }
</script>

</body>
</html>