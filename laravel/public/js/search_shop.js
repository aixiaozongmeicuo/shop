/*!
 * jQuery Migrate - v1.2.1 - 2013-05-08
 * https://github.com/jquery/jquery-migrate
 * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors; Licensed MIT
 */
(function(ae,K,I){ae.migrateMute=1;var ac={};ae.migrateWarnings=[];if(!ae.migrateMute&&K.console&&K.console.log){K.console.log("JQMIGRATE: Logging is active")}if(ae.migrateTrace===I){ae.migrateTrace=true}ae.migrateReset=function(){ac={};ae.migrateWarnings.length=0};function P(a){var b=K.console;if(!ac[a]){ac[a]=true;ae.migrateWarnings.push(a);if(b&&b.warn&&!ae.migrateMute){b.warn("JQMIGRATE: "+a);if(ae.migrateTrace&&b.trace){b.trace()}}}}function ah(b,e,c,a){if(Object.defineProperty){try{Object.defineProperty(b,e,{configurable:true,enumerable:true,get:function(){P(a);return c},set:function(f){P(a);c=f}});return}catch(d){}}ae._definePropertyBroken=true;
    b[e]=c}if(document.compatMode==="BackCompat"){P("jQuery is not compatible with Quirks Mode")}var M=ae("<input/>",{size:1}).attr("size")&&ae.attrFn,ai=ae.attr,O=ae.attrHooks.value&&ae.attrHooks.value.get||function(){return null},Q=ae.attrHooks.value&&ae.attrHooks.value.set||function(){return I},G=/^(?:input|button)$/i,S=/^[238]$/,ab=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,U=/^(?:checked|selected)$/i;ah(ae,"attrFn",M||{},"jQuery.attrFn is deprecated");ae.attr=function(f,b,e,a){var c=b.toLowerCase(),d=f&&f.nodeType;if(a){if(ai.length<4){P("jQuery.fn.attr( props, pass ) is deprecated")}if(f&&!S.test(d)&&(M?b in M:ae.isFunction(ae.fn[b]))){return ae(f)[b](e)}}if(b==="type"&&e!==I&&G.test(f.nodeName)&&f.parentNode){P("Can't change the 'type' of an input or button in IE 6/7/8")
}if(!ae.attrHooks[c]&&ab.test(c)){ae.attrHooks[c]={get:function(i,j){var g,h=ae.prop(i,j);return h===true||typeof h!=="boolean"&&(g=i.getAttributeNode(j))&&g.nodeValue!==false?j.toLowerCase():I},set:function(i,g,j){var h;if(g===false){ae.removeAttr(i,j)}else{h=ae.propFix[j]||j;if(h in i){i[h]=true}i.setAttribute(j,j.toLowerCase())}return j}};if(U.test(c)){P("jQuery.fn.attr('"+c+"') may use property instead of attribute")}}return ai.call(ae,f,b,e)};ae.attrHooks.value={get:function(c,a){var b=(c.nodeName||"").toLowerCase();if(b==="button"){return O.apply(this,arguments)}if(b!=="input"&&b!=="option"){P("jQuery.fn.attr('value') no longer gets properties")}return a in c?c.value:null},set:function(a,c){var b=(a.nodeName||"").toLowerCase();if(b==="button"){return Q.apply(this,arguments)}if(b!=="input"&&b!=="option"){P("jQuery.fn.attr('value', val) no longer sets properties")
}a.value=c}};var aa,ag,Y=ae.fn.init,H=ae.parseJSON,ak=/^([^<]*)(<[\w\W]+>)([^>]*)$/;ae.fn.init=function(b,c,d){var a;if(b&&typeof b==="string"&&!ae.isPlainObject(c)&&(a=ak.exec(ae.trim(b)))&&a[0]){if(b.charAt(0)!=="<"){P("$(html) HTML strings must start with '<' character")}if(a[3]){P("$(html) HTML text after last tag is ignored")}if(a[0].charAt(0)==="#"){P("HTML string cannot start with a '#' character");ae.error("JQMIGRATE: Invalid selector string (XSS)")}if(c&&c.context){c=c.context}if(ae.parseHTML){return Y.call(this,ae.parseHTML(a[2],c,true),c,d)}}return Y.apply(this,arguments)};ae.fn.init.prototype=ae.fn;ae.parseJSON=function(a){if(!a&&a!==null){P("jQuery.parseJSON requires a valid JSON string");return null}return H.apply(this,arguments)};ae.uaMatch=function(a){a=a.toLowerCase();var b=/(chrome)[ \/]([\w.]+)/.exec(a)||/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||a.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a)||[];
    return{browser:b[1]||"",version:b[2]||"0"}};if(!ae.browser){aa=ae.uaMatch(navigator.userAgent);ag={};if(aa.browser){ag[aa.browser]=true;ag.version=aa.version}if(ag.chrome){ag.webkit=true}else{if(ag.webkit){ag.safari=true}}ae.browser=ag}ah(ae,"browser",ae.browser,"jQuery.browser is deprecated");ae.sub=function(){function a(e,d){return new a.fn.init(e,d)}ae.extend(true,a,this);a.superclass=this;a.fn=a.prototype=this();a.fn.constructor=a;a.sub=this.sub;a.fn.init=function b(e,d){if(d&&d instanceof ae&&!(d instanceof a)){d=a(d)}return ae.fn.init.call(this,e,d,c)};a.fn.init.prototype=a.fn;var c=a(document);P("jQuery.sub() is deprecated");return a};ae.ajaxSetup({converters:{"text json":ae.parseJSON}});var aj=ae.fn.data;ae.fn.data=function(d){var a,b,c=this[0];if(c&&d==="events"&&arguments.length===1){a=ae.data(c,d);
    b=ae._data(c,d);if((a===I||a===b)&&b!==I){P("Use of jQuery.fn.data('events') is deprecated");return b}}return aj.apply(this,arguments)};var L=/\/(java|ecma)script/i,R=ae.fn.andSelf||ae.fn.addBack;ae.fn.andSelf=function(){P("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()");return R.apply(this,arguments)};if(!ae.clean){ae.clean=function(i,h,b,f){h=h||document;h=!h.nodeType&&h[0]||h;h=h.ownerDocument||h;P("jQuery.clean() is deprecated");var e,g,d,a,c=[];ae.merge(c,ae.buildFragment(i,h).childNodes);if(b){d=function(j){if(!j.type||L.test(j.type)){return f?f.push(j.parentNode?j.parentNode.removeChild(j):j):b.appendChild(j)}};for(e=0;(g=c[e])!=null;e++){if(!(ae.nodeName(g,"script")&&d(g))){b.appendChild(g);if(typeof g.getElementsByTagName!=="undefined"){a=ae.grep(ae.merge([],g.getElementsByTagName("script")),d);
    c.splice.apply(c,[e+1,0].concat(a));e+=a.length}}}}return c}}var af=ae.event.add,W=ae.event.remove,T=ae.event.trigger,X=ae.fn.toggle,J=ae.fn.live,N=ae.fn.die,ad="ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",V=new RegExp("\\b(?:"+ad+")\\b"),al=/(?:^|\s)hover(\.\S+|)\b/,Z=function(a){if(typeof(a)!=="string"||ae.event.special.hover){return a}if(al.test(a)){P("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'")}return a&&a.replace(al,"mouseenter$1 mouseleave$1")};if(ae.event.props&&ae.event.props[0]!=="attrChange"){ae.event.props.unshift("attrChange","attrName","relatedNode","srcElement")}if(ae.event.dispatch){ah(ae.event,"handle",ae.event.dispatch,"jQuery.event.handle is undocumented and deprecated")}ae.event.add=function(a,c,b,e,d){if(a!==document&&V.test(c)){P("AJAX events should be attached to document: "+c)
}af.call(this,a,Z(c||""),b,e,d)};ae.event.remove=function(e,b,a,d,c){W.call(this,e,Z(b)||"",a,d,c)};ae.fn.error=function(){var a=Array.prototype.slice.call(arguments,0);P("jQuery.fn.error() is deprecated");a.splice(0,0,"error");if(arguments.length){return this.bind.apply(this,a)}this.triggerHandler.apply(this,a);return this};ae.fn.toggle=function(f,b){if(!ae.isFunction(f)||!ae.isFunction(b)){return X.apply(this,arguments)}P("jQuery.fn.toggle(handler, handler...) is deprecated");var c=arguments,d=f.guid||ae.guid++,a=0,e=function(h){var g=(ae._data(this,"lastToggle"+f.guid)||0)%a;ae._data(this,"lastToggle"+f.guid,g+1);h.preventDefault();return c[g].apply(this,arguments)||false};e.guid=d;while(a<c.length){c[a++].guid=d}return this.click(e)};ae.fn.live=function(a,b,c){P("jQuery.fn.live() is deprecated");
    if(J){return J.apply(this,arguments)}ae(this.context).on(a,this.selector,b,c);return this};ae.fn.die=function(b,a){P("jQuery.fn.die() is deprecated");if(N){return N.apply(this,arguments)}ae(this.context).off(b,this.selector||"**",a);return this};ae.event.trigger=function(d,c,a,b){if(!a&&!V.test(d)){P("Global events are undocumented and deprecated")}return T.call(this,d,c,a||document,b)};ae.each(ad.split("|"),function(a,b){ae.event.special[b]={setup:function(){var c=this;if(c!==document){ae.event.add(document,b+"."+ae.guid,function(){ae.event.trigger(b,null,c,true)});ae._data(this,b,ae.guid++)}return false},teardown:function(){if(this!==document){ae.event.remove(document,b+"."+ae._data(this,b))}return false}}})})(jQuery,window);
/**
 * 搜索页js加载入口函数
 */
jQuery(document).ready(function () {

    //初始化头部购物车
    require([ "header_miniCart" ], function(cart) {
        cart.initCart();
    });

    setGuideCategory();
    searchHistory();	//历史记录
    searchSeo();//seo相关
//    searchPageLocate(); //锚点定位
//    searchAutoRecordTracker();//搜索自动曝光tracker
    if (urlSearchType == '/s' || urlSearchType == '/s2' || urlSearchType == ''||urlSearchType=="/redirectCoupon") {
        runfunctions([], [
            loadAddressInfo
            , lazyLoadImage
            , searchFixLoad//排序筛选栏
            , changeTab
//            , getTopHotAdvertise
            , navigativeInfo
//            , search_car_brand
//            , lazyLoadPrice
            , getMoreProducts
//            , similarProducts
//            , basicInfo
//            , searchQuickViews
//            , show99FreeShippingInfo//99元包邮提示展示
//            , collectFavoriteShop
//            , lazyLoadAd
//            , ajaxTopAdvertise
//            , bljInfos
//            , newProductInfos
        ], this);
    }
    loadAddCart();
//    jsShopSearchFed.modSearchProFn();
    /*if(isLongQuery == 2) {
     lessProductRecommend();
     }*/
//    dealProductQualityInfo();//处理质量信息网
//    test();
});

function test(){
    $(window).bind('hashchange', function() {
        var _hash = HASH.getRealHash();
        if (HASH.isCorrectHash(_hash)) {
            var url = HASH.handleUrl(_hash, HASH.ajaxLongUrl);

            getMoreProductsUrl = url;
            if (url && url != "0") {
                jsAjaxFed.ajaxRequestPage(url);
            }
            return false;
        }

    });

    /*$(window).hashchange(function(){
     var _hash = HASH.getRealHash();
     if (HASH.isCorrectHash(_hash)) {
     var url = HASH.handleUrl(_hash, HASH.ajaxLongUrl);

     getMoreProductsUrl = url;
     if (url && url != "0") {
     jsAjaxFed.ajaxRequestPage(url);
     }
     return false;
     }
     });*/



    /*if(!window.HashChangeEvent)(function(){
     var lastURL=document.URL;
     window.addEventListener("hashchange",function(event){
     Object.defineProperty(event,"oldURL",{enumerable:true,configurable:true,value:lastURL});
     Object.defineProperty(event,"newURL",{enumerable:true,configurable:true,value:document.URL});
     lastURL=document.URL;
     });
     }());*/

}
function setGuideCategory() {
    var _cate = $(".mod_search_guide .classWrap");
    var hideCount = 0;
    _cate.find(".guide_box").each(
        function(id, item){
            if($(item).hasClass("hide") == 1) {
                hideCount ++;
            }
        }
    )
    if(hideCount == _cate.find(".guide_box").size()) {
        _cate.hide();
    }
}

/**处理质量信息网*/
function dealProductQualityInfo() {
    $(".prod_result").click(function () {
        var productQualityUrl = $(".mod_search_checkDd iframe").attr("src");
        if ((typeof productQualityUrl != "undefined") && productQualityUrl.length > 0) {
            yhdLib2.dialog({
                popupName: ".mod_search_checkDd",
                maskLayer: true,
                popupFixed: true
            });
        }
    });

    $(".mod_search_checkDd").delegate(".popup_btn_close", "click", function () {
        yhdLib2.closePopup({
            popupName: ".mod_search_checkDd",
            maskLayer: true,
            popupFixed: true
        });
    });
}

/**
 * 类目树+导购属性+用户反馈+回到顶部+缩略图图片切换
 */
function navigativeInfo() {
    jsCategoryFed.main();
    jsSearchAttributeFed.main();
    jsSearchFedUtil.main();
//    searchUserFeedback.main();
    picChange();
//    searchLargeDressPics();
    if (fashionCateType && fashionCateType == 2) {
//        searchCombinelist(0);//组合品
        combineProductBuy();
    }
}

/**
 * 款窄屏参数+tracker
 */
function basicInfo() {
    //保存款窄屏进cookie，便于baseSearchAction调用
    jQuery.cookie("wide_screen", isWidescreen, {domain: no3wUrl, path: "/", "expires": 365});

    //tracker
    trackerContainer.addParameter(new Parameter("internalKeyword", internalKeyword));
    var specialTracker = "${specialTracker?if_exists}";

    if (specialTracker == '1') {
        trackerContainer.addParameter(new Parameter("resultSum", "0"));
    } else {
        trackerContainer.addParameter(new Parameter("resultSum", productCount));
    }
    trackerContainer.addParameter(new Parameter("currentPage", searchPageNo));
    // recordTrackInfoWithType("1","search_productIds_exposure",topProductsId);
    if (advRef != null && advRef != "undefined" && advRef != '') {
        // recordTrackInfoWithType("1", advRef, "ad.dolphin.bidding");
    }

//     var $brandShopDIV = $(".mod_brand_list");
//     if($brandShopDIV.length > 0) {
//    	 var brandId = $brandShopDIV.attr("brandId");
//    	 recordTrackInfoWithType("1","search_brand_shop",brandId);
//     }
//     recordTrackInfoWithType("1","search_productIds_exposure",topProductsId);
}

/**
 * 头部搜索
 */
function changeTab() {
    if (viewflag != null && viewflag == 2) {
        loli.app.search.changeTab(2);
    }
}

/**
 * 相似商品的初始化加载
 */
/*function similarProducts() {
 similarProduct.modPopSimilar();
 }*/
var addproductCallback = {
    "addToCartSuccess" : function() {
        //getPromoCartByMiniCart();
    },
    "addToCartError" : function(message) {
        alert(message);
    }
};
function loadAddCart() {
    $(document).delegate("a[class='buy_btn']","click",function(){
        var pid = $(this).attr("sellproductId");
        var buyModule = $(this).attr("buyModule");
        if (buyModule == 2) return;
        var pcount = $("#buyNum_" + pid).val();
        var params = {
            pid: pid,
            ptype: "1",
            pcount: pcount,
            sku: "",
            did: "",
            zids: "",
            gids: ""
        };
        require([ "common_cart" ], function(cart) {
            cart.addToCart(params, addproductCallback);
        });
    });
}
/**
 * 保垒价
 */
function bljInfos() {
    bljProduct.modPopBljInfos();
}
/**
 * 新品角标
 */
/*function newProductInfos() {
 newProduct.newProductHover();
 }*/

//面部护肤快速预览
/*function searchQuickViews() {
 searchQuickView.modPopQuickView();
 }
 */

/**
 * 几个function间隔200ms跑
 * @param args function对应的参数
 * @param funs
 * @param fun的ref,只支持一个
 * @returns {Boolean}
 */
function runfunctions(args, funs, ref) {
    if (!(funs && funs.length)) {
        return;
    }
    ref = ref || window;
    var fun = funs.shift();
    var arg = args.shift() || [];
    for (; ; fun = funs.pop(), arg = args.pop()) {
        if (typeof fun == "function") {
            setTimeout(function () {
                try {
                    fun.apply(ref, arg);
                } catch (e) {
                }
                runfunctions(args, funs, ref);
            }, 200);
            return false;
        }
    }
}


/**
 * callbackName固定的jsonp请求
 *
 *   该方法是为了满足pms需要而写的。
 *   pms的squid 缓存，需要url保持不变；但是ajax跨域请求，callback的参数的随机的。因此
 * 这里写死了callback。
 *   如果不需要squid缓存，请直接用jQuery自带的ajax跨域请求方法。
 *
 * @param callbackName callback名称
 * @param url ajax请求地址
 * @param callback 回调函数
 */
function getJsonp(callbackName, url, callback) {
    url = url + '&callback=' + callbackName;
    window[callbackName] = function (data) {
        callback(data);
        window[callbackName] = null;
        try {
            delete window[callbackName];
        } catch (e) {//error in ie6}
        }
    };
    $.getScript(url);
}

/**
 * 加载三级区域信息
 */
function loadAddressInfo() {
    areasSelectBox.init();
}

/**
 * 需要最先执行的js,如宽窄屏、历史记录、锚点定位
 */
function searchHistory() {
    var loli = window["loli"] || (window["loli"] = {});
    var storage = loli.yhdStore;
    if (storage && searchKey != "" && searchKey.length > 0) {
        //keyword 存入前先encode

        storage.getFromRoot("search_keyword_history", function (data) {
            if (data && data.status == 1) {
                var searchKeywordHistory = data.value;
                var keywords = [];
                if (searchKeywordHistory) {
                    keywords = searchKeywordHistory.split(',');
                }
                //如果cookie里有值，将cookie值存入localStorage,再删除cookieR
//                var searchKeywordCookie = decodeURIComponent(decodeURIComponent(jQuery.cookie("search_keyword_history")));
//                var keywordsCookieList = searchKeywordCookie.split(",");
//                if (keywordsCookieList.length > 0 && keywordsCookieList[0] != "null") {
//                    for (var i = 0; i < keywordsCookieList.length; i++) {
//                        if (keywordsCookieList[i] != "") {
//                            keywords.push(encodeURIComponent(encodeURIComponent(keywordsCookieList[i])));
//                            //如果超过10个则删除第一个
//                            if (keywords.length > 10) {
//                                keywords.shift();
//                            }
//                        }
//                    }
//                    var siteDomain = URLPrefix.sitedomain;
//                    var op = {path: '/', domain: siteDomain, expireDays: -1};
//                    jQuery.cookie('search_keyword_history', "", op); //将过期时间设置为过去来删除一个cookie
//                }

                if (searchKeywordHistory) {
                    var has = false;
                    var idx = 0;
                    for (var i = 0; i < keywords.length; i++) {
                        var keyWord = keywords[i];
                        if (keyWord) {
                            if (decodeURIComponent(decodeURIComponent(keyWord)) == decodeURIComponent(decodeURIComponent(searchKey))) {
                                has = true;
                                idx = i;
                                break;
                            }
                        }
                    }
                    if (!has) {
                        keywords.push(searchKey);

                        //如果超过10个则删除第一个
                        if (keywords.length > 10) {
                            keywords.shift();
                        }
                    } else {
                        //如果点击的不是数组最后一个,则将其位置移动到最后
                        if (idx != keywords.length - 1) {
                            var temp = keywords.splice(idx, 1);
                            keywords.push(temp[0]);
                        }
                    }
                } else {
                    keywords.push(searchKey);
                    //如果超过10个则删除第一个
                    if (keywords.length > 10) {
                        keywords.shift();
                    }
                }

                //保存并刷新
                storage.setFromRoot("search_keyword_history", keywords.join(','));
            }
        });

    }

}

/*function searchPageLocate() {
 if(typeof (isCityResponse)!= "undefined"&&isCityResponse=='true'){
 return;
 }
 var liCount = $(".mod_search_guide .selected_con li").length;
 var crumb_list_num = $(".mod_search_crumb").find('.crumb_list > .crumb_list_title').length;
 //针对搜词页加上跳转锚点 by zhangfan 20161020
 if($("#searchFlag").val() == '1') {
 $("body,html").animate({scrollTop: $("#headerNav").position().top}, 0);
 } else if (!($("#global_head_adv_div").is(":visible"))) {
 //选中属性或类目，锚点均定为到面包屑,(分站页面  有广告则不做跳转)
 if (liCount > 0 || crumb_list_num > 0) {
 $("body,html").animate({scrollTop: $(".mod_search_crumb").position().top - 34}, 0);
 } else if (requestType != '70'
 && requestType != '75'
 && requestType != '76'
 && typeof (selectedFilter) != "undefined"
 && selectedFilter.length > 1
 && !(selectedFilter.length == 2 && selectedFilter.indexOf("d") != -1)) {//默认商品个数少于36，会自动带上“d”,表示不过滤不相关sku
 // 选中了筛选，定位到面包屑
 $(window).scrollTop($(".mod_search_crumb").offset().top);
 } else {//没有选中任何东西，则定位到1号店logo的位置
 $(window).scrollTop($(".hd_logo").offset().top);
 }
 } else {//分站页面,不管没有选中任何东西，则定位到1号店logo的位置
 $(window).scrollTop($(".hd_logo").offset().top);
 }


 }*/

/*function searchAutoRecordTracker() {
 require(["content_tracker_expo"], function (adContentTracker) {
 adContentTracker.run("search_page_event", "search_page_recordTracker");
 });
 }*/

function searchSeo() {
    $("#seo_h1").hide();//隐藏seo关键词
    $("#crumbSearchBox").show();//显示面包屑搜索框
}
//图片延迟加载
function lazyLoadImage(){
    if(lazyLoadImageObjArry){
        //普通模式和缩略图模式
        $("#itemSearchList .mod_search_pro").find("img").each(function(){
            var loadImgObjVal = new Object();
            loadImgObjVal.id = $(this).parent();
            loadImgObjVal.top = $(this).offset().top;
            lazyLoadImageObjArry.push(loadImgObjVal);
        });
    }

    // 注释 手动懒加载图片 影响 首屏 速度
    jQuery.YHD.imgLoad.loadImg(lazyLoadImageObjArry);
    jQuery.YHD.imgLoad.scrollLoadImg();
}

var lazyLoadDelay = 50; //每次预加载的延迟(ms)
(function(jQuery) {
    jQuery.YHD = {
        imgLoad : {
            objArray : [],
            timeout:null,
            timeoutLoad :function(timeout){
                var _imgLoad = jQuery.YHD.imgLoad;
                if(jQuery.YHD.imgLoad.timeout)
                    return;
                _imgLoad.timeout=setTimeout(function(){_imgLoad.timeout=null;_imgLoad.load();},timeout);
            },
            loadImg : function(obj) {
                if (obj && obj.length > 0) {
                    for ( var i = 0, l = obj.length; i < l; i++) {
                        if (jQuery.inArray(obj[i], jQuery.YHD.imgLoad.objArray) == -1) {
                            jQuery.YHD.imgLoad.objArray.push(obj[i]);
                        }
                    }
                }
                //jQuery.YHD.imgLoad.load();

            },
            pageTop : function() {
                return document.documentElement.clientHeight
                    + Math.max(document.documentElement.scrollTop,
                        document.body.scrollTop);
            },
            load : function() {
                var _imgLoad = jQuery.YHD.imgLoad;
                if(_imgLoad.timeout)
                    return;
                var tempIdArray = [];
                var tempObjArray = [];
                var pageTop = jQuery.YHD.imgLoad.pageTop();

                jQuery.each(_imgLoad.objArray,function(i,imgVal){
                    if(imgVal.top < pageTop+400) {
                        tempIdArray.push(imgVal.id);
                    }else {
                        tempObjArray.push(imgVal);
                    }
                });

                _imgLoad.objArray = tempObjArray;
                while(tempIdArray.length){
                    var id=tempIdArray.shift();
                    if(!id)
                        continue;
                    var _this =$(id);
                    if(!_this.length)
                        continue;
                    var _count=0;
                    $(_this.find('img')).each(function(){
                        var	__attr = this.getAttribute('original');
                        if (__attr ) {
                            var webpUrl=loli.webp(__attr);//global公用方法，webp转换
                            if(webpUrl){
                                $(this).attr("src", webpUrl).removeAttr("original");
                            }else{
                                $(this).attr("src", __attr).removeAttr("original");
                            }
                            _count++;
                        }
                    });

                    //流百类且开关为开时 或者部分类目添加客服图标，添加在线客服,懒加载客服图标
                    /*if ((typeof (fashionCateType) != "undefined" && fashionCateType == 1) || ( typeof (isOnlineCustomer) != "undefined" && isOnlineCustomer == 1 )
                     && typeof (onlineChatSwitch) != "undefined"	&& onlineChatSwitch == 1) {
                     var storeObj=_this.parents(".itemBox").find(".storeName a");
                     (function(storeObj) {
                     var inshop=storeObj.attr("inshop");
                     var onChatSize=storeObj.parent().find("#onlineChatSpan").size();//当前在线客服元素个数
                     var flag=storeObj.attr("flag");//是否已经发出过请求
                     var productId=storeObj.attr("prodId");
                     var merchantId=storeObj.attr("merchantId");
                     if(inshop==1&&onChatSize<1&&typeof(flag) == "undefined"&&typeof(productId) !="undefined"&&typeof(merchantId) != "undefined"){
                     storeObj.attr("flag",1);
                     var positionId=19;  //搜索的为9
                     var storeUrl = "//webim.yhd.com/checkPoint/showPoint/"
                     + merchantId + "/" + positionId + "/"
                     + productId + "/0/3.action?jsonpCallback=?"
                     + "&isShake=0&iconType=search_small";
                     try{
                     $.getJSON(storeUrl,function(data) {
                     //1,验证返回值信息，为数字，表示商家未开通。
                     //alert(1);
                     if(/^[0-9]*$/.test(data)){
                     //商家未开通在线客服功能
                     }
                     //2,按钮显示
                     try{
                     storeObj.after('<span class="im"></span>');
                     storeObj.next().html(data);
                     storeObj=null;
                     }catch(e){
                     }
                     });
                     }catch(e1){
                     }
                     }
                     }
                     )(storeObj);
                     }*/

                    /*if(_count>0){
                     return	_imgLoad.timeoutLoad(_count*5);
                     }*/
                }
            },
            scrollLoadImg : function() {
                jQuery(window).unbind("scroll",jQuery.YHD.imgLoad.load);
                loli.scroll(jQuery.YHD.imgLoad.load);
            }
        }
    };
})(jQuery);

var jsSearchFedUtil ={
//	ie6: $.browser.msie&& $.browser.version=='6.0',
    /* *
     *
     * 返回顶部
     *
     * */
    toTop : function(){
        var fixedRight=$(".fixe_right"),
            toTop = fixedRight.find(".to_top"),
            compareBox = $("#compareBox"),
            winHtHalf = $(window).height()/2;

        if(jsSearchFedUtil.ie6) {
            fixedRight.css("fixedRight",$(window).scrollTop()+200);
        }

        $(window).scroll(function(){
            // if ($(window).scrollTop()>0){
            //     toTop.css("display","block");
            // }else{
            //     toTop.css("display","none");
            // }
            if(jsSearchFedUtil.ie6){
                fixedRight.css("top",(fixedRight.hasClass("show_compare")?200:winHtHalf) + $(window).scrollTop());
            }

            toTop.click(function(){
                $("body,html").scrollTop(0);
                return false;
            });
        });
    },
    /**
     * 根据是否有keyword获取domain
     */
    getSearchUrlPrefix : function(){
        var isKeyWord = $("#searchword").attr("reqMode");
        return isKeyWord == 1 ? searchKeywordUrl : searchCategoryUrl;
    },

    bigPromotionCmsAd:function(){
        jQuery.ajax({
            url : bigPromotionCmsUrl,
            dataType : 'jsonp',
            jsonp : 'callback',
            //async: false,
            jsonpCallback : "celebrateFixNavCallback",
            timeout : 2000,
            success : function (data) {
                if(data && data.code == 0){
                    var nav = jQuery("body");
                    if(data.html){
                        nav.append(data.html);
                    }
                    if(data.js){
                        nav.append(data.js);
                    }
                }
            }
        });
    },
    main : function(){
        this.toTop();           //返回顶部
        if(typeof(bigPromotionCmsAd)!= "undefined" && bigPromotionCmsAd==1){
            this.bigPromotionCmsAd();
        }
    }
};


var searchUserFeedback={

    cellFeedback : function(){

        var feedbackBox = $('#cell_feedback .feedback_box'),
            pleased = $('#cell_feedback .pleased'),
            feedbackPleased = $('#cell_feedback .feedback_pleased'),
            feedbackDispleased = $('#cell_feedback .feedback_displeased'),
            certain = $("#cell_feedback .certain");

        if($('#cell_feedback .feedback_box').data("events")){
            return;
        }

        var _expectCategoryId = 0;
        if("undefined" != typeof expectCategoryId) {
            _expectCategoryId = expectCategoryId;
        }
        feedbackBox.delegate('span' , 'click' , function(){
            if($(this).hasClass('pleased')){
                var currUrl=window.location.href;
                var currPage=$("#cell_feedback").attr("currPage");
                var url = jsSearchFedUtil.getSearchUrlPrefix() + "/userfeedback.do";
                var para = {'currUrl':currUrl,'currPage':currPage,'pleased':1,'currCategoryId':_expectCategoryId};
                $.ajax({
                    url : url,
                    data : para,
                    dataType : 'jsonp',
                    jsonp : "callback",
                    success : function(rs) {
                        feedbackPleased.show().css({ left :169 }).stop().animate({ opacity : 1},200);
                        setTimeout(function(){
                            feedbackPleased.stop().animate({ opacity : 0},200).hide();
                        },1500);
                    }
                });



                feedbackPleased.show().css({ left :169 }).stop().animate({ opacity : 1},200);
                setTimeout(function(){
                    feedbackPleased.stop().animate({ opacity : 0},200).hide();
                },1500);
            }else if($(this).hasClass('displeased')){
                feedbackDispleased.show().css({ left :108}).stop().animate({ opacity : 1},200);
            }
        });

        $('#cell_feedback  .certain').click(function(){
            var contact=$("#cell_feedback .feedback_displeased #feedbackContact").val();
            if(contact=="邮箱地址/手机号码/QQ号码"){
                contact="";
            }
            var currPage=$("#cell_feedback").attr("currPage");
            var currContent = $("#cell_feedback .feedback_displeased textarea").val();
            var currUrl=window.location.href;
            if($(this).hasClass('certain')){
                var reg = /['|$|&|"]/;
                if(currContent.trim().length==0){
                    alert('请输入对本搜索结果的建议');
                }else if(reg.test(currContent)){
                    alert('请不要输入非法字符');
                    $("#cell_feedback .feedback_displeased textarea").focus();
                }else if(currContent.length>1000){
                    alert('吐槽内容请不要超过1000个字符');
                }else if(contact.length>100){
                    alert('联系方式请不要超过100个字符');
                }else{
                    var optionStr = "0";
                    var options = feedbackDispleased.find(".checkbox[class*=checked]");
                    if(options && options.length>0) {
                        optionStr = options.attr("id");
                    }

                    var url = jsSearchFedUtil.getSearchUrlPrefix() + "/userfeedback.do";
                    var feedbackContent = $("#cell_feedback .feedback_displeased textarea").val().trim();
                    var para = {'feedbackContent':feedbackContent,'currUrl':currUrl,'contact':contact,'currPage':currPage,'pleased':2,'options':optionStr,'currCategoryId':_expectCategoryId};

                    $.ajax({
                        url : url,
                        data : para,
                        dataType : 'jsonp',
                        jsonp : "callback",
                        success : function(rs) {
                            feedbackDispleased.stop().animate({ opacity : 0},200).hide();
                            feedbackPleased.show().css({ left :234 }).stop().animate({ opacity : 1},200);
                            setTimeout(function(){
                                feedbackPleased.stop().animate({ opacity : 0},200).hide();
                            },1500);
                        }
                    });
                }
            }
        });

        $('#cell_feedback  .cancel , #cell_feedback .close').click(function(){
            feedbackDispleased.stop().animate({ opacity : 0},200).hide();

        });

        $("#cell_feedback .feedback_displeased #feedbackContact").focus(function(){
            var contact=$(this).val();
            if(contact=="邮箱地址/手机号码/QQ号码"){
                $(this).val("");
                $(this).css('color','#000');
            }else if(contact!="邮箱地址/手机号码/QQ号码"){
                $(this).css('color','#000');
            }
        });

        $("#cell_feedback .feedback_displeased #feedbackContact").blur(function(){
            var contact=$(this).val();
            if(contact==""){
                $(this).val("邮箱地址/手机号码/QQ号码");
                $(this).css('color','#ccc');
            }
        });

        feedbackDispleased.find(".checkbox").click(function(){
            var $this = $(this);
            var isChecked = $this.hasClass("checked");
            feedbackDispleased.find(".checkbox").removeClass("checked");
            if(isChecked) {
                $this.removeClass("checked");
            } else {
                $this.addClass("checked");
            }
        });


    },

    main : function(){
        this.cellFeedback();    //意见反馈
    }
};

////## 搜索页SmartPixel脚本
//var google_conversion_id = 1025835260;
//var google_conversion_label = "PJg_CKCEtwMQ_IGU6QM";
//var google_custom_params;
//var google_remarketing_only = true;
///**
// * 将搜索结果中的商品类目传到Google服务器，为再营销提供数据
// * @param pcat 商品类目名称，多个名称用半角的逗号","隔开，如："进口食品","服装","家用电器"
// * 调用示例：initSmartPixel('\"进口食品\",\"服装\"');
// */
//function initSmartPixel(pcat){
//	var customer_params = '{"ptype":"search","pcat":[' + pcat + ']}';
//	google_custom_params = jQuery.parseJSON(customer_params);
//	document.write = function(text) {
//		$(document.body).append(text);
//	};
//	$.getScript("//www.googleadservices.com/pagead/conversion.js");
//}

/**
 * 加载SmartPixel相关
 * 业务流程：1.页面判断：搜索页，类目页，品牌搜索页；
 *          2. 类目信息：搜索页使用相关类目（可借鉴常用分类），类目页为当前选中类目，品牌搜索页？？
 *          3. 拼接类目名称，注意格式
 *          4. 在整个搜索pool加载函数中调用中调用
 */
/**function loadSmartPixel() {
	var pcat = '';

	if(sp_keyword=='') { // 类目页(sp_keyword在table.ftl中获取)

		pcat = '\"' + cateName + '\"';
	} else { // 搜索页

		pcat = sp_pcat; // sp_pcat在table.ftl中获取
	}
	if(pcat != '')
		initSmartPixel(pcat);
}*/

/**
 * 收藏店铺
 * @returns
 */
function collectFavoriteShop(){
    $("#mod_search_collect").live('click',function(e){
        var e = jQuery.cookie("yihaodian_uid");
        var a = jQuery.cookie("uname");
        var merchantId = $(this).attr("merchantId");
        var _this = $(this);
        gotracker('2','search_collect_shop',merchantId);
        if (e != null && e != "" && a != null && a != "") {
            var url = URLPrefix.shop
                + "/interface/collect_shop.action?endUserId=" + e
                + "&endUsername=" + encodeURIComponent(encodeURIComponent(a))
                + "&merchantId=" + merchantId + "&jsonpCallback=?";
            $.getJSON(url, function(data) {
                if (data) {
                    var result = data.result;
                    if (result == 0) {
//						alert("收藏店铺成功!");
                        _this.removeClass("defult").addClass("yet");
                        _this.removeAttr("href");
                        _this.html("<span>已收藏</span>");
                    } else {
                        if (result == 1) {
                            yhdPublicLogin.showLoginDiv();
                            collectFavoriteShop();
                        } else {
                            if (result == 2) {
//								alert("您已经收藏过店铺!");
                                _this.removeClass("defult").addClass("yet");
                                _this.removeAttr("href");
                                _this.html("<span>已收藏</span>");
                            } else {
                                if (result == 3) {
                                    alert("当前用户不存在!");
                                } else {
                                    alert("收藏失败，请再试一次!");
                                }
                            }
                        }
                    }
                } else {
                    alert("收藏失败，请再试一次!");
                }
            });
        } else {
            yhdPublicLogin.showLoginDiv();
            collectFavoriteShop();
        }
    });

}

function inArray(str1, str2){
    var arrObj = str1.split(",");
    for(var i=0;i<arrObj.length;i++){
        if(arrObj[i] == str2){
            return true;
        }
    }
    return false;
}

//修改购买数量
function modifyBuyNum(obj, num){
    var $num;
    var $this;
    var shoppingCountDiv =$(obj).parents(".shopping_num").siblings(".shopping_act").find("a");
    var shoppingCount = 1;
    var userPriceLimitNumber=1;
    if(typeof(shoppingCountDiv)!="undefined") {
        shoppingCount = $(shoppingCountDiv).attr("shoppingcount");
    }
    if(typeof(shoppingCountDiv)!="undefined") {
        userPriceLimitNumber = $(shoppingCountDiv).attr("userPriceLimitNumber");
    }
    $this = $(obj).parents(".shopping_num").find("input");
    if(num==-1 && shoppingCount==$this.val()) {
        $this.val(shoppingCount);
        $(obj).parents(".item_act").append("<div class=\"promote_tips\" style=\"display:block;\">"
            +"<p class=\"tips_wrong\" style=\"display:block;\"><i class=\"iconSearch\">&#xe602;</i>本商品"
            +shoppingCount+"件起卖</p><u></u></div>");

        var hideMsgAuto;
        clearTimeout(hideMsgAuto);
        hideMsgAuto = false;
        hideMsgAuto = setTimeout(function(){
            $(".promote_tips").remove();
            hideMsgAuto = false;
        },3000);
        return;
    }

    if(num==1 && userPriceLimitNumber>0 && $this.val()==userPriceLimitNumber) {
        $this.val(userPriceLimitNumber);
        $(obj).parents(".item_act").append("<div class=\"promote_tips\" style=\"display:block;\">"
            +"<p class=\"tips_wrong\" style=\"display:block;\"><i class=\"iconSearch\">&#xe602;</i>本商品限购"
            +userPriceLimitNumber+"件</p><u></u></div>");

        var hideMsgAuto;
        clearTimeout(hideMsgAuto);
        hideMsgAuto = false;
        hideMsgAuto = setTimeout(function(){
            $(".promote_tips").remove();
            hideMsgAuto = false;
        },3000);
        return;
    }

    if(num == -1){
        $this = $(obj).parents(".shopping_num").find("input");
        $num = parseInt($this.val()) || 1;
        if($num == 1){
            return;
        }else{
            if($num == 2){
                $(obj).attr("class", "decrease dis_decrease");
            }else{
                $(obj).prev().attr("class", "add");
            }
            $this.val($num + num);
        }
    } else {
        $this = $(obj).parents(".shopping_num").find("input");
        $num = parseInt($this.val()) || 1;
        if($num == 99){
            return;
        }else{
            if($num == 98){
                $(obj).attr("class", "add dis_add");
            }else{
                $(obj).next().attr("class","decrease");
            }
            $this.val($num + num);
        }
    }
}

//验证输入的购买数量
function checkBuyNum(obj, key){
    var $this = $(obj);
    if(key != 8 && key != 46){
        var currVal = $this.val();
        var shoppingCountDiv =$this.parent().siblings(".shopping_act").find("a");
        var shoppingCount = 1;
        var userPriceLimitNumber=1;
        if(typeof(shoppingCountDiv)!="undefined") {
            shoppingCount = $(shoppingCountDiv).attr("shoppingcount");
        }
        if(typeof(shoppingCountDiv)!="undefined") {
            userPriceLimitNumber = $(shoppingCountDiv).attr("userPriceLimitNumber");
        }
        var msg = "";
        if(currVal<shoppingCount) {
            $this.val(shoppingCount);
            msg = "本商品"+shoppingCount+"件起卖";
        }else if(userPriceLimitNumber>0 && currVal>userPriceLimitNumber){
            $this.val(userPriceLimitNumber);
            msg = "本商品限购"+userPriceLimitNumber+"件";
        }else if(!/^(([1-9])|([1-9][0-9]))$/.test(currVal)){ // 只能输入1-100的整数
            $this.val(shoppingCount);
            msg = "请输入1-99的整数";
        }
        if(msg.length>0) {
            $this.parents(".item_act").append("<div class=\"promote_tips\" style=\"display:block;\">"
                +"<p class=\"tips_wrong\" style=\"display:block;\"><i class=\"iconSearch\">&#xe602;</i>"+msg+"</p><u></u></div>");

            var hideMsgAuto;
            clearTimeout(hideMsgAuto);
            hideMsgAuto = false;
            hideMsgAuto = setTimeout(function(){
                $(".promote_tips").remove();
                hideMsgAuto = false;
            },3000);
            return;
        }
        var $this_obj = $this.next().find("a");
        if($this.val() == 1){
            $this_obj.attr("class","add");
            $this_obj.next().attr("class", "decrease dis_decrease");
        }else if($this.val() == 99){
            $this_obj.attr("class","dis_add");
            $this_obj.next().attr("class", "decrease");
        }else{
            $this_obj.attr("class","add");
            $this_obj.next().attr("class", "decrease");
        }
    }else{
        $this_obj.attr("class","add");
        $this_obj.next().attr("class", "decrease dis_decrease");
    }
}

/**
 * 根据产品id以及区域地址调接口获取价格以及库存
 * resultType 0-只要价格 1-只要库存 2-都需要
 * @param productId
 * @returns
 */
function refreshProductPriceForSerial(productId, oId, subObj) {
    var price = subObj.attr("yhdPrice");
    var stock = 0;
    var search_address_info = jQuery.cookie("yhd_location");//detail_yhdareas
    if("undefined"==typeof search_address_info || search_address_info =="") return null;
    if (productId == null || productId == 0) return null;
//	detailYhdareas="1,0,0,0";
    if (price != null && price > 0) {
        var productPrice = $("#price0_" + oId);
        $(productPrice).html( "<b>¥</b>" + price);
        $(productPrice).attr("yhdPrice",price);
        return;
    }

    var tempUrl = jsSearchFedUtil.getSearchUrlPrefix() + "/getPriceAandStock/pid" + productId;
    var param = "detailYhdareas=" + search_address_info + "&resultType=0";
    // 跨域请求
//	var date1 = new Date().getTime();
//	console.log("similar from ajax start: " + date1);
    $.ajax({
        url : tempUrl,
        dataType : 'jsonp',
        jsonp : "callback",
        data : param,
        success : function(data) {
//			var date2 = new Date().getTime();
//    		console.log("similar from ajax end : " + date2);
//    		alert("price and stock: " + data.facadePrice + "--" + data.stockStatus);
            if (data.facadePrice != null && data.facadePrice > 0) {
                var productPrice = $("#price0_" + oId);
                $(productPrice).html( "<b>¥</b>" + data.facadePrice);
                $(productPrice).attr("yhdPrice",data.facadePrice);
                $(subObj).attr("yhdPrice",data.facadePrice);
            }
        }
    });


}

function refreshProductPriceAndStockForCombine(productId, oId, a_this) {
    var price = a_this.attr("yhdPrice");
    var stock = a_this.attr("stockNum");
    var search_address_info = jQuery.cookie("yhd_location");//detail_yhdareas
    if("undefined"==typeof search_address_info || search_address_info =="") return null;
    if (productId == null || productId == 0) return null;
//	detailYhdareas="1,0,0,0";
    if (price > 0) {
        refreshDetail(price, stock, oId);
        return;
    }
    var tempUrl = jsSearchFedUtil.getSearchUrlPrefix() + "/getPriceAandStock/pid" + productId;
    var param = "detailYhdareas=" + search_address_info + "&resultType=2";
    // 跨域请求
//	var date1 = new Date().getTime();
//	console.log("similar from ajax start: " + date1);
    $.ajax({
        url : tempUrl,
        dataType : 'jsonp',
        jsonp : "callback",
        data : param,
        success : function(data) {
            /**/
//    		alert("price and stock: " + data.facadePrice + "--" + data.stockStatus);
            refreshDetail(data.facadePrice, data.stockStatus, oId);
            a_this.attr("yhdPrice",data.facadePrice);
            a_this.attr("stockNum",data.stockStatus);
        }
    });
}

function refreshDetail(price, stock, oId){
    if (price != null && price > 0) {
        var productPrice = $("#price0_" + oId);
        $(productPrice).html( "<b>¥</b>" + price);
        $(productPrice).attr("yhdPrice",price);
    }
    /**if (stock == null || stock == 0) {
		var buyButtonA = $('#buyButton_' + oId);
//		buyButtonA.innerHTML = "已售完";
		$(buyButtonA).html("已售完");
		$(buyButtonA).attr("class","notice_btn");
	}else{
		var buyButtonA = $('#buyButton_' + oId);
//		buyButtonA.innerHTML = "加入购物车";
		$(buyButtonA).html("加入购物车");
		$(buyButtonA).attr("class", "buy_btn");
	}*/
}

function lazyLoadAd() {
//	setTimeout(function() {
//		shop_LazyLoad_AdHtmlData(0,1);
//     },2000);

    $(window).scroll(function(){
        var load=$("#hotProductsWrap").attr("load");
        var curProdNum=$("#itemSearchList .mod_search_pro").size();
        //判断是否需要加载，搜索商品懒加载完成后，才加载
        if (!($("#hotProductsWrap").is(":visible"))
            && ("undefined" == typeof (load))
            && ((productCount > curProdNum && curProdNum > searchPageSize) || productCount == curProdNum)) {
            var scrollTop = $(window).scrollTop();
            var turnPageTop=$(".mod_turn_page").position().top;
            if (scrollTop+$(window).height()>turnPageTop){
                shop_LazyLoad_AdHtmlData(0,1);
            }
        }
    });

}
/**
 * 融合项目暂时注释调
 * @param currentPage
 * @param toPage
 * @returns
 */
function new_LazyLoad_AdHtmlData(currentPage,toPage){
//	setTimeout(function() {
//		shop_LazyLoad_AdHtmlData(currentPage,toPage);
//     },2000);
    /*$("#hotProductsWrap").hide();//翻页时，先隐藏热卖推荐
     $("#hotProductsWrap").attr("load","1");//翻页先去掉load属性
     $("#hotProductsWrap").attr("currentPage",currentPage);//翻页先去掉load属性
     $("#hotProductsWrap").attr("toPage",toPage);//翻页先去掉load属性
     $(window).scroll(function(){
     var load=$("#hotProductsWrap").attr("load");
     var curProdNum=$("#itemSearchList .mod_search_pro").size();//当前页面商品个数
     //判断是否已加载，搜索商品懒加载完成后，才加载
     if (!($("#hotProductsWrap").is(":visible"))
     && ("undefined" == typeof (load) || load != "2")
     && ((productCount > curProdNum && curProdNum > searchPageSize) || productCount == curProdNum)) {
     var scrollTop = $(window).scrollTop();
     var turnPageTop=$(".mod_turn_page").position().top;
     if (scrollTop+$(window).height()>turnPageTop ){
     var curPage=$("#hotProductsWrap").attr("currentPage");
     var curToPage=$("#hotProductsWrap").attr("toPage");
     shop_LazyLoad_AdHtmlData(curPage,curToPage);
     }
     }
     });*/

}
//加载左侧及底部的热卖商品区--标签和评价直接使用 返回广告实体的接口的  字段
function shop_LazyLoad_AdHtmlData(currentPage,toPage){
    if(currentPage==0&&toPage==1){//第一页请求
        $("#hotProductsWrap").attr("load","1");
    }else{//翻页请求
        $("#hotProductsWrap").attr("load","2");
    }

    //是否是翻页操作来源
    var isPageChange = false;
    var ad_currentPageno =  $("#ad_currentPageno").val();
    if (currentPage !=0 && ad_currentPageno != currentPage ) {
        isPageChange = true;
    }
    //控制左边热卖商品是否展示，true表示展示，false表示不展示（只有底部热卖商品）
    var advnormal = false;
    //搜索页面存在懒加载标准(左侧商品个数：无懒加载展示8个，有懒加载展示16个)
    var pageLazyLoad = false;
    var searchWord = jQuery('#searchword').val();
    var categoryId = jQuery('#categoryIdForAdv').val();
    var categoryNameHotAd = jQuery('#search_selected_category').attr("title");
    var brandNameHotAd = jQuery('#choosed_brand_names').val();
    var attrNameHotAd = jQuery('#choosed_attr_names').val();
    var matchCategoryId = jQuery('#matchCategoryIdForAdv').val();
    if(categoryId == 0 || categoryId == "" || categoryId=='undefined' || !matchCategoryId)
        return;
    if((msiteCategoryIds!='undefined' && msiteCategoryIds != '')
        || (navCategoryIds != 'undefined' && navCategoryIds != '')){
        var showRelevantCatName =jQuery('#search_related_category_name').val();
        if(showRelevantCatName!=null && showRelevantCatName != ""
            && showRelevantCatName != "undefined" && showRelevantCatName.length>1){
            categoryNameHotAd = showRelevantCatName.substring(1);
        }
    }
    if(categoryNameHotAd=='undefined'){
        categoryNameHotAd = '';
    }
    if(brandNameHotAd=='undefined'){
        brandNameHotAd ='';
    }
    if(attrNameHotAd=='undefined'){
        attrNameHotAd = '';
    }
    //宽屏和窄屏对底部热卖商品数量有响应，宽屏5个，窄屏4个
    var screenType = isWidescreen;
    if(isWidescreen !=1){
        screenType = 2;
    }
    var provinceId = jQuery.cookie("provinceId");
    var adspaceCode = "SEARCH_YDT_ADLIST_DEFAULT" ;

    var isYhd=0;
    if(selectedFilter.indexOf("6")!=-1){
        isYhd=1;    //将一号店自营筛选条件传给广告接口，使推荐更准确
    }

    //翻页时需要传此参数，便于广告索引翻页
    var nextBlockStartIndex = $("#ad_nextblockStartIndex").val();
    var nextAdBlockStartIndex = $("#nextAdBlockStartIndex").val();
    var curAdBlockStartIndex = $("#curAdBlockStartIndex").val();
    if(nextAdBlockStartIndex !=null && nextAdBlockStartIndex!='undefined' && nextAdBlockStartIndex >0){
        if(curAdBlockStartIndex != null && curAdBlockStartIndex != 'undefined' && curAdBlockStartIndex != nextAdBlockStartIndex){
            isPageChange = true;
            nextBlockStartIndex = nextAdBlockStartIndex;
        }
    }
    var url = URLPrefix.advertise+"/external/showBiddingAdNoHtml?";
    url += "mcSiteId="+currSiteId + "&provinceId=" + provinceId
        +"&adspaceCode=" + adspaceCode +"&currentPage=" + currentPage + "&toPage=" + toPage
        +"&screenType=" + screenType + "&pageSize=6"+"&isYhd="+isYhd+"&cityId="+jQuery.cookie("cityId");
    if(matchCategoryId > 0) {
        url += "&searchKeyMatchCatId=" + matchCategoryId ;
    } else {
        url += "&categoryId=" + categoryId;
    }
    url += "&normal="+advnormal+"&pageLazyLoad="+pageLazyLoad;
    if(isPageChange && nextBlockStartIndex!='undefined' && nextBlockStartIndex!=null && nextBlockStartIndex!="") url += "&nextBlockStartIndex=" + nextBlockStartIndex;
    if(searchWord!=null && searchWord!="") url += "&searchKey=" + searchWord;
    if(categoryNameHotAd !=null && categoryNameHotAd !=''){
        url += "&cateName="+categoryNameHotAd;
    }
    if(brandNameHotAd != null && brandNameHotAd != ''){
        url += "&brandName="+brandNameHotAd;
    }
    if(attrNameHotAd != null && attrNameHotAd !=''){
        url += "&attrName="+attrNameHotAd;
    }
    $.getJSON(url+"&callback=?", function(data) {
        if(data.status==1){
            var bottomdiv="";
            if(currSiteId==1){
                bottomdiv = "hotProductsWrap";
            }
            if($("#" + bottomdiv).length>0){
                $("#" + bottomdiv).html("");
            }
            var rs = data.response;
            var totalNum = rs.length;
            var bottomNum = 6;
            if(totalNum>0) {
                var bottomResult = "", trackerRefs = "", productIds = "", bottomCount = 0;
                bottomResult += "<h2 class=\"t\">热卖推荐</h2><div class=\"m clearfix\"><div class=\"iWrap clearfix\">";

                for (var i=0; i<totalNum; i++) {
                    if (i == 0) {
                        $("#ad_nextblockStartIndex").val(rs[i].nextBlockStartIndex);
                    }
                    // 过滤广告推送的商品
                    if(currentPage ==0
                        && typeof(advProducts) != "undefined"
                        && inArray(advProducts,rs[i].productId)){
                        continue;
                    }
                    var adTag = "";
                    var adTagColor="color_red";
                    var productFeatures=rs[i].productFeatures;
                    if ((productFeatures&1)==1) {
                        adTag = "[新品]";
                    }else if ( ((productFeatures&2)>>1)==1) {
                        adTag = "[热卖]";
                    }else if ( ((productFeatures&4)>>2)==1) {
                        adTag = "[团购]";
                    }else if (((productFeatures&8)>>3)==1) {
                        adTag = "[包邮]";
                        adTagColor="free";
                    }
                    var commentCount="";
                    var commentCountNum="";
                    if(rs[i].commentCount>0){
                        comment="<i></i>";
                        commentCountNum=rs[i].commentCount;
                        commentCount=rs[i].commentCount;
                    }
                    var adTitle = rs[i].text;
                    if (adTitle == null || adTitle == '') {
                        adTitle = rs[i].productName;
                    }
                    if (bottomCount < bottomNum){
                        if(rs[i].biddingAdType==2){                    //biddingAdType 除了2都是商家,即2为1号店，0,1为商家，与inshop逻辑保持一致
                            bottomResult += "<div class=\"mod_search_pro\" style=\"z-index: 0;\" id=ad_"+rs[i].pmInfoId+" inshop=\"0\">";
                        }else{
                            bottomResult += "<div class=\"mod_search_pro\" style=\"z-index: 0;\" id=ad_"+rs[i].pmInfoId+" inshop=\"1\">";
                        }

                        var imgUrl = rs[i].commonScreenImgUrl;
                        if(imgUrl.indexOf("_") > 0) {
                            if(isWidescreen == 1) {
                                imgUrl = imgUrl.substring(0,imgUrl.lastIndexOf("_")) + "_220*220.jpg";
                            }else {
                                imgUrl = imgUrl.substring(0,imgUrl.lastIndexOf("_")) + "_180*180.jpg";
                            }
                        }
                        var imgPixelHtml = "width=\"220\" height=\"220\"";
                        if(isWidescreen != 1) {
                            imgPixelHtml = "width=\"180\" height=\"180\"";
                        }
                        bottomResult += "<div class=\"proImg\"><a target=\"_blank\" onclick=\"addTrackPositionToCookie('1','yhd_p4p_ydt17')\" href=\"" + rs[i].landingPage + "\">"
                            + "<img src=\"\" original=\"" + imgUrl + "\" title=\"" + rs[i].imgAdTips + "\" "+imgPixelHtml+"/></a></div>"
                            //+ "<p class=\"storeName\"><s class=\"ico\"></s><a href=\"\"></a></p>";
                            + "<p class=\"proName\"><a target=\"_blank\" onclick=\"addTrackPositionToCookie('1','yhd_p4p_ydt17')\" href=\"" + rs[i].landingPage + "\" title=\"" + rs[i].textAdTips + "\"><span class=\""+adTagColor+"\">"+adTag+"</span>"+adTitle+"</a></p>"
                            + "<p class=\"proPrice\"><span class=\"comment\"><i class=\"iconSearch\">&#xe614;</i><a id=\"cmt_" + rs[i].productId + "\"  cmct=\""+commentCountNum+"\"   onclick=\"addTrackPositionToCookie('1','yhd_p4p_ydt17')\" target=\"_blank\" href=\"" + rs[i].landingPage + "\">"
                            + commentCount+"</a></span><em class=\"num\"><b>&yen;</b>"+rs[i].discountPrice+"</em></p></div>";

                        bottomCount ++;
                    }
                    //只有竞价广告才需要曝光
                    if (rs[i].landingPage && rs[i].landingPage.indexOf("tracker.yhd.com") >= 0) {
                        trackerRefs += "," + rs[i].ref.substr(3);
                    }
                    productIds += "," + rs[i].productId;
                }
                bottomResult += "</div></div>";

                if (isPageChange) {
                    $("#ad_currentPageno").val(currentPage);
                }
                if (bottomCount == bottomNum) {
                    $("#" + bottomdiv).html(bottomResult);
                    $("#" + bottomdiv).show();
                }else{
                    $("#" + bottomdiv).hide();
                }
                //竞价广告曝光信息
                if (trackerRefs != "") {
                    trackerRefs = trackerRefs.substr(1);
                    // recordTrackInfoWithType(1, trackerRefs,"ad.dolphin.bidding");
                }

                var hotProductLazyLoadImageObj = new Array();
                // 图片延迟加载
                $(".iWrap div").each(function() {
                    var loadImgObjVal = new Object();
                    loadImgObjVal.id = $(this);
                    loadImgObjVal.top = $(this).offset().top;
                    hotProductLazyLoadImageObj.push(loadImgObjVal);
                });

                // 手动懒加载图片
                jQuery.YHD.imgLoad.loadImg(hotProductLazyLoadImageObj);
                jQuery.YHD.imgLoad.scrollLoadImg();
            }

        }
    });

}

//底部广告
function ajaxTopAdvertise() {
    setTimeout(function() {
        ajaxImageAdvertises("SEARCH_SCATTERED_TOP_DEFAULT");
    },2000);
}

//左边及底部的图片广告
function ajaxImageAdvertises(locationKeys) {
    if (showAdvertise != null && showAdvertise == 0) {
        var preUrl = jsSearchFedUtil.getSearchUrlPrefix();
        var categoryId = jQuery('#categoryIdForAdv').val();
        var matchCategoryId = jQuery('#matchCategoryIdForAdv').val();
        var url = preUrl + "/imageAdvertises.do?locationKeys=" + locationKeys
            + "&isWidescreen=" + isWidescreen;
        if(matchCategoryId > 0) {
            url += "&prodCategoryId=" + matchCategoryId ;
        } else {
            url += "&prodCategoryId=" + categoryId;
        }
        url+="&callback=?";
        jQuery.getJSON(url, function(data) {
            if (data && data.value) {
                alert("ERROR = " + data.ERROR);
            } else {
                loadCompleteImageAdvertises(data);
            }
        });
    }
}

function loadCompleteImageAdvertises(data) {
    for ( var adKey in data) {
        var divAd;
        if (adKey == "SEARCH_SCATTERED_TOP_DEFAULT") {
            divAd = $('#divAd_' + adKey);
            divAd.html(data[adKey]);
            if (divAd.html()!="") {
                divAd.show();
            }
        }
    }
}

//左侧增加店铺、活动类型CPC广告
function getPageCpcAd(currentPage,toPage) {
}

/**
 * 顶部热卖商品推荐栏位
 */
function getTopHotAdvertise() {
    var locationKeys = "SEARCH_SCATTERED_TOPPRODUCT";
    if(typeof(topHotRecommand)!="undefined" && topHotRecommand=="true"){
        var preUrl = jsSearchFedUtil.getSearchUrlPrefix();
        var categoryId = jQuery('#categoryIdForAdv').val();
        var matchCategoryId = jQuery('#matchCategoryIdForAdv').val();
        var url = preUrl + "/imageAdvertises.do?locationKeys=" + locationKeys
            + "&isWidescreen=" + isWidescreen;
        if(matchCategoryId > 0) {
            url += "&prodCategoryId=" + matchCategoryId ;
        } else {
            url += "&prodCategoryId=" + categoryId;
        }
        if (categoryId == 0 && matchCategoryId == 0) return;
        url+="&callback=?";
        jQuery.getJSON(url, function(data) {
            if (data && data.value) {
                alert("ERROR = " + data.ERROR);
            } else {
                loadCompleteTopHotAdvertises(data);
            }
        });
    }

}

function loadCompleteTopHotAdvertises(data) {
    for ( var adKey in data) {
//		 alert(adKey +'='+ data[adKey]);
        var divAd = $('#divAd_' + adKey);
        divAd.html(data[adKey]);
        if (divAd.html()!="") {
            divAd.show();
        }
        //刷新价格
        var productIds = $(".cehot-w").attr("productIds");
        if (productIds && productIds != '') {
            var strReg=/\,/g;
            productIds = productIds.replace(strReg,"&productIds=");
            var param="?mcsite="+currSiteId + "&provinceId=" + jQuery.cookie("provinceId") + productIds;
            if((typeof(secondAreaFlag)!="undefined" && secondAreaFlag==1)){
                param+="&cityId="+jQuery.cookie("cityId");
                var detailAdd=jQuery.cookie("detail_yhdareas");
                if(detailAdd!=null && "undefined"!=detailAdd){
                    var detailAddArr=detailAdd.split('_');
                    if(detailAddArr.length>=3){
                        param+="&countyId="+detailAddArr[2];
                    }
                }
            }
            var url= "//gps.yhd.com/busystock/restful/truestock";
            jQuery.getJSON(url+param+"&callback=?",function(data){
                if(data && data.length > 0){
                    var len=data.length;
                    for (var i = 0; i < len; i++) {
                        var product = data[i];
                        if (product == null) return false; //不可见商品
                        if (product.productId == null) return false; //不可见商品
                        if (product.productStock == -1) return false; //未知
                        if (product.defaultMerchantId == -1) return false; //未知
                        if (product.productPrice == -1) return false; //未知
                        var productId = product.productId;
                        var pmInfoId = product.pmId;
                        var priceSpan = $("#hotproduct_"+productId)[0];
                        //价格刷新
                        if(product.productPrice > 0){
                            var strPrice = product.productPrice.toFixed(2);
                            priceSpan.innerHTML = "¥" + strPrice;
                        }
                    }
                }
            });
        }
    }
}
var brandCount = 0;
var jsSearchAttributeFed = {
    ie6: !$.support.leadingWhitespace,

    /* *
     *
     * 导购属性
     *
     * */
    addHover : function(){
        var _obj = $(".search_guide .sub_property");
        _obj.each(function(){
            var a_this = $(this);
            if(!$(a_this).hasClass("none")){
                $(a_this).parents('.guide_box').addClass("guideChandi");
            }
        });

        //多选状态下的选择
        $(".mod_search_guide .search_guide").delegate('.select_guide .guide_con li' , 'click' , function(){
            if($(this).hasClass("cur")){
                $(this).removeClass("cur");
            }else{
                $(this).addClass("cur");
            }

            var confirmBtn = $(this).parent().siblings(".moultiple_con_btn").find(".confirm");
            if($(this).parent().find(".cur").length > 0){
                if(confirmBtn.hasClass("dis_confirm")){
                    confirmBtn.removeClass("dis_confirm");
                }
            }else{
                if(!confirmBtn.hasClass("dis_confirm")){
                    confirmBtn.addClass("dis_confirm");
                }
            }
        });

        //根据宽度判断显示更多按钮
        var searchGuide = $('.mod_search_guide .search_guide'),
            ac = searchGuide.find('.guide_main .guide_con');
        ac.each(function(){
            if($(this).find(".cur").length == 0){
                var f = $(this).outerHeight(true),
                    s = $(this).parents('.guide_main').siblings('.multiple_choice'),
                    comTagBox=$(this).parents('.guide_multiple'),
                    brandBox=$(this).parents('.brand_guide_box');//夹在属性中的品牌
                if(comTagBox!=null && comTagBox.size()==1){ //当前属性为评论标签，则默认显示两行
                    if(f>34){//评论标签行数大于1，则默认显示两行的高度
                        comTagBox.height(60);
                    }
                    //评论标签行数大于2，则显示更多按钮
                    f > 60 ? s.find('.more_open').show() : null;
                }else if(brandBox==null || brandBox.size()==0){//夹在属性中的品牌,不根据宽度显示更多
                    f > 34 ? s.find('.more_open').show() : null;
                }
            }else{
                $(this).parents('.guide_box').height('auto');
                $(this).parents('.guide_box').find('.guide_main').height('auto');
            }
        });

        if(typeof(isSearchKeyWords)!="undefined" && isSearchKeyWords == 0) {
            //类目页类目自动显示三行
            var catGuide = $('.mod_search_guide .classWrap');
            cat = catGuide.find('.guide_main .guide_con li').length;
            var isOpen = catGuide.attr("isOpen");
            var columnNum = 8;
            if(isWidescreen != 1){
                columnNum = 6;
            }
            //如果显示一行，则用css默认高度，如果是两行，三行，则设置自动高度，如果大于三行，则显示三行的高度
            if (isOpen && isOpen == "1") {
                if(columnNum<cat && cat<=(columnNum*3)) {
                    catGuide.find('.guide_box').height('auto');
                    catGuide.find('.guide_box').find('.guide_main').height('auto');
                    catGuide.find('.multiple_choice').find('.more_open').hide();
                }else if(cat>(columnNum*3)) {
                    catGuide.find('.guide_box').height(86);
                    catGuide.find('.guide_box').find('.guide_main').height(86);
                }else{
                    catGuide.find('.multiple_choice').find('.more_open').hide();
                }
            }
        }else if(typeof(isSearchKeyWords)!="undefined" && isSearchKeyWords == 1){
            //相关分类，根据高度控制更多按钮展示或隐藏，大于34则超过1行
            var revecategories=$("#group_attr .classWrap .guide_con");
            var f = revecategories.outerHeight(true);
            if (f<=34){
                revecategories.parents('.guide_main').siblings('.multiple_choice').find('.more_open').hide();
            }
        }

        //属性更多选项浮层
        var selectProperty = $(".mod_search_guide .select_property");
        if (selectProperty.length > 0) {
            var cr = screen.width - (selectProperty.offset().left + selectProperty.width());
            selectProperty.find('.m_b').mouseenter(function(){
                var lazy_attribute = $(this).attr("lazy_attribute");
                if(lazy_attribute && lazy_attribute != "1"){
                    jQuery(this).children(".son_m").lazyDom({
                        load:false,
                        flushPrice:false,
                        indexLoad:true,
                        scrollLoad:false
                    });
                    $(this).attr("lazy_attribute","1");
                }

                $(this).addClass("cur");
                var w = $(this).find('.son_m').offset().left + $(this).find('.son_m').outerWidth(true),
                    r = screen.width - w;
                r < cr ? $(this).find('.son_m').css('left',r - cr) : null;
            });
            selectProperty.find('.m_b').mouseleave(function(){
                $(this).removeClass("cur");
                $(this).find('.son_m').css('left','-1px');
            });

            selectProperty.delegate('.selected .s_b' , 'click' , function(){
                $(this).hasClass("cur")?$(this).removeClass("cur"):$(this).addClass("cur");

                var confirmBtn = $(this).parent().siblings(".moultiple_con_btn").find(".confirm");
                if($(this).parent().find(".cur").length > 0){
                    if(confirmBtn.hasClass("dis_confirm")){
                        confirmBtn.removeClass("dis_confirm");
                    }
                }else{
                    if(!confirmBtn.hasClass("dis_confirm")){
                        confirmBtn.addClass("dis_confirm");
                    }
                }
            });
        }

        //更多类底边距
        var mc = $('.mod_search_guide .more_btn');
        function mcT(){
            mc.parents('.mod_search_guide').css('margin-bottom','35px');
        };
        mc.length == 1 ? mcT() : null;
        //收起
        $('.guide_more_close').bind('click',function(){
            var _this = $(this);
            _this.parents('.guide_con').removeClass('show_all');
            _this.parent().siblings(".guide_switch").hide();
            _this.parent().siblings(".guide_btn").hide();
            var q = _this.parent().siblings('.guide_lists');
            var s = q.find(".guide_ul");
            q.removeClass("open");
            s.attr("data-multy","no");
            if(_this.parent().siblings(".guide_selected").is(":visible")){
                _this.parent().siblings(".guide_selected").hide();
            }
        });
        // ################  新品牌筛选 ############################
        $(".guide_more_open,.guide_more_choice").bind("click",function(){
            var currObj = this;
            var $this = $(currObj);
            if (brandCount == 1) {
                guideMoreChoice($this);
                return;
            }
            //多选区域一次性加载出来 无须再次请求加载
            if (isBrandOnlyReqNeed && isBrandOnlyReqNeed == 1) {
                guideMoreChoice($this);
                initSelectedBrands();
                if($(".brandWrap .guide_ul li.cur").size()>0
                    && $(".btn_ok").hasClass("un")) {
                    $(".btn_ok").removeClass("un");
                }
                brandCount = 1;
                return;
            }

            var url = $this.attr("url");
            // 如果url是相对路径，则通过是否含有keyword补上对应的绝对路径
            var searchUrlPrefix=jsSearchFedUtil.getSearchUrlPrefix();
            if (url.indexOf(searchUrlPrefix) == -1) {
                url = searchUrlPrefix + "/" + url;
            }

            var proData="&type=moreBrand";
            if(requestType == '70' && conditionValue>0){
                proData = proData+"&conditionValue="+conditionValue+"&contentType="+contentType;
            }
            if(requestType == '70' && contentNum>0){
                proData = proData +"&conmentNum="+contentNum;
            }
            if(typeof(isPacksView)!="undefined" && isPacksView == 1) {
                proData = proData +"&isPacksView=" + isPacksView;
            }
            if(requestType == '75' || requestType == '76'){
                proData = proData +"&isCouponPage="+parseInt(requestType) + "&useScope=" + useScope;
            }
            // 跨域请求
            $.ajax({
                url : url,
                data : proData,
                dataType : 'jsonp',
                jsonp : "callback",
                success : function(data) {
                    if (data.ERROR)
                        alert("ERROR = " + data.ERROR);
                    else{
                        if (!data || data.value == null || data.value == '') return;
                        var brandGuideCon = $(".brandWrap .guide_con");
                        if(brandGuideCon.find(".guide_switch").size() > 0) {
                            brandGuideCon.find(".guide_switch").remove();
                        }
                        if(brandGuideCon.find(".guide_lists").size() > 0) {
                            brandGuideCon.find(".guide_lists").remove();
                        }
                        brandGuideCon.prepend(data.value);
                        brandCount = 1;
                        guideMoreChoice(currObj);
                        initSelectedBrands();
                        if($(".brandWrap .guide_ul li.cur").size()>0
                            && $(".btn_ok").hasClass("un")) {
                            $(".btn_ok").removeClass("un");
                        }
                    }
                }
            });
        });
        function initSelectedBrands() {
            var mods = "";
            $(".brandWrap .guide_ul li.cur").each(function(){
                var $this = $(this);
                var s = $this.attr("data-name");
                var i = $this.attr("data-index");
                var brandId = $this.attr("brand-id");
                var mod = '<a data-name="' + s + '" class="sel_item" href="javascript:;" data-to='+ i +' brand-id=' + brandId + '>' + s + '<i></i></a>';
                mods = mods + mod;
            });
            if(mods != '') {
                var tar = $(".brandWrap .guide_lists").siblings(".guide_selected");
                tar.append(mods).show();
                if($(".btn_ok").hasClass("un")) {
                    $(".btn_ok").removeClass("un");
                }
            }
        }
        function guideMoreChoice(obj) {
            var $this = $(obj);
            var tar = $this.parent().siblings(".guide_selected");
            $this.parent().siblings(".guide_switch").show();
            $this.parent().siblings(".guide_btn").show();
            $this.parents('.guide_con').addClass('show_all');
            var q = $this.parent().siblings('.guide_lists');
            var s = q.find(".guide_ul");
            q.addClass("open");
            oSelf(q,s);
            s.attr("data-multy","yes");
            if(tar.find("a").length > 0){
                tar.show();
            }
        }
        function oSetH(op,oc){
            var h = $(oc).outerHeight();
            if(h >= 55){
                $(op).css({
                    "height":107
                })
            }
        }
        oSetH('.guide_lists','.guide_lists .guide_ul');
        var apis = [];
        function oSelf(op,oc){
            var mxH = $(op).attr("max-lH");
            var h = $(oc).outerHeight();
            if(h > mxH){
                $(op).css({
                    "height":213
                })
                apis.push($(op).jScrollPane({"hideFocus":true,"verticalGutter":0,"autoReinitialise":true,"autoReinitialiseDelay": 10}).data().jsp);
            }else{
                $(op).css({
                    "height":h+1
                });
            }
        }

        $(".btn_cancel").bind("click",function(){
            $(".brandWrap .guide_ul li").show();
            if(apis.length > 0){apis[0].scrollToY(0);apis[0].destroy();apis = [];}
            $(this).parent().siblings(".guide_switch").hide();
            $(this).parent().siblings(".guide_choice").show();
            $(this).parent().siblings('.guide_lists').removeClass("open");
            $(this).parent().siblings('.guide_lists').find(".guide_ul").attr("data-multy","no");
            $(this).parent().hide();
            if($(this).parent().siblings(".guide_selected").is(":visible")){
                $(this).parent().siblings(".guide_selected").hide();
            }

//            delAll($(this).parent().siblings(".guide_lists"),$(this).parent().siblings(".guide_selected"));
            oSetH('.guide_lists','.guide_lists .guide_ul');
        });

        $(".brandWrap").delegate(".guide_ul li","click",function(){
            dealSelectedBrand(this);
        });
        function dealSelectedBrand(obj) {
            var $this = $(obj);
            var brandUrl = $this.find("a").attr("href");
            $this.find("a").attr("href", "javascript:;");
            $this.attr("brand-url", brandUrl);
            if (isBrandOnlyReqNeed && isBrandOnlyReqNeed == 1
                && brandCount!=1) {
                window.location = brandUrl;
                return;
            }
            var s = $this.attr("data-name");
            var i = $this.attr("data-index");
            var brandId = $this.attr("brand-id");
            var mod = '<a class="sel_item" href="javascript:;" data-name="' + s + '" data-to='+ i +' brand-id=' + brandId + '>' + s + '<i></i></a>';
            var tar = $this.parents(".guide_lists").siblings(".guide_selected");
            var k = $this.parent().attr("data-multy");
            switch(k){
                case "yes":
                    if($this.hasClass("cur")){
                        $this.removeClass("cur");
                        $("[data-to="+i+"]").remove();
                    }else{
                        $this.addClass("cur");
                        $(mod).appendTo(tar);
                        tar.show();
                        if($(".brandWrap .guide_ul li.cur").size()>0
                            && $(".btn_ok").hasClass("un")) {
                            $(".btn_ok").removeClass("un");
                        }
                    }
                    break;
                case "no":
                    $this.find("a").attr("href", $this.attr("brand-url"));
                    break;
            }
        }
        $(".guide_selected").delegate("i","click",function(){
            var i = $(this).parent().attr("data-to");
            $("[data-index="+i+"]").removeClass("cur");
            $(this).parent().remove();
        });

        function delAll(oli,oa){
            $(oli).find("li").removeClass("cur");
            $(oa).find("a").remove();
        }

        $(".brandWrap").delegate(".guide_switch span","click",function(){
            var $this = $(this);
            $this.addClass("cur").siblings().removeClass("cur");
            var key = $this.attr("id");
            if(key == 'default') {
                $(".brandWrap .guide_ul li").show();
                filterBrands();
            } else {
                $("[data-type="+key+"]").show();
                filterBrands();
                $(".brandWrap .guide_ul li[data-type!="+key+"]").hide();
            }

        });

        $(".brandWrap .guide_btn").delegate(".btn_ok","click",function(){
            var link = $(this).attr("url");
            var manageBrandIdsStr = "";
            var brandsStr = "";
            $(".brandWrap .guide_selected .sel_item").each(function(){
                var manageBrandId = $(this).attr("data-to");
                var brandName = $(this).attr("data-name");
                brandsStr = brandsStr + "," + brandName;
                manageBrandIdsStr = manageBrandIdsStr + "," + manageBrandId;
            });
            brandsStr = brandsStr.substr(1);
            manageBrandIdsStr = manageBrandIdsStr.substr(1);
            // if(requestType == 70 || requestType == 75 || requestType == 76) {
            // 	link = link.replace(/\-b\-/, "-b" + brandsStr + "-" + manageBrandsStr + "-");
            // }else {
            var reg_brandId= /\-b[\d,]*[\-]?[\d,]*\//;
            link = link.replace(reg_brandId, "-b" + manageBrandIdsStr + "/");

            var reg_brandname=/\/mbname[^"]*?\-/;
            link = link.replace(/*/\/mbname[\d,]*[\-]?[\d,]*\//*/ reg_brandname, "/mbname" + brandsStr + "-");
            // }
            loli.spm.refreshPage(link,this);

        });
    },

    /**
     * 品牌多选之后点击确认时
     */
    brandMoreConfirmBind:function () {
        $(".multiple_con").on("click","#brandConfirm",function () {
            if($(this).hasClass("dis_confirm")) return;
            var link = searchCarUrl;
            // var manageBrandsStr = "";
            var brandsStr = "";
            $(".multiple_con .multiple_con_inside li[class='cur']").each(function(){
                var brandName = $(this).attr("title");
                brandsStr = brandsStr + "," + brandName;
            });
            brandsStr = brandsStr.substr(1);
            // manageBrandsStr = manageBrandsStr.substr(1);
            if(requestType == 70 || requestType == 75 || requestType == 76) {
                link = link.replace(/\-mbname\-/, "-mbname" + brandsStr + "-");
            }
            window.location.href=link;
        })
    },
    /**
     * 品牌多选之后点击取消时
     */
    brandMoreCancelBind:function () {
        $(".multiple_con").on("click","#brandCancel",function () {
            $("#moreBrandDiv").toggle();
            $("#moreBrandDiv").prev().toggle();
        })
    },






    /**
     * 点击品牌多选或更多时，异步加载多选区域元素
     */
    brandMoreClick : function(obj){
        $(".brandWrap .guide_box .multiple_choice").hide();
        if (brandCount == 1) {
            brandMoreOption(obj, 2);
            return;
        }
        //多选区域一次性加载出来 无须再次请求加载
        if (isBrandOnlyReqNeed && isBrandOnlyReqNeed == 1) {
            brandMoreOption(obj, 1);
            brandCount = 1;
            return;
        }

        var url = $(obj).attr("url");
        // 如果url是相对路径，则通过是否含有keyword补上对应的绝对路径
        var searchUrlPrefix=jsSearchFedUtil.getSearchUrlPrefix();
        if (url.indexOf(searchUrlPrefix) == -1) {
            url = searchUrlPrefix + "/" + url;
        }

        var proData="&type=moreBrand";
        if(requestType == '70' && conditionValue>0){
            proData = proData+"&conditionValue="+conditionValue+"&contentType="+contentType;
        }
        if(requestType == '70' && contentNum>0){
            proData = proData +"&conmentNum="+contentNum;
        }
        if(typeof(isPacksView)!="undefined" && isPacksView == 1) {
            proData = proData +"&isPacksView=" + isPacksView;
        }
        if(requestType == '75' || requestType == '76'){

            proData = proData +"&isCouponPage="+parseInt(requestType) + "&useScope=" + useScope;
        }
        // 跨域请求
        $.ajax({
            url : url,
            data : proData,
            dataType : 'jsonp',
            jsonp : "callback",
            success : function(data) {
                if (data.ERROR)
                    alert("ERROR = " + data.ERROR);
                else{
                    if (!data || data.value == null || data.value == '') return;
                    $("#moreBrandDiv").html(data.value);
                    brandCount = 1;
                    brandMoreOption(obj, 1);
                }
            }
        });

    },
    cancelClick : function(obj){
        $(obj).parents('.guide_box').find('.multiple_choice').show();
        $(obj).parents('.guide_box').find('.more_open').show();
        $(obj).parents('.guide_box').find('.more_close').hide();
        packUp($(obj));
    },
    attrBtnClick : function(obj){
        if($(obj).hasClass('more_choice')){
            if ($(obj).parent().attr("attrTyle") == "show") {//展开显示属性的操作
                $(obj).parents('.guide_box').height('auto');
                $(obj).parents('.guide_box').find('.guide_main').height('auto');
                $(obj).parents('.multiple_choice').hide();
                $(obj).parents('.guide_box').addClass('select_guide').find('.moultiple_con_btn').show();
                multipleChoiceClick($(obj));
            }else{//更多选项属性的操作
                $(obj).hide();
                $(obj).parents(".son_m").find(".moultiple_con_btn").show();
                $(obj).parents(".son_m").addClass("selected");
                var _multipleDiv = $(obj).parent().next().find("a");
//	        	_this.parent().prev().find("li").removeAttr("style");

                // 点击多选按钮，所有链接上href属性去掉，点击都只是js勾选操作
                _multipleDiv.each(function(){
                    $(this).attr("href", "javascript:void(0);");
                });
            }
        }else if($(obj).hasClass('cancel')){
            var noSelected=true;
            if ($(obj).parent().attr("attrTyle") == "show") {//展开显示属性的操作
                packUp($(obj));
                $(obj).parents('.guide_box').find('.multiple_choice').show();

                var _obj = $(obj).parent().siblings("ul").find("a");
                _obj.each(function(){
                    var a_this = $(this);
                    a_this.attr("href", a_this.attr("url"));

                    var li_this = a_this.parent();
                    if(a_this.attr("selecte") == 0){
                        a_this.parent().removeClass("cur");
                    }else{
                        noSelected=false;
                        if(!a_this.parent().hasClass("cur")){
                            a_this.parent().addClass("cur");
                        }
                        //多选取消后还原子属性
                        if($(obj).attr("ismultichoose") == 0){
                            var subProperty = $("div[itemParentId='"+ a_this.parent().attr("attrId") +"']");
                            if(subProperty.hasClass("none")) {
                                subProperty.removeClass("none");
                            }
                        }
                    }
                });
                if(noSelected){
                    $(obj).parents('.guide_box').height(34);
                    $(obj).parents('.guide_box').find('.guide_main').height(26);
                }
            }else{//更多选项属性的操作
                $(obj).parents(".son_m").find(".more_choice").show();
                $(obj).parents(".son_m").removeClass("selected");
                $(obj).parents(".moultiple_con_btn").hide();

                var _obj = $(obj).parent().prev().find("a");
                _obj.each(function(){
                    var a_this = $(this);
                    a_this.attr("href", a_this.attr("url"));

                    if(a_this.attr("selecte") == 0){
                        a_this.removeClass("cur");
                    }else{
                        noSelected=false;
                        if(!a_this.hasClass("cur")){
                            a_this.addClass("cur");
                        }
                    }
                });
            }
            if(noSelected){
                var confirmBtn=$(obj).parent().find(".confirm");
                if(!confirmBtn.hasClass("dis_confirm")){
                    confirmBtn.addClass("dis_confirm");
                }
            }
        }else if($(obj).hasClass('more_open')){
            $(obj).hide();
            $(obj).next(".more_close").show();
            $(obj).parents('.guide_box').height('auto');
            $(obj).parents('.guide_box').find('.guide_main').height('auto');
            $(obj).parents('.guide_box').removeClass('select_guide').find('.moultiple_con_btn').hide();

            // 隐藏该属性下的所有子属性值
            // 该属性下所有属性值的子属性值
            $(obj).parent().prev().find(".sub_property").each(function(){
                var sub = $(this);
                if(!sub.hasClass("none")) {
                    sub.addClass("none");
                }
            });
        }else if($(obj).hasClass('more_close')){
            $(obj).prev(".more_open").show();
            $(obj).hide();
            if($(obj).parents('.guide_box').hasClass('guide_multiple')){//评论标签点击收起，显示2行
                $(obj).parents('.guide_box').height(60);
            }else{
                $(obj).parents('.guide_box').height(34);
            }

            $(obj).parents('.guide_box').find('.guide_main').height(26);
            packUp($(obj));

            $(obj).parents(".guide_box").find("li").each(function(){
                var _this = $(this);
                //更多收起后还原子属性
                if($(obj).attr("ismultichoose") == 0){
                    var subProperty = $("div[itemParentId='"+ _this.attr("attrId") +"']");
                    if(subProperty.hasClass("none") && subProperty.attr("subItemShow") == '1') {
                        subProperty.removeClass("none");
                    }
                }
            });
        }


    },
    confirmClick : function(obj){
        var link = $(obj).attr("url");
        var _multiList ;
        var multiStr = "";
        var tagStr = "";
        var multi_brand = false;
        var isManageBrandReq = false; // 当前页面是否管理品牌的请求
        if ($(obj).parent().attr("multi_brand") == 1) {
            multi_brand = true;
            _multiList = $(obj).parent().prev();
        }else if ($(obj).parent().attr("attrTyle") == "more") {
            _multiList = $(obj).parent().prev();
        }else{
            _multiList = $(obj).parent().siblings("ul");
        }
        if ($(obj).parent().attr("isManageBrandReq") == 1) {
            isManageBrandReq = true;
        }
        if (multi_brand) {//品牌多选
            var manageBrandsStr = "";
            _multiList.find(".cur").each(function(){
                multiStr = multiStr + "," + $(this).attr("brandId");

                if(isManageBrandReq) {
                    manageBrandsStr = manageBrandsStr + "," + $(this).attr("manageBrandId");
                }
            });
            multiStr = multiStr.substr(1);
            if(isManageBrandReq) { // 管理品牌的链接格式
                manageBrandsStr = manageBrandsStr.substr(1);
                multiStr = multiStr + "-" + manageBrandsStr;
            }
            if(requestType == 70 || requestType == 75 || requestType == 76) {
                link = link.replace(/\-b\-/, "-b" + multiStr + "-");
                link = link.replace(/\-v2\-/, "-v3-");
            }else {
                link = link.replace(/\/b\//, "/b" + multiStr + "/");
                link = link.replace(/\-v2\-/, "-v3-");
            }
        } else {
            _multiList.find(".cur").each(function(){
                multiStr = multiStr + "," + $(this).attr("attrId");
            });
            multiStr = multiStr.substr(1);
            var selectCount = multiStr.split(",").length;
            var reg,regStr,reg1;
            if(requestType == 70 || requestType == 75 || requestType == 76 || requestType == 50) {
                reg = /\-a[\d,]*\-/;
                reg1 = /\-a[\d,]*\_[\d,]*\-/;
                regStr = "-a";
            }else {
                if(typeof(seoShortUrl)!="undefined"&&seoShortUrl==1){//seo 类目页属性短链接
                    reg = /\/a[\d,]*\//;
                    reg1 = /\/a[\d,]*\_[\d,]*\//;
                    regStr = "/a";
                }else{
                    reg = /\/a[\d,]*\-/;
                    reg1 = /\/a[\d,]*\_[\d,]*\-/;
                    regStr = "/a";
                }
            }
            var attrIds = null;
            var attrStrs = null;
            var tagStrs = null;
            var hasTags = false;
//			link = "//search.yhd.com:8080/ctg/c5261-0/b/a-s1-v0-p1-price-d0-f0-m1-rt0-pid-mid0-k%E9%9B%B6%E9%A3%9F/";
            if (link.match(reg)) {
                attrIds = link.match(reg).toString().replace(regStr,"").replace(",0-","").replace("-","").replace("/","");
                attrStrs = attrIds;
            } else if (link.match(reg1)) {
                attrIds = link.match(reg1).toString().replace(regStr,"").replace(",0-","").replace("-","").replace("/","");
                hasTags = true;
                var attris = attrIds.split("_");
                if(attris.length==1) {
                    attrStrs = attrIds;
                } else{
                    attrStrs = attris[0];
                    tagStrs = attris[1];
                }
            }
//			alert(attrIds + "||" + attrStrs + "||" + tagStrs + "||" + multiStr);
// 			var tagFlag = false;
// 			if ($(obj).attr("liType") == "tag") {
// 				tagFlag = true;
// 			}
//
// 			if (tagFlag) {
// 				tagStrs = multiStr;
// 			}else{
            if (attrStrs != null && attrStrs != "") {
                attrStrs = attrStrs + "," + multiStr;
            }else{
                attrStrs = multiStr;
            }
            // }
            if (attrStrs != null && !tagFlag && selectCount > 1) {
                attrStrs = attrStrs + ",0";
            }
            var finalStr = null;
            if (attrStrs != null) {
                finalStr = attrStrs;
            }
            if (tagStrs != null) {
                if(finalStr==null){//属性未选中
                    finalStr = "_" + tagStrs;
                }else{
                    finalStr = finalStr + "_" + tagStrs;
                }
            }

            if (hasTags) {
                if(typeof(seoShortUrl)!="undefined"&&seoShortUrl==1){//seo 类目页属性短链接
                    link = link.replace(reg1, regStr + finalStr + "/");
                }else{
                    link = link.replace(reg1, regStr + finalStr + "-");
                    link = link.replace(/\-v2\-/, "-v3-");
                }
            } else {
                if(typeof(seoShortUrl)!="undefined"&&seoShortUrl==1){//seo 类目页属性短链接
                    if(!link.match(reg1)&&!link.match(reg)){
                        link=link+"a" + finalStr + "/";
                    }else{
                        link = link.replace(reg, regStr + finalStr + "/");
                    }
                }else{
                    link = link.replace(reg, regStr + finalStr + "-");
                    link = link.replace(/\-v2\-/, "-v3-");
                }
            }
        }
//    	alert(link);
        window.location = link;
    },

    attrConfirmClick: function (obj) {
        var link = $(obj).attr("url");
        var _multiList;
        var multiStr = "";
        var curAttrid=$(this).attr("attrid");
        if ($(obj).parent().attr("attrTyle") == "more") {
            _multiList = $(obj).parent().prev();
        } else {
            _multiList = $(obj).parent().siblings("ul");
        }


        _multiList.find(".cur").each(function () {
            multiStr = multiStr + "||" + $(this).attr("itemid");
            curAttrid=$(this).attr("attrid");
        });
        if (multiStr != "") {
            multiStr = multiStr + "::" + curAttrid;
        }
        multiStr = multiStr.substr(2);

        var selectCount = multiStr.split(",").length;
        var reg, regStr, reg1;


        reg = /\/a[0-9\|\:\_]*\-/;
        regStr = "/a";


        var urlAttrIds = null;
        var attrStrs = null;
        var tagStrs = null;
        var hasTags = false;
//			link = "//search.yhd.com:8080/ctg/c5261-0/b/a-s1-v0-p1-price-d0-f0-m1-rt0-pid-mid0-k%E9%9B%B6%E9%A3%9F/";
        if (link.match(reg)) {
            urlAttrIds = link.match(reg).toString().replace(regStr, "").replace(",0-", "").replace("-", "").replace("/", "");
        }
        var returnAttrStr="";
        if (urlAttrIds != null && urlAttrIds != "") {
            // attrStrs = attrStrs + "," + multiStr;
            var urlAttrIdsArr = urlAttrIds.split("_");
            var urlhasChoosed=false;//当前选中属性是否已在url里
            for (var i=0;i<urlAttrIdsArr.length;i++){
                var curArr=urlAttrIdsArr[i].split("::");
                if(returnAttrStr!=""){
                    returnAttrStr=returnAttrStr+"_";
                }
                if(curArr.length>2 &&curArr[1] ==curAttrid){
                    returnAttrStr=returnAttrStr+"_"+multiStr;
                    urlhasChoosed=true;
                }else{
                    returnAttrStr=returnAttrStr+urlAttrIdsArr[i];
                }
            }
            if(!urlhasChoosed){
                returnAttrStr=returnAttrStr+"_"+multiStr;
            }

        } else {
            returnAttrStr = multiStr;
        }



        link = link.replace(reg, regStr + returnAttrStr + "-");
        link = link.replace(/\-v2\-/, "-v3-");


//    	alert(link);
        window.location = link;
    },

    colorOrSizeConfirmClick: function (obj,expType) {
        var link = $(obj).attr("url");
        var _multiList;
        var multiStr = "";
        if ($(obj).parent().attr("attrTyle") == "more") {
            _multiList = $(obj).parent().prev();
        } else {
            _multiList = $(obj).parent().siblings("ul");
        }

        var reg, regStr, reg1;

        reg = /\-color[^"]*?\-/;//最短匹配以-color开始，-结束字符串
        if(expType=="color"){
            reg = /\-color[^"]*?\-/;//最短匹配以-color开始，-结束字符串
            regStr = "-color";

        }else if(expType=="size"){
            reg = /\-size[^"]*?\-/;//最短匹配以-color开始，-结束字符串
            regStr = "-size";
        }

        var urlAttrIds = null;
        var attrStrs = null;

        if (link.match(reg)) {
            urlAttrIds = link.match(reg1).toString().replace(regStr, "").replace(",0-", "").replace("-", "").replace("/", "");
        }
        var returnAttrStr="";
        _multiList.find(".cur").each(function () {
            multiStr = multiStr + "," + $(this).attr(expType);
        });

        multiStr = multiStr.substr(1);

        returnAttrStr = multiStr;

        link = link.replace(reg, regStr + returnAttrStr + "-");
        link = link.replace(/\-v2\-/, "-v3-");

        window.location = link;
    },

    //筛选栏 更多
    guideMore:function(){
        var oMore = $('.mod_search_select .more_b'),
            oCon = oMore.find('.m_con'),
            oDealers = $('.mod_search_select .dealers_b'),
            oBetween = $('.mod_search_select .between'),
            oBeInput  = oBetween.find('.boxTop input'),
            oPriceInterval = oBetween.find('.interval_list'),
            oInput = oBetween.find('input'),
            ip1Input = oBetween.find('.ip1'),
            ip2Input = oBetween.find('.ip2'),
            clearBtn=oBetween.find('.first').find('.btn1'),
            confirmBtn=oBetween.find('.first').find('.btn2'),
            timer = null;
        oMore.add(oDealers).mouseenter(function(){
            oMore.addClass('hover');
            oCon.addClass('show');
            oDealers.addClass('hover');
        });
        oMore.add(oDealers).mouseleave(function(){
            oMore.removeClass('hover');
            oCon.removeClass('show');
            oDealers.removeClass('hover')
        });
        oBetween.delegate(".boxTop input", "click focus", function(){
            clearTimeout(timer);
            $(this).css("border-color","#ccc");
            $(this).parents('.between').addClass('show_interval');
            oBetween.find('.boxCon').show();
        });

        oBetween.mouseleave(function(){
            timer = setTimeout(function(){
                $(this).css("border-color","#e1e1e1");
                oBetween.find('.boxCon').hide();
                $(this).parents('.between').removeClass('show_interval');
            },500)
        });



//        oBeInput.focus(function(){
//            var _this = $(this);
//            _this.css("border-color","#ccc");
//            _this.parents('.between').addClass('show_interval');
//            oBetween.find('.boxCon').show();
//        });
//        oInput.blur(function(){
//            var _this = $(this);
//            _this.css("border-color","#e1e1e1");
//            oBetween.find('.boxCon').hide();
//            _this.parents('.between').removeClass('show_interval');
//        });
        oPriceInterval.hover(function(){
            var _this = $(this),
                currentPriceInterval = _this.find('.price_interval span').html();
            _this.addClass('show_num');
            var priceIntervalObj = currentPriceInterval.split('-');
            if(priceIntervalObj.length==1){
                ip2Input.val('￥');
            };
            ip1Input.val(priceIntervalObj[0]);
            ip2Input.val(priceIntervalObj[1]);
        },function(){
            var _this = $(this);
            _this.removeClass('show_num');
        });

        clearBtn.click(function(){
            ip1Input.val("");
            ip2Input.val("");
        })

        confirmBtn.click(function(){

        })

        var oPe = $(".mod_search_select .sort_b .pe"),
            oSp = oPe.children(".pP").children('span'),
            newTxt = $(".mod_search_select_new .txt"),
            newC = $(".mod_search_select_new .txt .tips_close"),
            hasPi = $(".mod_search_select_new .hasP .iconSearch"),
            isP = $(".mod_search_select_new .hasP .isP");

        oPe.hover(function(){
            $(this).children(".pP").show();
        },function(){
            $(this).children(".pP").hide();
        });

        oSp.click(function(){
            var c = $(this).attr("class");
            $(this).parents(".pe").removeClass("up down").addClass(c).siblings().removeClass("cur");
            $(this).parents(".pe").find("a").addClass("cur").find("i").text();
            $(this).parent().hide();
        })

//        newTxt.one("mouseover",function(){
//            $(this).children(".tips_shipping").show();
//        })
//        newC.bind("click",function(){
//            $(this).parents(".tips_shipping").hide();
//        })

        hasPi.bind({
            "mouseover":function(){
                $(this).children(".isP").show();
            },
            "mouseout":function(){
                $(this).children(".isP").hide();
            }
        })

        var mssn = $(".mod_search_select_new");
        var mssnw = mssn.width();
        var mul = mssn.children("ul");
        var mulli = mul.children("li");
        var t = [];

        mul.css({
            "width":mssnw
        })
        mulli.each(function(){
            t.push($(this).outerWidth());
        })
        var s = 0,q = [];
        for(var i=0;i<t.length;i++){
            s += t[i]
            if(s > mssnw){
                q.push(i);
            }
        }
        for(var i=0;i<q.length;i++){
            mulli.eq(q[i]).hide();
            if(i==q.length-1) {
                $('.mod_search_select_nmore').find('ul').after("<a href=\"javascript:;\" class=\"more\">展开<i class=\"iconSearch\">&#xe62c;</i></a>");
            }
        }

        if(mssnw <= s){
            mssn.addClass("mod_search_select_nmore");
        }
        var mmore = $(".mod_search_select_nmore").children(".more");
        var k = 1;
        mmore.click(function(){
            if(k==1){
                $(this).html('收起<i class="iconSearch">&#xe62d;</i>').parent().css({
                    "height":"auto"
                });
                for(var i=0;i<q.length;i++){
                    mulli.eq(q[i]).show();
                }
                k=0;
            }else{
                $(this).html('展开<i class="iconSearch">&#xe62c;</i>').parent().css({
                    "height":"40px"
                })
                for(var i=0;i<q.length;i++){
                    mulli.eq(q[i]).hide();
                }
                k=1;
            }
        })
    },
    /* *
     *
     * 筛选栏 - 价格区间
     *
     * */
    priceFilter : function(){
//         var priceRange=$(".mod_search_guide .price_range"),$('.mod_search_select .between')
        var priceRange=$('.mod_search_select .between'),
            priceRangeInput=priceRange.find("input"),
            priceRangeBtn=priceRange.find(".first a"),
            autoClose;

        priceRangeBtn.click(function(){
            var _this = $(this);
            if(_this.hasClass("btn1")) { // 点击的取消
                priceRange.find('#searchPriceRangeMin').val("¥");
                priceRange.find('#searchPriceRangeMax').val("¥");
                $('.mod_search_select .between').find('.boxTop input').blur().css("border-color","#e1e1e1");
//        		 priceRange.find('.boxCon').hide();
                return ;
            }
            var url = $(this).attr("url");
            var inputRangeMin = priceRange.find('#searchPriceRangeMin')[0];
            var inputRangeMax = priceRange.find('#searchPriceRangeMax')[0];
            var temp;
            var regInteger = /^[0-9]*$/;
            if ((inputRangeMin.value == "" || /^[0]+$/.test(inputRangeMin.value))
                && (inputRangeMax.value == "" || /^[0]+$/.test(inputRangeMax.value))) {
                inputRangeMax.value="";
                inputRangeMin.value="";
            }
            if ((!regInteger.test(inputRangeMin.value))||(!regInteger.test(inputRangeMax.value))) {
                return ;
            }
            if ((inputRangeMin.value != "") && (inputRangeMax.value != "")) {
                if (Number(inputRangeMax.value) < Number(inputRangeMin.value)) {
                    temp = inputRangeMax.value;
                    inputRangeMax.value = inputRangeMin.value ;
                    inputRangeMin.value = temp;
                }
            }
            var newUrl = url.replace(/-price[0-9,]*-/, "-price"+ inputRangeMin.value +","+ inputRangeMax.value +"-");
            if ((inputRangeMin.value == "") && (inputRangeMax.value == "")) {
                var newUrl = url.replace(/-price[0-9,]*-/, "-price"+"-");
            }
            else{
                var newUrl = url.replace(/-price[0-9,]*-/, "-price"+ inputRangeMin.value +
                    ","+ inputRangeMax.value +
                    "," + priceTemplateId +"-");
            }
//         	addTrackPositionToCookie("1","search_in_price_"+inputRangeMin.value+"_"+inputRangeMax.value);
            window.location.href = newUrl;
//         	loli.spm.refreshPage(newUrl, this);
        });
    },
    priceSure : function(){
        var priceRange = $('#guide_price .price_range'),
            priceRangeInput = priceRange.find('.price_range_input');
        priceRangeBtn=priceRange.find(".price_range_btn");
        if(typeof(priceRange)=="undefined" ){
            return;
        }
        priceRangeInput.focus(function(){
            $(this).parents('.price_range').find('.price_range_btn').show();
        });
        priceRangeInput.focus(function(){
            priceRangeInput.removeClass("cur");
            $(this).addClass("cur");
            priceRange.addClass("cur");
            if($(this).val()=="¥"){
                $(this).val("");
            }
            $(this).val("").css("color","#333");
        });

        priceRangeInput.blur(function(){
            priceRange.removeClass("cur");
            priceRangeInput.removeClass("cur");
            if(!$(this).val()){
                $(this).css("color","#999").val("¥");
            }
        });

        priceRangeBtn.click(function(){
            var url = $(this).attr("url");
            var tempInputRangeMin =$(this).parents('.price_range').find('#searchPriceRangeMin')[0];
            var tempInputRangeMax = $(this).parents('.price_range').find('#searchPriceRangeMax')[0];
            var temp;
            var regInteger = /^[0-9]*$/;
            if ((tempInputRangeMin.value == "" || /^[0]+$/.test(tempInputRangeMin.value))
                && (tempInputRangeMax.value == "" || /^[0]+$/.test(tempInputRangeMax.value))) {
                tempInputRangeMax.value="";
                tempInputRangeMin.value="";
            }
            if (!regInteger.test(tempInputRangeMin.value)) {
                tempInputRangeMin.value = 0;
            }
            if((!regInteger.test(tempInputRangeMax.value))){
                tempInputRangeMax.value = "";
                if(tempInputRangeMin.value == 0){
                    return;
                }
            }
            if ((tempInputRangeMin.value != "") && (tempInputRangeMax.value != "")) {
                if (Number(tempInputRangeMax.value) < Number(tempInputRangeMin.value)) {
                    temp = tempInputRangeMax.value;
                    tempInputRangeMax.value = tempInputRangeMin.value ;
                    tempInputRangeMin.value = temp;
                }
            }
            var newUrl = url.replace(/-price[0-9,]*-/, "-price"+ tempInputRangeMin.value +","+ tempInputRangeMax.value +"-");
            if ((tempInputRangeMin.value == "") && (tempInputRangeMax.value == "")) {
                newUrl = url.replace(/-price[0-9,]*-/, "-price"+"-");
            }
            else{
                newUrl = url.replace(/-price[0-9,]*-/, "-price"+ tempInputRangeMin.value +
                    ","+ tempInputRangeMax.value +
                    "," + priceTemplateId +"-");
            }
//         	addTrackPositionToCookie("1","search_in_price_"+tempInputRangeMin.value+"_"+tempInputRangeMax.value);
            $(this).attr("url",newUrl);
            window.location.href = newUrl;
//         	loli.spm.refreshPage(newUrl, this);
        });

    },

    /* *
     *
     * 入口构造函数
     *
     * */
    main : function(){
        this.addHover();        //导购属性
        this.guideMore();		//筛选栏 更多
        this.priceFilter();
        this.priceSure();
        this.brandMoreConfirmBind();//品牌多选确认
        this.brandMoreCancelBind();//品牌多选取消
    }
};

function filterBrands() {
    var $brandLi = $("div[class='guide_box new_brand']").find("ul[class='guide_ul clearfix']").find("li");

    var brandWord = ($("#filterBrands").val() || '').toUpperCase();

    //所有品牌关键字结果集 A:20 B:30
    var allObj = {};
    //匹配品牌关键字的结果集 A:5 B:3
    var choseObj = {};
    $brandLi.each(function(id, item){
        var brandName = $(item).data("name") + "";
        if(brandName.indexOf(brandWord) != -1) {
            choseObj[$(item).data("type")] = (choseObj[$(item).data("type")] | 0) + 1;
            $(item).show();
        } else {
            $(item).hide();
        }
        allObj[$(item).data("type")] = (allObj[$(item).data("type")] | 0) + 1;
    });
    $.each(allObj,function(key, value){
        if(choseObj[key]) {
            $("div[class='guide_box new_brand']").find("span[id='" + key + "']").show();
        } else {
            $("div[class='guide_box new_brand']").find("span[id='" + key + "']").hide();
        }
    });
    $.isEmptyObject(choseObj) ? $("#default").hide() : $("#default").show();
    $(".guide_more_open").trigger("click");

}


/**
 * 【导购属性】点击多选
 * 逻辑：
 * 1、所有链接上href属性去掉，点击都只是js勾选操作
 * 2、多选展示全部属性
 * 3、隐藏该属性下的所有子属性值
 * @param _this
 */
function multipleChoiceClick(_this){
    var _multipleDiv = _this.parent().prev().find("a");
    _this.parent().prev().find("li").removeAttr("style");

    // 隐藏该属性下的所有子属性值
    _this.parent().prev().find(".sub_property").each(function(){
        var sub = $(this);
        if(!sub.hasClass("none")) {
            sub.addClass("none");
        }
    });
    // 点击多选按钮，所有链接上href属性去掉，点击都只是js勾选操作
    _multipleDiv.each(function(){
        $(this).attr("href", "javascript:void(0);");
    });
}

/**
 * 【导购属性】选择价格属性区间
 * @param rangMin
 * @param rangMax
 * @param url
 */
function clickSearchPriceRange(rangMin,rangMax,url,obj){
    var newUrl = url.replace("-price-", "-price"+ rangMin +","+ rangMax + "," + priceTemplateId +"-");
//	loli.spm.refreshPage(newUrl, obj);
    window.location.href = newUrl;
}

function showSelectedBrand() {
    var cellAttention = $('.cell_attention');
    cellAttention.delegate('span' , 'mouseover' , function(){
        if($(this).hasClass('att_normal')){
            $(this).addClass('att_hover');
        }
    }).delegate('span' , 'mouseleave' , function(){
        if($(this).hasClass('att_hover')){
            $(this).removeClass('att_hover');
        }
    });

    if(brandIdStr!="") {
        var selectCount = brandIdStr.split(",").length;
        if(selectCount==1) {
            $('#selectedBrand').show();
        }
    }else if(inputBrandName!=null && inputBrandName !="" && inputBrandId!=null && inputBrandId>0) {
        $('#selectedBrand').show();
    }

    if(typeof($('#concernedBrand'))!="undefined" && $('#concernedBrand').length>0) {
        // recordTrackInfoWithType(1, "search_concerned_brand");
    }
}

function show99FreeShippingInfo() {
    if(typeof(ceCategoryServiceFlag)=="undefined" || ceCategoryServiceFlag=="" || ceCategoryServiceFlag==0) {
        return;
    }
    if(specialProvinceIds != null && specialProvinceIds !="") {
        var currProvinceId = jQuery.cookie("provinceId");
        var tempProvinceIds = specialProvinceIds.split(",");
        var flag = 0;
        if(currProvinceId == 1 || currProvinceId==2) {
            flag = 1;
        }else {
            for (var i=0; i < tempProvinceIds.length; i++ ){
                var tempVal = tempProvinceIds[i];
                if(tempVal == currProvinceId) {
                    flag = 2;
                    break;
                }
            }
        }

        if(flag != 0) {
            var temp = jQuery.cookie("search_showFreeShipping");
            if(typeof(temp) == "undefined" || temp==null || temp=="null" || temp !=1) {    //有cookies时不显示1号店自营商品满99元包邮tips
                tipsFreeShipping(flag);
            }else {
                var tipsShipping = $('.tips_shipping');
                if(flag==1) {
                    tipsShipping.siblings('a').attr("title","以下1号店自营商品基本支持货到付款，当日达");
                }else if(flag==2) {
                    tipsShipping.siblings('a').attr("title","以下1号店自营商品多数区域支持货到付款");
                }
            }
        }
    }
}

function tipsFreeShipping(flag) {                                  //hover一号店自营显示1号店自营商品满99元包邮tips
    var tipsShipping = $('.tips_shipping');
    if(tipsShipping.length == 0){return false;}
    if(flag==1) {
        tipsShipping.find("p").html("以下1号店自营商品基本支持货到付款，当日达");
    }else if(flag==2) {
        tipsShipping.find("p").html("以下1号店自营商品多数区域支持货到付款");
    }

    var tipsBg = tipsShipping.find('.tips_bg');
    tipsBg.width(tipsShipping.outerWidth());
    tipsShipping.show();                                    //无cookies时就显示tips

    tipsShipping.delegate('.tips_close' , 'click' , function(){
        if($(this).hasClass('tips_close')){
            tipsShipping.hide();
            if(flag==1) {
                tipsShipping.siblings('a').attr("title","以下1号店自营商品基本支持货到付款，当日达");
            }else if(flag==2) {
                tipsShipping.siblings('a').attr("title","以下1号店自营商品多数区域支持货到付款");
            }
            var showFreeShipping = "1";
            jQuery.cookie("search_showFreeShipping",showFreeShipping,{domain:no3wUrl,path:"/","expires":365});
        }
    });
}

function spread(obj){
    obj.parents('.guide_box').find('.multiple_con').show();
    obj.parents('.guide_box').find('.guide_con').hide();
};
function packUp(obj){
    obj.parents('.guide_box').removeClass('select_guide').find('.moultiple_con_btn').hide();
    obj.parents('.guide_box').find('.multiple_con').hide();
    obj.parents('.guide_box').find('.guide_con').show();
};

function brandMoreOption(obj, order){
    var guideBox = $("#moreBrandDiv").parents('.guide_box');
    spread($(obj));

    if ($(obj).hasClass("more_choice")) {//多选
        $(guideBox).addClass('select_guide').find(".moultiple_con_btn").show();
        $(guideBox).find(".multiple_choice").hide();
        $(guideBox).find(".multiple_con li u").removeAttr('style');
        $(guideBox).find('.multiple_con , .more_open').show();
        $(guideBox).find('.guide_con , .more_close').hide();

        // 点击多选按钮，所有链接上href属性去掉，点击都只是js勾选操作
//		$("#brandListAll").find("a").attr("href","javascript:void(0);");
    }else{//更多
        $(obj).hide();
        $(obj).next(".more_close").show();
        $(guideBox).height('auto');
        $(guideBox).find('.guide_main').height('auto');
        $(guideBox).addClass('select_guide').find(".moultiple_con_btn").show();
    }
    /*	var multipleConBox = $(".brandWrap .multiple_con_box"),
     hMultipleConBox = multipleConBox.outerHeight(true);
     if(hMultipleConBox > 140){
     multipleConBox.height(140);
     }*/


    //仅需加载一次的js
    if (order == 1) {
        //点击品牌多选
        $(".multiple_con_inside li").live("click",function(){
            if($(this).hasClass("cur")){
                $(this).removeClass("cur");
                if ($(this).find("a").eq(0).attr("selecte") == 1) {//默认区与其它区数据重复
                    var curLi = $(this).attr("id");
                    var anotherLi;
                    if (curLi.indexOf("default_") != -1) {
                        anotherLi = curLi.replace("default_","key_");
                    }else if (curLi.indexOf("key_") != -1) {
                        anotherLi = curLi.replace("key_","default_");
                    }
                    var anotherLiObj = jQuery('#'+anotherLi)[0];
                    if (anotherLiObj && typeof(anotherLiObj) != "undefined" && $(anotherLiObj).hasClass("cur")) {
                        $(anotherLiObj).removeClass("cur");
                    }
                }
            }else{
                $(this).addClass("cur");
            }

            var confirmBtn = $("#brandConfirm");
            if($(this).parent().find(".cur").length > 0){
                if(confirmBtn.hasClass("dis_confirm")){
                    confirmBtn.removeClass("dis_confirm");
                }
            }else{
                if(!confirmBtn.hasClass("dis_confirm")){
                    confirmBtn.addClass("dis_confirm");
                }
            }
        });

        //品牌首字母切换
        var oGuide = $(".mod_search_guide"),
            oSwitch = oGuide.find('.multiple_con_switch'),
            oInSide = oGuide.find('.multiple_con_inside');
        oSwitch.delegate('span', 'click', function() {
            $(this).addClass('cur').siblings('span').removeClass('cur');
            oInSide.hide().eq(oSwitch.find('span').index(this)).show();
        });

        /*品牌与属性同级时*/
        $(".brand_guide_box .more_open").unbind().click(function(){
            $(".brand_guide_box .guide_main .guide_con").hide();
            $(".brand_guide_box .guide_main .multiple_con").show();
            $(this).hide();
            $(".brand_guide_box .more_close").show();
        });
        $(".brand_guide_box .more_close").unbind().click(function(){
            $(".brand_guide_box .guide_main .guide_con").show();
            $(".brand_guide_box .guide_main .multiple_con").hide();
            $(this).hide();
            $(".brand_guide_box .more_open").show();
        });
    }
}

/**
 * js基础页面，调用bs获取价格、库存信息
 type-1:页面初始调用  2:点击后调用，比如点击组合商品规格
 */
var provinceId = jQuery.cookie("provinceId");

/**
 * type:是否组合品切换，2表示组合品切换
 * ajax：0：普通加载，1、懒加载 2、排序 翻页切换
 * a_this:组合品切换时，获取当前对象
 */
function loadCompleteProductsInfo(data,type,ajax,com_this)
{
    var divIdList = jQuery('#productsIdList')[0];
    if(! divIdList) return;
    var idList = divIdList.value;
    eval("var search_list = ["+ idList +"];");
    if(!data)return;
    if(requestType != '70' && requestType != '75' && requestType != '76' && flagView!=2) {
        dealTagTracker2(data,ajax); // 角标曝光tracker处理
        if(fashionCateType && fashionCateType==1){
            dealTopOnlineChat();//处理前8个商品的客服图标
        }
    }
    var len=data.length;
    for (var i = 0; i < len; i++) {
        var product = data[i];
        (function(product){
            setTimeout(function(){
                if (product == null) return false; //不可见商品
                if (product.productId == null) return false; //不可见商品
                if (product.productStock == -1) return false; //未知
                if (product.currentMerchantId == -1) return false; //未知
                if (product.productPrice == -1) return false; //未知
                var productId = product.productId;
                var pmInfoId = product.pmId;
                var comObject = null;
                if(com_this!=null || typeof(com_this) != "undefined"){
                    comObject =  com_this;
                }
                var inshop=0;
                var serise=0;
                var currProdInfo = "";
                var currSubInfo = "";
                var priceSpan = "";
                var bookListPriceSpan = "";
                var adFlag = "";
                var buyButtonA = "undefined";
                if(comObject==null){
                    inshop = $("#shop_"+productId).val();
                    serise = $("#serise_"+productId).val();//serise=2表示系列产品以子码格式展示
                    currProdInfo = $("#pdlink1_"+productId);
                    currSubInfo=$("#pdlink2_"+productId);
                    priceSpan = $('#price0_' + productId)[0];
                    bookListPriceSpan = $('#listprice0_' + productId)[0];
                    adFlag = $("#adFlag_" + productId);
                    buyButtonA = $('#buyButton_' + productId)[0];
                }else{//组合品切换情况
                    inshop = $(comObject).find("#shop_"+productId).val();
                    serise = $(comObject).find("#serise_"+productId).val();//serise=2表示系列产品以子码格式展示
                    currProdInfo = $(comObject).find("#pdlink1_"+productId);
                    currSubInfo=$(comObject).find("#pdlink2_"+productId);
                    priceSpan = $(comObject).find('#price0_' + productId)[0];
                    bookListPriceSpan = $(comObject).find('#listprice0_' + productId)[0];
                    adFlag = $(comObject).find("#adFlag_" + productId);
                    buyButtonA = $(comObject).find('#buyButton_' + productId)[0];
                }
                var productDetailUrlPrefix;
                if (urlType == 1) {
                    productDetailUrlPrefix = HKPrefix.IdcYhdDetailDomain || URLPrefix.IdcYhdDetailDomain;
                }else{
                    productDetailUrlPrefix = URLPrefix.IdcYhdDetailDomain;
                }
                var grouponUrl = URLPrefix.grouponDetailUrl || "//t.yhd.com";
                var isFreeSingle=currSubInfo.attr("singlefreeflag");
                var isGrouponProv = currProdInfo.attr("isGrouponProv");
                var isSnapProduct = currProdInfo.attr("isSnapProduct");
                var isoversea = currProdInfo.attr("isoversea");
                var isOne2more =  currProdInfo.attr("isOne2more");//一品多商模式下的标品id
                var isOne2moreABtest = currProdInfo.attr("isOne2MoreABtest");
                var delPrice = "";

                //处理商品促销信息与定金预售互斥
                handleMutexPromotion(product);

                if(viewModeflag==2){    //店铺模式
                    if(product.marketPrice <= product.productPrice || product.marketPrice == 0 || product.productPrice == 0){
                        delPrice="";
                    }else if(typeof(searchShowMarketPrice) != "undefined" && searchShowMarketPrice==1){
                        delPrice="<del id=\"listprice0_"+productId+"\">¥" + product.marketPrice +"</del>";
                    }
                }else{        //单品模式
                    var priceTagHtml="";
                    if(tagsSwitch==1){
                        if(product.ruleType == 7){
                            priceTagHtml="<i id=\"priceTag_"+productId+"\" class=\"shangou_icon\"></i>";     //闪购标签
                        }else if(product.ruleType == 2){
                            if (product.businessTagId != null && product.businessTagId == 16) {
                                priceTagHtml="<i id=\"priceTag_"+productId+"\" class=\"qianggou_icon\"></i>";     //团购标签
                            } else {
                                priceTagHtml="<i id=\"priceTag_"+productId+"\" class=\"tuangou_icon\"></i>";     //团购标签
                            }
                        }else{
                            if(isFreeSingle==1){
                                priceTagHtml="<i id=\"priceTag_"+productId+"\" class=\"baoyou_icon\"></i>";   //包邮标签
                            }
                        }
                    }else{
                        if(isFreeSingle==1){
                            priceTagHtml="<i id=\"priceTag_"+productId+"\" class=\"baoyou_icon\"></i>";
                        }
                    }

                    if(product.marketPrice <= product.productPrice || product.marketPrice == 0 || product.productPrice == 0){
                        delPrice=priceTagHtml;
                    }else{
                        if(priceTagHtml!=""){
                            delPrice=priceTagHtml;
                        }else if(typeof(searchShowMarketPrice) != "undefined" && searchShowMarketPrice==1){
                            delPrice="<del id=\"listprice0_"+productId+"\">¥" + product.marketPrice +"</del>";
                        }
                    }
                }

                var isMultiAreaFiter = genMultiAreaFiterFlag();
                if(!isMultiAreaFiter /*&& (typeof(secondAreaFlag)=="undefined"||secondAreaFlag==0)*/) { // 不开放三级区域的页面才需要bs刷新价格
                    //价格刷新
                    if (typeof(priceSpan) != "undefined"  && (!isGrouponProv || isGrouponProv==0)){
                        if(product.productPrice > 0){
                            $(priceSpan).attr("yhdPrice",product.productPrice);
                            priceSpan.innerHTML = "<b>¥</b>" + product.productPrice + delPrice;

                        }else{
                            priceSpan.innerHTML = "";
                            $(priceSpan).attr("yhdPrice","");
                        }
                    }

                    if (typeof(bookListPriceSpan) != "undefined"){
                        if(product.marketPrice < product.productPrice || product.marketPrice == 0 || product.productPrice == 0){
//							$(bookListPriceSpan).text("");
                            bookListPriceSpan.innerHTML = "";
                        }else{
//							$(bookListPriceSpan).text("¥" + product.marketPrice);
                            bookListPriceSpan.innerHTML = "[定价：<del>¥" + product.marketPrice + "</del>]";
                        }
                    }
                }

                // 山姆会员价
                var samMemberPrice = product.samMemberPrice;
                if(samMemberPrice > 0) {
                    //非会员价格刷新
                    if (typeof(priceSpan) != "undefined"  && (!isGrouponProv || isGrouponProv==0)){
                        if(product.productPrice > 0){
                            $(priceSpan).attr("yhdPrice",product.currentPriceWithoutBadge);
                            priceSpan.innerHTML = "<b>¥</b>" + product.currentPriceWithoutBadge + delPrice;

                        }else{
                            priceSpan.innerHTML = "";
                            $(priceSpan).attr("yhdPrice","");
                        }
                    }

                    var samMemberPriceHTML = '<p class="samsPrice"><em><b>&yen;</b>' + samMemberPrice + '</em></p>';
                    var samPriceSpan = $(priceSpan).siblings(".samsPrice");
                    if(samPriceSpan.length > 0) {
                        samPriceSpan.remove();
                    }
                    var $priceBox = $(priceSpan).parent();
                    if($priceBox.find(".unit_price").length>0) {
                        $priceBox.find(".unit_price").remove();
                    }
                    $priceBox.append(samMemberPriceHTML);
                    if($priceBox.find(".positiveRatio").length>0) {
                        $priceBox.find(".positiveRatio").remove();
                    }
                    if($priceBox.find(".comment").length>0) {
                        $priceBox.find(".comment").remove();
                    }
                }

                // 计算纸尿裤的单价
                var unitPriceSpan=jQuery("#unit_price_" + productId)[0];
                if(typeof(unitPriceSpan) != "undefined"){
                    var curPrice = $("#price0_" + productId).attr("yhdPrice");
                    var diaperNum = $("#price0_" + productId).attr("diaperNum");
                    var productUnit = $("#price0_" + productId).attr("productUnit");
                    var combineProductSize = $("#price0_" + productId).attr("productSize");
                    var unitDetal = "";
                    var isComplexCombine = false;//是否是混合组合商品，如果是，则不显示平均单位价格
                    if(combineProductSize && !isNaN(combineProductSize)){
                        if (parseInt(combineProductSize) < 1) {
                            isComplexCombine = true;
                        } else if (parseInt(combineProductSize) > 1) {
                            var othersiblings = $("#price0_" + productId).parents(".itemBox").siblings();
                            if(othersiblings && othersiblings.size()>0){
                                othersiblings.each(function(){
                                    var _id = $(this).attr("productId");
                                    if (_id) {
                                        var _ProductSize = $(this).attr("productSize");
                                        if (_ProductSize && !isNaN(_ProductSize) && parseInt(_ProductSize) == 1) {
                                            //							diaperNum = $(this).attr("diaperNum");
                                            productUnit = $(this).attr("productUnit");
                                            return;
                                        }
                                    }
                                });
                            }
                        }
                    }
                    if(diaperNum && parseInt(diaperNum) > 0 && productUnit && !isComplexCombine){
                        var unitPrice = (parseFloat(curPrice)/parseInt(diaperNum));
                        //		if(combineProductSize && !isNaN(combineProductSize) && parseInt(combineProductSize) > 0){
                        //			unitPrice = (parseFloat(curPrice)/(parseInt(diaperNum)*parseInt(combineProductSize)));
                        //		}
                        if (productUnit == 1) {
                            unitPrice = (unitPrice*500).toFixed(2);
                            unitDetal = "500g";
                        }else if (productUnit == 2) {
                            unitPrice = (unitPrice*500).toFixed(2);
                            unitDetal = "500ml";
                        }else if (productUnit == 3) {
                            unitPrice = unitPrice.toFixed(2);
                            unitDetal = "片";
                        }else if (productUnit == 4) {
                            unitPrice = (unitPrice*1000).toFixed(2);  //由ml转换为l
                            unitDetal = "1L";
                        }else if (productUnit == 5) {
                            unitPrice = (unitPrice*1000).toFixed(2);   //由g转换为kg
                            unitDetal = "1kg";
                        }
                        // 价格保留两位小数
                        $(unitPriceSpan).html("[¥" + unitPrice + "/" + unitDetal+"]");
                    }
                }

                //判断是否广告推荐产品,若为广告推荐商品，则不需要进行连接刷新
                var adProductFlag = $(priceSpan).attr("adProductFlag");
                if(typeof(adProductFlag) != "undefined" && adProductFlag==1){
                    productDetailUrl = currProdInfo.attr("href");
                    dealAdProductButtonInfo(product,productDetailUrl,inshop,buyButtonA);
                    return false;
                }

                if(isGrouponProv) {
                    isGrouponProv = parseInt(isGrouponProv);
                } else {
                    isGrouponProv = 0;
                }
                var grouponId = currProdInfo.attr("grouponId");
                var grouponType = currProdInfo.attr("grouponType");
                if(grouponType) {
                    grouponType = parseInt(grouponType);
                } else {
                    isGrouponProv = 0;
                }
                if(isGrouponProv && isGrouponProv==1) {
                    if(grouponType == 0) {
                        grouponUrl = grouponUrl + "/detail/" + grouponId;
                    } else if (grouponType == 1) {
                        grouponUrl = grouponUrl + "/hoteldetail/" + grouponId;
                    }
                }

                //链接刷新
                var productDetailUrl = productDetailUrlPrefix + "/item/" + pmInfoId;
                if (typeof(isOne2more) != "undefined" && isOne2more != "0") {//一品多商模式下标品详情页
                    var currentHref = $("#allMerchant_" + productId);
                    if (currentHref && typeof(isOne2moreABtest) != "undefined" && isOne2moreABtest == "1") {
                        productDetailUrl = $(currentHref).attr("href");
                    }else{
                        productDetailUrl = productDetailUrlPrefix + "/" + isOne2more + "_" + pmInfoId;
                    }
                }

                for (var n = 1; n <= 3; n++) {
                    var pdLinkId = 'pdlink'+n+'_'+productId;
                    var pdLink = jQuery('#'+pdLinkId)[0];
                    if(comObject != null){
                        pdLink = $(comObject).find('#'+pdLinkId)[0];
                    }
                    if (! pdLink) continue;
                    if(n == 2 && typeof(advProducts) != "undefined" && inArray(advProducts,productId)){
                        var span = $(pdLink).find("span:eq(0)");
                        if(span.hasClass("promotion")){
                            var spans = $(pdLink).find("span");
                            $(pdLink).attr("href", span.attr("advurl")).attr("title", span.attr("advtitle")).html(spans).append(span.attr("advtitle"));
                            if(comObject == null){
                                $("#pdlink1_" + productId).attr("href", span.attr("advurl"));
                            }else{
                                $(comObject).find("#pdlink1_" + productId).attr("href", span.attr("advurl"));
                            }


                        }
                    }else{
                        if(isGrouponProv && isGrouponProv==1) {
                            pdLink.href = grouponUrl;
                        } else {

                            if(product.productType == 1){
                                // 虚码不刷新pminfoid，取默认子码的pminfoid
                                pmInfoId = $(pdLink).attr("pmid");
                                if(pmInfoId != 0 && pmInfoId != "undefined"){
                                    $(pdLink).attr("href",productDetailUrl.replace(/\/\d*/, "/" + pmInfoId));
                                }else{
                                    $(pdLink).attr("href",productDetailUrl);
                                }
                            }else{
                                $(pdLink).attr("href",productDetailUrl);
                            }
                        }
                    }
                }

                if (adFlag) {
                    adFlag.attr("style","display:'';");
                }

                var advProduct=$(currSubInfo).find(".promotion");  //检查是否为竞价广告商品

                if(typeof(buyButtonA) == "undefined"){
                    dealRecommendProdsWithoutButton(product, inshop,currProdInfo);
                    return false;
                }
                //缩略图模式不需要进行按钮的处理操作
                if(cateType==1&&typeof (isCityResponse)!= "undefined"&&isCityResponse=='false'){
                    dealRecommendProdsWithoutButton(product, inshop,currProdInfo);
                    return false;
                }
                if(isGrouponProv && isGrouponProv==1) {
                    productDetailUrl = grouponUrl;
                }
                dealNonAdProductButtonInfo(product,productDetailUrl,inshop,buyButtonA,currProdInfo,serise);

            },20);
        })(product);
    }
}

//商品实时信息
function lazyLoadPrice(){
    lazyPriceLoaderDefine(0);  // 定义价格延时函数
    YHD.SPagelazyLoade.getLazyLoadPrice();  //Ajax数据返回后，重新获取需要异步请求价格的商品元素。
    //解决页面自动跳转回头部问题
//		YHD.SPagelazyLoade.init(0, 0);
    YHD.SPagelazyLoade.init(undefined,undefined);
}
//处理广告推荐产品立即购买按钮
function dealAdProductButtonInfo(product,productDetailUrl,inshop,buyButtonA){
    if(typeof(buyButtonA) == "undefined") {
        return;
    }
    var pmInfoId = product.pmId;
    var productId = product.productId;
    buyButtonA.productId = productId;
    buyButtonA.merchantId = product.currentMerchantId;
    buyButtonA.index = $(buyButtonA).attr("index");
    buyButtonA.href=productDetailUrl;

    //处方药和非处方药都不能加车 add by zhangfan
    if($(buyButtonA).attr("isOTCorRX") != 0) {
        buyButtonA.innerHTML = "查看详情";
        buyButtonA.target = "_blank" ;
        removeCompareBtn(product);//不能直接加车，不显示对比按钮
        return false;
    }

    var productShoppingCount = product.shoppingcount==0?1:product.shoppingcount;
    if (product.productStock <= 0 || (product.shoppingcount>1 && product.productStock < product.shoppingcount)) {

        var currProd = $("#pdlink1_"+productId);
        //系列产品
        if (product.productType == 1 || product.productType ==2){
            buyButtonA.href=productDetailUrl;
            buyButtonA.innerHTML = "查看详情";
            buyButtonA.target = "_blank" ;
            return false;
        }
        buyButtonA.className = "notice_btn";
        buyButtonA.href=productDetailUrl;
        buyButtonA.innerHTML = "到货通知";
        buyButtonA.target = "_blank" ;
        removeCompareBtn(product);//不能直接加车，不显示对比按钮
        return false;
    }else if(product.shoppingcount>1){
        var currProd = $("#pdlink1_"+productId);
        // 判断是N件购
        buyButtonA.shoppingcount=product.shoppingcount;
        buyButtonA.onclick = function(event){
            var shoppingCart = $(this).parents("#shopping_cart");
            var buyNum =  $(shoppingCart).find("#buyNum_" + this.productId).val();
            if(buyNum == ""||typeof(buyNum)=='undefined'){
                buyNum=product.shoppingcount;
                $(shoppingCart).find("#buyNum_" + this.productId).val(product.shoppingcount);
            }
            $(shoppingCart).find("shopping_act_" + this.productId).attr("shoppingcount",productShoppingCount);

            addToCart(event, this.productId, this.merchantId, buyNum,true,'shopcount_'+this.index);
            if(jQuery.cookie("provinceId")==2) {
                idgTracker._trackPV ('/virtual/addtocart');
            }
            if (pmInfoId > 0) {
                gotracker(pmInfoId,'shopcount_'+this.index,this.productId);
            }else{
                gotracker('2','shopcount_'+this.index,this.productId);
            }
            //广告商品扣费js
            var adLpUrl=$("#pdlink1_"+this.productId).attr("adLpUrl");
            if(typeof(adLpUrl)!="undefined"&&adLpUrl!=""){
//				$.get(adLpUrl, function(){});
                var img= new Image();
                img.src = adLpUrl;
            }
        };
        buyButtonA.target = "" ;
        $(buyButtonA).attr("href","javascript:void(0);");

        buyButtonInput(buyButtonA,productShoppingCount,productId);

        buyButtonA.innerHTML = "加入购物车";
    }else{
        var currProd = $("#pdlink1_"+productId);
        //系列产品
        if (product.productType == 1 || product.productType ==2){
            buyButtonA.href=productDetailUrl;
            buyButtonA.innerHTML = "查看详情";
            buyButtonA.target = "_blank" ;
            return false;
        }
        $(buyButtonA).attr("class", "buy_btn");

        buyButtonInput(buyButtonA,productShoppingCount,productId);

        buyButtonA.innerHTML = "加入购物车";
        buyButtonA.href="javascript:void(0);";
        buyButtonA.target = "" ;
        buyButtonA.onclick = function(event){
            var shoppingCart = $(this).parents("#shopping_cart");
            var buyNum=1;
            var buyNum = $(shoppingCart).find("#buyNum_" + this.productId).val();
            if(buyNum == ""||typeof(buyNum)=='undefined'){
                buyNum=1;
                $(shoppingCart).find("#buyNum_" + this.productId).val(buyNum);
            }
            addToCart(event, this.productId, this.merchantId, buyNum, true,'btn_'+this.index);
            if(jQuery.cookie("provinceId")==2) {
                idgTracker._trackPV ('/virtual/addtocart');
            }
            var spmData = loli.spm.getData(this);
            spmData["curMerchantId"]=this.merchantId;
            if (pmInfoId > 0) {
                gotracker(pmInfoId,'btn_'+this.index,this.productId,spmData);
            }else{
                gotracker('2','btn_'+this.index,this.productId,spmData);
            }
            //广告商品扣费js
            var adLpUrl=$("#pdlink1_"+this.productId).attr("adLpUrl");
            if(typeof(adLpUrl)!="undefined"&&adLpUrl!=""){
//			$.get(adLpUrl, function(){});
                var img= new Image();
                img.src = adLpUrl;
            }
        };
        dealSearchCompareBtn(product);
    }
}
//处理非广告推荐产品立即购买按钮
function dealNonAdProductButtonInfo(product,productDetailUrl,inshop,buyButtonA,currProdInfo,serise){
    var productId = product.productId;
    var pmInfoId = product.pmId;
    var merchantId = product.currentMerchantId;
    var isSnapProduct = currProdInfo.attr("isSnapProduct");
    var isDsjPrice = currProdInfo.attr("dsjPrice");
    var specialBusinessCate=currProdInfo.attr("specialBusinessCate");
    var isGrouponProv = currProdInfo.attr("isGrouponProv");
    var isoversea = currProdInfo.attr("isoversea");
    var isOTCorRX= currProdInfo.attr("isOTCorRX"); //处方药、非处方药
    var isReserve= currProdInfo.attr("isReserve");
    var isSerialCombine = currProdInfo.attr("isSeiralCombine");//系列品构建的组合商品

    if(isGrouponProv) {
        isGrouponProv = parseInt(isGrouponProv);
    } else {
        isGrouponProv = 0;
    }
    if(typeof(productDetailUrl) == "undefined" || productDetailUrl== "undefined"){
        productDetailUrl = $("#pdlink1_"+productId).attr("href");
    }

//	dealSearchCompareBtn(product);
    var _samsMerchantIds = getConfigSamsMerchantIds();
    // 山姆会员价
    var samMemberPrice = product.samMemberPrice;
    var _currMerchantIdStr = "," + merchantId + ",";
    if(samMemberPrice>0 || _samsMerchantIds.indexOf(_currMerchantIdStr)!=-1) {
        buyButtonA.href=productDetailUrl;
        buyButtonA.innerHTML = "查看详情";
        buyButtonA.target = "_blank" ;
        var currProdHasStock = genCurrProdHasStock(productId, product.productStock , product.shoppingcount);
        if (currProdHasStock) {
            dealSoldOut(productId,product,productDetailUrl,inshop,buyButtonA,currProdInfo,serise);

        }
        removeCompareBtn(product);//不能直接加车，不显示对比按钮
        return false;
    }

    //快拍商品跳到详情页
    if(isSnapProduct && isSnapProduct==1) {
        buyButtonA.href=productDetailUrl;
        buyButtonA.innerHTML = "查看详情";
        buyButtonA.target = "_blank" ;
        removeCompareBtn(product);//不能直接加车，不显示对比按钮
        return false;
    }

    //快拍商品跳到详情页
    if(isSerialCombine && isSerialCombine==1) {
        buyButtonA.href=productDetailUrl;
        buyButtonA.innerHTML = "查看详情";
        buyButtonA.target = "_blank" ;
        removeCompareBtn(product);//不能直接加车，不显示对比按钮
        return false;
    }

    //剁手价
    if (isDsjPrice && isDsjPrice != 0) {
        $("#pdlinkcomment_"+productId).attr("href",productDetailUrl);
        buyButtonA.href= productDetailUrl;
        buyButtonA.innerHTML = "立即购买";
        buyButtonA.target = "_blank" ;
        removeCompareBtn(product);//不能直接加车，不显示对比按钮
        return false;
    }
    //根据类目判断 是否跳详情页,0元购机，购机送费，选号类目
    if(specialBusinessCate && specialBusinessCate==1){
        buyButtonA.href= productDetailUrl;
        buyButtonA.innerHTML = "立即购买";
        buyButtonA.target = "_blank" ;
        removeCompareBtn(product);//不能直接加车，不显示对比按钮
        return false;
    }

    // 酒店团购只显示 查看详情
    if(isGrouponProv && isGrouponProv==1) {
        buyButtonA.href = productDetailUrl;
        buyButtonA.innerHTML = "查看详情";
        buyButtonA.target = "_blank" ;
        removeCompareBtn(product);//不能直接加车，不显示对比按钮
        return false;
    }
    //1号店 海购按钮链接跳详情页,处方药，预约 ，手机预约 (非处方药也要加上查看详情 edit by zhangfan)
    if((inshop==0 && isoversea==1)||isOTCorRX!=0||isReserve==1||product.ruleType == 9){
        buyButtonA.href=productDetailUrl;
        buyButtonA.innerHTML = "查看详情";
        buyButtonA.target = "_blank" ;
        removeCompareBtn(product);//不能直接加车，不显示对比按钮
        return false;
    }

    //特殊团购直接跳转到商品详情页
    if(typeof(product.priceChangeRemind)!="undefined" && product.priceChangeRemind == 1) {
        buyButtonA.href=productDetailUrl;
        buyButtonA.innerHTML = "查看详情";
        buyButtonA.target = "_blank" ;
        removeCompareBtn(product);//不能直接加车，不显示对比按钮
        return false;
    }

    //1号抢购直接跳转到商品详情页
    if(typeof(product.ruleType)!="undefined" && product.ruleType == 2 && typeof(product.businessTagId)!="undefined" && product.businessTagId == 16) {
        buyButtonA.href=productDetailUrl;
        buyButtonA.innerHTML = "查看详情";
        buyButtonA.target = "_blank" ;
        removeCompareBtn(product);//不能直接加车，不显示对比按钮
        return false;
    }

    //限购总量，限总量已售完
    if(typeof(product.minLimitType)!="undefined"&& typeof(product.minLimitNum)!="undefined" && product.minLimitType==1 && product.minLimitNum==-1){
        buyButtonA.href=productDetailUrl;
        buyButtonA.innerHTML = "已售完";
        $(buyButtonA).attr("class","notice_btn");
        buyButtonA.target = "_blank" ;
        removeCompareBtn(product);//不能直接加车，不显示对比按钮
        return false;
    }

    buyButtonA.productId = productId;
    buyButtonA.merchantId = product.currentMerchantId;
    buyButtonA.index = $(buyButtonA).attr("index");
    buyButtonA.href=productDetailUrl;
    if (product.productPrice < 0.01 || specialType == 50 ) {
        removeCompareBtn(product);//不能直接加车，不显示对比按钮
        return false; //价格可能有问题 或 电子凭证产品
    }
    var specialType = $(buyButtonA).attr("specialType");
    if(specialType==15 || specialType==16 ||specialType==17 ||specialType==18){
        buyButtonA.onclick = function(event){YHD.alertPrescriotion(16);gotracker('2','btn3_0',this.productId);};
        removeCompareBtn(product);//不能直接加车，不显示对比按钮
        return false;
    }

    // 预售商品只能 查看详情,1号店商品显示“立即预订”
    if(product.ruleType == 5) {
        $(buyButtonA).attr("ruleType", "5"); // 预售的系列商品不能弹出系列商品立即购买的弹框
        buyButtonA.innerHTML = "立即预订";
        buyButtonA.target = "_blank" ;
        removeCompareBtn(product);//不能直接加车，不显示对比按钮
        return false;
    }

    // 定金预售显示“定金预售”
    if(product.ruleType == 8) {
        $(buyButtonA).attr("ruleType", "8"); // 预售的系列商品不能弹出系列商品立即购买的弹框
        buyButtonA.innerHTML = "支付定金";
        buyButtonA.target = "_blank" ;
        removeCompareBtn(product);//不能直接加车，不显示对比按钮
        return false;
    }

    if(typeof (isCityResponse)!= "undefined"&&isCityResponse=='true'&&(product.ruleType == 58||product.ruleType == 9)||isReserve==1) {//城市精选预约预售不展示查看详情
        buyButtonA.innerHTML = "加入购物车";
    }

    //处理吉尼斯记录任务的逻辑
    var isGuinnessFlag = 0;
    if(specialType == -50 && typeof(isGuinnessLogic) != "undefined" && isGuinnessLogic == 1){
        isGuinnessFlag = 1;
    }
    var productShoppingCount = product.shoppingcount==0?1:product.shoppingcount;
    var currProdHasStock = genCurrProdHasStock(productId, product.productStock , product.shoppingcount);
    if (currProdHasStock) {
        //系列产品子品获取库存为0时，则使用虚码id获取产品库存
        dealSoldOut(productId,product,productDetailUrl,inshop,buyButtonA,currProdInfo,serise);
    }else if (product.shoppingcount>1){

        var currProd = $("#pdlink1_"+productId);
        var stockStatusMonitor = currProd.attr("stockStatusMonitor");
        /*if(typeof(isStockMonitor) != "undefined" && isStockMonitor == 1) {
         if ("undefined" != typeof stockStatusMonitor && stockStatusMonitor == 0) {
         //补货未上浮，回调
         var url = URLPrefix.search + "/stockMonitor.do?productId=" + productId + "&provinceId=" + jQuery.cookie("provinceId") + "&errorType=1";
         $.getJSON(url + "&callback=?", function(data){});
         }
         }*/

        if(isGuinnessFlag == 1) {
            buyButtonA.innerHTML = "立即购买";
            buyButtonA.href = productDetailUrl;
            buyButtonA.target = "_blank";
            removeCompareBtn(product);//不能直接加车，不显示对比按钮
            buyButtonA.onclick = function(event){
                var spmData = loli.spm.getData(this);
                spmData["curMerchantId"]=this.merchantId;
                if (pmInfoId > 0) {
                    gotracker(pmInfoId,'btn_'+this.index,this.productId,spmData);
                }else{
                    gotracker('2','btn_'+this.index,this.productId,spmData);
                }
            };
            buyButtonInput(buyButtonA,productShoppingCount,productId);
            return false;
        }

        // 判断是N件购
        buyButtonA.shoppingcount=product.shoppingcount;
        buyButtonA.onclick = function(event){
            var shoppingCart = $(this).parents("#shopping_cart");
            var buyNum =  $(shoppingCart).find("#buyNum_" + this.productId).val();
            if(buyNum == ""||typeof(buyNum)=='undefined'){
                buyNum=product.shoppingcount;
                $(shoppingCart).find("#buyNum_" + this.productId).val(product.shoppingcount);
            }
            $(shoppingCart).find("shopping_act_" + this.productId).attr("shoppingcount",productShoppingCount);
            addToCart(event, this.productId, this.merchantId, buyNum,true,'shopcount_'+this.index);
            if(jQuery.cookie("provinceId")==2) {
                idgTracker._trackPV ('/virtual/addtocart');
            }
            if (pmInfoId > 0) {
                gotracker(pmInfoId,'shopcount_'+this.index,this.productId);
            }else{
                gotracker('2','shopcount_'+this.index,this.productId);
            }
        };
        buyButtonA.target = "" ;
        $(buyButtonA).attr("href","javascript:void(0);");

        buyButtonInput(buyButtonA,productShoppingCount,productId);

        buyButtonA.innerHTML = "加入购物车";
        //电子礼品卡显示"立即购买"
        if(typeof(product)!="undefined" && product.productType==7) {
            $(buyButtonA).attr("userPriceLimitNumber",product.userPriceLimitNumber);  //电子礼品卡限购逻辑处理
            buyButtonA.innerHTML = "立即购买";
            buyButtonA.target = "";
        }
    }else{
        var currProd = $("#pdlink1_"+productId);
        var stockStatusMonitor = currProd.attr("stockStatusMonitor");
        /*if(typeof(isStockMonitor) != "undefined" && isStockMonitor == 1) {
         if ("undefined" != typeof stockStatusMonitor && stockStatusMonitor == 0) {
         //补货未上浮，回调
         var url = URLPrefix.search + "/stockMonitor.do?productId=" + productId + "&provinceId=" + jQuery.cookie("provinceId") + "&errorType=1";
         $.getJSON(url + "&callback=?", function(data){});
         }
         }*/
        //系列商品 不能立即购买
        if (product.productType == 1 ||(product.productType == 2 && serise !=2)){
            var serInfo = $(buyButtonA).parents(".itemBox").find(".series_pro_info_hide").html();
            if(serInfo=="" ||serInfo==null ||serInfo=="undefined"){
                return false;
            }
            buyButtonA.href="javascript:void(0);";
            $(buyButtonA).attr("target","");
            $(buyButtonA).attr("buyModule", "1");
            $(buyButtonA).attr("class", "buy_btn series_pro");
            buyButtonA.onclick = function(event){getSerialAttrs(this);};
            buyButtonA.innerHTML = "加入购物车";
            dealSearchCompareBtn(product);
            return false;
        }

        if(isGuinnessFlag == 1) {
            buyButtonA.innerHTML = "立即购买";
            buyButtonA.href = productDetailUrl;
            buyButtonA.target = "_blank";
            buyButtonA.onclick = function(event){
                var spmData = loli.spm.getData(this);
                spmData["curMerchantId"]=this.merchantId;
                if (pmInfoId > 0) {
                    gotracker(pmInfoId,'btn_'+this.index,this.productId,spmData);
                }else{
                    gotracker('2','btn_'+this.index,this.productId,spmData);
                }
            };

            return false;
        }

        $(buyButtonA).attr("class", "buy_btn");

        buyButtonInput(buyButtonA,productShoppingCount,productId);

        buyButtonA.innerHTML = "加入购物车";
        buyButtonA.href="javascript:void(0);";
        buyButtonA.target = "" ;
        buyButtonA.onclick = function(event){
            var shoppingCart = $(this).parents("#shopping_cart");
            var buyNum=1;
            var buyNum = $(shoppingCart).find("#buyNum_" + this.productId).val();
            if(buyNum == ""||typeof(buyNum)=='undefined'){
                buyNum=1;
                $(shoppingCart).find("#buyNum_" + this.productId).val(buyNum);
            }
            addToCart(event, this.productId, this.merchantId, buyNum, true,'btn_'+this.index);
            if(jQuery.cookie("provinceId")==2) {
                idgTracker._trackPV ('/virtual/addtocart');
            }
            var spmData = loli.spm.getData(this);
            spmData["curMerchantId"]=this.merchantId;
            if (pmInfoId > 0) {
                gotracker(pmInfoId,'btn_'+this.index,this.productId,spmData);
            }else{
                gotracker('2','btn_'+this.index,this.productId,spmData);
            }
        };
        //电子礼品卡显示"立即购买"
        if(typeof(product)!="undefined" && product.productType==7) {
            $(buyButtonA).attr("userPriceLimitNumber",product.userPriceLimitNumber);  //电子礼品卡限购逻辑处理
            buyButtonA.innerHTML = "立即购买";
            buyButtonA.target = "";
        }
        dealSearchCompareBtn(product);

    }

}

function dealSoldOut(productId,product,productDetailUrl,inshop,buyButtonA,currProdInfo,serise){
    //系列产品子品获取库存为0时，则使用虚码id获取产品库存
    if(product.productType == 1 ||(product.productType == 2 && serise !=2)){
        var parentId=$(currProdInfo).attr("parentid");
        var parentStock=0;
        if(parentId>0){
            var busystcok = URLPrefix.busystock ? URLPrefix.busystock : "//busystock.i.yihaodian.com";
            var param="?mcsite="+currSiteId + "&provinceId=" + jQuery.cookie("provinceId") + "&productIds=" + parentId;
            if((typeof(secondAreaFlag)!="undefined" && secondAreaFlag==1)){
                param+="&cityId="+jQuery.cookie("cityId");
                var detailAdd=jQuery.cookie("detail_yhdareas");
                if(detailAdd!=null && "undefined"!=detailAdd){
                    var detailAddArr=detailAdd.split('_');
                    if(detailAddArr.length>=3 && detailAddArr[2]>0){
                        param+="&countyId="+detailAddArr[2];
                    }
                }
            }
            var bsurl= busystcok + "/busystock/restful/truestock";
            jQuery.getJSON(bsurl+param+"&callback=?",function(data){
                if(data && data.length==1){
                    parentProduct = data[0];
                    parentStock=parentProduct.productStock;
                    if(parentStock>0){
                        var currProd = $("#pdlink1_"+productId);
                        var stockStatusMonitor = currProd.attr("stockStatusMonitor");
                        /*if(typeof(isStockMonitor) != "undefined" && isStockMonitor == 1) {
                         if ("undefined" != typeof stockStatusMonitor && stockStatusMonitor == 0) {
                         //补货未上浮，回调
                         var url = URLPrefix.search + "/stockMonitor.do?productId=" + productId + "&provinceId=" + jQuery.cookie("provinceId") + "&errorType=1";
                         $.getJSON(url + "&callback=?", function(data){});
                         }
                         }*/
                        //系列商品立即购买
                        if(currSiteId==1){
                            var serInfo = $(buyButtonA).parents(".itemBox").find(".series_pro_info_hide").html();
                            if(serInfo=="" ||serInfo==null ||serInfo=="undefined"){
                                return false;
                            }
                            buyButtonA.href="javascript:void(0);";
                            $(buyButtonA).attr("target","");
                            $(buyButtonA).attr("buyModule", "1");
                            $(buyButtonA).attr("class", "buy_btn series_pro");
                            buyButtonA.onclick = function(event){getSerialAttrs(this);};
                            buyButtonA.innerHTML = "加入购物车";
                            //电子礼品卡显示"立即购买"
                            if(typeof(product)!="undefined" && product.productType==7) {
                                $(buyButtonA).attr("userPriceLimitNumber",product.userPriceLimitNumber);  //电子礼品卡限购逻辑处理
                                buyButtonA.innerHTML = "立即购买";
                                buyButtonA.target = "";
                            }
                            dealSearchCompareBtn(product);
                            return false;
                        }
                    }else{
                        var currProd = $("#pdlink1_"+productId);
                        var stockStatusMonitor = currProd.attr("stockStatusMonitor");
                        /*if(typeof(isStockMonitor) != "undefined" && isStockMonitor == 1) {
                         if ("undefined" != typeof stockStatusMonitor && stockStatusMonitor == 1) {
                         //售完未下沉，回调
                         var url = URLPrefix.search + "/stockMonitor.do?productId=" + productId + "&provinceId=" + jQuery.cookie("provinceId") + "&errorType=2";
                         $.getJSON(url + "&callback=?", function(data){});
                         }
                         }*/
                        buyButtonA.className ="notice_btn";
                        removeCompareBtn(product);//不能直接加车，不显示对比按钮
                        buyButtonA.innerHTML = "到货通知";
                    }
                }
            });
        }
        return false;
    }else{
        var currProd = $("#pdlink1_"+productId);
        var stockStatusMonitor = currProd.attr("stockStatusMonitor");
        /*if(typeof(isStockMonitor) != "undefined" && isStockMonitor == 1) {
         if ("undefined" != typeof stockStatusMonitor && stockStatusMonitor == 1) {
         //售完未下沉，回调
         var url = URLPrefix.search + "/stockMonitor.do?productId=" + productId + "&provinceId=" + jQuery.cookie("provinceId") + "&errorType=2";
         $.getJSON(url + "&callback=?", function(data){});
         }
         }*/
        buyButtonA.className = "notice_btn";
        buyButtonA.innerHTML = "到货通知";
        removeCompareBtn(product);//不能直接加车，不显示对比按钮
        return false;
    }

}
//定义延时价格函数
function lazyPriceLoaderDefine(ajax) {
    var busystcok = URLPrefix.busystock ? URLPrefix.busystock : "//gps.yhd.com";
    jQuery((function(jQuery) {
        YHD =YHD||{};
        YHD.SPagelazyLoade = new function(){
            var isLoadPromotion = true;
            var lazyLoadDelay = 20; //每次预加载的延迟(ms)
            var isPriceBusy = false;
            var priceCounter = 20;//价格加载数目上限
            var ref=this;
            var lazyLoadPrice;

            var load = function(){
                runfunctions([],[ref.loadPrice],ref);
                if(ref.lazyPrice&&
                    !ref.lazyPrice.length){
                    jQuery(window).unbind("scroll",load);
                }
            };
            this.init = function(x, y){
                jQuery(window).unbind("scroll",load);
                load();
                if (typeof(x)!='undefined' && typeof(y)!='undefined') {
                    window.scrollTo(x, y);
                }
                loli.scroll(load);
            };

            this.pageTop = function(){//计算显示的高度
                return document.documentElement.clientHeight
                    + Math.max(document.documentElement.scrollTop,
                        document.body.scrollTop);
            };

            this.getLazyLoadPrice = function(){  // 获取需要异步加载价格的元素
                lazyLoadPrice=[];
                jQuery("[productid]").each(function(i,product){
                    var obj = new Object();
                    obj.productid = product.getAttribute("productid");
                    obj.top = product.offsetTop;
                    if (!obj.productid) {
                        obj.productid = jQuery(product).attr("productid");
                    }
                    if (!obj.top) {
                        obj.top = jQuery(product).offset().top;
                    }
                    lazyLoadPrice.push(obj);
                });

            };

            this.loadPrice = function(){//加载价格
                if(isPriceBusy)return;
                isPriceBusy = true;
                var threadCount = 0;
                try{
                    //2012-02-13 modify by lizh 由于会造成首页报出脚本错而处理
                    if(!jQuery.cookie("provinceId")){
                        return ;
                    }
                    var pageTop = this.pageTop();
                    if(!lazyLoadPrice){  // 获取需要异步加载价格的元素
                        this.getLazyLoadPrice();
                    }

                    var param="?mcsite="+currSiteId + "&provinceId=" + jQuery.cookie("provinceId");
                    if((typeof(secondAreaFlag)!="undefined" && secondAreaFlag==1)){
                        param+="&cityId="+jQuery.cookie("cityId");
                        var detailAdd=jQuery.cookie("detail_yhdareas");
                        if(detailAdd!=null && "undefined"!=detailAdd){
                            var detailAddArr=detailAdd.split('_');
                            if(detailAddArr.length>=3 && detailAddArr[2]>0){
                                param+="&countyId="+detailAddArr[2];
                            }
                        }
                    }
                    var prices=[];  // 本次请求中不需要处理的商品。存储在lazyLoadPrice中，下次请求时再处理。
                    jQuery.each(lazyLoadPrice,function(i,price){  // 循环获取待请求商品的productid作为参数
                        if (priceCounter > threadCount && price.top <= pageTop + 400) {
                            param += "&productIds=" + price.productid;
                            threadCount++;
                        }else{
                            prices.push(price);
                        }
                    });
                    lazyLoadPrice=prices;
                    if(threadCount>0){
                        try{
                            //异步取价格
                            var url=busystcok + "/busystock/restful/truestock";
                            jQuery.getJSON(url+param+"&callback=?",function(data){
                                loadCompleteProductsInfo(data,1,ajax);
                            });
                        }catch(e){}
                    }

                    // promotion 信息是一次加载完，所以此处我们只调用一次。
                    if(isLoadPromotion && requestType != '70' && requestType != '75' && requestType != '76' && flagView != 2) {
                        count = 0;
                        countMall= 0;
                        setTimeout("getPromotionInfo()", 1000);
                        isLoadPromotion = false;
                    }

                }catch(e){
                    setTimeout("YHD.SPagelazyLoade.loadPrice()", lazyLoadDelay);
                }
                if (threadCount >= priceCounter){
                    setTimeout("YHD.SPagelazyLoade.loadPrice()", lazyLoadDelay);
                }
                isPriceBusy = false;
            };
        };
    })(jQuery));
}


/**
 * 处理因特殊情况，不进行直接操作按钮业务的同类推荐业务
 */
function dealRecommendProdsWithoutButton(product, inshop,currProdInfo) {
    if (product.productStock <= 0) {
        var provinceId = jQuery.cookie("provinceId");
        var productId = product.productId;
        //系列产品子品获取库存为0时，则使用虚码id获取产品库存
        if(product.productType == 1 ||product.productType == 2){
            var parentId=$(currProdInfo).attr("parentid");
            var parentStock=0;
            if(parentId>0){

                var busystcok = URLPrefix.busystock ? URLPrefix.busystock : "//gps.yhd.com";
                var param="?mcsite="+currSiteId + "&provinceId=" + provinceId + "&productIds=" + parentId;
                if((typeof(secondAreaFlag)!="undefined" && secondAreaFlag==1)){
                    param+="&cityId="+jQuery.cookie("cityId");
                    var detailAdd=jQuery.cookie("detail_yhdareas");
                    if(detailAdd!=null && "undefined"!=detailAdd){
                        var detailAddArr=detailAdd.split('_');
                        if(detailAddArr.length>=3 && detailAddArr[2]>0){
                            param+="&countyId="+detailAddArr[2];
                        }
                    }
                }
                var bsurl= busystcok + "/busystock/restful/truestock";
                jQuery.getJSON(bsurl+param+"&callback=?",function(data){
                    if(data && data.length==1){
                        parentProduct = data[0];
                        parentStock=parentProduct.productStock;
                        if(parentStock <= 0){
                            if(flagView==2){
                                sellOutProduct(productId,currProdInfo);
                            }else{
                                dealRecommendProds(inshop, productId, provinceId,currProdInfo);
                            }
                        }
                    }
                });
            }
        } else {
            if(flagView==2){
                sellOutProduct(productId,currProdInfo);
            }else{
                dealRecommendProds(inshop, productId, provinceId,currProdInfo);
            }
        }
    }

}

/**
 * 店铺模式下，处理无库存
 */
function sellOutProduct(productId,currProdInfo){
    var $searchItemBox = $(currProdInfo).parents("#itemSearchResultCon_" + productId);
    var recomHtml = $searchItemBox.find(".sideUp");
    //移除小图模式图片
//	var picHtml = recomHtml.find("#crumb456");
    if(typeof(recomHtml) != "undefined"){
        recomHtml.remove();
    }

    /*var sellOutHtml = recomHtml.find(".sellOut");
     if(typeof(sellOutHtml) != "undefined"){
     sellOutHtml.remove();
     }
     var titleHtml = recomHtml.html();
     var tempHtml = '<p class="sellOut">已售完</p>'+titleHtml;
     $searchItemBox.find(".sideUp").html(tempHtml);*/

    $searchItemBox.find("#sellOut_s").addClass("sellOut_s").html('<p class="n">已售完</p><u class="bg"></u>');
    /*var h = $searchItemBox.find(".sideUp").outerHeight(true);
     $searchItemBox.find(".sideUp").css("bottom",-h);
     $searchItemBox.find(".sideUp").animate({bottom:-h}, 100);*/
}

/**
 * 处理同类推荐
 * @param inshop
 * @param productId
 * @param provinceId
 * @param ref
 */
function dealRecommendProds(inshop, productId, provinceId,currProdInfo) {
    //if(inshop == 0) { // 可展示同类推荐的类目 下 自营商品
    var $searchItemBox = $(currProdInfo).parents("#itemSearchResultCon_" + productId);
    var recom_url = "//pms.yhd.com/similarpro/" + productId + "_" + provinceId;
    var recom_html = "";

    var recomHtml = $searchItemBox.find(".sideUp");
    var tempHtml = '<span class="s1">已售完</span><a class="s2" href="' + recom_url
        +'" target="_blank" onClick="addTrackPositionToCookie(\'1\',\'search_recommend_' + productId
        + '\');">找相似<i class="ico iconSearch">&#xe60d;</i></a><u class="bg"></u></div>';
    if(recomHtml.length==0) {
        recom_html = '<div class="sideUp sellOut">'+tempHtml+'</div>';
        $searchItemBox.after(recom_html);
    }else {
        $searchItemBox.find(".sideUp").html(tempHtml);
        $searchItemBox.find(".sideUp").removeClass('styleBox').addClass("sellOut");
        $searchItemBox.find(".sideUp").attr("style","");
    }
    //}
}

/**
 * @param product bs返回的商品对象
 * 角标处理
 */
function dealTags(product) {
    if(typeof (isCityResponse)!= "undefined"&&isCityResponse=='true'){
        return;
    }
    var tag_type = ""; // 1, 名片特卖; 2, 团购;
    var productId = product.productId;
    var currProdInfo = $("#pdlink1_"+productId);
    var currProdMainInfo=$("#pdlink2_"+productId);
    var inshop=$("#shop_"+productId).val();
    var currPrice=$("#price0_"+productId);
    var pmInfoId = product.pmId;
    var isGrouponProv = currProdInfo.attr("isGrouponProv");
    if(isGrouponProv) {
        isGrouponProv = parseInt(isGrouponProv);
    } else {
        isGrouponProv = 0;
    }

    var rtnType = dealSamMerchantProdTag(product);
    if(rtnType == 1) {
        return tag_type;
    }

    var specialType = jQuery('#buyButton_' + productId).attr("specialType");
    //促销搜索页，抵用劵页不显示角标
    if(requestType != '70' && requestType != '75' && requestType != '76') {
        // 团购标识     标签优先级：海外直邮>闪购  > 团购标识  > [价格斗士] > 热卖 >  进口  >  新品
        if (product.ruleType == 7) {
            if(tagsSwitch==1){	//闪购团购标签开关
//				if (currProdInfo.siblings("sup").length > 0){
//					if(currProdInfo.siblings("sup").html() != "1号海购"
//						&& currProdInfo.children("sup").html() != "预约"
//							&& currProdInfo.children("sup").html() != "贵1赔20"){
//						currProdInfo.siblings("sup").text("闪购");
//						currProdInfo.siblings("sup").attr("class","ico_search_list");
//						tag_type = "1";
//					}
//				} else if(currProdInfo.parent().find(".sixdc").length==0){//大促标签不存在时
//					currProdInfo.before("<sup class='ico_search_list'>闪购</sup>");
//					tag_type = "1";
//				}
            }else{
            }
        } else if (product.ruleType == 2) {
            $("#promotion_" + pmInfoId).attr("ruleType", "2"); // 团购商品不显示促销信息
            $("#promotion_" + pmInfoId).attr("mutexPromotion", product.mutexPromotion);

            if(tagsSwitch==1){	//闪购团购标签开关
//				if(currProdInfo.siblings("sup").length > 0){
//					if(currProdInfo.siblings("sup").html() != "低50"
//							&&currProdInfo.siblings("sup").html() != "1号海购"
//								&& currProdInfo.children("sup").html() != "预约"
//									&& currProdInfo.children("sup").html() != "贵1赔20"){
//						currProdInfo.siblings("sup").attr("class","ico_search_list").text("团购");
//						tag_type = "2";
//					}
//				}else if(currProdInfo.parent().find(".sixdc").length==0){//大促标签不存在时
//					currProdInfo.before("<sup class='ico_search_list'>团购</sup>");
//					tag_type = "2";
//				}
            }else{
            }
        }else{
        }

        //省心价
        if(typeof(warMartMerchantId) != "undefined" && product.currentMerchantId==warMartMerchantId && product.ruleId!=null && currPrice.siblings("span").html()!="省心价" ){
            currPrice.before("<span class='sxj'>省心价</span>");
        }


        if(product.ruleType == 5||product.ruleType == 8||product.ruleType == 9){//预售=58，预约=9
            if(!currProdInfo.prev().hasClass("sixdc")){//大促标签不存在时
                var currTag=currProdInfo.prev().find(".ico_search_list");
                if(currTag.length>0){
                    currTag.remove();
                }
                if(product.ruleType == 5||product.ruleType == 8){
                    currProdInfo.append("<span class='ico_search_list'>预售</span>");
                }else{
                    currProdInfo.append("<span class='ico_search_list'>预约</span>");
                }
            }
        }
    }

//	if(isGrouponProv && isGrouponProv==1 && tagsSwitch==1) {
//		// bs如果没刷团购角标，需要根据索引数据刷一次
//		if(currProdInfo.siblings("sup").length > 0){
//			if(currProdInfo.siblings("sup").html() != "低50"
//					&&currProdInfo.siblings("sup").html() != "1号海购"
//						&& currProdInfo.siblings("sup").html() != "团购"
//							&& currProdInfo.children("sup").html() != "预约"
//								&& currProdInfo.children("sup").html() != "贵1赔20"){
//				currProdInfo.siblings("sup").attr("class","ico_search_list").text("团购");
//				tag_type = "2";
//			}
//		} else if(currProdInfo.parent().find(".sixdc").length==0){//大促标签不存在时
//			currProdInfo.before("<sup class='ico_search_list'>团购</sup>");
//			tag_type = "2";
//		}
//	}

    return tag_type;
}

/** 山姆会员打标*/
function dealSamMerchantProdTag(product) {
    // 山姆会员商品ID
    var _samsMerchantIdsStr = getConfigSamsMerchantIds();

    var productId = product.productId;
    var currProdInfo = $("#pdlink1_"+productId).parent();

    var merchantIdStr = "," + product.currentMerchantId + ",";

    if(_samsMerchantIdsStr.indexOf(merchantIdStr) != -1 && currProdInfo.parent().find(".sixdc").length==0) {
        var samsMerchantTagHTML = '<p class="ico_abs"><span class="ico_search_list sams">sams会员</span></p>';
        if(currProdInfo.find(".ico_abs").length > 0) {
            currProdInfo.find(".ico_abs").remove();
        }
        if(currProdInfo.find(".ico_search_list").length > 0) {
            currProdInfo.find(".ico_search_list").remove();
        }
        currProdInfo.prepend(samsMerchantTagHTML);
        return 1;
    }

    return 0;
}

/**获取后台配置的山姆会员商家ID，并做格式加工*/
function getConfigSamsMerchantIds() {
    // 山姆会员商品ID
    var _samsMerchantIdsStr = "";
    if(typeof samsMerchantIdsConfig != "undefined" && samsMerchantIdsConfig.length > 0) {
        _samsMerchantIdsStr = samsMerchantIdsConfig;
        if(_samsMerchantIdsStr.indexOf(",") != 0) {
            _samsMerchantIdsStr = "," + _samsMerchantIdsStr;
        }
        var _samsMerchantIdsStrLength = _samsMerchantIdsStr.length;
        if(_samsMerchantIdsStr.lastIndexOf(",") != (_samsMerchantIdsStrLength-1)) {
            _samsMerchantIdsStr = _samsMerchantIdsStr + ",";
        }
    }

    return _samsMerchantIdsStr;
}

/**
 * 处理曝光tracker，主要是需要页面刷新角标的
 * @param data
 * @returns {Boolean}
 */
function dealTagTracker(data) {

    var tagTopProductsId = topProductsId||'';
    var len=data.length;
    var tags_switch = tags_expose_tracker_switch || 0;
    for (var i = 0; i < len; i++) {
        var product = data[i];
        if (product == null) return false; //不可见商品
        if (product.productId == null) return false; //不可见商品
        if (product.productStock == -1) return false; //未知
        if (product.currentMerchantId == -1) return false; //未知
        if (product.productPrice == -1) return false; //未知

        var tag_type = dealTags(product);

        if(tags_switch && tags_switch==1) {
            var pmInfoId = product.pmId;

            // 角标曝光tracker
            if(tag_type && tag_type!="") {
                var currTagStart = tagTopProductsId.indexOf(pmInfoId);
                if(currTagStart != -1) {
                    var startString = tagTopProductsId.substring(0, currTagStart);
                    var lastString = tagTopProductsId.substring(currTagStart);
                    var splitIndex = lastString.indexOf(',');
                    if(splitIndex == -1) {
                        splitIndex = lastString.length;
                    }
                    var currProdTracker = lastString.substring(0, splitIndex);
                    if(splitIndex == -1) {
                        lastString = '';
                    } else {
                        lastString = lastString.substring(splitIndex);
                    }
                    if(currProdTracker != '') {
                        var currArr = currProdTracker.substring(0, currProdTracker.lastIndexOf("_"));
                        currProdTracker = currArr + '_' + tag_type + ',';
                        tagTopProductsId = startString + currProdTracker + lastString;
                    }
                }
            }
        }
    }

    //促销搜索页，抵用劵页不显示角标
    if(!(tags_switch && tags_switch==1) || requestType != '70' && requestType != '75' && requestType != '76') {
        // recordTrackInfoWithType("1","search_productIds_exposure",tagTopProductsId);
    }
}


/**
 * 处理曝光tracker，主要是需要页面刷新角标的，商品缺货状态
 * @param data
 * @returns {Boolean}
 */
function dealTagTracker2(data,ajax) {
    var tagTopProductsId = topProductsId||'';
    var searchProductExposureId = "";
    if(ajax==0){//页面刷新
        searchProductExposureId = searchProductExposure;
    }if(ajax==1){//懒加载
        searchProductExposureId=searchProductExposure+","+moreSearchProductExposure;
    }else if(ajax==2){//翻页、排序等局部刷新
        // 通过json获取页面其他部分需要更新的数据(比如搜索结果数目)，进行刷新
        if ($("#jsonValue").length == 1) {
            eval("var json_data=" + $("#jsonValue").val());
            eval("var json_url_data=" + $("#jsonUrlValue").val());
            searchProductExposureId=json_data.turnPageSearchProductExposure;
            searchProductExposure=json_data.turnPageSearchProductExposure;
        }
    }
    var len=data.length;
    var tags_switch = tags_expose_tracker_switch || 0;
    var prodTrackerStr="";
    for (var i = 0; i < len; i++) {
        var product = data[i];
        if (product == null) return false; //不可见商品
        if (product.productId == null) return false; //不可见商品
        if (product.productStock == -1) return false; //未知
        if (product.currentMerchantId == -1) return false; //未知
        if (product.productPrice == -1) return false; //未知

        var tag_type = dealTags(product);
//		var productId=product.productId;
        var pmInfoId = product.pmId;
        var currTagStart = searchProductExposureId.indexOf(pmInfoId);
        if(currTagStart != -1) {
            var startString = searchProductExposureId.substring(0, currTagStart);
            var lastString = searchProductExposureId.substring(currTagStart);

            var splitIndex = lastString.indexOf(',');
            if(splitIndex == -1) {
                splitIndex = lastString.length;
            }
            var currProdTracker = lastString.substring(0, splitIndex);
            //		currProdTracker.replace(productId,pmInfoId);
            if(splitIndex == -1) {
                lastString = '';
            } else {
                lastString = lastString.substring(splitIndex);
            }

            if(currProdTracker != '') {
                if(tags_switch && tags_switch==1&&tag_type && tag_type!=""){//是否需要更改tagId
                    var currArr = currProdTracker.substring(0, currProdTracker.lastIndexOf("_"));
                    currProdTracker = currArr + '_' + tag_type;
                }

                if(product.productStock <= 0){//判断商品缺货状态
                    stockStatusStr="_"+0;
                }else{
                    stockStatusStr="_"+1;
                }

                prodTrackerStr=prodTrackerStr+currProdTracker+stockStatusStr+",";
                //	tagTopProductsId = startString + currProdTracker + lastString;
            }
        }
    }

    var reg1=/^,/;
    var reg2=/,$/;
    prodTrackerStr=prodTrackerStr.replace(reg1,"").replace(reg2,"");
    //促销搜索页，抵用劵页不显示角标
    if(prodTrackerStr!='' && requestType != '70' && requestType != '75' && requestType != '76') {
        // recordTrackInfoWithType("1","search_productIds_exposure",prodTrackerStr);
    }
}


/**
 * 刷前8个商品的客服图标
 */
function dealTopOnlineChat(){
    for(var i=0;i<8;i++) {
        var currPro=$('.mod_product_list .mod_search_pro').eq(i);
        //流百类且开关为开时，添加在线客服
        if (typeof (fashionCateType) != "undefined" && fashionCateType == 1
            && typeof (onlineChatSwitch) != "undefined"	&& onlineChatSwitch == 1) {
            var storeObj=currPro.find(".storeName a");
            (function(storeObj) {
                    var inshop=storeObj.attr("inshop");
                    var onChatSize=storeObj.parent().find("#onlineChatSpan").size();//当前在线客服元素个数
                    var flag=storeObj.attr("flag");//是否已经发出过请求
                    var productId=storeObj.attr("prodId");
                    var merchantId=storeObj.attr("merchantId");
                    if(inshop==1&&onChatSize<1&&typeof(flag) == "undefined"&&typeof(productId) !="undefined"&&typeof(merchantId) !="undefined"){
                        storeObj.attr("flag",1);
                        var positionId=19;  //搜索的为19
                        var storeUrl = "//webim.yhd.com/checkPoint/showPoint/"
                            + merchantId + "/" + positionId + "/"
                            + productId + "/0/3.action?jsonpCallback=?"
                            + "&isShake=0&iconType=search_small";
                        try{
                            $.getJSON(storeUrl,function(data) {
                                //1,验证返回值信息，为数字，表示商家未开通。
                                //alert(1);
                                if(/^[0-9]*$/.test(data)){
                                    //商家未开通在线客服功能
                                }
                                //2,按钮显示
                                try{
                                    storeObj.after('<span class="im"></span>');
                                    storeObj.next().html(data);
                                    storeObj=null;
                                }catch(e){
                                }
                            });
                        }catch(e1){
                        }
                    }
                }
            )(storeObj);
        }
    }
}

function removeCompareBtn(product){
    var _compareCategoryFlag = 0;
    if("undefined"!=typeof compareCategoryFlag && compareCategoryFlag!="") {
        _compareCategoryFlag = parseInt(compareCategoryFlag);
    }
    if(_compareCategoryFlag==0){
        return;
    }

    var productId = product.productId;
    var buttonA = jQuery('#buyButton_' + productId);

    var curCompareBtn=jQuery('#buyButton_' + productId).parent(".shopping_act").find(".contrast");
    if(curCompareBtn!="undefinded" && curCompareBtn.length>0){
        curCompareBtn.remove();
    }
}

function dealSearchCompareBtn(product) {
    var _compareCategoryFlag = 0;
    if("undefined"!=typeof compareCategoryFlag && compareCategoryFlag!="") {
        _compareCategoryFlag = parseInt(compareCategoryFlag);
    }
    var productId = product.productId;
    var buttonA = jQuery('#buyButton_' + productId);
//    if(buttonA.siblings(".contrast").size() > 0) { // 防止加载后36个的时候，将前36个再此计算
    if( _compareCategoryFlag==0
//		|| (buttonA.siblings(".contrast").size() > 0  && buttonA.attr("compBtnloaded")!="undefined" && buttonA.attr("compBtnloaded")=="1")
    ){
        return ;
    }

    if((requestType=='10'||requestType=='20'||requestType=='30'||requestType=='620')
        && _compareCategoryFlag==1 && buttonA.html()=="加入购物车") {
        var compareBtnHTML = "";
        if(buttonA.hasClass("series_pro")) {
            var aClass = "contrast serialPro";
            var subProdIdStr = $("#subProductIdStrToAction_"+productId).attr("subProductIdStr");
            var subId = 0;
            if(subProdIdStr != "") {
                subProdIdStr = "," + subProdIdStr;
                var isCompare = false;
                var searchCompareIds = jQuery.cookie("search_compare_products");
                if(searchCompareIds) {
                    searchCompareIds = searchCompareIds.split(",");
                    $.each(searchCompareIds, function(i, n){
                        var idStr = "," + n + ",";
                        if(subProdIdStr.indexOf(idStr) != -1) {
                            isCompare = true;
                            subId = n;
                            return;
                        }
                    });
                }
                if(isCompare) {
                    aClass = "contrast serialPro select";
                }
            }

            compareBtnHTML = '<a href="javascript:void(0);" class="' + aClass + '" data-val="' + subId + '" parentId="' + productId + '">对比</a>';
        } else {
            var linkA = $("#pdlink1_" + productId);
            var src = linkA.children("img").attr("src");
            if(src == "") {
                src = linkA.children("img").attr("original");
            }
            var link = linkA.attr("href");
            var txt = $("#pdlink2_" + productId).attr("title");
            compareBtnHTML = '<a href="javascript:void(0);" class="contrast" data-val="'+ productId +'"  '
                +'data-msg="{src:\''+ src +'\',link:\''+link+'\',price:\''+product.productPrice+'\',txt:\''+txt+'\'}">对比</a>';
            var buyNumHTML = jQuery('#buyButton_' + productId).parent(".shopping_act").prev(".shopping_num");
            if(buyNumHTML) {
                buyNumHTML.remove();
            }

            var isCompare = false;
            var searchCompareIds = jQuery.cookie("search_compare_products");
            if(searchCompareIds) {
                searchCompareIds = searchCompareIds.split(",");
                if($.inArray(productId.toString(), searchCompareIds) != -1) {
                    isCompare = true;
                }
            }

            if(isCompare){ // 如果当前被选中,是否在cookie中
                compareBtnHTML = compareBtnHTML.replace("contrast", "contrast select");
            }
        }
        var curCompareBtn=jQuery('#buyButton_' + productId).parent(".shopping_act").find(".contrast");
        if(curCompareBtn!="undefinded" && curCompareBtn.length>0){
            curCompareBtn.replaceWith(compareBtnHTML);
        }else{
            jQuery('#buyButton_' + productId).parent(".shopping_act").append(compareBtnHTML);
        }

        buttonA.attr("compBtnloaded","1");
    }
}

/**
 * 判断当前页面是否开放三级区域
 * @returns {Boolean}
 */
function genMultiAreaFiterFlag() {
    var _filterByMultiAreasFlag = 0; // 当前类目是否开放三级区域筛选功能
    if("undefined"!=typeof filterByMultiAreasFlag && filterByMultiAreasFlag!="") {
        _filterByMultiAreasFlag = parseInt(filterByMultiAreasFlag);
    }

    // 若当前类目为开放三级区域筛选类目,再判断三级区域信息是否完整
    if(_filterByMultiAreasFlag == 1) {

        var provinceId = jQuery.cookie("provinceId");
        var search_address_info = jQuery.cookie("detail_yhdareas");
        if("undefined" == typeof provinceId) {
            provinceId = 1;
        }
        var areas = [];
        if(search_address_info) {
            areas = search_address_info.split("_");
        }
        if(areas.length==6 && provinceId==areas[0]
            && areas[1]>0 && areas[2]>0) {
            return true;
        }
    }
    return false;
}

//计算当前sku是否有库存：若当前为开放三级区域的页面，则使用三级区域下的库存判断。若三级区域库存信息有误，则使用省份库存信息判断。
// true:无库存； false：有库存
function genCurrProdHasStock(productId, proudctStock, shoppingCount) {
    var isMultiAreaFiter = genMultiAreaFiterFlag();
    var provinceStock = proudctStock <= 0 || (shoppingCount>1 && proudctStock < shoppingCount);
    if(isMultiAreaFiter) {
        var currProd = $("#pdlink1_"+productId);
        var multiAreaStock = currProd.attr("multiAreaStock");
        if("undefined"==typeof multiAreaStock || multiAreaStock=='') {
            return provinceStock;
        } else {
            try{
                multiAreaStock = parseInt(multiAreaStock);
            } catch(e) {
                return provinceStock;
            }
            return multiAreaStock<=0;
        }
    } else {
        return provinceStock;
    }
}

/**
 *处理商品促销信息与定金预售互斥
 * @param product
 */
function handleMutexPromotion(product) {
    var proIdObj=$("#promotion_"+product.pmId);
    if(proIdObj.length>0&&product.mutexPromotion==1){
        var productId=product.productId;
        //隐藏促销信息
        $(proIdObj).parent(".item_promotion_text").attr("style","display:none");
        //有基本副标题时，显示副标题，若无副标题显示主标题
        if(($(proIdObj).attr("pnameSubtitle") != null
            && jQuery.trim($(proIdObj).attr("pnameSubtitle")) != '')){
            $("#pdlink3_"+productId).attr("style","");
        }else{
            $("#pdlink2_"+productId).attr("class","mainTitle");
        }
    }
}

/**
 *  加车按钮旁边的起购数量input处理
 * @param buyButtonA 加车按钮
 * @param productShoppingCount 起购数量
 * @param productId 商品ID
 */
function buyButtonInput(buyButtonA,productShoppingCount,productId) {
    $(buyButtonA).attr("shoppingcount",productShoppingCount);
    if($(buyButtonA).parent().attr("isnumBuy")==0){
        var htmlStr = '<div class="shopping_num">' +
            '<input type="text" value="' + productShoppingCount + '" id="buyNum_' + productId + '"  onKeyup="var key=event.keyCode;checkBuyNum(this, key)">' +
            '<span>' +
            '<a class="add"  onClick="modifyBuyNum(this,+1);gotracker(\'2\', \'plus_' + buyButtonA.index + '\',' + productId + ');">加</a>' +
            '<a class="dis_decrease" href="javascript:void(0);" onclick="modifyBuyNum(this,-1);gotracker(\'2\', \'minus_' + buyButtonA.index + '\',' + productId + ');">减</a>' +
            '</span></div>';
        $(buyButtonA).parent().attr("isnumBuy",1);
        $(buyButtonA).parent().attr("shoppingcount",productShoppingCount);
        var curBuyNum=$(buyButtonA).parent().parent().find(".shopping_num");
        if("undefined"==typeof compareCategoryFlag || compareCategoryFlag==0) {
            if(curBuyNum!="undefined" && curBuyNum.length>0){
                curBuyNum.replaceWith(htmlStr);
            }else{
                $(buyButtonA).parent().before(htmlStr);
            }
        }
    }
}


/*
 * 左侧类目
 */
var jsCategoryFed = {

    ie6: !$.support.leadingWhitespace,

    /**
     * 导购属性区，
     */
    guideCategory : function() {
        //类目更多
        var _cate = $(".mod_search_guide .classWrap"),
            _guideCon = _cate.find('.guide_con'),
            _more = _cate.find(".more_open"),
            _close = _cate.find(".more_close"),
            o_height = _cate.find(".guide_box").height(),
            _notRelevCateLis = _guideCon.find("li.notRelevCate");
        //隐藏不相关类目
        _notRelevCateLis.hide();

        // 类目行点击更多、收起
        _more.click(function(e){
            o_height = _cate.find(".guide_box").height();
            e.preventDefault();
            if(_notRelevCateLis.length > 0) {
                _notRelevCateLis.show();
            }
            $(this).hide();
            $(this).next(".more_close").show();
            var height = $(this).parents(".guide_box").find(".guide_con").outerHeight(true);
            $(this).parents(".guide_box").height(height).find(".guide_main").css("height","auto");
        });
        _close.click(function(){
            if(_notRelevCateLis.length > 0) {
                _notRelevCateLis.hide();
            }
            $(this).prev(".more_open").show();
            $(this).hide();
            $(this).parents(".guide_box").height(34);
            $(this).parents(".guide_box").find(".guide_main").css("height","auto");
        });

        //更多类底边距
        var mc = $('.mod_search_guide .more_btn');
        function mcT(){
            mc.parents('.mod_search_guide').css('margin-bottom','35px')
        }
        mc.length == 1 ? mcT() : null;
        mc.click(function(){
            var _ico = mc.find(".ico");
            if(_ico.hasClass("down")) {
                mc.find("a").html("更多类目<i class='ico'></i>");
                mc.parents('.mod_search_guide').find(".classWrap > .guide_box ").slice(8).addClass("hide");
            } else {
                mc.parents('.mod_search_guide').find(".classWrap > .hide").removeClass("hide");
                mc.find("a").html("收起类目<i class='ico down'></i>");
            }
        });

    },

    /* *
     *
     * 搜索面包屑导航
     *
     * */
    crumbSearch : function(){
        var _input_keyword = $(".mod_search_crumb .crumb_search .input_keyword"),
            crumb_search = $(".mod_search_crumb .crumb_search"),
            btn_search = $(".mod_search_crumb .crumb_search .btn_search"),
            search_crumb=$(".mod_search_crumb"),
            crumb_list_num=$(".mod_search_crumb").find('.crumb_list > .crumb_list_title').length;

        //五级类目页，隐藏面包屑一级类目
        if(crumb_list_num==4){
            var a=$(".mod_search_crumb").find('.crumb_list > .crumb_all_title a').length;
            var b=$(".mod_search_crumb").find('.crumb_list > .crumb_all_title a').text();

            if(a>0&&b!="全部结果"){
                $(".mod_search_crumb").find('.crumb_list > .crumb_all_title a').parent().parent().next().hide();
                $(".mod_search_crumb").find('.crumb_list > .crumb_all_title a').parent().parent().hide();
            }
        }

        // 面包屑搜索
        btn_search.click(function(){
            var keyword = _input_keyword.val(),
                category = $(this).attr("category");
            naviCategory = $(this).attr("naviCategory");
            virtualCategory = $(this).attr("virtualCategory");
            var merchantId = $(this).attr("merchantId");
            if(!naviCategory) {
                naviCategory = 0;
            }
            if(!virtualCategory) {
                virtualCategory = 0;
            }
            if(!merchantId){
                merchantId = 0;
            }
            var defualtKeyword = "在结果中查找";
            if(merchantId>0){
                defualtKeyword = "在店铺中查找";
            }
            // addTrackPositionToCookie('1','nav_crumb');
            if(keyword != "" && keyword != defualtKeyword){
                if(requestType == '70' || requestType == '75' ) {
                    var tempUrl = window.location.href;
                    if(tempUrl.indexOf("#")>0) {
                        tempUrl = tempUrl.substring(0, tempUrl.indexOf("#"));
                    }
                    if(tempUrl.indexOf("crumbKeyword=")>0) {
                        tempUrl = tempUrl.substring(0, tempUrl.indexOf("crumbKeyword=")-1);
                    }
                    var tempInputWord = "?crumbKeyword=";
                    if(tempUrl.indexOf("?")>0) {
                        tempInputWord = "&crumbKeyword=";
                    }
                    // addTrackPositionToCookie('1','search_keyword_promo');
                    window.location = tempUrl + tempInputWord + encodeURIComponent(encodeURIComponent(keyword))+"/";
                }
                else if(virtualCategory>0) {
                    if(merchantId>0){
                        window.location =URLPrefix.search + urlS2 + "/vc" + virtualCategory + "/c" + category +"/b/a-s1-v4-p1-price-d0-mid"+merchantId+"-f0-k"+ encodeURIComponent(encodeURIComponent(keyword))+"/";
                    }else{
                        window.location =URLPrefix.search + urlS2 + "/vc" + virtualCategory + "/c" + category + "/k" + encodeURIComponent(encodeURIComponent(keyword))+"/";
                    }

                }
                else {
                    if( merchantId>0){
                        window.location = searchCategoryUrl + urlS2 + "/c" + category + "-0-" + naviCategory +"/b/a-s1-v4-p1-price-d0-f0-m1-rt0-pid-mid"+merchantId+"-k"+ encodeURIComponent(encodeURIComponent(keyword))+"/";
                    }else{
                        window.location = searchCategoryUrl + urlS2 + "/c" + category + "-0-" + naviCategory + "/k" + encodeURIComponent(encodeURIComponent(keyword))+"/";
                    }
                }
            }/*else{
             window.location = URLPrefix.search + "/s2/c" + category + "-0/";
             }*/
        });

        _input_keyword.focus(function(){
            var merchantId = $(this).attr("merchantId");
            if(!merchantId){
                merchantId = 0;
            }
            var defualtKeyword = "在结果中查找";
            if(merchantId>0){
                defualtKeyword = "在店铺中查找";
            }
            crumb_search.addClass("select");
            /*s 搜索框清空*/
            if($(this).val() != defualtKeyword){
                $(".btn_clear").show();
                var keyword = $(this).val(),
                    category = $(this).attr("category"),
                    naviCategory = $(this).attr("naviCategory"),
                    virtualcategory=$(this).attr("virtualcategory");
                $(".mod_search_crumb .crumb_search").delegate('.btn_clear' , 'click' , function(){
                    if(category>0||naviCategory>0||virtualcategory>0){
//                		var currUrl=window.location.href;
//                    	//var re = /\/k.*(\|)/;
//                    	var re = /\/k.*(\||(\%7C|c))/;     //去掉以“/k”开头，“|”或者“%7C”结尾的字符串
//                    	currUrl=currUrl.replace(re,"");

                        var currUrl=window.location.href;
                        var re = /(\/||\-)k.*\//;     //去掉以“/k”开头，“|”或者“%7C”结尾的字符串

                        var turnUrl="";
                        //去掉以“/k”开头，“|”或者“%7C”结尾的字符串
                        if(currUrl.indexOf("/k")!=-1){
                            turnUrl=currUrl.replace(re,"/k/");
                        } else if (currUrl.indexOf("-k")!=-1){
                            turnUrl=currUrl.replace(re,"-k/");
                        }

                        if(turnUrl==currUrl){//关键字后没有"/"
                            var re = /(\/||\-)k.*/;
                            //去掉以“/k”开头，“|”或者“%7C”结尾的字符串
                            if(currUrl.indexOf("/k")!=-1){
                                turnUrl=currUrl.replace(re,"/k/");
                            } else if (currUrl.indexOf("-k")!=-1){
                                turnUrl=currUrl.replace(re,"-k/");
                            }
                        }
                        if(turnUrl!=""){
                            location.href = turnUrl;
                        }
                    }else{
                        _input_keyword.val("");
                        _input_keyword.focus();
                    }
                });
            }else if($(this).val()  == defualtKeyword){
                $(this).val("");
            }else if($(this).val() == ""){
                $(".btn_clear").hide();
            }
            /*e 搜索框清空*/
        }).blur(function(){
            var merchantId = $(this).attr("merchantId");
            var keyword = $(this).attr("currKw"),
                category = $(this).attr("category"),
                naviCategory = $(this).attr("naviCategory");

            if(!merchantId){
                merchantId = 0;
            }
            var defualtKeyword = "在结果中查找";
            if( merchantId>0){
                defualtKeyword = "在店铺中查找";
            }
            crumb_search.removeClass("select");
            if($(this).val() == ""){
                //只有关键词
                if(typeof(keyword) != "undefined" && ""!=keyword){
                    $(this).val(keyword);
                }else{
                    $(this).val(defualtKeyword);
                }
            }

            setTimeout(function(){
                $(".btn_clear").hide();
            },200);
        });
        /*$(".mod_search_crumb .crumb_search .btn_clear").live('click',function(){
         _input_keyword.val("");
         });*/
        _input_keyword.keyup(function(event){
            event = event || window.event;  //兼容多浏览器
            var keyCode = event.keyCode;
            var keyword = $(this).val(),
                category = $(this).attr("category");
            virtualCategory = $(this).attr("virtualCategory");
            naviCategory = $(this).attr("naviCategory");
            var merchantId = $(this).attr("merchantId");
            if(!naviCategory) {
                naviCategory = 0;
            }
            if(!virtualCategory) {
                virtualCategory = 0;
            }
            if(!merchantId){
                merchantId = 0;
            }
            if(keyCode == "13"){
                // addTrackPositionToCookie('1','nav_crumb');
                if(keyword != ""){
                    if(requestType == '70' || requestType == '75') {
                        var tempUrl = window.location.href;
                        if(tempUrl.indexOf("#")>0) {
                            tempUrl = tempUrl.substring(0, tempUrl.indexOf("#"));
                        }
                        if(tempUrl.indexOf("crumbKeyword=")>0) {
                            tempUrl = tempUrl.substring(0, tempUrl.indexOf("crumbKeyword=")-1);
                        }
                        var tempInputWord = "?crumbKeyword=";
                        if(tempUrl.indexOf("?")>0) {
                            tempInputWord = "&crumbKeyword=";
                        }
                        // addTrackPositionToCookie('1','search_keyword_promo');
                        window.location = tempUrl + tempInputWord + encodeURIComponent(encodeURIComponent(keyword))+"/";
                    }
                    else if(virtualCategory>0) {
                        if( merchantId>0){
                            window.location =URLPrefix.search + urlS2 + "/vc" + virtualCategory + "/c" + category +"/b/a-s1-v4-p1-price-d0-mid"+merchantId+"-f0-k"+ encodeURIComponent(encodeURIComponent(keyword))+"/";
                        }else{
                            window.location =URLPrefix.search + urlS2 + "/vc" + virtualCategory + "/c" + category + "/k" + encodeURIComponent(encodeURIComponent(keyword))+"/";
                        }

                    }
                    else {
                        if(merchantId>0){
                            window.location = searchCategoryUrl + urlS2 + "/c" + category + "-0-" + naviCategory +"/b/a-s1-v4-p1-price-d0-f0-m1-rt0-pid-mid"+merchantId+"-k"+ encodeURIComponent(encodeURIComponent(keyword))+"/";
                        }else{
                            window.location = searchCategoryUrl + urlS2 + "/c" + category + "-0-" + naviCategory + "/k" + encodeURIComponent(encodeURIComponent(keyword))+"/";
                        }
                    }

                }/*else{
                 window.location = URLPrefix.search + "/s2/c" + category + "-0/";
                 }*/
            }
        });

        //面包屑滚动
        var crumbWrap = $(".mod_search_crumb .crumbSlide"),
            crumbClip = crumbWrap.find(".listCon"),
            crumbSon = crumbWrap.find(".list_con"),
            crumbBtn = crumbWrap.find(".c_btn"),
            crumbPrev = crumbWrap.find(".c_prev"),
            crumbNext = crumbWrap.find(".c_next"),
            crumbLi = crumbWrap.find(".listCon  li"),
            liWidth = 0;
        if(crumbWrap.length < 1)  return false;
        for(var i=0;i<crumbLi.length;i++){
            liWidth += crumbLi.eq(i).outerWidth(true)
            crumbClip.css('width',liWidth+100)
        }
        crumbClip.width() <=955 ? crumbBtn.hide() : crumbNext.show();
        crumbBtn.click(function(){
            if(crumbClip.width() <=955) return false;
            if($(this).hasClass("c_prev")){
                $(this).hide();
                $(this).parents(".crumbSlide").find(".c_next").show();
                $(this).parents().find('.list_con').css('left',0)
                crumbClip.animate({left:"0"},500)
            }else if($(this).hasClass("c_next")){
                $(this).hide();
                $(this).parents(".crumbSlide").find(".c_prev").show();
                $(this).parents().find('.list_con').css('left',0);
                if(screen.width <= 1024){
                    crumbClip.animate({left:-((liWidth+100) - 735) },500);
                }else{
                    crumbClip.animate({left:-((liWidth+100) - 945) },500);
                }
            }
        });
        var cl = crumbWrap.offset().left,
            cr = screen.width - (crumbWrap.offset().left + crumbWrap.width());

        /**
         * 展示当前类目节点的兄弟节点
         */
        function showBrotherOfCurrCate(obj) {
            var me = $(obj)
            if(me.find("i").length === 0) return false;
            me.addClass("cur").siblings().removeClass("cur");
            if (me.find('.list_con')!="undefined" && me.find('.list_con').length <=0){
                return false;
            }
            var d = me.find('.list_con').offset().left - cl,
                e = (liWidth+55)-945  + d,
                sr = screen.width - (me.find('.list_con').offset().left + me.find('.list_con').outerWidth(true))

            if(sr - cr < 0 ){
                me.find('.list_con').css('left',sr - cr)

            }else if(d < 0 ){
                crumbClip.animate({left:-e + 10},500)
            }else{
                crumbClip.stop();
            }
        }

        $(".mod_search_crumb .crumb_list").hover(function(){
            var lazyLoadFlag = 0;
            if("undefined" != typeof lazyLoadCategoryBrotherFlag) {
                lazyLoadFlag = lazyLoadCategoryBrotherFlag;
            }
            var $this = $(this);
            var obj = this;
            if(lazyLoadFlag == 1) {
                var $span = $this.find(".crumb_list_title");
                var currCateId = $span.attr("ngCateId");
                var loadFlag = $span.attr("loadFlag");
                var ngCateLevel = $span.attr("ngCateLevel");
                var searchKeyword = $("#searchword").val();
                // 类目页，一级类目无需加载兄弟节点
                if(ngCateLevel==1 && searchKeyword=="") {
                    $span.find("i").remove();
                    return;
                }
                if(loadFlag == 1) {
                    showBrotherOfCurrCate(obj);
                    return;
                }
                var urlFilterSuffix = "";
                var currCateUlr = $span.children("a").attr("href");
                if(typeof(currCateUlr) == 'undefined') {
                    return;
                }
                var suffixStart = currCateUlr.indexOf("/c");
                if(suffixStart > 0) {
                    urlFilterSuffix = currCateUlr.substr(suffixStart+1);
                    suffixStart = urlFilterSuffix.indexOf("/");
                    urlFilterSuffix = urlFilterSuffix.substr(suffixStart);
                }

                var filter='', // 筛选项
                    commonTagIds='', // 热卖标签
                    merchantId='',  // 商家ID
                    keyword=''; // 搜索词
                if(currCateUlr.indexOf("-f") > -1) {
                    var lastUrl = currCateUlr.substr(currCateUlr.indexOf("-f")+2);
                    filter = lastUrl.substring(0, lastUrl.indexOf("-"));
                }
                if(currCateUlr.indexOf("/a") > -1) {
                    var lastUrl = currCateUlr.substr(currCateUlr.indexOf("/a")+2);
                    commonTagIds = lastUrl.substring(0, lastUrl.indexOf("-"));
                    if(commonTagIds.indexOf("_") > -1) {
                        commonTagIds = commonTagIds.substr(commonTagIds.indexOf("_")+1)
                    } else {
                        commonTagIds = '';
                    }
                }
                if(currCateUlr.indexOf("-mid") > -1) {
                    var lastUrl = currCateUlr.substr(currCateUlr.indexOf("-mid")+4);
                    merchantId = lastUrl.substring(0, lastUrl.indexOf("-"));
                }
                if(currCateUlr.indexOf("/k") > -1) {
                    var lastUrl = currCateUlr.substr(currCateUlr.indexOf("/k")+2);
                    var endIndex = lastUrl.indexOf("/");
                    if(endIndex > 0) {

                        keyword = lastUrl.substring(0, endIndex);
                    } else {
                        keyword = lastUrl;
                    }
                } else if(currCateUlr.indexOf("-k") > -1) {
                    var lastUrl = currCateUlr.substr(currCateUlr.indexOf("-k")+2);
                    var endIndex = lastUrl.indexOf("/");
                    if(endIndex > 0) {

                        keyword = lastUrl.substring(0, endIndex);
                    } else {
                        keyword = lastUrl;
                    }
                }

                var url = jsSearchFedUtil.getSearchUrlPrefix() + "/lazyLoadBrotherCategory/nc" + currCateId + "-a"+commonTagIds
                    +"-f" + filter + "-mid" + merchantId + "-k" + keyword;

                var params = "urlFilterSuffix=" + urlFilterSuffix
                    + "&searchKeywordFlag=" + isSearchKeyWords;
                // 跨域请求
                $.ajax({
                    url : url,
                    dataType : 'jsonp',
                    data : params,
                    jsonp : "callback",
                    success : function(data) {
                        if(data.ERROR) {
                            alert("ERROR : " + data.ERROR);
                            $span.find("i").remove();
                        } else {
                            if(data.value == '') {
                                $span.find("i").remove();
                            }
                            $span.after(data.value);
                            showBrotherOfCurrCate(obj);
                        }
                    }
                });
                $span.attr("loadFlag", 1);
            } else {
                showBrotherOfCurrCate(obj);
            }

        },function(){
            $(this).removeClass("cur");

        });
    },
    /* *
     *
     * 热门店铺
     *
     * */
    leftBanner : function(){
        var modLeftBanner = $(".mod_left_banner");
        $("a" , modLeftBanner).live("mouseover",function(){
            $("u , span" , this).stop().animate({bottom : 1} , 100);
        }).live("mouseout",function(){
            var uHeight = $("a u" , modLeftBanner).outerHeight(true);
            $("u , span" , this).stop().animate({bottom : - uHeight} , 100);
        });
    },

    /**
     *
     * 四级分类框模块
     *
     * */
    forthCategory:function(){
        var _module = $(".mod_category_forth"),
            _btn = _module.find(".multiple_choice"),
            h = _module.height(),
            maxHeight = 90;

        if(_module.height() > maxHeight){
            _module.height(maxHeight);
            _btn.show();
        }
        var _more = _module.find(".more").eq(0),
            _close = _module.find(".more_open");
        _more.click(function(){
            _module.height(h);
        });
        _close.click(function(){
            _module.height(30);//单行高度
        });

        _module.find('a').each(function(){
            if( $(this).hasClass("cur")){
                _module.height(30);//有选中的四级或五级分类，显示单行
                if(h>30){
                    _btn.show();
                }
            }
        });

    },
    /* *
     *
     * hover按钮时候弹出提示
     *
     * */
    popupBtnTip:function(){
        $(".buy_btn").hover(
            function(){
                var _pop = $(this).parents(".item_act").find(".pop_tip");
                if(_pop.length <= 0) return false;
                var width = _pop.outerWidth(),
                    parWidth = $(this).parents('.search_item_box').width(),
                    pos = {};

                if(!pos.conLeft) {
                    pos.conLeft = (parWidth - width) / 2;//计算弹出提示框的left
                    pos.arrLeft = (width - 8) / 2;//计算弹出提示框箭头的left
                }
                _pop.find("i").css("left", pos.arrLeft).end()
                    .css({"left": pos.conLeft, "visibility":"visible"});
            },
            function(){
                var _pop = $(this).parents(".item_act").find(".pop_tip");
                if(_pop) _pop.css("visibility","hidden");
            });
    },
    /**
     * 服装搜索结果页查看大图
     * @id：产品id
     **/
    openItemPic:function(id){
        $(".large_dress_pic_mask").show();

        if(this.ie6){//ie6动态算高度
            $(".large_dress_pic_mask").height($("body").height());
        }
        var _container = $(".large_dress_pic").show(),
            width = 0,//计算宽度
            _wrapper = _container.find(".item_pic_wrapper"),
            _imgs = _wrapper.find("img"),
            _btn_r = _container.find(".btn_right"),
            _btn_l = _container.find(".btn_left");

        _imgs.each(function(){
            width += $(this).width();
        });
        _wrapper.find("ul").width(width);
        _wrapper.scrollLeft(0);
        if(_imgs.length > 1) {
            _btn_r.show();
        } else {
            _btn_r.hide();
        }
        _btn_l.hide();

        // 事件绑定
        var cur_img = 0, step = 20;

        if( _btn_r.data("events") && _btn_r.data("events")["click"] ){
            _btn_r.unbind("click");
        }
        _btn_r.click(function(){
            var cur_width = $(_imgs[cur_img]).width(),
                s = 0,
                cur_step = step,
                timer = setInterval(function(){
                    if(cur_width - s < step){//最后一帧不足一个step时候，最后的移动幅度为最后一帧
                        cur_step = cur_width - s;
                    }
                    _wrapper.scrollLeft(_wrapper.scrollLeft() + cur_step);
                    if((s += cur_step) >= cur_width){
                        clearInterval(timer);
                        cur_img++;
                        if(cur_img === _imgs.length - 1) _btn_r.hide();
                    }
                }, 20);

            if(_btn_l.is(":hidden")) _btn_l.show();
        });

        if( _btn_l.data("events") && _btn_l.data("events")["click"] ){
            _btn_l.unbind("click");
        }
        _btn_l.click(function(){
            var cur_width = $(_imgs[cur_img]).width(),
                s = cur_width,
                cur_step = step,
                timer = setInterval(function(){
                    if(s < step){//最后一帧不足一个step时候，最后的移动幅度为最后一帧
                        cur_step = s;
                    }
                    _wrapper.scrollLeft(_wrapper.scrollLeft() - cur_step);
                    if((s -= cur_step) <= 0){
                        clearInterval(timer);
                        cur_img--;
                        if(cur_img === 0) _btn_l.hide();
                    }
                }, 20);

            if(_btn_r.is(":hidden")) _btn_r.show();
        });

    },

    /* *
     *
     * 入口构造函数
     *
     * */
    main : function(){
        this.guideCategory();   // 导购属性区类目
        this.crumbSearch();     //搜索面包屑导航
        this.leftBanner();      //热门店铺
        this.forthCategory();	//控制四级分类模块高度
        this.popupBtnTip();
        if("undefined" != typeof searchCompareSeleteFed && !(cateType == 6 || search_template == 2)) {//图书模板不显示对比
            searchCompareSeleteFed.main(); // 商品对比事件绑定
        }
    }
};

function picChange(){
    if(flagView==2) {
        picChangeForStoreSearch();
        return;
    }
    //图片列表切换图片
    $(".proCrumb b").click(function(){
        var $this = $(this);
        var productId = $(this).attr("id");
        var pmInfoId = $(this).attr("pmId");
        var oId = $(this).attr("oId");

        //点击缩略图切换图片
        $(this).addClass("cur").siblings("b").removeClass("cur");
//		var pic_src = $(this).find("img").attr("src");
        var imageUrlSuffix = $(this).attr("imageUrlSuffix");
        var imageUrlPrefix = $(this).parents(".proCrumb").attr("imageUrlPrefix");
        var big_pic_src = imageUrlPrefix;

        if(typeof(largeImgCategoryFlag)!="undefined" && largeImgCategoryFlag==1) {
            if(isWidescreen == 1) {//s16x16_
                big_pic_src += "s230x322_" + imageUrlSuffix;
            }else{
                big_pic_src += "s184x258_" + imageUrlSuffix;
            }
        } else {
            if(isWidescreen == 1) {
                big_pic_src += "s230x230_" + imageUrlSuffix;
            }else {
                big_pic_src += "s184x184_" + imageUrlSuffix;
            }
        }
        var pro_img = $(this).parents(".proCrumb").prevAll(".proImg").find(".img img");
        pro_img.attr("src", big_pic_src);


        // 酒店团购不刷新价格
//		if(!isGrouponProv || isGrouponProv==0) {
        //点击缩略图刷新价格
//			getProductPrice(productId, oId);
//		}
        //点击缩略图刷新标题  wangcong 2012-12-3
        /*var title = $(this).attr("originalTitle");
         // 刷新当前商品coretable中对比选中情况
         var spans = $("#pdlink2_" + oId).find("span");
         $("#pdlink2_" + oId).attr("title", title).html(spans).append(title);*/


//		var subTitle = $(this).attr("subTitle");
//		var defpmId = $(this).attr("defpmId");
//		gotracker('2','serial_product_change',productId);

//		var href = $(this).parents(".proCrumb").prevAll(".proImg").find("a").attr("href");
//		href = href.substring(0,href.lastIndexOf("/") + 1) + pmInfoId; // 用子码的pmInfoId替换虚码的pmInfoId
        var href ="//item.yhd.com/" + productId +".html";

        $(this).parents(".proCrumb").prevAll(".proImg").find("a").attr("href", href);
        $(this).parents(".proCrumb").nextAll(".proName").find("a").attr("href", href);

        //刷新价格
        refreshProductPriceForSerial(productId, oId, $(this));

    });
}

function picChangeForStoreSearch(){

    //图片列表切换图片
    $(".proCrumb b").click(function(){
        var $this = $(this);
        var productId = $(this).attr("id");
        var pmInfoId = $(this).attr("pmId");
        var oId = $(this).attr("oId");
        var $searchItemBox = $("#itemSearchResultCon_" + oId);
        var similarIds = $this.attr("similarIds");
        var isGrouponProv = $(this).attr("isGrouponProv");
        if(isGrouponProv) {
            isGrouponProv = parseInt(isGrouponProv);
        } else {
            isGrouponProv = 0;
        }
        var grouponId = $(this).attr("grouponId");
        var grouponType = $(this).attr("grouponType");
        if(grouponType) {
            grouponType = parseInt(grouponType);
        } else {
            isGrouponProv = 0;
        }
        //点击缩略图切换图片
        $(this).addClass("cur").siblings("b").removeClass("cur");
        var pic_src = $(this).find("img").attr("src");
        var big_pic_src = pic_src.substring(0,pic_src.lastIndexOf("_"));
        if(typeof(largeImgCategoryFlag)!="undefined" && largeImgCategoryFlag==1) {
            if(isWidescreen == 1) {
                big_pic_src += "_200*280.jpg";
            }else {
                big_pic_src += "_160*224.jpg";
            }
        } else {
            if(isWidescreen == 1) {
                big_pic_src += "_200*200.jpg";
            }else {
                big_pic_src += "_160*160.jpg";
            }
        }
        $("#pdlink1_" + oId + " img").attr("src", big_pic_src);

        // 酒店团购不刷新价格
        if(!isGrouponProv || isGrouponProv==0) {
            //点击缩略图刷新价格
            getProductPrice(productId, oId);
        }
        //点击缩略图刷新标题  wangcong 2012-12-3
        var title = $(this).attr("originalTitle");
        // 刷新当前商品coretable中对比选中情况
//		$("#pdlink1_" + oId + " img").attr("alt", title);
        var spans = $("#pdlink2_" + oId).find("span");
        $("#pdlink2_" + oId).attr("title", title).html(spans).append(title);
        var subTitle = $(this).attr("subTitle");
        var defpmId = $(this).attr("defpmId");
        gotracker('2','serial_product_change',productId);

        var href = $("#pdlink1_" + oId).attr("href");
        href = href.substring(0,href.lastIndexOf("/") + 1) + pmInfoId; // 用子码的pmInfoId替换虚码的pmInfoId

        var grouponUrl = URLPrefix.grouponDetailUrl || "//t.yhd.com";
        if(isGrouponProv && isGrouponProv==1) {
            if(grouponType == 0) {
                href = grouponUrl + "/detail/" + grouponId;
            } else if (grouponType == 1) {
                href = grouponUrl + "/hoteldetail/" + grouponId;
            }
        }
        $("#pdlink1_" + oId).attr("href", href);
        $(this).parents(".proCrumb").nextAll(".proName").find("a").attr("href", href);

    });

}
//点击服装缩略图获得价格
function getProductPrice(productId, oId){
    //2012-09-03 modify by wumin 由于会造成cookie无省份报出脚本错而处理
    if(!jQuery.cookie("provinceId")){
        return ;
    }
    var url = URLPrefix.products_stock + "/restful/truestock?mcsite=" + currSiteId
        + "&provinceId=" + jQuery.cookie("provinceId") + "&productIds=" + productId + "&callback=?";
    jQuery.getJSON(url, function(data) {
        if (data.ERROR){
            alert("ERROR = " + data.ERROR);
        }
        else{
            if(!data){
                return;
            }
            if(data.length<=0){
                return;
            }
            var product = data[0];
            var delPrice = "";
            if(typeof(searchShowMarketPrice) != "undefined" && searchShowMarketPrice==1){
                if(product.marketPrice <= product.productPrice || product.marketPrice == 0 || product.productPrice == 0){
                    delPrice="";
                }else{
                    delPrice="<del>¥" + product.marketPrice +"</del>";
                }
            }
            var productPrice = $("#price0_" + oId);
            if(product.productPrice>0){
                $(productPrice).html( "<b>¥</b>" + product.productPrice + delPrice);
                $(productPrice).attr("yhdPrice",product.productPrice);

            }
        }
    });
}
var seriProDiv=$("#series_pro_buy");
var wind_title = 0;
var windType = 0;

/**
 * @param this1 事件绑定元素
 * @param type 绑定业务类型：不传即默认为系列商品立即购买; type=1,对比选择业务
 */
function getSerialAttrs(this1, type) {
    if($(seriProDiv).html() != "") {
        $(seriProDiv).html("");
    }
    var wind_title = "选择规格";
    // 不传type的话
    if("undefined" != typeof type) {
        windType = type;
        if(type == 1) {
            wind_title = "加入对比栏";
        }
    } else {
        windType = 0;
    }
    // var preUrl = jsSearchFedUtil.getSearchUrlPrefix();
    var preUrl = URLPrefix.search_keyword;
    var productId =$(this1).attr("sellproductid");
    var id =$("#pdlink1_" + productId).attr("parentid");//1233508
    var subProductIdStrToAction = $("#subProductIdStrToAction_"+productId).attr("subProductIdStr");//"1233509,1233510,1233511,1233512,1233514";
    var url = preUrl + "/searchSerialAttribute.do?productId=" + id;
    if(subProductIdStrToAction!=null && subProductIdStrToAction.length>0) {
        url +="&subProductIdStrToAction="+subProductIdStrToAction;
    }
    url += "&callback=?";
    jQuery.getJSON(url, function(data) {
        if (data && data.value) {
            alert("ERROR = " + data.ERROR);
        } else {
            if(data == null){
                //如果没有属性值返回，则跳到详情页面
                var href = $("#pdlink1_" + $(this1).attr("sellproductid")).attr("href");
                window.location = href;
                return;
            }
            var data = eval(data.success);
            var inputHiddenValues = "";
            var _this=$(this1);
            var productId = _this.attr("sellproductid");
            var parentId=$("#pdlink1_"+productId).attr("parentid");

            for(var key in data[0].coverdAttr){
                inputHiddenValues += "<input type=\"hidden\" id=\"spAllAttrs"+productId+"_"+key+"\" name=\"spAllAttrs"+productId+"\""
                    + "sProductId=\""+key+"\" allAttrs=\""+data[0].coverdAttr[key]+"\" value=\""+key+"_"+data[0].coverdAttr[key]+"\"/>";
            }

            //把得到的数据拼接成html
            var tempAttrHtml = "";
            for(var key in data[0].attributes){
                var isColorAttr = false;
                //属性名-|-属性id
                var tempAttrIdAndName = key.split("-|-");
                if(tempAttrIdAndName.length>1) {
                    //颜色写成配置
                    if(typeof(colorAtributeId)!="undefined") {
                        var tempColorAttrIds = colorAtributeId.split(",");
                        if(tempColorAttrIds.length>1) {
                            if(tempAttrIdAndName[1]==tempColorAttrIds[0] ||tempAttrIdAndName[1]==tempColorAttrIds[1]) {
                                isColorAttr = true;
                            }
                        }
                    }
                    if(isColorAttr){
                        var colorAttrs = data[0].attributes[key];
                        var tempColorAttrHtml = "";
                        if(colorAttrs.length>0) {
                            //属性值名-|-子码id
                            var array = colorAttrs.split(",");
                            for (var i=0; i < array.length && array[i].length>0; i++ ){
                                var attrValueIds = array[i].split("-|-");
                                var pic = $("#spColor_"+productId+"_"+attrValueIds[1]).attr("subimage");
                                if(typeof(pic)!="undefined" && pic.length>0 && attrValueIds.length>1) {
                                    tempColorAttrHtml +="<a href=\"javascript:void(0);\" onclick=\"chooseAttr(this);\""
                                        +"detailtitle=\""+attrValueIds[1]+"\" title=\""+attrValueIds[0]+"\"><img width=\"40\" height=\"40\" src=\""+pic+"\"><i></i></a>";
                                }
                            }
                        }
                        if(tempColorAttrHtml.length>0) {
                            tempAttrHtml += "<div class=\"series_pro_list clearfix\" id=\"series_color\">"
                                + "<div class=\"series_pro_title\">选颜色</div>"
                                + "<div class=\"series_pro_con clearfix\" id=\"series_pro_con\">"
                                + tempColorAttrHtml + "</div></div>";
                        }
                    }else {
                        tempAttrHtml += "<div class=\"series_pro_list clearfix size\">"
                            + "<div class=\"series_pro_title\">选" + tempAttrIdAndName[0] + "</div><div class=\"series_pro_con clearfix\">";

                        var attrValues = data[0].attributes[key];
                        if(attrValues.length>0) {
                            var array = attrValues.split(",");
                            for (var i=0; i < array.length && array[i].length>0; i++ ){
                                var attrValueIds = array[i].split("-|-");
                                if(attrValueIds.length>1) {
                                    tempAttrHtml +="<span detailtitle=\""+attrValueIds[1]+"\" title=\""+attrValueIds[0]+"\"onclick=\"chooseAttr(this);\">"
                                        + attrValueIds[0] +"<i></i></span>";
                                }

                            }
                        }
                        tempAttrHtml += "</div></div>";
                    }
                }
            }

            var priceHtml="<div class=\"add_cart\"><span class=\"price\" id=\"price_icon\"></span>";
            var buttonHtml = $("#series_pro_btn_"+productId).html();

            var returnHtml = "<u class=\"pop_bg\"></u><div class=\"pop_con series_pro_inside\"><h4>" + wind_title + "</h4>"
                + "<span class=\"pop_title_bg\"></span>" + tempAttrHtml + priceHtml
                +buttonHtml+"</div></div><span class=\"close popup_btn_close iconSearch\">&#xe613;</span>";

            $(seriProDiv).html(returnHtml);
            $("#series_pro_buy").append(inputHiddenValues);
            series_buy_attr(this1);
        }
    });
}

function series_buy_attr(this1) {
    var _this=$(this1);
    var productId = _this.attr("sellproductid");
    var parentId=$("#pdlink1_"+productId).attr("parentid");
    var parentDiv = _this.parents(".itemBox");
    var seriseInfo = parentDiv.find(".series_pro_info_hide").html();
    $(seriProDiv).attr("serise_parentId",productId);
    //立即购买加载出来才显示弹出框
    var buyModule = _this.attr("buyModule");
    if(buyModule && buyModule=='0') {
        window.open($("#pdlink1_"+productId).attr("href"));
        return false;
    }
    var ruleType = _this.attr("ruleType");
    if(ruleType && ruleType=='5') {
        window.open($("#pdlink1_"+productId).attr("href"));
        return false;
    }
    //系列产品子品数据为空
    if(seriseInfo=="" ||seriseInfo==null ||seriseInfo=="undefined"){
        window.open($("#pdlink1_"+productId).attr("href"));
        return false;
    }
    if(productId == null || productId == ""){
        window.open($("#pdlink1_"+productId).attr("href"));
        return false;
    }
    yhdLib2.popwin({
        popupName:".series_pro_buy",
        maskLayer:true,
        popupFixed:true
    });

    //计算库存  有库存的子品id所拼接的字符串
    var subPIdStrs = "";
    var pidsParam = "";

    $("#series_pro_buy input[name='spAllAttrs" + productId + "']").each(function(){
        if(parentId!=$(this).attr("sProductId")){
            pidsParam = pidsParam + "&productIds=" + $(this).attr("sProductId");
        }
    });
    if(pidsParam == ""){
        $(seriProDiv).find("a").each(function(){
            $(this).addClass("less_than");
        });
        $(seriProDiv).find(".series_pro_list span").each(function(){
            $(this).addClass("less_than");
        });
        return false;
    }

    var minSeriesPrice = 0;
    var maxSeriesPrice = 0;

    var busystcok = URLPrefix.busystock ? URLPrefix.busystock : "//busystock.i.yihaodian.com";
    var url=busystcok + "/busystock/restful/truestock";
    var param="?mcsite="+currSiteId + "&provinceId=" + jQuery.cookie("provinceId") + pidsParam;
    if((typeof(secondAreaFlag)!="undefined" && secondAreaFlag==1)){
        param+="&cityId="+jQuery.cookie("cityId");
        var detailAdd=jQuery.cookie("detail_yhdareas");
        if(detailAdd!=null && "undefined"!=detailAdd){
            var detailAddArr=detailAdd.split('_');
            if(detailAddArr.length>=3 && detailAddArr[2]>0){
                param+="&countyId="+detailAddArr[2];
            }
        }
    }
    jQuery.getJSON(url+param+"&callback=?",function(data){
        if(data && data.length > 0){
            jQuery.each(data,function(i,p){
                if(p.productStock > 0){
                    $("#spAllAttrs"+productId+"_"+p.productId).attr("subprice",p.productPrice);

                    if(i==0 || minSeriesPrice == 0) {
                        minSeriesPrice = p.productPrice;
                    }
                    if(minSeriesPrice>p.productPrice) {
                        minSeriesPrice = p.productPrice;
                    }
                    if(maxSeriesPrice<p.productPrice) {
                        maxSeriesPrice = p.productPrice;
                    }

                    subPIdStrs = subPIdStrs + p.productId + ",";
                }
            });
        }

        var minPriceStr = getPriceRangeHtml(minSeriesPrice.toString());
        var maxPriceStr = getPriceRangeHtml(maxSeriesPrice.toString());
        var priceRangeHtml;
        if(minSeriesPrice == maxSeriesPrice) {
            priceRangeHtml = minPriceStr;
        }else {
            priceRangeHtml = minPriceStr + " - " + maxPriceStr;
        }

        $('#price_icon').append(priceRangeHtml);

        if(subPIdStrs != ""){
            $(".series_pro_info_hide").find("#stockSubPIds_" + productId).val(subPIdStrs);
        }else {
            $(seriProDiv).find("a").each(function(){
                $(this).addClass("less_than");
            });
            $(seriProDiv).find(".series_pro_list span").each(function(){
                $(this).addClass("less_than");
            });
        }
    });
}

function getPriceRangeHtml(price) {
    var minPriceArray = price.split(".");
    var result = "<span class=\"big_number\">¥" + minPriceArray[0];
    if(minPriceArray.length>1 && minPriceArray[1]>0) {
        result = result + ".</span>" + minPriceArray[1];
    }else {
        result = result + "</span>";
    }
    return result;
}

function chooseAttr(currAttr) {
    if($(currAttr).hasClass("less_than")){
        return false;
    }
    var productId= $(seriProDiv).attr("serise_parentId");
    var seriseBuyBtn= $(seriProDiv).find("#serise_confirm_btn_"+productId);

    //如果之前选中了属性，再点击的时候，能取消选中
    if($(currAttr).hasClass("cur")){
        $(currAttr).removeClass("cur");
        var selectedAttr = $(".series_pro_con").find(".cur");
        if(selectedAttr.length>0) {
            //检查剩余的属性是否可以选择
            checkAttrsCombine(currAttr,productId);
        }else{
            $(seriProDiv).find(".series_pro_list a").each(function(){
                if($(this).hasClass("less_than")){
                    $(this).removeClass("less_than");
                }
            });
            $(seriProDiv).find(".series_pro_list span").each(function(){
                if($(this).hasClass("less_than")){
                    $(this).removeClass("less_than");
                }
            });
        }
        $("#price_icon_one").remove();
        $('#price_icon').show();
        seriseBuyBtn.addClass("dis_confirm");
        return false;
    }

    //把点击的属性设置为选中，同时其他的兄弟节点设置为非选中
    $(currAttr).addClass("cur").siblings().removeClass("cur");
    //检查剩余的属性是否可以选择
    checkAttrsCombine(currAttr,productId);

    var totalAttrNum = $(".series_pro_buy").find(".series_pro_list").length;
    //如果选中的属性个数与属性行一样，表示每一个属性至少有一个属性值，则可以确定一个子品，可以点击确认
    if($(".series_pro_con").find(".cur").length == totalAttrNum) {
        setSerialProductPrice(productId,seriseBuyBtn);
        return false;
    }

}
function checkAttrsCombine(currAttr,productId) {
    //得到所有的子品的属性组合
    var allAttrsArray = new Array();
    var ii= 0;
    $("#series_pro_buy input[name='spAllAttrs" + productId + "']").each(function(){
        if($(this).attr("allattrs").length>0){
            allAttrsArray[ii++] = $(this).attr("allattrs");
        }
    });
    //得到已经选中的属性名称
    var selectedAttr = $(".series_pro_con").find(".cur");
    var selectedAttrArray = new Array();
    if(selectedAttr.length>0) {
        var b=0;
        for(var a=0;a<selectedAttr.length;a++) {
            selectedAttrArray[b++] =$(selectedAttr[a]).attr("title");
        }
    }

    //通过currAttr得到父类的其它兄弟节点
    var uncleDivs = $(currAttr).parents(".series_pro_list").siblings(".series_pro_list");

    for(var j=0;j<uncleDivs.length;j++) {
        var tempDiv = uncleDivs[j];
        var tempSelectedAttrArray = selectedAttrArray;
        if(typeof($(tempDiv).find(".cur"))!="undefined" && $(tempDiv).find(".cur").length>0) {
            var selectedAttr = $(tempDiv).find(".cur").attr("title");
            for(var sa=0;sa<tempSelectedAttrArray.length;sa++) {
                if(tempSelectedAttrArray[sa]==selectedAttr) {
                    tempSelectedAttrArray[sa]="";
                }
            }
        }

        var titleDivs = $(tempDiv).find("span");
        if(titleDivs.length ==0) {
            titleDivs = $(tempDiv).find("a");
        }

        if(titleDivs.length>0) {
            for(var i=0;i<titleDivs.length;i++) {
                //待判断的属性
                var tempAttr = $(titleDivs[i]).attr("title");

                var stockStr =  $(".series_pro_info_hide").find("#stockSubPIds_" + productId).val();

                var count = 0;
                for(var allA=0;allA<allAttrsArray.length;allA++) {
                    var currAttrs = allAttrsArray[allA];

                    //待判断的属性与已选中的属性组合在一起判断
                    var flag = checkValidAttr(currAttrs,tempSelectedAttrArray);

                    if(checkAttrOneByOne(currAttrs,tempAttr) && flag) {
                        var seriesProId = $("input[allattrs='"+currAttrs+"']").attr("sproductid");

                        if(stockStr.indexOf(seriesProId) != -1){//有库存
                            if($(titleDivs[i]).hasClass("less_than")){
                                $(titleDivs[i]).removeClass("less_than").removeClass("cur");
                            }
                            break;
                        }else{//无库存
                            count++;
                        }
                    }else {
                        count++;
                    }
                }
                //如果所有的子品属性中都不包含待判断属性+已选属性的这种组合，则把待判断属性置为灰
                if(count ==allAttrsArray.length) {
                    $(titleDivs[i]).addClass("less_than").removeClass("cur");
                }
            }
        }
    }

}

function checkValidAttr(currAttrs,selectedAttrArray) {
    var result = false;
    for(var selA=0;selA<selectedAttrArray.length;selA++){
        var tempSelectedAttr = selectedAttrArray[selA];
        result = checkAttrOneByOne(currAttrs,tempSelectedAttr);
        if(!result) {
            break;
        }
    }
    return result;
}

function checkAttrOneByOne(target,testWord) {
    var rlt = false;
    if(target == null || target =="null") {
        rlt = false;
    }
    var targetArray = target.split(",");
    for (var i=0; i < targetArray.length && targetArray[i].length>0; i++ ){
        if(testWord=="" || targetArray[i] == testWord) {
            rlt = true;
            break;
        }
    }
    return rlt;
}

function setSerialProductPrice(productId,seriseBuyBtn) {
    //得到所有的子品的属性组合
    var allAttrsArray = new Array();
    var i= 0;
    $("#series_pro_buy input[name='spAllAttrs" + productId + "']").each(function(){
        if($(this).attr("allattrs").length>0){
            allAttrsArray[i++] = $(this).attr("allattrs");
        }
    });
    //得到已经选中的属性名称
    var selectedAttrs = $(".series_pro_con").find(".cur");

    for(var a=0;a<allAttrsArray.length;a++) {
        var index = 0;
        for(var b=0;b<selectedAttrs.length;b++) {
            var selectedAttr =$(selectedAttrs[b]).attr("title");
            if(checkAttrOneByOne(allAttrsArray[a],selectedAttr)) {
                index++;
            }else{
                break;
            }
        }
        //如果选中的属性都匹配到子码属性，则可以确定一个子品
        if(index ==selectedAttrs.length) {
            var seriesProId = $("input[allattrs='"+allAttrsArray[a]+"']").attr("sproductid");
            var price = $("#spAllAttrs"+productId+"_"+seriesProId).attr("subprice");

            var temp = getPriceRangeHtml(price);
            var priceHtml="<span class=\"price\" id=\"price_icon_one\">" + temp + "</span>";

            if($("#price_icon_one").length>0) {
                //去掉在切换不同的系列商品时，原先子码商品价格的显示
                $("#price_icon_one").remove();
            }
            $('#price_icon').hide();
            $('#price_icon').after(priceHtml);
            $("#price_icon_one").show();

            seriseBuyBtn.attr("class","confirm btn");
            $(".series_pro_info_hide").find("#seriesPid_" + productId).val(seriesProId);
            break;
        }else {
            //去掉在切换不同的系列商品时，切换后的组合不存在时显示的原来商品的价格与确认按钮
            $("#price_icon_one").remove();
            $('#price_icon').show();
            seriseBuyBtn.addClass("dis_confirm");
        }
    }
}

//系列商品加购物车
function seriesProduct_buy(event, productId, merchantId, index, pmInfoId) {
    if(windType == 1) { // 对比弹框
        var subpId =  $("#seriesPid_" + productId).val();
        if(subpId == "") { //sub of seris not seleted
            return ;
        }
        var items = $('.mod_compare_bar .itemList');
        var popTips = $('.mod_compare_bar .compareList .errorTips');
        var comPareBar = $(".mod_compare_bar");
        var maxNum = 4;
        var _itemsLength = items.find("li").length;
        if(_itemsLength > 0){
            $(".mod_compare_bar .compareBtn").addClass("cur");
        }
        if(_itemsLength < maxNum){
            items.show();
            var subProd = $("#spColor_"+productId+"_"+subpId);
            var pmInfoId = subProd.attr("sPmInfoId");
            var title = subProd.attr("sCname");
            var src = subProd.attr("subimage");
            var big_pic_src = src.substring(0,src.lastIndexOf("_"));
            src = big_pic_src + "_60*60.jpg";
            var link = URLPrefix.IdcYhdDetailDomain + "/item/" + pmInfoId;
            var price = $("#price_icon_one").text();
            price = price.substring(1, price.length);
            var data = {
                src:src,
                link:link,
                price: price,
                txt:title,
                val:subpId
            };
            searchCompareSeleteFed.addtoComPareBar(data,subpId);
            searchCompareSeleteFed.updateSearchCompareCookies(0, subpId);
            gotracker('2','search_compare_add',subpId);
            $("a[parentId="+productId+"]").addClass("select");
            $("a[parentId="+productId+"]").attr("data-val", subpId);
        } else {
            comPareBar.addClass("fixed");
            items.show();
            popTips.show().find("span").html("对比栏已满");
            hideTips();
        }

    }else{
        // 系列商品购买弹框
        if ($(seriProDiv).find("#serise_confirm_btn_" + productId).hasClass(
                "dis_confirm")) {
            return false;
        }
        var subpId = $("#seriesPid_" + productId).val();
        addToCart(event, subpId, merchantId, 1, true, 'seriebtn_' + index);
        if (pmInfoId > 0) {
            gotracker(pmInfoId, 'seriebtn_' + index, subpId);
        } else {
            gotracker('2', 'seriebtn_' + index, subpId);
        }
        $(seriProDiv).attr("style", "disploy:none;");
    }

}
﻿var isGetMoreProductsFlag = 0;
var getMoreProductsUrl = "";
var preLargeDressPicId = 0; // 上一次点击查看大图的商品ID
var trackerUrl='https:'== document.location.protocol ? 'https://': '//' + URLPrefix.tracker + '/tracker/info.do?1=1';
function getMoreProducts() {
    var getProductData = function(){
        //第一次进搜索页面时，不需要调这个接口，只有等鼠标滚动到底部时，才会加载
        if(isGetMoreProductsFlag == 0) {
            isGetMoreProductsFlag = 1;
            return;
        }
        var bottomBrand=jQuery("#getMoreProducts");
        if(!bottomBrand.size()) {
            return;
        }

        //如果界面第一次请求的数据少于36，证明该页面最大商品个数小于36，没必要调该接口
        var divIdList = jQuery('#productsIdList')[0];
        if(!divIdList) {

            if(requestType!='70'&&requestType!='75'&&requestType!='76'){ //促销搜索页,抵用劵不加载相关类别信息
                getRelatedCategoryFromPms();
            }
            hotKey_searchAgain();//加载搜索相关关键词
            jsSearchFedUtil.getKeywordFocus();
            return;
        }
        var idArray = divIdList.value.split(",");
        /*if(flagView==2) {
         if(requestType!='70'&&requestType!='75'&&requestType!='76'){ //促销搜索页,抵用劵不加载相关类别信息
         getRelatedCategoryFromPms();
         }
         hotKey_searchAgain();//加载热门搜索信息
         jsSearchFedUtil.getKeywordFocus();
         return;
         }*/

        var pageTop =  document.documentElement.clientHeight+ Math.max(document.documentElement.scrollTop,document.body.scrollTop);
        if(bottomBrand.offset().top > pageTop+1600 ||bottomBrand.data("loaded")){
            return;
        }else{
            bottomBrand.data("loaded",true);
        }
        var loadingPageString = "<div id=\"listLoading\" class=\"mod_page_loading\">" +
            "<p><img width=\"40\" height=\"80\" src=\"" + URLPrefix.statics +
            "/search3/images/loading-yhdUpdate_01.gif\"></p>" +
            "<p>正在加载，请稍后</p></div>";
        $(".mod_turn_page").before(loadingPageString).hide();
//		alert(loadingPageString);
        var tempUrl;
        var tempUrl = window.location.href;
        if("undefined" != typeof reqLongUrl && reqLongUrl!='') {
            tempUrl = reqLongUrl;
        }
        var curAdBlockStartIndex = $("#curAdBlockStartIndex").val();
        var curImageAdBlockStartIndex = $("#curImageAdBlockStartIndex").val();
        var data = "isGetMoreProducts=1" +"&moreProductsDefaultTemplate=" + search_template + "&isLargeImg="+largeImgCategoryFlag+"&moreProductsFashionCateType="+ fashionCateType +"&nextAdIndex="+curAdBlockStartIndex+"&nextImageAdIndex="+curImageAdBlockStartIndex;
        var adProductIdListStr = $("#adProductIdListStr").val();
        if(typeof(adProductIdListStr)!="undefined"){
            data = data+"&adProductIdListStr="+adProductIdListStr;
        }
        if(typeof(fashionCateType)!="undefined"){
            data = data+"&fashionCateType="+fashionCateType;
        }
        if(typeof(firstPgAdSize)!="undefined"){
            data=data+"&firstPgAdSize="+firstPgAdSize;
        }
        if(typeof(needMispellKw)!=="undefined"){
            data=data+"&needMispellKw="+needMispellKw;
        }
        if(typeof(getMoreProductsUrl)=="undefined" || getMoreProductsUrl == "") {
            if(requestType == '70') {
                tempUrl = tempUrl.replace("/p/", "/searchPagePro/");
            }
            else if(requestType == '75') {
                tempUrl = tempUrl.replace("/coupon/", "/searchPageCoupon/");
                tempUrl = tempUrl.replace("/redirectCoupon/", "/searchPageCoupon/");
            }
            else if(requestType == '76') {
                tempUrl = tempUrl.replace("/sendCoupon/", "/searchPageSendCoupon/");
                tempUrl = tempUrl.replace("/redirectSendCoupon/", "/searchPageSendCoupon/");
            }
            else if(requestType == '620') {
                tempUrl = window.location.href;
                if(tempUrl.indexOf("/s2/")>0){
                    tempUrl = tempUrl.replace("/s2/", "/searchVirCateAjax/");
                }else if (tempUrl.indexOf("/ctg/")>0) {
                    tempUrl = tempUrl.replace("/ctg/", "/ctg/searchVirCateAjax/");
                }else{
                    if (urlType && urlType==1) {
                        tempUrl = tempUrl.replace(".hk/", ".hk/searchVirCateAjax/");
                    }else{
                        tempUrl = tempUrl.replace("com/", "com/searchVirCateAjax/");
                    }
                }

            }
            else {
                if(tempUrl.indexOf("/topic/")>0){
                    tempUrl = tempUrl.replace("/topic/", "/topicPage/");
                }else if(tempUrl.indexOf("/s2/")>0){
                    tempUrl = tempUrl.replace("/s2/", "/searchPage/");

                }else if(tempUrl.indexOf("/ctg/")>0){
                    tempUrl = tempUrl.replace("/ctg/", "/ctg/searchPage/");
                }else{
                    if (urlType && urlType==1) {
                        tempUrl = tempUrl.replace(".hk/", ".hk/searchPage/");
                    }else{
                        tempUrl = tempUrl.replace("com/", "com/searchPage/");
                    }
                }
            }
        }
        else {
            //得到局部刷新的url
            tempUrl = getMoreProductsUrl;
            if(requestType == '70' || requestType == '75' || requestType == '76') {
                var crumbKeyWord = $(".mod_search_crumb .crumb_search .input_keyword").val();
                if(crumbKeyWord != "" && crumbKeyWord != "在结果中查找"){
                    data = data + "&crumbKeyword=" + encodeURIComponent(encodeURIComponent(crumbKeyWord))+"|/";
                }
            }
        }
        if(requestType == '70' && conditionValue>0){
            data = data+"&conditionValue="+conditionValue+"&contentType="+contentType;
        }
        if(requestType == '70' && contentNum>0){
            data = data +"&conmentNum="+contentNum;
        }
        if(typeof(isPacksView)!="undefined" && isPacksView == 1) {
            data = data +"&isPacksView=" + isPacksView;
        }
        if(requestType == '75' || requestType == '76'){
            data = data + "&isCouponPage=" + parseInt(requestType) + "&useScope=" + useScope;
        }

        //如果搜索词没有结果，界面上显示的是纠错后的搜索结果，此时懒加载72个商品时，需要用纠错后的关键词
        if((typeof(mispellWord)!='undefined' && mispellWord!="") || (typeof(mispellWordFromAction)!='undefined'&& mispellWordFromAction!="")) {
            var targetKeyWord = encodeURIComponent(encodeURIComponent(respSearchKeyWord));
            tempUrl = tempUrl.replace(/\/k[^\/]*\//, "/k"+targetKeyWord+"/");
        }
        // 跨域请求
        $.ajax({
            url : tempUrl,
            data: data,
            dataType : 'jsonp',
            jsonp : "callback",
            success : function(data) {
                if (data.ERROR)
                    alert("ERROR = " + data.ERROR);
                else{;
                    var firstReqCount = 36;
                    if(typeof(searchPageSize)!="undefined" && searchPageSize >0){
                        firstReqCount = searchPageSize;
                    }else{
                        if(flagView==2) {
                            firstReqCount = 9;
                        }else if(flagView==4){
                            firstReqCount = 30;
                        }
                    }
                    jQuery(".mod_page_loading").remove();
                    //药网的显示class 为 searchBook
                    // if(search_template == 2 || cateType == 6) {
                    // 	jQuery('#itemSearchBookList').append(data.value);
                    // }else {
                    jQuery('#itemSearchList').append(data.value);
                    // }
                    //把第二次请求的productIdList赋值给ftl，为了在刷新促销信息时可以取到最新的产品id
                    $("#productsIdList").val(moreProductIdList);
                    $("#promoProductsIdList").val(promoProductsIdList);
                    $("#promoProductsIdListMall").val(promoProductsIdListMall);
                    var arrayObj = new Array();
                    if(flagView==2){
                        $("#itemSearchList .mod_search_store").each(function(){
                            var i = $(this).index();
                            // 只懒加载后面的9个店铺
                            if(i>firstReqCount-1) {
                                $(this).find("#searchProImg img").each(function(){
                                    var loadImgObjVal = new Object();
                                    loadImgObjVal.id = $(this).parent();
                                    loadImgObjVal.top = $(this).offset().top;
                                    arrayObj.push(loadImgObjVal);
                                });
                            }
                        });
                        // }else if(cateType==6  || search_template == 2){
                        // 	$("#itemSearchBookList >div").each(function(){
                        // 		var _this = $(this);
                        // 		var i = _this.index();
                        // 		// 只懒加载后面的36个商品
                        // 		if(i>firstReqCount-1) {
                        // 			var loadImgObjVal = new Object();
                        // 			loadImgObjVal.id = $(this);
                        // 			loadImgObjVal.top = _this.offset().top;
                        // 			arrayObj.push(loadImgObjVal);
                        // 		}
                        // 	});
                    }else{//普通模式和缩略图模式
                        $("#itemSearchList [id^='productegMore_']").find("img").each(function(){
                            // 只懒加载后面的36个商品
                            var loadImgObjVal = new Object();
                            loadImgObjVal.id = $(this).parent();
                            loadImgObjVal.top = $(this).offset().top;
                            arrayObj.push(loadImgObjVal);
                        });
                    }
                    //手动懒加载图片
                    jQuery.YHD.imgLoad.loadImg(arrayObj);
                    jQuery.YHD.imgLoad.scrollLoadImg();
                    picChange();
                    jsShopSearchFed.modSearchProFn();
//		            bljProduct.modPopBljInfos();//保垒价信息加载
//                    newProduct.newProductHover();//新品文案提示

//                    searchCombinelist(30);
//		        	lazyPriceLoaderDefine(1);//后40个懒加载
//		        	YHD.SPagelazyLoade.getLazyLoadPrice();  //Ajax数据返回后，重新获取需要异步请求价格的商品元素。
//		        	YHD.SPagelazyLoade.init();
                    if(productCount > firstReqCount ) {
                        searchUserFeedback.main();
                    }

                    $(".mod_turn_page").show();
                    jsAjaxFed.setHashToHref();
                    getMoreProductsUrl = "";
                    //recordTrackInfoWithType("1","search_productIds_exposure",moreTopProductsId);

                    // 通过json获取页面其他部分需要更新的数据(比如搜索结果数目)，进行刷新
                    if ($("#jsonValue").length == 1) {
                        eval("var json_data=" + $("#jsonValue").val());
                        eval("var json_url_data=" + $("#jsonUrlValue").val());
                        $(".resultNum #num").html(json_data.productCount);  // 刷新搜索结果数目
//		        		jsAjaxFed.search_traker_page(json_data);  //刷新traker连接
                        $("#searchUrl").attr("value",json_url_data.searchUrl);
                        eval("search_template=" + json_data.search_template);
                        searchPageNo=json_data.currentPage;
                    }
                }
            }
        });
    };
    loli.scroll(getProductData);
    getProductData();
}

function setPageBottomDisplayStatus(str) {
    var searchBottom  = jQuery("#search_bottom ")[0];
    if(searchBottom  != null) {
        jQuery("#search_bottom ")[0].style.display = str;
    }
}

/*
 * 筛选栏 - 排序、价格区间、翻页 等ajax操作
 */
var jsAjaxFed = {
    /* *
     *
     * 筛选栏 - 价格区间
     *
     * */
    priceFilter : function(){
        var priceRange=$(".mod_search_guide .price_range"),
            priceRangeInput=priceRange.find("input"),
            priceRangeBtn=priceRange.find("a"),
            autoClose;
        priceRangeInput.focus(function(){
            $(this).parents('.price_range').find('.price_range_btn').show();
        });
        priceRangeInput.focus(function(){
            clearTimeout(autoClose);
            priceRangeInput.removeClass("cur");
            $(this).addClass("cur");
            priceRange.addClass("cur");
            if(priceRangeInput.eq(0).val()=="¥"&&priceRangeInput.eq(1).val()=="¥"){
                priceRangeInput.val("").css("color","#333");
            }
        });

        priceRangeInput.blur(function(){
            autoClose=setTimeout(function(){
                priceRange.removeClass("cur");
                priceRangeInput.removeClass("cur");
                if(!priceRangeInput.eq(0).val()&&!priceRangeInput.eq(1).val()){
                    priceRangeInput.css("color","#999").val("¥");
                }
            },400);
        });

//        priceRangeClear.click(function(){
//        	priceRangeInput.css("color","#999").val("¥");
//        });

        priceRangeBtn.click(function(){
            var url = $(this).attr("url");
            var inputRangeMin = $('#searchPriceRangeMin')[0];
            var inputRangeMax = $('#searchPriceRangeMax')[0];
            var temp;
            var regInteger = /^[0-9]*$/;
            if ((inputRangeMin.value == "" || /^[0]+$/.test(inputRangeMin.value))
                && (inputRangeMax.value == "" || /^[0]+$/.test(inputRangeMax.value))) {
                inputRangeMax.value="";
                inputRangeMin.value="";
            }
            if ((!regInteger.test(inputRangeMin.value))||(!regInteger.test(inputRangeMax.value))) {
                return ;
            }
            if ((inputRangeMin.value != "") && (inputRangeMax.value != "")) {
                if (Number(inputRangeMax.value) < Number(inputRangeMin.value)) {
                    temp = inputRangeMax.value;
                    inputRangeMax.value = inputRangeMin.value ;
                    inputRangeMin.value = temp;
                }
            }
            var newUrl = url.replace(/-price[0-9,]*-/, "-price"+ inputRangeMin.value +","+ inputRangeMax.value +"-");
            if ((inputRangeMin.value == "") && (inputRangeMax.value == "")) {
                var newUrl = url.replace(/-price[0-9,]*-/, "-price"+"-");
            }
            else{
                var newUrl = url.replace(/-price[0-9,]*-/, "-price"+ inputRangeMin.value +
                    ","+ inputRangeMax.value +
                    "," + priceTemplateId +"-");
            }
//        	addTrackPositionToCookie("1","search_in_price_"+inputRangeMin.value+"_"+inputRangeMax.value);
            window.location.href = newUrl;
        });
    },
    /* *
     *
     * 请求ajax数据。将返回的数据填充到搜索结果处
     *
     * */
    ajaxRequestPage : function(url){
        // 如果url是相对路径，则通过是否含有keyword补上对应的绝对路径
        var searchUrlPrefix=jsSearchFedUtil.getSearchUrlPrefix();
        if (url.indexOf(searchUrlPrefix) == -1) {
            url = searchUrlPrefix + "/" + url;
        }

        //海购新域名
        if (urlType && urlType==1) {
            url = url.replace(".yhd.com/", ".yihaodian.com.hk/");
        }

        // 局部刷新页面锚定到筛选栏
        $(window).scrollTop($("#rankOpDiv").offset().top);

        var loadingPageString = "<div class=\"list_loading\"><div class=\"loading_box\"><u></u>" +
            "<p><img width=\"40\" height=\"80\" src=\"" + URLPrefix.statics + "/search3/images/loading-yhdUpdate_01.gif\"></p>" +
            "<p>正在处理中，请稍候...</p></div></div>";

        if(flagView==2) {
            $(".lListBox").eq(0).after(loadingPageString);
        }else {
            $(".list_width").after(loadingPageString);
        }

        var proData="";
        proData = proData +"&isLargeImg="+largeImgCategoryFlag;
        if(requestType == '70') {
            if(conditionValue>0) {
                proData = proData+"&conditionValue="+conditionValue+"&contentType="+contentType;
            }
            if( contentNum>0) {
                proData = proData +"&conmentNum="+contentNum;
            }
        }
        if(typeof(isPacksView)!="undefined" && isPacksView == 1) {
            proData = proData +"&isPacksView=" + isPacksView;
        }

        if(requestType == '70' || requestType == '75' || requestType == '76') {
            var crumbKeyWord = $(".mod_search_crumb .crumb_search .input_keyword").val();
            if(crumbKeyWord != "" && crumbKeyWord != "在结果中查找"){
                proData = proData + "&crumbKeyword=" + encodeURIComponent(encodeURIComponent(crumbKeyWord))+"|/";
            }
        }

        if(requestType == '75' || requestType == '76'){
            proData = proData +"&isCouponPage="+parseInt(requestType) + "&useScope=" + useScope;
        }
        var nextAdBlockStartIndex = $("#nextAdBlockStartIndex").val();
        if(typeof(nextAdBlockStartIndex)!="undefined" && nextAdBlockStartIndex > 0){
            proData = proData+"&nextAdIndex="+nextAdBlockStartIndex;
        }
        var nextImageAdBlockStartIndex = $("#nextImageAdBlockStartIndex").val();
        if(typeof(nextImageAdBlockStartIndex)!="undefined" && nextImageAdBlockStartIndex > 0){
            proData = proData+"&nextImageAdIndex="+nextImageAdBlockStartIndex;
        }
        if(typeof(fashionCateType)!="undefined"){
            proData = proData+"&fashionCateType="+fashionCateType;
        }

        // 跨域请求
        $.ajax({
            url : url,
            data : proData,
            dataType : 'jsonp',
            jsonp : "callback",
            success : function(data) {
                if (data.ERROR)
                    alert("ERROR = " + data.ERROR);
                else{
                    document.getElementById('plist').innerHTML = data.value;
                    //检测宽屏
                    if (isWidescreen==1){
                        $('.mod_search_list').removeClass('mod_search_list_zhai');//窄屏下1行4列显示
                    }
                    areasSelectBox.init();
                    lazyLoadImage();
//    	        	searchCombinelist(0);
//    	        	lazyPriceLoaderDefine(2);//翻页、排序等局部刷新
//    	        	YHD.SPagelazyLoade.getLazyLoadPrice();  //Ajax数据返回后，重新获取需要异步请求价格的商品元素。
//    	        	YHD.SPagelazyLoade.init();
                    jsShopSearchFed.modSearchProFn();
                    picChange();
                    if(productCount <=36 ) {
                        searchUserFeedback.main();
                    }
                    jsSearchAttributeFed.guideMore();
                    jsSearchAttributeFed.priceFilter();
//    	        	bljProduct.modPopBljInfos();//保垒价信息加载
//					newProduct.newProductHover();//新品文案提示

                    // 通过json获取页面其他部分需要更新的数据(比如搜索结果数目)，进行刷新
                    if ($("#jsonValue").length == 1) {
                        eval("var json_data=" + $("#jsonValue").val());
                        eval("var json_url_data=" + $("#jsonUrlValue").val());
                        $(".resultNum #num").html(json_data.productCount);  // 刷新搜索结果数目
//    	        		jsAjaxFed.search_traker_page(json_data);  //刷新traker连接
                        $("#searchUrl").attr("value",json_url_data.searchUrl);
                        eval("search_template=" + json_data.search_template);
                        searchPageNo=json_data.currentPage;
                    }
                    //局部刷新后，把bottomBrand的loaded设置为false,作用是为了在新页面上可以请求到72个商品的后36个
                    var bottomBrand=jQuery("#getMoreProducts");
                    bottomBrand.data("loaded",false);
                }
            }
        });
    },
    /* *
     *
     * 局部刷新traker更新
     *
     * */
    search_traker_page : function(json_data){
        //traker数据刷新
        var reg1=new RegExp("&resultSum=\\w*","g");
        trackerUrl=trackerUrl.replace(reg1,'');
        var reg2=new RegExp("&currentPage=\\w*","g");
        trackerUrl=trackerUrl.replace(reg2,'');
        var reg3=new RegExp("&extField7=[A-Za-z0-9_,]*","g");
        trackerUrl=trackerUrl.replace(reg3,'');
        var reg4=new RegExp("&tracker_type=\\w*","g");
        trackerUrl=trackerUrl.replace(reg4,'');
        var trackerContainer_search=new  TrackerContainer(trackerUrl);

        var specialTracker ="${specialTracker?if_exists}";

        if(specialTracker=='1'){
            trackerContainer_search.addParameter(new Parameter("resultSum",0));
        }else{
            trackerContainer_search.addParameter(new Parameter("resultSum",json_data.productCount));
        }
        trackerContainer_search.addParameter(new Parameter("currentPage",json_data.currentPage));
        trackerContainer_search.addParameter(new Parameter("tracker_type","1"));
        trackerContainer_search.toUrl();
        //recordTrackInfoWithType("1","search_productIds_exposure",json_data.extField7);
        if(typeof(moreAdvRef)!="undefined" && moreAdvRef !=''){
            // recordTrackInfoWithType("1",moreAdvRef,"ad.dolphin.bidding");

        }else if(typeof(json_data.adTrakeref)!="undefined" && json_data.adTrakeref !=''){
            // recordTrackInfoWithType("1",json_data.adTrakeref,"ad.dolphin.bidding");
        }
    },
    /* *
     *
     * 下方翻页条默认href是url，hash放在hash属性中，给爬虫爬;
     * 拉倒下方时，将hash赋给href，点击触发hashchange方法
     *
     * */
    setHashToHref : function(){
        $("#turnPageBottom a").each(function(){
            $(this).attr("href", $(this).attr("parameter")).removeAttr("parameter");
        });
    }
};

$(function(){
    /* *
     *
     * 排序、翻页触发浏览器地址hashchange
     *
     * */
    $(window).bind('hashchange', function() {
        var _hash = HASH.getRealHash();
        if (HASH.isCorrectHash(_hash)) {
            var url = HASH.handleUrl(_hash, HASH.ajaxLongUrl);

            getMoreProductsUrl = url;
            if (url && url != "0") {
                jsAjaxFed.ajaxRequestPage(url);
            }
            return false;
        }
    });
});

/**
 * 类目差异化，点击查看大图
 */
/*function searchLargeDressPics()	{
 // 查看大图点击事件
 $("#plist").delegate("#larger_view", "click", function(){
 var $this = $(this);
 var productId = $this.attr("prodId");
 var oId = $this.attr("oId");
 gotracker('2','largeDressPics',productId);
 //每次打开请判断是否是不同id
 if(preLargeDressPicId==0 || preLargeDressPicId!=productId) { // 和上次查看同一个商品的大图信息
 var title = $("#pdlink2_" + oId).text();
 var freeSingle_index = title.indexOf("[包邮]");
 if(freeSingle_index < 2) {
 title = title.substring(4 + freeSingle_index);
 }
 var href = $("#pdlink2_" + oId).attr("href");
 var price = $("#price0_" + oId).text();
 var newPrice;
 if(price){
 newPrice = price.split("¥")[1];
 }
 var big_price = "00";
 var small_price = "00";
 if(newPrice) {
 big_price = newPrice.split(".")[0];
 small_price = newPrice.split(".").length>1? newPrice.split(".")[1]:'00';
 }

 var tempUrl = jsSearchFedUtil.getSearchUrlPrefix() + "/searchLargePic/id" + productId;
 // 跨域请求
 $.ajax({
 url : tempUrl,
 dataType : 'jsonp',
 jsonp : "callback",
 success : function(data) {
 if(data.ERROR) {
 alert("ERROR : " + data.ERROR);
 return ;
 } else {
 if(!data.value || data.value=='' || data.value.indexOf('div')==-1) {
 return ;
 } else {
 preLargeDressPicId = productId;
 var pic_wrapper = $(".large_dress_pic .pic_wrapper");
 pic_wrapper.empty();
 // 图片
 pic_wrapper.append(data.value);

 var onClickMeth = "addTrackPositionToCookie('1','pro_largeImg_" +productId+ "');";
 var picHref = pic_wrapper.find("ul a");
 picHref.each(function() {
 $(this).attr("href", href);
 $(this).attr("target", "_blank");
 $(this).attr("onClick", onClickMeth);
 });
 // title
 var title_a = pic_wrapper.find("#title");
 title_a.attr("href", href);
 title_a.attr("target", "_blank");
 title_a.text(title);
 title_a.attr("onClick", onClickMeth);
 // 产品价格
 pic_wrapper.find(".big").text("¥"+big_price+".");
 pic_wrapper.find(".small").text(small_price);
 jsCategoryFed.openItemPic(productId);
 }
 }
 }
 });
 } else {
 jsCategoryFed.openItemPic(productId);
 }
 });

 $(document).delegate(".large_dress_pic .close", "click", function(){
 $(this).parents(".large_dress_pic").hide();
 $(".large_dress_pic_mask").hide();
 });
 }*/
/*!
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */

// Script: jQuery hashchange event
//
// *Version: 1.3, Last updated: 7/21/2010*
//
// Project Home - http://benalman.com/projects/jquery-hashchange-plugin/
// GitHub       - http://github.com/cowboy/jquery-hashchange/
// Source       - http://github.com/cowboy/jquery-hashchange/raw/master/jquery.ba-hashchange.js
// (Minified)   - http://github.com/cowboy/jquery-hashchange/raw/master/jquery.ba-hashchange.min.js (0.8kb gzipped)
//
// About: License
//
// Copyright (c) 2010 "Cowboy" Ben Alman,
// Dual licensed under the MIT and GPL licenses.
// http://benalman.com/about/license/
//
// About: Examples
//
// These working examples, complete with fully commented code, illustrate a few
// ways in which this plugin can be used.
//
// hashchange event - http://benalman.com/code/projects/jquery-hashchange/examples/hashchange/
// document.domain - http://benalman.com/code/projects/jquery-hashchange/examples/document_domain/
//
// About: Support and Testing
//
// Information about what version or versions of jQuery this plugin has been
// tested with, what browsers it has been tested in, and where the unit tests
// reside (so you can test it yourself).
//
// jQuery Versions - 1.2.6, 1.3.2, 1.4.1, 1.4.2
// Browsers Tested - Internet Explorer 6-8, Firefox 2-4, Chrome 5-6, Safari 3.2-5,
//                   Opera 9.6-10.60, iPhone 3.1, Android 1.6-2.2, BlackBerry 4.6-5.
// Unit Tests      - http://benalman.com/code/projects/jquery-hashchange/unit/
//
// About: Known issues
//
// While this jQuery hashchange event implementation is quite stable and
// robust, there are a few unfortunate browser bugs surrounding expected
// hashchange event-based behaviors, independent of any JavaScript
// window.onhashchange abstraction. See the following examples for more
// information:
//
// Chrome: Back Button - http://benalman.com/code/projects/jquery-hashchange/examples/bug-chrome-back-button/
// Firefox: Remote XMLHttpRequest - http://benalman.com/code/projects/jquery-hashchange/examples/bug-firefox-remote-xhr/
// WebKit: Back Button in an Iframe - http://benalman.com/code/projects/jquery-hashchange/examples/bug-webkit-hash-iframe/
// Safari: Back Button from a different domain - http://benalman.com/code/projects/jquery-hashchange/examples/bug-safari-back-from-diff-domain/
//
// Also note that should a browser natively support the window.onhashchange
// event, but not report that it does, the fallback polling loop will be used.
//
// About: Release History
//
// 1.3   - (7/21/2010) Reorganized IE6/7 Iframe code to make it more
//         "removable" for mobile-only development. Added IE6/7 document.title
//         support. Attempted to make Iframe as hidden as possible by using
//         techniques from http://www.paciellogroup.com/blog/?p=604. Added
//         support for the "shortcut" format $(window).hashchange( fn ) and
//         $(window).hashchange() like jQuery provides for built-in events.
//         Renamed jQuery.hashchangeDelay to <jQuery.fn.hashchange.delay> and
//         lowered its default value to 50. Added <jQuery.fn.hashchange.domain>
//         and <jQuery.fn.hashchange.src> properties plus document-domain.html
//         file to address access denied issues when setting document.domain in
//         IE6/7.
// 1.2   - (2/11/2010) Fixed a bug where coming back to a page using this plugin
//         from a page on another domain would cause an error in Safari 4. Also,
//         IE6/7 Iframe is now inserted after the body (this actually works),
//         which prevents the page from scrolling when the event is first bound.
//         Event can also now be bound before DOM ready, but it won't be usable
//         before then in IE6/7.
// 1.1   - (1/21/2010) Incorporated document.documentMode test to fix IE8 bug
//         where browser version is incorrectly reported as 8.0, despite
//         inclusion of the X-UA-Compatible IE=EmulateIE7 meta tag.
// 1.0   - (1/9/2010) Initial Release. Broke out the jQuery BBQ event.special
//         window.onhashchange functionality into a separate plugin for users
//         who want just the basic event & back button support, without all the
//         extra awesomeness that BBQ provides. This plugin will be included as
//         part of jQuery BBQ, but also be available separately.

(function($,window,undefined){
    '$:nomunge'; // Used by YUI compressor.

    // Reused string.
    var str_hashchange = 'hashchange',

        // Method / object references.
        doc = document,
        fake_onhashchange,
        special = $.event.special,

        // Does the browser support window.onhashchange? Note that IE8 running in
        // IE7 compatibility mode reports true for 'onhashchange' in window, even
        // though the event isn't supported, so also test document.documentMode.
        doc_mode = doc.documentMode,
        supports_onhashchange = 'on' + str_hashchange in window && ( doc_mode === undefined || doc_mode > 7 );

    // Get location.hash (or what you'd expect location.hash to be) sans any
    // leading #. Thanks for making this necessary, Firefox!
    function get_fragment( url ) {
        url = url || location.href;
        return '#' + url.replace( /^[^#]*#?(.*)$/, '$1' );
    };

    // Method: jQuery.fn.hashchange
    //
    // Bind a handler to the window.onhashchange event or trigger all bound
    // window.onhashchange event handlers. This behavior is consistent with
    // jQuery's built-in event handlers.
    //
    // Usage:
    //
    // > jQuery(window).hashchange( [ handler ] );
    //
    // Arguments:
    //
    //  handler - (Function) Optional handler to be bound to the hashchange
    //    event. This is a "shortcut" for the more verbose form:
    //    jQuery(window).bind( 'hashchange', handler ). If handler is omitted,
    //    all bound window.onhashchange event handlers will be triggered. This
    //    is a shortcut for the more verbose
    //    jQuery(window).trigger( 'hashchange' ). These forms are described in
    //    the <hashchange event> section.
    //
    // Returns:
    //
    //  (jQuery) The initial jQuery collection of elements.

    // Allow the "shortcut" format $(elem).hashchange( fn ) for binding and
    // $(elem).hashchange() for triggering, like jQuery does for built-in events.
    $.fn[ str_hashchange ] = function( fn ) {
        return fn ? this.bind( str_hashchange, fn ) : this.trigger( str_hashchange );
    };

    // Property: jQuery.fn.hashchange.delay
    //
    // The numeric interval (in milliseconds) at which the <hashchange event>
    // polling loop executes. Defaults to 50.

    // Property: jQuery.fn.hashchange.domain
    //
    // If you're setting document.domain in your JavaScript, and you want hash
    // history to work in IE6/7, not only must this property be set, but you must
    // also set document.domain BEFORE jQuery is loaded into the page. This
    // property is only applicable if you are supporting IE6/7 (or IE8 operating
    // in "IE7 compatibility" mode).
    //
    // In addition, the <jQuery.fn.hashchange.src> property must be set to the
    // path of the included "document-domain.html" file, which can be renamed or
    // modified if necessary (note that the document.domain specified must be the
    // same in both your main JavaScript as well as in this file).
    //
    // Usage:
    //
    // jQuery.fn.hashchange.domain = document.domain;

    // Property: jQuery.fn.hashchange.src
    //
    // If, for some reason, you need to specify an Iframe src file (for example,
    // when setting document.domain as in <jQuery.fn.hashchange.domain>), you can
    // do so using this property. Note that when using this property, history
    // won't be recorded in IE6/7 until the Iframe src file loads. This property
    // is only applicable if you are supporting IE6/7 (or IE8 operating in "IE7
    // compatibility" mode).
    //
    // Usage:
    //
    // jQuery.fn.hashchange.src = 'path/to/file.html';

    $.fn[ str_hashchange ].delay = 50;
    /*
     $.fn[ str_hashchange ].domain = null;
     $.fn[ str_hashchange ].src = null;
     */

    // Event: hashchange event
    //
    // Fired when location.hash changes. In browsers that support it, the native
    // HTML5 window.onhashchange event is used, otherwise a polling loop is
    // initialized, running every <jQuery.fn.hashchange.delay> milliseconds to
    // see if the hash has changed. In IE6/7 (and IE8 operating in "IE7
    // compatibility" mode), a hidden Iframe is created to allow the back button
    // and hash-based history to work.
    //
    // Usage as described in <jQuery.fn.hashchange>:
    //
    // > // Bind an event handler.
    // > jQuery(window).hashchange( function(e) {
    // >   var hash = location.hash;
    // >   ...
    // > });
    // >
    // > // Manually trigger the event handler.
    // > jQuery(window).hashchange();
    //
    // A more verbose usage that allows for event namespacing:
    //
    // > // Bind an event handler.
    // > jQuery(window).bind( 'hashchange', function(e) {
    // >   var hash = location.hash;
    // >   ...
    // > });
    // >
    // > // Manually trigger the event handler.
    // > jQuery(window).trigger( 'hashchange' );
    //
    // Additional Notes:
    //
    // * The polling loop and Iframe are not created until at least one handler
    //   is actually bound to the 'hashchange' event.
    // * If you need the bound handler(s) to execute immediately, in cases where
    //   a location.hash exists on page load, via bookmark or page refresh for
    //   example, use jQuery(window).hashchange() or the more verbose
    //   jQuery(window).trigger( 'hashchange' ).
    // * The event can be bound before DOM ready, but since it won't be usable
    //   before then in IE6/7 (due to the necessary Iframe), recommended usage is
    //   to bind it inside a DOM ready handler.

    // Override existing $.event.special.hashchange methods (allowing this plugin
    // to be defined after jQuery BBQ in BBQ's source code).
    special[ str_hashchange ] = $.extend( special[ str_hashchange ], {

        // Called only when the first 'hashchange' event is bound to window.
        setup: function() {
            // If window.onhashchange is supported natively, there's nothing to do..
            if ( supports_onhashchange ) { return false; }

            // Otherwise, we need to create our own. And we don't want to call this
            // until the user binds to the event, just in case they never do, since it
            // will create a polling loop and possibly even a hidden Iframe.
            $( fake_onhashchange.start );
        },

        // Called only when the last 'hashchange' event is unbound from window.
        teardown: function() {
            // If window.onhashchange is supported natively, there's nothing to do..
            if ( supports_onhashchange ) { return false; }

            // Otherwise, we need to stop ours (if possible).
            $( fake_onhashchange.stop );
        }

    });

    // fake_onhashchange does all the work of triggering the window.onhashchange
    // event for browsers that don't natively support it, including creating a
    // polling loop to watch for hash changes and in IE 6/7 creating a hidden
    // Iframe to enable back and forward.
    fake_onhashchange = (function(){
        var self = {},
            timeout_id,

            // Remember the initial hash so it doesn't get triggered immediately.
            last_hash = get_fragment(),

            fn_retval = function(val){ return val; },
            history_set = fn_retval,
            history_get = fn_retval;

        // Start the polling loop.
        self.start = function() {
            timeout_id || poll();
        };

        // Stop the polling loop.
        self.stop = function() {
            timeout_id && clearTimeout( timeout_id );
            timeout_id = undefined;
        };

        // This polling loop checks every $.fn.hashchange.delay milliseconds to see
        // if location.hash has changed, and triggers the 'hashchange' event on
        // window when necessary.
        function poll() {
            var hash = get_fragment(),
                history_hash = history_get( last_hash );

            if ( hash !== last_hash ) {
                history_set( last_hash = hash, history_hash );

                $(window).trigger( str_hashchange );

            } else if ( history_hash !== last_hash ) {
                location.href = location.href.replace( /#.*/, '' ) + history_hash;
            }

            timeout_id = setTimeout( poll, $.fn[ str_hashchange ].delay );
        };

        // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
        // vvvvvvvvvvvvvvvvvvv REMOVE IF NOT SUPPORTING IE6/7/8 vvvvvvvvvvvvvvvvvvv
        // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
        $.browser.msie && !supports_onhashchange && (function(){
            // Not only do IE6/7 need the "magical" Iframe treatment, but so does IE8
            // when running in "IE7 compatibility" mode.

            var iframe,
                iframe_src;

            // When the event is bound and polling starts in IE 6/7, create a hidden
            // Iframe for history handling.
            self.start = function(){
                if ( !iframe ) {
                    iframe_src = $.fn[ str_hashchange ].src;
                    iframe_src = iframe_src && iframe_src + get_fragment();

                    // Create hidden Iframe. Attempt to make Iframe as hidden as possible
                    // by using techniques from http://www.paciellogroup.com/blog/?p=604.
                    iframe = $('<iframe tabindex="-1" title="empty"/>').hide()

                    // When Iframe has completely loaded, initialize the history and
                    // start polling.
                        .one( 'load', function(){
                            iframe_src || history_set( get_fragment() );
                            poll();
                        })

                        // Load Iframe src if specified, otherwise nothing.
                        .attr( 'src', iframe_src || 'javascript:0' )

                        // Append Iframe after the end of the body to prevent unnecessary
                        // initial page scrolling (yes, this works).
                        .insertAfter( 'body' )[0].contentWindow;

                    // Whenever `document.title` changes, update the Iframe's title to
                    // prettify the back/next history menu entries. Since IE sometimes
                    // errors with "Unspecified error" the very first time this is set
                    // (yes, very useful) wrap this with a try/catch block.
                    doc.onpropertychange = function(){
                        try {
                            if ( event.propertyName === 'title' ) {
                                iframe.document.title = doc.title;
                            }
                        } catch(e) {}
                    };

                }
            };

            // Override the "stop" method since an IE6/7 Iframe was created. Even
            // if there are no longer any bound event handlers, the polling loop
            // is still necessary for back/next to work at all!
            self.stop = fn_retval;

            // Get history by looking at the hidden Iframe's location.hash.
            history_get = function() {
                return get_fragment( iframe.location.href );
            };

            // Set a new history item by opening and then closing the Iframe
            // document, *then* setting its location.hash. If document.domain has
            // been set, update that as well.
            history_set = function( hash, history_hash ) {
                var iframe_doc = iframe.document,
                    domain = $.fn[ str_hashchange ].domain;

                if ( hash !== history_hash ) {
                    // Update Iframe with any initial `document.title` that might be set.
                    iframe_doc.title = doc.title;

                    // Opening the Iframe's document after it has been closed is what
                    // actually adds a history entry.
                    iframe_doc.open();

                    // Set document.domain for the Iframe document as well, if necessary.
                    domain && iframe_doc.write( '<script>document.domain="' + domain + '"</script>' );

                    iframe_doc.close();

                    // Update the Iframe's hash, for great justice.
                    iframe.location.hash = hash;
                }
            };

        })();
        // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        // ^^^^^^^^^^^^^^^^^^^ REMOVE IF NOT SUPPORTING IE6/7/8 ^^^^^^^^^^^^^^^^^^^
        // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

        return self;
    })();

})(jQuery,this);

/*!
 * jScrollPane - v2.0.19 - 2013-11-16
 * http://jscrollpane.kelvinluck.com/
 *
 * Copyright (c) 2013 Kelvin Luck
 * Dual licensed under the MIT or GPL licenses.
 */
!function(a,b,c){a.fn.jScrollPane=function(d){function e(d,e){function f(b){var e,h,j,l,m,n,q=!1,r=!1;if(P=b,Q===c)m=d.scrollTop(),n=d.scrollLeft(),d.css({overflow:"hidden",padding:0}),R=d.innerWidth()+tb,S=d.innerHeight(),d.width(R),Q=a('<div class="jspPane" />').css("padding",sb).append(d.children()),T=a('<div class="jspContainer" />').css({width:R+"px",height:S+"px"}).append(Q).appendTo(d);else{if(d.css("width",""),q=P.stickToBottom&&C(),r=P.stickToRight&&D(),l=d.innerWidth()+tb!=R||d.outerHeight()!=S,l&&(R=d.innerWidth()+tb,S=d.innerHeight(),T.css({width:R+"px",height:S+"px"})),!l&&ub==U&&Q.outerHeight()==V)return d.width(R),void 0;ub=U,Q.css("width",""),d.width(R),T.find(">.jspVerticalBar,>.jspHorizontalBar").remove().end()}Q.css("overflow","auto"),U=b.contentWidth?b.contentWidth:Q[0].scrollWidth,V=Q[0].scrollHeight,Q.css("overflow",""),W=U/R,X=V/S,Y=X>1,Z=W>1,Z||Y?(d.addClass("jspScrollable"),e=P.maintainPosition&&(ab||db),e&&(h=A(),j=B()),g(),i(),k(),e&&(y(r?U-R:h,!1),x(q?V-S:j,!1)),H(),E(),N(),P.enableKeyboardNavigation&&J(),P.clickOnTrack&&o(),L(),P.hijackInternalLinks&&M()):(d.removeClass("jspScrollable"),Q.css({top:0,left:0,width:T.width()-tb}),F(),I(),K(),p()),P.autoReinitialise&&!rb?rb=setInterval(function(){f(P)},P.autoReinitialiseDelay):!P.autoReinitialise&&rb&&clearInterval(rb),m&&d.scrollTop(0)&&x(m,!1),n&&d.scrollLeft(0)&&y(n,!1),d.trigger("jsp-initialised",[Z||Y])}function g(){Y&&(T.append(a('<div class="jspVerticalBar" />').append(a('<div class="jspCap jspCapTop" />'),a('<div class="jspTrack" />').append(a('<div class="jspDrag" />').append(a('<div class="jspDragTop" />'),a('<div class="jspDragBottom" />'))),a('<div class="jspCap jspCapBottom" />'))),eb=T.find(">.jspVerticalBar"),fb=eb.find(">.jspTrack"),$=fb.find(">.jspDrag"),P.showArrows&&(jb=a('<a class="jspArrow jspArrowUp" />').bind("mousedown.jsp",m(0,-1)).bind("click.jsp",G),kb=a('<a class="jspArrow jspArrowDown" />').bind("mousedown.jsp",m(0,1)).bind("click.jsp",G),P.arrowScrollOnHover&&(jb.bind("mouseover.jsp",m(0,-1,jb)),kb.bind("mouseover.jsp",m(0,1,kb))),l(fb,P.verticalArrowPositions,jb,kb)),hb=S,T.find(">.jspVerticalBar>.jspCap:visible,>.jspVerticalBar>.jspArrow").each(function(){hb-=a(this).outerHeight()}),$.hover(function(){$.addClass("jspHover")},function(){$.removeClass("jspHover")}).bind("mousedown.jsp",function(b){a("html").bind("dragstart.jsp selectstart.jsp",G),$.addClass("jspActive");var c=b.pageY-$.position().top;return a("html").bind("mousemove.jsp",function(a){r(a.pageY-c,!1)}).bind("mouseup.jsp mouseleave.jsp",q),!1}),h())}function h(){fb.height(hb+"px"),ab=0,gb=P.verticalGutter+fb.outerWidth(),Q.width(R-gb-tb);try{0===eb.position().left&&Q.css("margin-left",gb+"px")}catch(a){}}function i(){Z&&(T.append(a('<div class="jspHorizontalBar" />').append(a('<div class="jspCap jspCapLeft" />'),a('<div class="jspTrack" />').append(a('<div class="jspDrag" />').append(a('<div class="jspDragLeft" />'),a('<div class="jspDragRight" />'))),a('<div class="jspCap jspCapRight" />'))),lb=T.find(">.jspHorizontalBar"),mb=lb.find(">.jspTrack"),bb=mb.find(">.jspDrag"),P.showArrows&&(pb=a('<a class="jspArrow jspArrowLeft" />').bind("mousedown.jsp",m(-1,0)).bind("click.jsp",G),qb=a('<a class="jspArrow jspArrowRight" />').bind("mousedown.jsp",m(1,0)).bind("click.jsp",G),P.arrowScrollOnHover&&(pb.bind("mouseover.jsp",m(-1,0,pb)),qb.bind("mouseover.jsp",m(1,0,qb))),l(mb,P.horizontalArrowPositions,pb,qb)),bb.hover(function(){bb.addClass("jspHover")},function(){bb.removeClass("jspHover")}).bind("mousedown.jsp",function(b){a("html").bind("dragstart.jsp selectstart.jsp",G),bb.addClass("jspActive");var c=b.pageX-bb.position().left;return a("html").bind("mousemove.jsp",function(a){t(a.pageX-c,!1)}).bind("mouseup.jsp mouseleave.jsp",q),!1}),nb=T.innerWidth(),j())}function j(){T.find(">.jspHorizontalBar>.jspCap:visible,>.jspHorizontalBar>.jspArrow").each(function(){nb-=a(this).outerWidth()}),mb.width(nb+"px"),db=0}function k(){if(Z&&Y){var b=mb.outerHeight(),c=fb.outerWidth();hb-=b,a(lb).find(">.jspCap:visible,>.jspArrow").each(function(){nb+=a(this).outerWidth()}),nb-=c,S-=c,R-=b,mb.parent().append(a('<div class="jspCorner" />').css("width",b+"px")),h(),j()}Z&&Q.width(T.outerWidth()-tb+"px"),V=Q.outerHeight(),X=V/S,Z&&(ob=Math.ceil(1/W*nb),ob>P.horizontalDragMaxWidth?ob=P.horizontalDragMaxWidth:ob<P.horizontalDragMinWidth&&(ob=P.horizontalDragMinWidth),bb.width(ob+"px"),cb=nb-ob,u(db)),Y&&(ib=Math.ceil(1/X*hb),ib>P.verticalDragMaxHeight?ib=P.verticalDragMaxHeight:ib<P.verticalDragMinHeight&&(ib=P.verticalDragMinHeight),$.height(ib+"px"),_=hb-ib,s(ab))}function l(a,b,c,d){var e,f="before",g="after";"os"==b&&(b=/Mac/.test(navigator.platform)?"after":"split"),b==f?g=b:b==g&&(f=b,e=c,c=d,d=e),a[f](c)[g](d)}function m(a,b,c){return function(){return n(a,b,this,c),this.blur(),!1}}function n(b,c,d,e){d=a(d).addClass("jspActive");var f,g,h=!0,i=function(){0!==b&&vb.scrollByX(b*P.arrowButtonSpeed),0!==c&&vb.scrollByY(c*P.arrowButtonSpeed),g=setTimeout(i,h?P.initialDelay:P.arrowRepeatFreq),h=!1};i(),f=e?"mouseout.jsp":"mouseup.jsp",e=e||a("html"),e.bind(f,function(){d.removeClass("jspActive"),g&&clearTimeout(g),g=null,e.unbind(f)})}function o(){p(),Y&&fb.bind("mousedown.jsp",function(b){if(b.originalTarget===c||b.originalTarget==b.currentTarget){var d,e=a(this),f=e.offset(),g=b.pageY-f.top-ab,h=!0,i=function(){var a=e.offset(),c=b.pageY-a.top-ib/2,f=S*P.scrollPagePercent,k=_*f/(V-S);if(0>g)ab-k>c?vb.scrollByY(-f):r(c);else{if(!(g>0))return j(),void 0;c>ab+k?vb.scrollByY(f):r(c)}d=setTimeout(i,h?P.initialDelay:P.trackClickRepeatFreq),h=!1},j=function(){d&&clearTimeout(d),d=null,a(document).unbind("mouseup.jsp",j)};return i(),a(document).bind("mouseup.jsp",j),!1}}),Z&&mb.bind("mousedown.jsp",function(b){if(b.originalTarget===c||b.originalTarget==b.currentTarget){var d,e=a(this),f=e.offset(),g=b.pageX-f.left-db,h=!0,i=function(){var a=e.offset(),c=b.pageX-a.left-ob/2,f=R*P.scrollPagePercent,k=cb*f/(U-R);if(0>g)db-k>c?vb.scrollByX(-f):t(c);else{if(!(g>0))return j(),void 0;c>db+k?vb.scrollByX(f):t(c)}d=setTimeout(i,h?P.initialDelay:P.trackClickRepeatFreq),h=!1},j=function(){d&&clearTimeout(d),d=null,a(document).unbind("mouseup.jsp",j)};return i(),a(document).bind("mouseup.jsp",j),!1}})}function p(){mb&&mb.unbind("mousedown.jsp"),fb&&fb.unbind("mousedown.jsp")}function q(){a("html").unbind("dragstart.jsp selectstart.jsp mousemove.jsp mouseup.jsp mouseleave.jsp"),$&&$.removeClass("jspActive"),bb&&bb.removeClass("jspActive")}function r(a,b){Y&&(0>a?a=0:a>_&&(a=_),b===c&&(b=P.animateScroll),b?vb.animate($,"top",a,s):($.css("top",a),s(a)))}function s(a){a===c&&(a=$.position().top),T.scrollTop(0),ab=a;var b=0===ab,e=ab==_,f=a/_,g=-f*(V-S);(wb!=b||yb!=e)&&(wb=b,yb=e,d.trigger("jsp-arrow-change",[wb,yb,xb,zb])),v(b,e),Q.css("top",g),d.trigger("jsp-scroll-y",[-g,b,e]).trigger("scroll")}function t(a,b){Z&&(0>a?a=0:a>cb&&(a=cb),b===c&&(b=P.animateScroll),b?vb.animate(bb,"left",a,u):(bb.css("left",a),u(a)))}function u(a){a===c&&(a=bb.position().left),T.scrollTop(0),db=a;var b=0===db,e=db==cb,f=a/cb,g=-f*(U-R);(xb!=b||zb!=e)&&(xb=b,zb=e,d.trigger("jsp-arrow-change",[wb,yb,xb,zb])),w(b,e),Q.css("left",g),d.trigger("jsp-scroll-x",[-g,b,e]).trigger("scroll")}function v(a,b){P.showArrows&&(jb[a?"addClass":"removeClass"]("jspDisabled"),kb[b?"addClass":"removeClass"]("jspDisabled"))}function w(a,b){P.showArrows&&(pb[a?"addClass":"removeClass"]("jspDisabled"),qb[b?"addClass":"removeClass"]("jspDisabled"))}function x(a,b){var c=a/(V-S);r(c*_,b)}function y(a,b){var c=a/(U-R);t(c*cb,b)}function z(b,c,d){var e,f,g,h,i,j,k,l,m,n=0,o=0;try{e=a(b)}catch(p){return}for(f=e.outerHeight(),g=e.outerWidth(),T.scrollTop(0),T.scrollLeft(0);!e.is(".jspPane");)if(n+=e.position().top,o+=e.position().left,e=e.offsetParent(),/^body|html$/i.test(e[0].nodeName))return;h=B(),j=h+S,h>n||c?l=n-P.horizontalGutter:n+f>j&&(l=n-S+f+P.horizontalGutter),isNaN(l)||x(l,d),i=A(),k=i+R,i>o||c?m=o-P.horizontalGutter:o+g>k&&(m=o-R+g+P.horizontalGutter),isNaN(m)||y(m,d)}function A(){return-Q.position().left}function B(){return-Q.position().top}function C(){var a=V-S;return a>20&&a-B()<10}function D(){var a=U-R;return a>20&&a-A()<10}function E(){T.unbind(Bb).bind(Bb,function(a,b,c,d){var e=db,f=ab,g=a.deltaFactor||P.mouseWheelSpeed;return vb.scrollBy(c*g,-d*g,!1),e==db&&f==ab})}function F(){T.unbind(Bb)}function G(){return!1}function H(){Q.find(":input,a").unbind("focus.jsp").bind("focus.jsp",function(a){z(a.target,!1)})}function I(){Q.find(":input,a").unbind("focus.jsp")}function J(){function b(){var a=db,b=ab;switch(c){case 40:vb.scrollByY(P.keyboardSpeed,!1);break;case 38:vb.scrollByY(-P.keyboardSpeed,!1);break;case 34:case 32:vb.scrollByY(S*P.scrollPagePercent,!1);break;case 33:vb.scrollByY(-S*P.scrollPagePercent,!1);break;case 39:vb.scrollByX(P.keyboardSpeed,!1);break;case 37:vb.scrollByX(-P.keyboardSpeed,!1)}return e=a!=db||b!=ab}var c,e,f=[];Z&&f.push(lb[0]),Y&&f.push(eb[0]),Q.focus(function(){d.focus()}),d.attr("tabindex",0).unbind("keydown.jsp keypress.jsp").bind("keydown.jsp",function(d){if(d.target===this||f.length&&a(d.target).closest(f).length){var g=db,h=ab;switch(d.keyCode){case 40:case 38:case 34:case 32:case 33:case 39:case 37:c=d.keyCode,b();break;case 35:x(V-S),c=null;break;case 36:x(0),c=null}return e=d.keyCode==c&&g!=db||h!=ab,!e}}).bind("keypress.jsp",function(a){return a.keyCode==c&&b(),!e}),P.hideFocus?(d.css("outline","none"),"hideFocus"in T[0]&&d.attr("hideFocus",!0)):(d.css("outline",""),"hideFocus"in T[0]&&d.attr("hideFocus",!1))}function K(){d.attr("tabindex","-1").removeAttr("tabindex").unbind("keydown.jsp keypress.jsp")}function L(){if(location.hash&&location.hash.length>1){var b,c,d=escape(location.hash.substr(1));try{b=a("#"+d+', a[name="'+d+'"]')}catch(e){return}b.length&&Q.find(d)&&(0===T.scrollTop()?c=setInterval(function(){T.scrollTop()>0&&(z(b,!0),a(document).scrollTop(T.position().top),clearInterval(c))},50):(z(b,!0),a(document).scrollTop(T.position().top)))}}function M(){a(document.body).data("jspHijack")||(a(document.body).data("jspHijack",!0),a(document.body).delegate("a[href*=#]","click",function(c){var d,e,f,g,h,i,j=this.href.substr(0,this.href.indexOf("#")),k=location.href;if(-1!==location.href.indexOf("#")&&(k=location.href.substr(0,location.href.indexOf("#"))),j===k){d=escape(this.href.substr(this.href.indexOf("#")+1));try{e=a("#"+d+', a[name="'+d+'"]')}catch(l){return}e.length&&(f=e.closest(".jspScrollable"),g=f.data("jsp"),g.scrollToElement(e,!0),f[0].scrollIntoView&&(h=a(b).scrollTop(),i=e.offset().top,(h>i||i>h+a(b).height())&&f[0].scrollIntoView()),c.preventDefault())}}))}function N(){var a,b,c,d,e,f=!1;T.unbind("touchstart.jsp touchmove.jsp touchend.jsp click.jsp-touchclick").bind("touchstart.jsp",function(g){var h=g.originalEvent.touches[0];a=A(),b=B(),c=h.pageX,d=h.pageY,e=!1,f=!0}).bind("touchmove.jsp",function(g){if(f){var h=g.originalEvent.touches[0],i=db,j=ab;return vb.scrollTo(a+c-h.pageX,b+d-h.pageY),e=e||Math.abs(c-h.pageX)>5||Math.abs(d-h.pageY)>5,i==db&&j==ab}}).bind("touchend.jsp",function(){f=!1}).bind("click.jsp-touchclick",function(){return e?(e=!1,!1):void 0})}function O(){var a=B(),b=A();d.removeClass("jspScrollable").unbind(".jsp"),d.replaceWith(Ab.append(Q.children())),Ab.scrollTop(a),Ab.scrollLeft(b),rb&&clearInterval(rb)}var P,Q,R,S,T,U,V,W,X,Y,Z,$,_,ab,bb,cb,db,eb,fb,gb,hb,ib,jb,kb,lb,mb,nb,ob,pb,qb,rb,sb,tb,ub,vb=this,wb=!0,xb=!0,yb=!1,zb=!1,Ab=d.clone(!1,!1).empty(),Bb=a.fn.mwheelIntent?"mwheelIntent.jsp":"mousewheel.jsp";"border-box"===d.css("box-sizing")?(sb=0,tb=0):(sb=d.css("paddingTop")+" "+d.css("paddingRight")+" "+d.css("paddingBottom")+" "+d.css("paddingLeft"),tb=(parseInt(d.css("paddingLeft"),10)||0)+(parseInt(d.css("paddingRight"),10)||0)),a.extend(vb,{reinitialise:function(b){b=a.extend({},P,b),f(b)},scrollToElement:function(a,b,c){z(a,b,c)},scrollTo:function(a,b,c){y(a,c),x(b,c)},scrollToX:function(a,b){y(a,b)},scrollToY:function(a,b){x(a,b)},scrollToPercentX:function(a,b){y(a*(U-R),b)},scrollToPercentY:function(a,b){x(a*(V-S),b)},scrollBy:function(a,b,c){vb.scrollByX(a,c),vb.scrollByY(b,c)},scrollByX:function(a,b){var c=A()+Math[0>a?"floor":"ceil"](a),d=c/(U-R);t(d*cb,b)},scrollByY:function(a,b){var c=B()+Math[0>a?"floor":"ceil"](a),d=c/(V-S);r(d*_,b)},positionDragX:function(a,b){t(a,b)},positionDragY:function(a,b){r(a,b)},animate:function(a,b,c,d){var e={};e[b]=c,a.animate(e,{duration:P.animateDuration,easing:P.animateEase,queue:!1,step:d})},getContentPositionX:function(){return A()},getContentPositionY:function(){return B()},getContentWidth:function(){return U},getContentHeight:function(){return V},getPercentScrolledX:function(){return A()/(U-R)},getPercentScrolledY:function(){return B()/(V-S)},getIsScrollableH:function(){return Z},getIsScrollableV:function(){return Y},getContentPane:function(){return Q},scrollToBottom:function(a){r(_,a)},hijackInternalLinks:a.noop,destroy:function(){O()}}),f(e)}return d=a.extend({},a.fn.jScrollPane.defaults,d),a.each(["arrowButtonSpeed","trackClickSpeed","keyboardSpeed"],function(){d[this]=d[this]||d.speed}),this.each(function(){var b=a(this),c=b.data("jsp");c?c.reinitialise(d):(a("script",b).filter('[type="text/javascript"],:not([type])').remove(),c=new e(b,d),b.data("jsp",c))})},a.fn.jScrollPane.defaults={showArrows:!1,maintainPosition:!0,stickToBottom:!1,stickToRight:!1,clickOnTrack:!0,autoReinitialise:!1,autoReinitialiseDelay:500,verticalDragMinHeight:0,verticalDragMaxHeight:99999,horizontalDragMinWidth:0,horizontalDragMaxWidth:99999,contentWidth:c,animateScroll:!1,animateDuration:300,animateEase:"linear",hijackInternalLinks:!1,verticalGutter:4,horizontalGutter:4,mouseWheelSpeed:3,arrowButtonSpeed:0,arrowRepeatFreq:50,arrowScrollOnHover:!1,trackClickSpeed:0,trackClickRepeatFreq:70,verticalArrowPositions:"split",horizontalArrowPositions:"split",enableKeyboardNavigation:!0,hideFocus:!1,keyboardSpeed:0,initialDelay:300,speed:30,scrollPagePercent:.8}}(jQuery,this);
var jsShopSearchFed = {
    /* *
     *
     * 商品模板 备注:大图模式
     *
     * */
    modSearchProFn : function() {
        var modSearchPro = $('.mod_search_pro'),
            n = 0;
        modSearchPro.find('.styleBox').each(function(){
            var h = $(this).outerHeight(true);
            $(this).css("bottom",-h);
        });
        $('.mod_product_list,.mod_search_store').delegate('.mod_search_pro','mouseenter',function(){
            $(this).find('.bg_border').show();
            $(this).addClass('zIndex');
            $(this).find('.styleBox').animate({bottom:0}, 100);
//            $(this).find('.proCrumb .cBtn').show().stop().animate({opacity:1},300);
//            $(this).find('#sellOut_s').attr("style","display:none;");

        });
        $('.mod_product_list,.mod_search_store').delegate('.mod_search_pro','mouseleave',function(){
            var h = $(this).find('.styleBox').outerHeight(true);
            $(this).find('.bg_border').hide();
            $(this).removeClass('zIndex');
            $(this).find('.styleBox').animate({bottom:-h}, 100);
//            $(this).find('.proCrumb .cBtn').hide().stop().animate({opacity:0},300);
//            $(this).find('#sellOut_s').attr("style","display:block;");
        });
        //小图点击滚动
        var scrollImg = function(obj){
            //alert(1)
            var lw = obj.find('.proCrumb .mBox b').outerWidth(true),
                cb = obj.find('.proCrumb .cBtn'),
                cn = obj.find('.proCrumb .next'),
                cp = obj.find('.proCrumb .prev'),
                hideBox = obj.find('.proCrumb .hideBox'),
                hw = obj.find('.proCrumb .hideBox').width(),
                w = obj.find('.proCrumb .mBox').width(),
                c = obj.find('.proCrumb .mBox'),
                b = obj.find('.proCrumb .mBox b'),
                d = b.length,
                k = b.length * b.outerWidth(true)+2,
                n = 0;
            //计算 mBox 宽度
            w > hw ? c.width(k) : null;
            // 宽窄屏判断小于N个
            var hideB = function(){
                hideBox.css('left','6px');
                cb.hide();
            };
            if(screen.width >= 1280){
                if(obj.hasClass('store'))
                {
                    d <= 6 ? hideB() : null;
                }
                else
                {
                    d <= 7 ? hideB() : null;
                }
            }
            else if(screen.width < 1280)
            {
                if(obj.hasClass('store'))
                {
                    d <= 5 ? hideB() : null;
                }
                else
                {
                    d <= 6 ? hideB() : null;
                }
            }
            //小图点击效果
            b.click(function(){
                $(this).addClass('cur');
                $(this).siblings('b').removeClass('cur');
            });
            cn.click(function(){

                if( n < d - hw/lw){
                    n++;
                }
                scrollFn();
            });
            cp.click(function(){
                if( n > 0){
                    n--;
                }
                scrollFn();
            });
            var scrollFn = function(){
                c.stop().animate({left:-n*lw},200);
            };
        };
        //执行小图点击滚动
        modSearchPro.each(function(){
            scrollImg($(this));

        });

    }
};



/* IE 分辨率 */
isIE = {
    lowerIE8: function() {
        var agent = navigator.userAgent.toLowerCase();
        //var ieAgent = /msie\s*(\d)/.exec(navigator.userAgent.toLowerCase());
        if (agent.indexOf("msie") < 0) return false;
        var ieAgent = agent.split("msie");
        return parseInt(ieAgent[1].split(";")[0]) <= 8;
    },
    clinetSize1: 1200,
    clinetSize2: 1400,
    isMore1200px: function() {
        return document.documentElement.clientWidth >= this.clinetSize1;
    },
    isMore1440px: function() {
        return document.documentElement.clientWidth > this.clinetSize2;
    }
};
if(isIE.lowerIE8()){
    if(isIE.isMore1440px()){
        $("body").removeClass().addClass("w1400");
    }else if(isIE.isMore1200px()){
        $("body").removeClass().addClass("w1200");
    }else{
        $("body").removeClass().addClass("w980");
    }
}
var s;
$(window).resize(function(){
    clearTimeout(s);
    s = setTimeout(function(){
        if(isIE.lowerIE8()){
            if(isIE.isMore1440px()){
                $("body").removeClass().addClass("w1400");
            }else if(isIE.isMore1200px()){
                $("body").removeClass().addClass("w1200");
            }else{
                $("body").removeClass().addClass("w980");
            }
        }
    },100);
});


var newProduct={
    /*新品hover*/
    newProductHover:function(){
        $('.ico_search_list.pro_tag').hover(function(){
            $(this).parent().siblings(".pro_tag_con").show();
        },function(){
            $(this).parent().siblings(".pro_tag_con").hide();
        });
    }
};

var bljProduct = {

    /*保垒价hover*/
    modPopBljInfos:function(){
        $('.ico_search_list.blj').hover(function(){
            var pminfoId = $(this).attr("pminfo");
            if (!pminfoId || pminfoId == 0) return;
            var priceWarUL = $(this).parent().siblings(".blj_con");
            if(typeof(priceWarUL) == "undefined" || priceWarUL == null || priceWarUL.length == 0){
                bljProduct.loadPriceWarInfos(this);
            }else{
                $(priceWarUL).show();
            }
        },function(){
            $(this).parent().siblings(".blj_con").hide();
        });
    },

    loadPriceWarInfos:function(obj){
        var pminfoId = $(obj).attr("pminfo");
        var tempUrl = jsSearchFedUtil.getSearchUrlPrefix() + "/searchPriceWar/pmid" + pminfoId;
        // 跨域请求
        $.ajax({
            url : tempUrl,
            dataType : 'jsonp',
            jsonp : "callback",
            success : function(data) {
                if (data.ERROR)
                    alert("ERROR = " + data.ERROR);
                else{
                    if(data.value !=null && data.value != "" ){
                        $(obj).parent().after(data.value);
                        $(obj).parent().siblings(".blj_con").show();
                    }
                }
            }
        });


    }
};

/*
 * yhdLib v2.0 beta
 *
 * Update : 2013-07-03
 */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('12.13=h={m:$.N.14&&$.N.11==6||i,f:{1:i,p:i,z:i},10:c(t,B){t=t||{};S H={a:"",K:i,L:i,E:i,y:[]},7=$.W({},H,t),n=$(7.a).Z(),d=$(7.a).O(),e=$(9).o(),g=$(9).k(),A=$(16).k(),b=(g-d)/2;r.f.1=7.a;r.f.p=7.L;1f(h.f.z);4(D B!="F"){+B();d=$(7.a).O();b=(g-d)/2}r.V(1e);4(7.K){$(7.a).17("<M J=\'q\'></M>");$(".q").3("k",A);4(h.m){$(".q").19("<I J=\'G\' 15=\'0\'></I>");$(".G").3("k",A)}}4(7.E){r.f.z=X(c(){u()},7.E)}$(".1d",7.a).1b(c(){u()});c u(){$(7.a).P(U);$(7.a).Q(".q").R()}4(7.y.1g)(1c 18(7.y.1a(\'();\')+\'();\'))()},u:c(a){$(a).P(U);$(a).Q(".q").R()},V:c(C){S f=r.f,1=$(f.1),n=1.Y(),d=1.k(),g=$(9).k(),b=(g-d)/2,e=$(9).o(),p=f.p;4(p){4(D C!="F"){4(g>=d){1.3({l:"T",s:-(n/2)+"8",5:b+"8"}).v();4(h.m){1.3({l:"w",5:b+e+"8"});$(9).x(c(){1.3({5:b+$(9).o()})})}}j{1.3({l:"T",s:-(n/2)+"8",5:"0"}).v();4(h.m){1.3({l:"w",5:e+"8"});$(9).x(c(){1.3({5:$(9).o()})})}}}j{4(g>=d){1.3({5:b+"8"});4(h.m){1.3({l:"w",5:b+e+"8"});$(9).x(c(){1.3({5:b+$(9).o()})})}}j{1.3({5:"0"});4(h.m){1.3({l:"w",5:e+"8"});$(9).x(c(){1.3({5:$(9).o()})})}}}}j{4(D C!="F"){4(g>=d){1.3({s:-(n/2)+"8",5:b+e+"8"}).v()}j{1.3({s:-(n/2)+"8",5:e+"8"}).v()}}j{4(g>=d){1.3({5:b+e+"8"})}j{1.3({5:e+"8"})}}}}}',62,79,'|popName||css|if|top||popupArgs|px|window|popupName|popupTop|function|popupHeight|winScrollTop|popArgs|winHeight|yhdLib2|false|else|height|position|ieLower|popupWidth|scrollTop|popFixed|popup_win_mask|this|marginLeft|args|closePopup|fadeIn|absolute|scroll|fun|popDelayTime|docHeight|callback|arg|typeof|delayTime|undefined|popup_win_iframe|defaultArgs|iframe|class|maskLayer|popupFixed|div|browser|outerHeight|fadeOut|next|remove|var|fixed|200|popReset|extend|setTimeout|width|outerWidth|popwin|version|jQuery|yhdtool|msie|frameborder|document|after|Function|append|join|click|new|popup_btn_close|true|clearTimeout|length'.split('|'),0,{}))
/*
 * yhdLib v2.0 beta
 *
 * Update : 2013-07-03
 */
jQuery.yhdtool = yhdLib2 = {
    ieLower:$.browser.msie&&$.browser.version==6||false,
    popArgs:{popName:false,popFixed:false,popDelayTime:false},
    popwin:function(args,callback){
        args = args||{};
        var defaultArgs = {
                popupName:"",
                maskLayer:false,
                popupFixed:false,
                delayTime:false,
                fun:[]
            },
            popupArgs = $.extend({},defaultArgs,args),
            popupWidth = $(popupArgs.popupName).outerWidth(),
            popupHeight = $(popupArgs.popupName).outerHeight(),
            winScrollTop = $(window).scrollTop(),
            winHeight = $(window).height(),
            docHeight = $(document).height(),
            popupTop = (winHeight-popupHeight)/2;
        this.popArgs.popName = popupArgs.popupName;
        this.popArgs.popFixed = popupArgs.popupFixed;

        clearTimeout(yhdLib2.popArgs.popDelayTime);

        //回调方法
        if(typeof callback !="undefined"){
            +callback();
            popupHeight = $(popupArgs.popupName).outerHeight();
            popupTop = (winHeight-popupHeight)/2;
        }

        //弹窗
        this.popReset(true);

        //遮罩
        if(popupArgs.maskLayer){
            $(popupArgs.popupName).after("<div class='popup_win_mask'></div>");
            $(".popup_win_mask").css("height",docHeight);
            if(yhdLib2.ieLower){
                $(".popup_win_mask").append("<iframe class='popup_win_iframe' frameborder='0'></iframe>");
                $(".popup_win_iframe").css("height",docHeight);
            }
        }

        //X秒关闭
        if(popupArgs.delayTime){
            this.popArgs.popDelayTime = setTimeout(function(){
                closePopup();
            },popupArgs.delayTime);
        }

        //点击关闭按钮
        $(".popup_btn_close",popupArgs.popupName).click(function(){
            closePopup();
        });
        //点击关闭按钮
        $(".confirm",popupArgs.popupName).click(function(){
            closePopup();
        });

        //关闭弹窗方法
        function closePopup(){
            $(popupArgs.popupName).fadeOut(200);
            $(popupArgs.popupName).next(".popup_win_mask").remove();
        }

        //回调方法
        if(popupArgs.fun.length)(new Function(popupArgs.fun.join('();')+'();'))();
    },

    dialog:function(args,callback){
        args = args||{};
        var defaultArgs = {
                popupName:"",
                maskLayer:false,
                popupFixed:false,
                delayTime:false,
                fun:[]
            },
            popupArgs = $.extend({},defaultArgs,args),
            popupWidth = $(popupArgs.popupName).outerWidth(),
            popupHeight = $(popupArgs.popupName).outerHeight(),
            winScrollTop = $(window).scrollTop(),
            winHeight = $(window).height(),
            docHeight = $(document).height(),
            popupTop = (winHeight-popupHeight)/2;
        this.popArgs.popName = popupArgs.popupName;
        this.popArgs.popFixed = popupArgs.popupFixed;

        clearTimeout(yhdLib2.popArgs.popDelayTime);

        //回调方法
        if(typeof callback !="undefined"){
            +callback();
            popupHeight = $(popupArgs.popupName).outerHeight();
            popupTop = (winHeight-popupHeight)/2;
        }

        //弹窗
        this.popReset(true);

        //遮罩
        if(popupArgs.maskLayer){
            $(popupArgs.popupName).after("<div class='popup_win_mask'></div>");
            $(".popup_win_mask").css("height",docHeight);
            if(yhdLib2.ieLower){
                $(".popup_win_mask").append("<iframe class='popup_win_iframe' frameborder='0'></iframe>");
                $(".popup_win_iframe").css("height",docHeight);
            }
        }

        //X秒关闭
        if(popupArgs.delayTime){
            this.popArgs.popDelayTime = setTimeout(function(){
                yhdLib2.closePopup(popupArgs.popupName);
            },popupArgs.delayTime);
        }

        //点击关闭按钮
        $(".popup_btn_close",popupArgs.popupName).click(function(){
            yhdLib2.closePopup(popupArgs.popupName);
        });

        //回调方法
        if(popupArgs.fun.length)(new Function(popupArgs.fun.join('();')+'();'))();
    },

    /**
     * 关闭弹窗方法
     */
    closePopup:function(popupName,callback){
        $(popupName).fadeOut(200);
        $(popupName).next(".popup_win_mask").remove();
        //回调方法
        if(typeof callback !="undefined"){
            +callback();
        }
    },

    /**
     * 弹窗方法
     */
    popReset:function(arg){
        var popArgs = this.popArgs,
            popName = $(popArgs.popName),
            popupWidth = popName.width(),
            popupHeight = popName.height(),
            winHeight = $(window).height(),
            popupTop = (winHeight-popupHeight)/2,
            winScrollTop = $(window).scrollTop(),
            popFixed = popArgs.popFixed;

        //悬浮定位
        if(popFixed){
            if(typeof arg !="undefined"){
                if(winHeight>=popupHeight){
                    popName.css({position:"fixed",marginLeft:-(popupWidth/2)+"px",top:popupTop+"px"}).fadeIn();
                    if(yhdLib2.ieLower){
                        popName.css({position:"absolute",top:popupTop+winScrollTop+"px"});
                        $(window).scroll(function(){
                            popName.css({top:popupTop+$(window).scrollTop()});
                        });
                    }
                }else{
                    popName.css({position:"fixed",marginLeft:-(popupWidth/2)+"px",top:"0"}).fadeIn();
                    if(yhdLib2.ieLower){
                        popName.css({position:"absolute",top:winScrollTop+"px"});
                        $(window).scroll(function(){
                            popName.css({top:$(window).scrollTop()});
                        });
                    }
                }
            }else{
                if(winHeight>=popupHeight){
                    popName.css({top:popupTop+"px"});
                    if(yhdLib2.ieLower){
                        popName.css({position:"absolute",top:popupTop+winScrollTop+"px"});
                        $(window).scroll(function(){
                            popName.css({top:popupTop+$(window).scrollTop()});
                        });
                    }
                }else{
                    popName.css({top:"0"});
                    if(yhdLib2.ieLower){
                        popName.css({position:"absolute",top:winScrollTop+"px"});
                        $(window).scroll(function(){
                            popName.css({top:$(window).scrollTop()});
                        });
                    }
                }
            }
        }else{
            if(typeof arg !="undefined"){
                if(winHeight>=popupHeight){
                    popName.css({marginLeft:-(popupWidth/2)+"px",top:popupTop+winScrollTop+"px"}).fadeIn();
                }else{
                    popName.css({marginLeft:-(popupWidth/2)+"px",top:winScrollTop+"px"}).fadeIn();
                }
            }else{
                if(winHeight>=popupHeight){
                    popName.css({top:popupTop+winScrollTop+"px"});
                }else{
                    popName.css({top:winScrollTop+"px"});
                }
            }
        }
    }
};
var count = 0;
var countMall = 0;
function getPromotionInfo(){
    getPromotionInfoYhd();
    getPromotionInfoMall();
}
function getPromotionInfoYhd(){
    //2012-09-03 modify by wumin 由于会造成cookie无省份报出脚本错而处理
    if(!jQuery.cookie("provinceId")){
        return ;
    }
    var divIdList = jQuery('#promoProductsIdList')[0];
    if(! divIdList) return;
    var idList = divIdList.value;
    var idArray = idList.split(",");
    var idParams = "";
    var breakCount = 0;
    var t;
    var len=idArray.length;
    for (i=count; i < len; i++ ){
        if(idArray[i] != null && idArray[i].length>0) {
            idParams += "&pmInfoIds=" + idArray[i];
        }
        count++;
        breakCount++;
        //目前每20个id请求一次促销信息
        if(breakCount == 20) {
            break;
        }
    }
    if(idParams.length == 0) {
        return;
    }
    var url = "";
    if(isUsingPromoJson == 1) {
        url = URLPrefix.promotion + "/promotion/search/getPromotionInfoWithSku.do?mcsiteId="+currSiteId
            + "&provinceId="+jQuery.cookie("provinceId")+"&siteType=1"+ idParams
            + "&pointSearch=1&caller=search&callback=?";
    }else {
        url = jsSearchFedUtil.getSearchUrlPrefix() + "/getProductPromotionsInfoWithSku.do?mcsiteId="+currSiteId
            + "&provinceId="+jQuery.cookie("provinceId")+"&siteType=1"+ idParams
            + "&pointSearch=1&callback=?";
    }
    //根据具体url加载促销信息
    getPromotionByUrl(url);

    if(count == idArray.length) {
        clearTimeout(t);
    }
    else {
        t = setTimeout("getPromotionInfoYhd()",200);
    }
}

function getPromotionInfoMall(){
    //2012-09-03 modify by wumin 由于会造成cookie无省份报出脚本错而处理
    if(!jQuery.cookie("provinceId")){
        return ;
    }
    var divIdList = jQuery('#promoProductsIdListMall')[0];
    if(! divIdList) return;
    var idList = divIdList.value;
    var idArray = idList.split(",");
    var idParams = "";
    var breakCount = 0;
    var t;
    var len=idArray.length;
    for (i=countMall; i < len; i++ ){
        if(idArray[i] != null && idArray[i].length>0) {
            idParams += "&pmInfoIds=" + idArray[i];
        }
        countMall++;
        breakCount++;
        //目前每20个id请求一次促销信息
        if(breakCount == 20) {
            break;
        }
    }
    if(idParams.length == 0) {
        return;
    }
    var url = "";
    if(isUsingPromoJson == 1) {
        url = URLPrefix.promotion + "/promotion/search/getPromotionInfoWithSku.do?mcsiteId="+currSiteId
            + "&provinceId="+jQuery.cookie("provinceId")+"&siteType=2"+ idParams
            + "&pointSearch=1&caller=search&callback=?";
    }else {
        url = jsSearchFedUtil.getSearchUrlPrefix() + "/getProductPromotionsInfoWithSku.do?mcsiteId="+currSiteId
            + "&provinceId="+jQuery.cookie("provinceId")+"&siteType=2"+ idParams
            + "&pointSearch=1&callback=?";
    }
    //根据具体url加载促销信息
    getPromotionByUrl(url);

    if(breakCount == idArray.length) {
        clearTimeout(t);
    }
    else {
        t = setTimeout("getPromotionInfoMall()",200);
    }
}

/**
 * 根据具体url调促销接口，加载促销信息
 * @param url
 */
function getPromotionByUrl(url){
    jQuery.getJSON(url,function(data){
        if(!data) {
            return;
        }
        else {
            // 促销信息刷新
            if(isUsingPromoJson != 1) {
                data = eval(data.success);
            }
            var plen=data.length;
            for (var i = 0; i < plen; i++) {
                var product = data[i];
                if (product == null) continue; //不可见商品
                if (product.productId == null) continue; //不可见商品

                var urlSearch = URLPrefix.search;
                var urlForDetail = URLPrefix.IdcYhdDetailDomain;
                var productId = product.productId;
                var pmInfoId = product.pmInfoId;
                var inshop=$("#shop_pm_"+pmInfoId).val();

                /*if(typeof($("#promotionInfo1_"+pmInfoId).attr("inshop")) != "undefined") {
                 var inshop=$("#promotionInfo1_"+pmInfoId).attr("inshop");
                 }*/
                var proIdObj=$("#promotion_"+pmInfoId);
                var ruleType = $(proIdObj).attr("ruletype");
                var mutexPromotion = $(proIdObj).attr("mutexPromotion");
                var isPhoneCategory= $(proIdObj).attr("isPhoneCategory");
                var currProdInfo = $("#pdlink1_"+productId);
                var currProdMainInfo=$("#pdlink2_"+productId);
                var currProdSubInfo=$("#pdlink3_"+productId);
                var isGrouponProv = currProdInfo.attr("isGrouponProv");
                if(isGrouponProv) {
                    isGrouponProv = parseInt(isGrouponProv);
                } else {
                    isGrouponProv = 0;
                }
                var grouponType = currProdInfo.attr("grouponType");
                if(grouponType) {
                    grouponType = parseInt(grouponType);
                } else {
                    isGrouponProv = 0;
                }
                //与促销互斥不显示
                if(mutexPromotion == '1') continue;
                if(ruleType == '7') continue;   //闪购商品不显示促销活动
                if(ruleType == '5') { // 预售商品
                    if(!switchPreSale || switchPreSale!='1') { // 关闭过滤预售
                        continue;
                    }
                } else if(ruleType!='2' || mutexPromotion=='0'){ // 排除无促销团购(不显示赠品ICON )
                    if(isPhoneCategory!=1 && !(isGrouponProv && isGrouponProv==1)){//不是手机类目时,且不是酒店、生活团，才刷促销链接
                        handlePromotionInfo(product,productId,urlSearch,urlForDetail,inshop);
                    }else if(isPhoneCategory==1&& !(isGrouponProv && isGrouponProv==1) && ($(proIdObj).attr("pnameSubtitle") == null
                        || jQuery.trim($(proIdObj).attr("pnameSubtitle")) == '')){ //是手机类目,且不是酒店、生活团，但没有副标题，刷促销链接
                        handlePromotionInfo(product,productId,urlSearch,urlForDetail,inshop);
                    }
                }

                //无促销有基本副标题时，显示副标题，若无副标题显示主标题
                if(($(proIdObj).html() == null
                    || jQuery.trim($(proIdObj).html()) == '') ){
                    if(($(proIdObj).attr("pnameSubtitle") != null
                        && jQuery.trim($(proIdObj).attr("pnameSubtitle")) != '')){
                        $(proIdObj).parent(".item_promotion_text").attr("style","display:none");
                        currProdSubInfo.attr("style","");
                    }else{
                        $(proIdObj).parent(".item_promotion_text").attr("style","display:none");
                        currProdMainInfo.attr("class","mainTitle");
                    }
                }
            }
        }
    });
}

function handlePromotionInfo(product,productId,urlSearch,urlForDetail,inShop) {
    var fullTitle = "";
    var $promotionId;
    if (product.isPromotion == 1 && product.promotionInfo.length > 0) {
        $promotionId = jQuery('#promotion_' + product.pmInfoId);
        for (var i = 0; i < product.promotionInfo.length; i++) {
            if (product.promotionInfo[i].scope == 3) { //scope==3表示无线专享
                continue;
            } else if (typeof (isCityResponse)!= "undefined"&&isCityResponse == 'true') {//城市精选只展示多件优惠、多买多送
                //		1）	满X件，第X件Y%OFF优惠，conditionType=3,contentType=5
                // 		提供促销标“多件优惠”。
                // 		2）	满X件，送同品Y件，conditionType=4,contentType=7
                // 		提供促销标“买X送Y”
                fullTitle = product.promotionInfo[i].promDesc;
                if (product.promotionInfo[i].conditionType == 3 && product.promotionInfo[i].contentType == 5) {
                    $promotionId.html("多件优惠");
                    $promotionId.addClass("tag_sale");
                    $promotionId.attr("href", "//item.yhd.com/item/" + product.pmInfoId);
                } else if (product.promotionInfo[i].conditionType == 4 && product.promotionInfo[i].contentType == 7) {
                    $promotionId.html(fullTitle);
                    $promotionId.addClass("tag_sale");
                    $promotionId.attr("href", "//item.yhd.com/item/" + product.pmInfoId);
                }
            } else {
                var defaultPromotionId = product.promotionInfo[i].promotionId;
                // 第一个促销信息直接加载到core_table中已有的<a>标签中
                // 处理fullTitle，fullTitle要显示 全部的促销信息
                fullTitle = product.promotionInfo[i].promDesc;

                if (product.promotionInfo[i].type == 1 && inShop == 1) {
                    fullTitle = "本店铺" + fullTitle;
                } else if (product.promotionInfo[i].crossType != null && product.promotionInfo[i].crossType == 1) {
                    fullTitle = "多店铺联合" + fullTitle;
                }

                $promotionId.html("<i></i>" +
                    fullTitle);
                $promotionId.attr("title", fullTitle);
                jQuery('#promostyle_' + product.pmInfoId).attr("promotionTag", "1");
                var promotionUrl = promotionHrefProcess(product, i, urlSearch,
                    urlForDetail, inShop);
                if (promotionUrl.length > 0) {
                    $promotionId.attr("href", promotionUrl);
                }
                break;
            }
        }
    }

}

function promotionHrefProcess(product, i, urlSearch,urlForDetail,inShop) {
    var promotionUrl = "";
    if ( product.promotionInfo[i].type == 1) {
        if(inShop == 1) {
            promotionUrl = URLPrefix.shop+"/m-"+product.merchantId+".html";
        }
        return promotionUrl;
    }
    //促销信息部分打折才显示链接，此处排除type为1 全场的情况  product.promotionInfo[i].type != 1
    if(product.promotionInfo[i].type != null && product.promotionInfo[i].type != "undefined") {
        var promotionId = product.promotionInfo[i].promotionId;
        var promotionLevelId = product.promotionInfo[i].levelId;
        var productId=product.productId;
        var currProdInfo = $("#pdlink1_"+productId);
        var parentId = currProdInfo.attr("parentId");
        if(parentId && parentId != '0') {
            productId = parentId + "," + productId;
        }
        if(promotionId > 0 && promotionLevelId > 0) {
            //3商品X元任选Y件 9-部分商品X件最高价打Y折;10-部分商品X件最低价打Y折
            if(product.promotionInfo[i].contentType == 3 || product.promotionInfo[i].contentType == 9 || product.promotionInfo[i].contentType == 10) {
                promotionUrl = urlSearch + "/p/c0-b-a-s1-v0-p1-price-d0-pid" +productId+"-pt"+promotionId +"-pl" + promotionLevelId+"-m0"+"?ref="+URLPrefix.ref_search_promotion;
            }
            else {
                promotionUrl = urlSearch + "/p/c0-b-a-s1-v0-p1-price-d0-pid" +productId+"-pt"+promotionId +"-pl" + promotionLevelId+"-m0"+"?ref="+URLPrefix.ref_search_promotion;
            }
        }
    }
    return promotionUrl;
}

/**
 * 为某一组合商品加载促销信息
 * @param productId
 */
function getCombineProPromotion(productId){

    if(!jQuery.cookie("provinceId")){
        return ;
    }
    var url = "";
    if(isUsingPromoJson == 1) {
        url = URLPrefix.promotion + "/promotion/search/getPromotionInfoWithSku.do?mcsiteId="+currSiteId
            + "&provinceId="+jQuery.cookie("provinceId")+"&siteType=1" + "&pmInfoIds=" + productId
            + "&pointSearch=1&caller=search&callback=?";

    }else {
        url = jsSearchFedUtil.getSearchUrlPrefix() + "/getProductPromotionsInfoWithSku.do?mcsiteId="+currSiteId
            + "&provinceId="+jQuery.cookie("provinceId")+"&siteType=1" + "&pmInfoIds=" + productId
            + "&pointSearch=1&callback=?";
    }
    getPromotionByUrl(url);
}
/* *
 *
 * 筛选栏配送至
 *
 * */
/*区域选择*/

var areasSelectBox = {
    /**
     * 省市区变量
     */
    op: "", oc: "", ot: "",
    init: function(){
        $('#headerSelectProvince').css("display","none");
        var _filterByMultiAreasFlag = 1; // 当前类目是否开放三级区域筛选功能
        /*if("undefined"!=typeof filterByMultiAreasFlag && filterByMultiAreasFlag!="") {
         _filterByMultiAreasFlag = parseInt(filterByMultiAreasFlag);
         }
         if(_filterByMultiAreasFlag == 0 || isWidescreen==0) {
         //jQuery.cookie("detail_yhdareas", null, {domain:no3wUrl,path:"/"});
         $('.delivery_b').hide();
         return ;
         }*/
        var tab = $('.mod_selectbox .tablist li');
        var provinceId = jQuery.cookie("provinceId");
        var cityId =jQuery.cookie("cityId");
        var search_address_info = jQuery.cookie("yhd_location");//detail_yhdareas
        //alert(detailYhdareas);
        if("undefined" == typeof provinceId) {
            provinceId = 2;
        }
        var areas = [];
        if(search_address_info) {
            search_address_info = decodeURIComponent(decodeURIComponent(search_address_info));
            areas = search_address_info.split("_");
        }
        if(areas.length>=4 && provinceId==areas[0]) {
            areasSelectBox.initThreeAreaInfo(search_address_info);
        } else {
            //alert(provinceId+":"+cityId+"!="+areas[0]+":"+areas[1]+":"+areas[2]);
            $('.mod_search_select .delivery_b').find(".sec_level").eq(0).find(".sec_item").each(function(){
                var _this = $(this);
                var dataId = _this.attr("data-id");
                if(dataId == provinceId) {
                    _this.addClass("cur");
                    op = _this.text();
                }
            });
            $('.delivery_b').find('#address_name').html(op);
            tab.eq(0).html(op+'<i></i>');
            tab.eq(0).attr("data-id", provinceId);
            tab.eq(1).show();
            areasSelectBox.ajaxAreaData(provinceId, 2);
        }
        areasSelectBox.arrivedTo();
    },
    arrivedTo:function(){
        var oDelivery = $('.mod_search_select .delivery_b');
        var oSite = oDelivery.find('.site');
        var oDeCon = oDelivery.find('.mod_selectbox')
        var oClose = oDelivery.find('.mod_selectbox .selectclose a');
        var tab = $('.mod_selectbox .tablist li');
        var list = oDelivery.find(".sec_level");
        var timer = null;
        oSite.mouseenter(function(){
            clearTimeout(timer);
            oSite.addClass('hover');
            oDeCon.addClass('show');
        })
        oSite.mouseleave(function(){
            timer = setTimeout(function(){
                oSite.removeClass('hover');
                oDeCon.removeClass('show');
            },500)
        })
        oDeCon.mouseleave(function(){
            timer = setTimeout(function(){
                oDeCon.parents('.site').removeClass('hover');
                oDeCon.removeClass('show');
            },500)
        })
        oClose.click(function(){
            $(this).parents('.site').removeClass('hover');
            oDeCon.removeClass('show');
        })
        tab.click(function(){
            $(this).addClass('cur').siblings().removeClass('cur');
            $('.mod_selectbox .sec_level').hide().eq(tab.index(this)).show();
        })
        $(".sec_childs").delegate(".sec_item", "click", function(){
            var _parent=$(this).parents('.sec_level');
            var k=_parent.index();
            var text=$(this).text();
            var dataId =$(this).attr("data-id");
            var input_value=$('.delivery_b').find('#address_name');
            _parent.find('.sec_item').removeClass('cur');
            $(this).addClass('cur');
            /*获取值*/
            op=tab.eq(0).html();//省份
            oc=tab.eq(1).html();//城市
            oa=tab.eq(2).html();//县
            //gotracker('2','search_filter_address',dataId);

            /*赋新值*/
            if(k==0){
                op=$(this).text();
                tab.eq(k).attr("data-id",dataId);
                //加载城市
                areasSelectBox.ajaxAreaData(dataId, 2);
                $(".sec_childs").find(".sec_level").eq(2).empty();
            }
            if(k==1){
                oc=$(this).text();
                //加载城市
                tab.eq(k).attr("data-id",dataId);
                areasSelectBox.ajaxAreaData(dataId, 3);
            }
            if(k<2){
                tab.eq(k).html(text+'<i></i>');
                tab.eq(k+1).addClass('cur').show();
                list.eq(k+1).show().siblings().hide();
                tab.eq(k+1).addClass('cur').siblings().removeClass('cur');/*add*/
            }else if(k==2){
                tab.eq(k).html(text+'<i></i>');
//	                    $(this).parents('.selectlist').hide();
                oa=$(this).text();
                input_value.html(op + oc + oa);
                tab.eq(k).attr("data-id", dataId);
                areasSelectBox.refreshPage();
            }else{
                return false;
            }
        });
    },
    /**
     * 异步获取区域数据
     * id:当前看选中区域ID
     * type：当前选中区域类型; 2,省份; 3,城市
     */
    ajaxAreaData:function(id, type) {
        var tab = $('.mod_selectbox .tablist li');
        var tempUrl = jsSearchFedUtil.getSearchUrlPrefix() + "/searchArea/a"+id+"-t"+type;

        $.ajax({
            url : tempUrl,
            dataType : 'jsonp',
            jsonp : "callback",
            success : function(data) {
                if(data.ERROR) {
                    //alert("ERROR : " + data.ERROR);
                } else {
                    //alert(data.value);
                    var _secChilds = $(".sec_childs");
                    var tabHtml = "请选择城市<i></i>";
                    if(type == 3) {
                        tabHtml = "请选择区域<i></i>";
                    }
                    _secChilds.find(".sec_level").eq(type-1).html(data.value);
                    tab.eq(type-1).html(tabHtml);
                    areasSelectBox.locateTabs(type-1);
                }
            }
        });
    },

    /**
     * 刷新页面
     */
    refreshPage : function() {
        var	tab = $('.mod_selectbox .tablist li'),
            provinceId = tab.eq(0).attr("data-id"),
            provinceName = tab.eq(0).text(),
            cityId = tab.eq(1).attr("data-id"),
            cityName = tab.eq(1).text(),
            townId = tab.eq(2).attr("data-id"),
            townName = tab.eq(2).text(),
            glaProvinceId = jQuery.cookie("provinceId"),
            glaCityId=jQuery.cookie("cityId");
        var search_address_info = provinceId + "_" + cityId + "_" + townId + "_0"
        //"_" + + provinceName +"_" + cityName + "_" + townName + "";
        //alert(search_address_info);
        $.cookie("yhd_location",search_address_info,{domain:"yhd.com",path:"/"});
        $.cookie("provinceId",provinceId,{domain:"yhd.com",path:"/"});
        $.cookie("cityId",cityId,{domain:"yhd.com",path:"/"});

        /*if(!glaProvinceId || glaProvinceId!=provinceId || !glaCityId || glaCityId!=cityId) {//调用global方法，重写provinceId和cityId
         //gotracker(2,"changeProvince",null,{"eventId":"changeProvince","extField10":provinceId});
         var obj={'cityId':cityId};
         //setAddressCity(provinceId,obj);
         }*/
        window.location.reload();
    },

    /**
     * 定位卡切换
     */
    locateTabs: function(n) {
        var list =  $('.delivery_b').find('.sec_level').eq(n);
        if(n==0){
            var provinceId=$("#tabs_province").attr("data-id");
            list.find('.sec_item').removeClass("cur");
            list.find('.sec_item').each(function(){
                if($(this).attr("data-id")==provinceId){
                    $(this).addClass("cur");
                    return;
                }
            });
        }else if(n==1){
            var cityId=$("#tabs_city").attr("data-id");
            list.find('.sec_item').removeClass("cur");
            list.find('.sec_item').each(function(){
                if($(this).attr("data-id")==cityId){
                    $(this).addClass("cur");
                    $("#tabs_city").html($(this).text());
                    return;
                }
            });
        }else if(n==2){
            var townId=$("#tabs_town").attr("data-id");
            list.find('.sec_item').removeClass("cur");
            list.find('.sec_item').each(function(){
                if($(this).attr("data-id")==townId){
                    $(this).addClass("cur");
                    $("#tabs_town").html($(this).text());
                    return;
                }
            });
        }
    },

    /**三级区域入口***/
    initThreeAreaInfo: function(search_address_info) {
        var areas = [];
        var areaNames = [];
        if(search_address_info) {
            search_address_info = decodeURIComponent(decodeURIComponent(search_address_info));
            areas = search_address_info.split("_");
            areaNames = detailYhdareas.split("_");
        }
        //alert(areas);
        if(areas&&areaNames){
            var _this=this;
            var provinceId=areas[0];
            var cityId=areas[1];
            var townId=areas[2];
            var provinceName=areaNames[0];
            var cityName=areaNames[1];
            var townName=areaNames[2];
            if("undefined" == typeof townId) {
                townId = 0;
            }
            if("undefined" == typeof provinceName) {
                provinceName = '';
            }
            if("undefined" == typeof cityName) {
                cityName = '';
            }
            if("undefined" == typeof townName) {
                townName = '';
            }
            if(provinceName && provinceName!='') {
                provinceName = provinceName.replace("<i></i>", "");
            }
            if(cityName && cityName!='') {
                cityName = cityName.replace("<i></i>", "");
            }
            if(townName && townName!='') {
                townName = townName.replace("<i></i>", "");
            }
            var str = provinceName + cityName + townName;


            $('.delivery_b').find('#address_name').html(str);
            _this.op = provinceName;
            _this.oc = cityName;
            _this.ot=townName;
            $("#tabs_province").attr("data-id",provinceId);
            $("#tabs_city").attr("data-id",cityId);
            $("#tabs_town").attr("data-id",townId);
            $("#tabs_province").html(provinceName+"<i></i>");
            $("#tabs_city").html(cityName+"<i></i>");
            $("#tabs_town").html(townName+"<i></i>");
            $('.mod_selectbox .tablist li').show();
            $("#tabs_town").addClass('cur').siblings().removeClass('cur');
            _this.locateTabs(0);
            _this.ajaxAreaData(provinceId,2);
            _this.ajaxAreaData(cityId,3);
            $('.delivery_b').find('.sec_level').eq(2).show().siblings().hide();
        }else{
            var _this=this;
            var provinceId=$("#tabs_province").attr("data-id");
            var provinceName=$("#tabs_province").html();
            if(!provinceId){
                provinceId=jQuery.cookie("provinceId");
                provinceName=YHDPROVINCE.proviceObj["p_" + provinceId];
                $("#area_name span").html(provinceName);
            }
            _this.op = provinceName;
            $("#tabs_province").attr("data-id",provinceId);
            $("#tabs_province").html(provinceName);
            var cityId=$("#tabs_city").attr("data-id");
            if(cityId>0){
                $("#tabs_town").html("请选择区域<i></i>");
                _this.ajaxAreaData(provinceId,2);
                _this.ajaxAreaData(cityId,3);
            }else{
                $("#tabs_city").html("请选择城市<i></i>");
                _this.ajaxAreaData(provinceId,2);
            }
            this.locateTabs(0);
        }
    }
};
function combineProductBuy() {
    $("#item_kit_n a").live("click",function(){
        var a_this = $(this);
        if(a_this.hasClass("cur")){
            return;
        }
        combineProductConvertOld(a_this);
    });

}

function combineProductConvertOld(a_this){
    var mainLeft = a_this.parents(".item_kit_n").offset().left,
        thisLeft = a_this.offset().left,
        spanWidth = a_this.outerWidth(true),
        icoWidth = $(".item_kit i").outerWidth(true),
        icoLeft = thisLeft - mainLeft + spanWidth / 2 - icoWidth / 2;
    a_this.addClass("cur").siblings().removeClass("cur");
    a_this.parents(".item_kit").find("i").stop(true).animate({left:icoLeft},150);

    var comProId = a_this.attr("comproid");
    var compmId = a_this.attr("compmid");
    //组合产品件数
    var comNum = a_this.attr("comNum");
    //默认展示品的规格条(按照7天销量*价格筛选及做过规格排序处理)
    var comPro_label = a_this.parents("#item_kit");
    var index = $(comPro_label).attr("p_index");
    var lazyLoadFlag = $(comPro_label).find("[comProId=" + comProId + "]").attr("lazyLoadFlag");
    var _curDiv = a_this.parents(".itemBox").siblings("[comproid='"+comProId+"']");
    //textarea懒加载
    if (lazyLoadFlag != "1") {
        jQuery(_curDiv).lazyDom({
            load:false,
            flushPrice:false,
            indexLoad:true,
            scrollLoad:false
        });
        $(comPro_label).find("[comProId=" + comProId + "]").attr("lazyLoadFlag","1");
    }
    $(_curDiv).find("#item_kit").remove();
    a_this.parents(".itemBox").addClass("none").siblings("[comproid='"+comProId+"']").removeClass("none").append(comPro_label);
    a_this.addClass("cur").siblings().removeClass("cur");
    if (lazyLoadFlag != "1") {
        //加载因textarea懒加载而导致延迟加载的图片
        var _attr = $(_curDiv).children(".proImg").find(".img img").attr("original");
        if (_attr) {
            var webpUrl=loli.webp(_attr);//global公用方法，webp转换
            if(webpUrl){
                $(_curDiv).children(".proImg").find(".img img").attr("src", webpUrl).removeAttr("original");
            }else{
                $(_curDiv).children(".proImg").find(".img img").attr("src", _attr).removeAttr("original");
            }
        }
        /*//刷busystock
         var param="?mcsite="+currSiteId + "&provinceId=" + jQuery.cookie("provinceId") + "&productIds=" + comProId;
         var busystcok = URLPrefix.busystock ? URLPrefix.busystock : "//gps.yhd.com";
         var url=busystcok + "/busystock/restful/truestock";
         jQuery.getJSON(url+param+"&callback=?",function(data){
         loadCompleteProductsInfo(data,2,-1,_curDiv);
         //当前组合产品价格,单位价格
         var comPrice;
         if(data && data.length==1){
         var cp=data[0];
         if(cp.productPrice>0){
         comPrice=cp.productPrice;
         }else{
         comPrice = $("#price0_" + comProId).attr("yhdPrice");
         }
         }else{
         comPrice = $("#price0_" + comProId).attr("yhdPrice");
         }
         });*/
        var search_address_info = jQuery.cookie("yhd_location");//detail_yhdareas
        if("undefined"==typeof search_address_info || search_address_info =="") return null;
        /*if (productId == null || productId == 0) return null;
         if (price > 0) {
         refreshDetail(price, stock, oId);
         return;
         }*/
        var tempUrl = jsSearchFedUtil.getSearchUrlPrefix() + "/getPriceAandStock/pid" + comProId;
        var param = "detailYhdareas=" + search_address_info + "&resultType=2";
        // 跨域请求
//		var date1 = new Date().getTime();
//		console.log("similar from ajax start: " + date1);
        $.ajax({
            url : tempUrl,
            dataType : 'jsonp',
            jsonp : "callback",
            data : param,
            success : function(data) {
                /**/
//	    		alert("price and stock: " + data.facadePrice + "--" + data.stockStatus);
//				a_this.attr("yhdPrice",data.facadePrice);
//				a_this.attr("stockNum",data.stockStatus);
                if (data.facadePrice != null && data.facadePrice > 0) {
                    var productPrice = $("#price0_" + comProId);
                    $(productPrice).html( "<b>¥</b>" + data.facadePrice);
                    $(productPrice).attr("yhdPrice",data.facadePrice);
                }
            }
        });
    }
}

function combineProductConvert(a_this){
    var mainLeft = a_this.parents(".item_kit_n").offset().left,
        thisLeft = a_this.offset().left,
        spanWidth = a_this.outerWidth(true),
        icoWidth = $(".item_kit i").outerWidth(true),
        icoLeft = thisLeft - mainLeft + spanWidth / 2 - icoWidth / 2;
    a_this.addClass("cur").siblings().removeClass("cur");
    a_this.parents(".item_kit").find("i").stop(true).animate({left:icoLeft},150);

    var comProId = a_this.attr("comproid");
    var experienceCount = a_this.attr("experienceCount");
    var positiveRatio = a_this.attr("positiveRatio");
    var imageUrlSuffix = a_this.attr("imageUrlSuffix");
    var cnName = a_this.attr("cnName");
    var href ="//item.yhd.com/" + comProId +".html";

    //替换图片 链接
    var itemBox = a_this.parents(".itemBox");
    var oldProductId = $(itemBox).attr("comproid");
    var pic_src = $(itemBox).find(".img img").attr("src");
    var big_pic_src = pic_src.substring(0,pic_src.lastIndexOf("_")+1) + imageUrlSuffix;
    $(itemBox).find(".img img").attr("src", big_pic_src);
    $(itemBox).find(".img").attr("href", href);
    //替换标题 链接
    var spans = $("#pdlink2_" + oldProductId).find("span");
    $("#pdlink2_" + oldProductId).attr("title", cnName).html(spans).append(cnName);
    $("#pdlink2_" + oldProductId).attr("href", href);
    //替换评论 链接
    var newPositiveRatioSpan = "";
    if (positiveRatio > 0) {
        newPositiveRatioSpan = "<i class=\"iconSearch\">&#xe61d;</i>" + positiveRatio + "%";
    }
    $(itemBox).find(".positiveRatio").html(newPositiveRatioSpan);
    $("#pdlinkcomment_" + oldProductId).attr("href", href);
    var newCommentSpan = "";
    if (experienceCount > 0) {
        newCommentSpan = "<i class=\"iconSearch\">&#xe614;</i>"+experienceCount;
    }
    $("#pdlinkcomment_" + oldProductId).html(newCommentSpan);

    var promoObj = $(itemBox).find(".item_promotion_text");
    if (promoObj != null) {
        var promoTitle = $(promoObj).attr("title");
        var promoTag = $(promoObj).attr("promotiontag");
        if (promoTitle != null && promoTitle != "" && promoTag == "1") {
            if (comProId != oldProductId) {
                $(promoObj).find("a").html("");
            }else{
                $(promoObj).find("a").html("<i></i>" + promoTitle);
            }
        }
    }


    //购物车
    $("#buyButton_" + oldProductId).attr("href", href);
    refreshProductPriceAndStockForCombine(comProId, oldProductId, a_this);

//	var compmId = a_this.attr("compmid");
    //组合产品件数
//	var comNum = a_this.attr("comNum");
    //默认展示品的规格条(按照7天销量*价格筛选及做过规格排序处理)
//	var comPro_label = a_this.parents("#item_kit");
//	var index = $(comPro_label).attr("p_index");
//	var lazyLoadFlag = $(comPro_label).find("[comProId=" + comProId + "]").attr("lazyLoadFlag");
//	var _curDiv = a_this.parents(".itemBox").siblings("[comproid='"+comProId+"']");
    //textarea懒加载
//	if (lazyLoadFlag != "1") {
//		jQuery(_curDiv).lazyDom({
//			load:false,
//			flushPrice:false,
//			indexLoad:true,
//			scrollLoad:false
//		});
//		$(comPro_label).find("[comProId=" + comProId + "]").attr("lazyLoadFlag","1");
//	}
//	$(_curDiv).find("#item_kit").remove();
//	a_this.parents(".itemBox").addClass("none").siblings("[comproid='"+comProId+"']").removeClass("none").append(comPro_label);
//	a_this.addClass("cur").siblings().removeClass("cur");
    //加tracker
//	if(parseInt(comNum) > 0) { // 同类组合品
//		gotracker('2','combine_product_preview_'+index,comProId);
//	} else { // 混合组合品
//		gotracker('2','mix_combine_product_preview_'+index,comProId);
//	}
//	if (lazyLoadFlag != "1") {
    //加载因textarea懒加载而导致延迟加载的图片
    /*var _attr = $(_curDiv).children(".proImg").find(".img img").attr("original");
     if (_attr) {
     var webpUrl=loli.webp(_attr);//global公用方法，webp转换
     if(webpUrl){
     $(_curDiv).children(".proImg").find(".img img").attr("src", webpUrl).removeAttr("original");
     }else{
     $(_curDiv).children(".proImg").find(".img img").attr("src", _attr).removeAttr("original");
     }
     }
     //刷busystock
     var param="?mcsite="+currSiteId + "&provinceId=" + jQuery.cookie("provinceId") + "&productIds=" + comProId;
     if((typeof(secondAreaFlag)!="undefined" && secondAreaFlag==1)){
     param+="&cityId="+jQuery.cookie("cityId");
     var detailAdd=jQuery.cookie("detail_yhdareas");
     if(detailAdd!=null && "undefined"!=detailAdd){
     var detailAddArr=detailAdd.split('_');
     if(detailAddArr.length>=3 && detailAddArr[2]>0){
     param+="&countyId="+detailAddArr[2];
     }
     }
     }
     var busystcok = URLPrefix.busystock ? URLPrefix.busystock : "//gps.yhd.com";
     var url=busystcok + "/busystock/restful/truestock";
     jQuery.getJSON(url+param+"&callback=?",function(data){
     loadCompleteProductsInfo(data,2,-1,_curDiv);
     //当前组合产品价格,单位价格
     var comPrice;
     if(data && data.length==1){
     var cp=data[0];
     if(cp.productPrice>0){
     comPrice=cp.productPrice;
     }else{
     comPrice = $("#price0_" + comProId).attr("yhdPrice");
     }
     }else{
     comPrice = $("#price0_" + comProId).attr("yhdPrice");
     }
     if(comNum && comPrice){
     if(parseInt(comNum) > 1) {
     var unitDiv=$("#unit_price_"+comProId);
     var unitPrice = (parseFloat(comPrice)/parseInt(comNum)).toFixed(2);
     if($(unitDiv).html()==null ||$(unitDiv).html()==""){
     $(unitDiv).html("[¥" + unitPrice + "/件]");
     }
     }
     }
     });*/

    //加载promotion信息
//		getCombineProPromotion(compmId);
//	}
}

//组合品切换时刷新价格、链接
/*function searchRefreshPriceForCombine(a_this){
 //价格刷新
 var comObject = a_this.parents("#itemSearchResultCon_8229");
 var priceSpanId = 'price0_' + productId;
 var priceSpan = jQuery('#'+priceSpanId)[0];
 if (typeof(priceSpan) != "undefined"  && (!isGrouponProv || isGrouponProv==0)){
 if(product.productPrice > 0){
 $(priceSpan).attr("yhdPrice",product.productPrice);
 priceSpan.innerHTML = "<b>¥</b>" + product.productPrice + delPrice;

 }else{
 priceSpan.innerHTML = "";
 $(priceSpan).attr("yhdPrice","");
 }
 }
 }*/

/**
 * N元/件
 * @param startIndex
 * @returns
 */
function searchCombinelist(startIndex){
//	   if(requestType != '70' && requestType != '75' && requestType != 76){
//	        /*s 去除每行最后一个li的border-right*/
//	        if(screen.width>=1280){
//	            $(".mod_search_list li:nth-child(4n)").css({borderRight:0});
//	        }else{
//	            $(".mod_search_list li:nth-child(3n)").css({borderRight:0});
//	        }
//	        /*e 去除每行最后一个li的border-right*/
//	        $(".mod_search_list li").hover(function(){
//	            $(this).addClass("cur");
//	            var recom = $(this).find(".recommend");
//	            if(recom.size() > 0 && typeof(recom.find("a").attr("similarIds")) != "undefined"){
//	            	recom.removeClass("none");
//	            }
//	        },function(){
//	            $(this).removeClass("cur");
//	            var recom = $(this).find(".recommend");
//	            if(recom.size() > 0 && typeof(recom.find("a").attr("similarIds")) != "undefined"){
//	            	recom.addClass("none");
//	            }
//	        });
//	   }
    var combinItemDiv = $(".mod_product_list .mod_search_pro");
    var searchItemCount = $(combinItemDiv).length;
    setTimeout(function(){
        if(searchItemCount == 0){return false;}
        for(var i = startIndex ; i < searchItemCount ; i++){
            if($(combinItemDiv).eq(i).find(".item_kit_n").length<=0){
                continue;
            }
            var curCombin =$(combinItemDiv).eq(i).find(".item_kit_n .cur");
            var comNum = $(curCombin).attr("comNum");
            var comProId = $(curCombin).attr("comProId");
            //当前组合产品价格
            var comPrice =$("#price0_" + comProId).attr("yhdPrice");
            if(comNum && comPrice){
                if(parseInt(comNum) > 1) {
                    var unitDiv=$("#unit_price_"+comProId);
                    var unitPrice = (parseFloat(comPrice)/parseInt(comNum)).toFixed(2);
                    if($(unitDiv).html()==null ||$(unitDiv).html()==""){
                        $(unitDiv).html("[¥" + unitPrice + "/件]");
                    }
                }
            }
        }
    },1500);
}
function searchFixLoad() {
    $(".hd_search_sort").html("");
    $(".hd_search_price").html("");
    $(".hd_more_sort").html("");
    $(".hd_s_page").html("");
    //二次排序
    if (typeof(sortby) != "undefined" && sortby != "") {

        if (sortby == 1) {
            $(".hd_search_sort").html($(".hd_search_sort").html() + "<a class=\"hd_s_cur\" rel=\"nofollow\"  orderbyId=\"1\" href=\"#page=1&sort=1\" url='"+ changeUrl(1) +"' onClick=\"clickFunc(this)\" data-tcd=\"SEARCH_SORT.1\" data-tcs=\"3.0\">综合</a>");
        } else {
            $(".hd_search_sort").html($(".hd_search_sort").html() + "<a rel=\"nofollow\"  orderbyId=\"1\" href=\"#page=1&sort=1\" url='"+ changeUrl(1) +"' onClick=\"clickFunc(this)\" data-tcd=\"SEARCH_SORT.1\" data-tcs=\"3.0\">综合</a>");
        }

        if (sortby == 2) {
            $(".hd_search_sort").html($(".hd_search_sort").html() + "<a class=\"hd_s_cur\" rel=\"nofollow\" orderbyId=\"2\" href=\"#page=1&sort=2\" url='"+ changeUrl(2) +"' title=\"7天销量降序排列\" onClick=\"clickFunc(this)\" data-tcd=\"SEARCH_SORT.2\" data-tcs=\"3.0\">销量<i class=\"hd_s_iconfont\">&#xe617;</i></a>");
        } else {
            $(".hd_search_sort").html($(".hd_search_sort").html() + "<a rel=\"nofollow\" orderbyId=\"2\" href=\"#page=1&sort=2\" url='"+ changeUrl(2) +"' title=\"7天销量降序排列\" onClick=\"clickFunc(this)\" data-tcd=\"SEARCH_SORT.2\" data-tcs=\"3.0\">销量<i class=\"hd_s_iconfont\">&#xe617;</i></a>");
        }

        if (sortby == 6) {
            $(".hd_search_sort").html($(".hd_search_sort").html() + "<a class=\"hd_s_cur\" rel=\"nofollow\" orderbyId=\"6\" href=\"#page=1&sort=6\" url='"+ changeUrl(6) +"' title=\"上架时间降序排列\" onClick=\"clickFunc(this)\" data-tcd=\"SEARCH_SORT.6\" data-tcs=\"3.0\">新品<i class=\"hd_s_iconfont\">&#xe617;</i></a>");
        } else {
            $(".hd_search_sort").html($(".hd_search_sort").html() + "<a rel=\"nofollow\" orderbyId=\"6\" href=\"#page=1&sort=6\" url='"+ changeUrl(6) +"' title=\"上架时间降序排列\" onClick=\"clickFunc(this)\" data-tcd=\"SEARCH_SORT.6\" data-tcs=\"3.0\">新品<i class=\"hd_s_iconfont\">&#xe617;</i></a>");
        }

        if (sortby == 5) {
            $(".hd_search_sort").html($(".hd_search_sort").html() + "<a class=\"hd_s_cur\" rel=\"nofollow\" orderbyId=\"5\" href=\"#page=1&sort=5\" url='"+ changeUrl(5) +"' title=\"评论数降序排列\" onClick=\"clickFunc(this)\" data-tcd=\"SEARCH_SORT.5\" data-tcs=\"3.0\">评论<i class=\"hd_s_iconfont\">&#xe617;</i></a>");
        } else {
            $(".hd_search_sort").html($(".hd_search_sort").html() + "<a rel=\"nofollow\" orderbyId=\"5\" href=\"#page=1&sort=5\" url='"+ changeUrl(5) +"' title=\"评论数降序排列\" onClick=\"clickFunc(this)\" data-tcd=\"SEARCH_SORT.5\" data-tcs=\"3.0\">评论<i class=\"hd_s_iconfont\">&#xe617;</i></a>");
        }

        if (sortby == 3) {
            $(".hd_search_sort").html($(".hd_search_sort").html() + "<a class=\"hd_s_cur\" rel=\"nofollow\" orderbyId=\"4\" href=\"#page=1&sort=4\" url='"+ changeUrl(4) +"' title=\"价格升序排列\" onClick=\"priceClick(this)\" data-tcd=\"SEARCH_SORT.4\" data-tcs=\"3.0\">价格<i class=\"hd_s_price\"></i></a>");
        } else if (sortby == 4) {
            $(".hd_search_sort").html($(".hd_search_sort").html() + "<a class=\"hd_s_cur\" rel=\"nofollow\" orderbyId=\"3\" href=\"#page=1&sort=3\" url='"+ changeUrl(3) +"' title=\"价格升序排列\" onClick=\"priceClick(this)\" data-tcd=\"SEARCH_SORT.3\" data-tcs=\"3.0\">价格<i class=\"hd_s_price\"></i></a>");
        } else {
            $(".hd_search_sort").html($(".hd_search_sort").html() + "<a rel=\"nofollow\" orderbyId=\"3\" href=\"#page=1&sort=3\" url='"+ changeUrl(3) +"' title=\"价格升序排列\" onClick=\"priceClick(this)\" data-tcd=\"SEARCH_SORT.3\" data-tcs=\"3.0\">价格<i class=\"hd_s_price\"></i></a>");

        }

        //排序结束

        //价格区间筛选

        $(".hd_search_price").html($(".hd_search_price").html() + "<div class=\"hd_s_ipt\">"
            + "<input type=\"text\" placeholder=\"&yen;\" id=\"searchFixPriceRangeMin\" onClick=\"priceIptClick()\" "
            + "value=\""+searchFixPriceInputMinValue()+"\" onkeyup=\"this.value=this.value.replace(/\D/g,'')\" "
            + "onafterpaste=\"this.value=this.value.replace(/\D/g,'')\" onBlur=\"this.value=this.value.replace(/\D/g,'')\"/>&minus;<input type=\"text\" placeholder=\"&yen;\" id=\"searchFixPriceRangeMax\""
            + "onClick=\"priceIptClick()\" value=\""+searchFixPriceInputMaxValue()+"\" onkeyup=\"this.value=this.value.replace(/\D/g,'')\""
            + "onafterpaste=\"this.value=this.value.replace(/\D/g,'')\" onBlur=\"this.value=this.value.replace(/\D/g,'')\"/>"
            + "</div>"
            + " <ul class=\"hd_s_boxCon\"><li class=\"hd_s_first\"> "
            + " <a href=\"javascript:void(0);\" class=\"hd_s_btn1\" onClick=\"cancleClick()\">清除</a> "
            + " <a class=\"hd_s_btn2\" href=\"javascript:void(0);\" url='"+ priceSelectUrl() +"' onClick=\"confirmClick()\">确定</a> "
            + " </li>");

//		var allPriceRangeList = new Array();
//		allPriceRangeList.pop();
//		if (typeof(allPriceRangeList) != "undefined" && allPriceRangeList.length > 0) {
//			for ( var i = 0; i < allPriceRangeList.length; i++) {
//				var beginPrice = allPriceRangeList.get(i).beginPrice;
//				var endPrice = allPriceRangeList.get(i).endPrice;
//				if (endPrice > 21474836) {
//					$(".hd_search_price").html($(".hd_search_price").html() + "<li><a rel=\"nofollow\" href=\"javascript:void(0)\" onclick=\"clickSearchPriceRange('"+beginPrice +"','','"+searchPriceRangeUrl+"',this);addTrackPositionToCookie('1','search_sel_"+beginPrice+"');return false;\" data-tcd=\"a13."+beginPrice+"_\" data-tcs=\"3.0\" title=\""+beginPrice+"元以上\">"+beginPrice+"元以上</a></li>");
//				} else {
//					$(".hd_search_price").html($(".hd_search_price").html() + "<li><a rel=\"nofollow\" href=\"javascript:void(0)\" onclick=\"clickSearchPriceRange('"+beginPrice +"','"+endPrice +"','"+searchPriceRangeUrl+"',this);addTrackPositionToCookie('1','search_sel_"+beginPrice+"_"+endPrice+"');return false;\" data-tcd=\"a13."+beginPrice+"_"+endPrice+"\" data-tcs=\"3.0\" title=\""+beginPrice+"-"+endPrice+"元\">"+beginPrice+"-"+endPrice+"元</a><li>");
//				}
//			}
//		}
        $(".hd_search_price").html($(".hd_search_price").html() + "</ul>");

        if (requestType != 70 && requestType != 75 && requestType != 76) {
            $(".hd_more_sort").html($(".hd_more_sort").html() + "<div class=\"hd_s_tag_wrap clearfix\"></div>");

        }
//		$(".hd_s_tag_wrap").html($(".hd_s_tag_wrap").html() + "<i class=\"hd_s_iconfont hd_s_triangle\">&#xe61b;</i>");
        if (typeof (fashionCateType) != "undefined" && fashionCateType == 1) {
            if (typeof (selectedFilter) != "undefined" && selectedFilter.indexOf("7") != -1) {
                $(".hd_s_tag_wrap").html($(".hd_s_tag_wrap").html() + "<a rel=\"nofollow\" "+
                    //					"onclick=\"addTrackPositionToCookie('1','search_filter_cancel_6');\" " +
                    "onclick=\"moreFilterClick(this,\"7\")\" " +
                    "href=\""+changeMoreSortUrl("7")+"\" " +
                    "class=\"hd_s_tag hd_s_select\"><u> </u>商家包邮</a>");
            } else {
                $(".hd_s_tag_wrap").html($(".hd_s_tag_wrap").html() + "<a rel=\"nofollow\" "+
                    //					"onclick=\"addTrackPositionToCookie('1','search_filter_6');\" " +
                    "onclick=\"moreFilterClick(this,\"7\")\" " +
                    "href=\""+changeMoreSortUrl("7")+"\" " +
                    "class=\"hd_s_tag\" data-tcd=\"SEARCH_FILTER.6\" data-tcs=\"3.0\"><u> </u>商家包邮</a>");
            }
        } else {

            if (typeof (selectedFilter) != "undefined" && selectedFilter.indexOf("6") != -1) {
                $(".hd_s_tag_wrap").html($(".hd_s_tag_wrap").html() + "<a rel=\"nofollow\" "+
                    //					"onclick=\"addTrackPositionToCookie('1','search_filter_cancel_6');\" " +
                    "onclick=\"moreFilterClick(this,\"6\")\" " +
                    "href=\""+changeMoreSortUrl("6")+"\" " +
                    "class=\"hd_s_tag hd_s_select\"><u> </u>1号店自营</a>");
            } else {
                $(".hd_s_tag_wrap").html($(".hd_s_tag_wrap").html() + "<a rel=\"nofollow\" "+
                    //					"onclick=\"addTrackPositionToCookie('1','search_filter_6');\" " +
                    "onclick=\"moreFilterClick(this,\"6\")\" " +
                    "href=\""+changeMoreSortUrl("6")+"\" " +
                    "class=\"hd_s_tag\" data-tcd=\"SEARCH_FILTER.6\" data-tcs=\"3.0\"><u> </u>1号店自营</a>");
            }
        }

//		$(".hd_more_sort").html($(".hd_more_sort").html() + "<div class=\"hd_tag_list\"><#if allShowFilterList.size() gt 2 ||(allShowFilterList.size() == 2 && req.filter?index_of(\"1\")==-1)>"
//	            + "<i class=\"hd_s_iconfont hd_s_triangle\">&#xe61b;</i></#if>"
//
//	            + "<#list allShowFilterList as sf>"
//	            + "<#if sf_index lt 2>"
//	            + "<#if sf.filterValue?exists && sf.filterValue==\"6\">"
//				+ "<a rel=\"nofollow\" class=\"hd_s_tag <#if req.filter?index_of(\"6\")!=-1>hd_s_select</#if>\" href=\"<#if req.filter?index_of(\"6\")!=-1>${SearchPrefix + req.urlUnFilter(6)}<#else>${SearchPrefix + req.urlFilter(6)}</#if>\" onclick=\"addTrackPositionToCookie('1','search_filter_<#if req.filter?index_of(\"6\")!=-1>cancel_</#if>6');\" <#if req.filter?index_of(\"6\")==-1>data-tcd=\"SEARCH_FILTER.6\" data-tcs=\"3.0\"</#if>>"
//				+ "<u> </u>一号店自营</a>"
//		        + "<#elseif sf.filterValue?exists && sf.filterValue==\"7\">"
//				+ "<a rel=\"nofollow\" class=\"hd_s_tag <#if req.filter?index_of(\"7\")!=-1>hd_s_select</#if>\" href=\"<#if req.filter?index_of(\"7\")!=-1>${SearchPrefix + req.urlUnFilter(7)}<#else>${SearchPrefix + req.urlFilter(7)}</#if>\" onclick=\"addTrackPositionToCookie('1','search_filter_<#if req.filter?index_of(\"7\")!=-1>cancel_</#if>7');\" <#if req.filter?index_of(\"7\")==-1>data-tcd=\"SEARCH_FILTER.7\" data-tcs=\"3.0\"</#if>>"
//				+ "<u> </u>商家包邮</a>"
//				+ "<#elseif sf.filterValue?exists && sf.filterValue==\"9\">"
//				+ "<a rel=\"nofollow\" class=\"hd_s_tag <#if req.filter?index_of(\"9\")!=-1>hd_s_select</#if>\" href=\"<#if req.filter?index_of(\"9\")!=-1>${SearchPrefix + req.urlUnFilter(9)}<#else>${SearchPrefix + req.urlFilter(9)}</#if>\" onclick=\"addTrackPositionToCookie('1','search_filter_<#if req.filter?index_of(\"9\")!=-1>cancel_</#if>9');\" <#if req.filter?index_of(\"9\")==-1>data-tcd=\"SEARCH_FILTER.9\" data-tcs=\"3.0\"</#if>>"
//				+ "<u></u><img width=\"88\" height=\"18\" alt=\"\" src=\"${bigPromotionTags.searchFilterImgUrl?if_exists}\"></a>"
//				+ "<#elseif sf.filterValue?exists && sf.filterValue==\"c\">"
//				+ "<a rel=\"nofollow\" class=\"hd_s_tag <#if req.filter?index_of(\"c\")!=-1>hd_s_select</#if>\" href=\"<#if req.filter?index_of(\"c\")!=-1>${SearchPrefix + req.urlUnFilter(\"c\")}<#else>${SearchPrefix + req.urlFilter(\"c\")}</#if>\" onclick=\"addTrackPositionToCookie('1','search_filter_<#if req.filter?index_of(\"c\")!=-1>cancel_</#if>c');\" <#if req.filter?index_of(\"c\")==-1>data-tcd=\"SEARCH_FILTER.12\" data-tcs=\"3.0\"</#if>>"
//				+ "<u></u>1号海购</a>"
//				+ "<#elseif sf.filterValue?exists && sf.filterValue==\"a\">"
//				+ "<a rel=\"nofollow\" class=\"hd_s_tag <#if req.filter?index_of(\"a\")!=-1>hd_s_select</#if>\" href=\"<#if req.filter?index_of(\"a\")!=-1>${SearchPrefix + req.urlUnFilter(\"a\")}<#else>${SearchPrefix + req.urlFilter(\"a\")}</#if>\" onclick=\"addTrackPositionToCookie('1','search_filter_<#if req.filter?index_of(\"a\")!=-1>cancel_</#if>a');\" <#if req.filter?index_of(\"a\")==-1>data-tcd=\"SEARCH_FILTER.10\" data-tcs=\"3.0\"</#if>>"
//				+ "<u></u>进口</a>"
//				+ "<#elseif sf.filterValue?exists && sf.filterValue==\"b\">"
//				+ "<a rel=\"nofollow\" class=\"hd_s_tag <#if req.filter?index_of(\"b\")!=-1>hd_s_select</#if>\" href=\"<#if req.filter?index_of(\"b\")!=-1>${SearchPrefix + req.urlUnFilter(\"b\")}<#else>${SearchPrefix + req.urlFilter(\"b\")}</#if>\" onclick=\"addTrackPositionToCookie('1','search_filter_<#if req.filter?index_of(\"b\")!=-1>cancel_</#if>b');\" <#if req.filter?index_of(\"b\")==-1>data-tcd=\"SEARCH_FILTER.11\" data-tcs=\"3.0\"</#if>>"
//				+ "<u></u>仅显示有货</a>"
//				+ "<#elseif sf.filterValue?exists && sf.filterValue==\"2\">"
//				+ "<a rel=\"nofollow\" class=\"hd_s_tag <#if req.filter?index_of(\"2\")!=-1>hd_s_select</#if>\" href=\"<#if req.filter?index_of(\"2\")!=-1>${SearchPrefix + req.urlUnFilter(2)}<#else>${SearchPrefix + req.urlFilter(2)}</#if>\" onclick=\"addTrackPositionToCookie('1','search_filter_<#if req.filter?index_of(\"2\")!=-1>cancel_</#if>2');\" <#if req.filter?index_of(\"2\")==-1>data-tcd=\"SEARCH_FILTER.2\" data-tcs=\"3.0\"</#if>>"
//				+ "<u></u>可开增票</a>"
//				+ "<#elseif sf.filterValue?exists && sf.filterValue==\"e\">"
//				+ "<a rel=\"nofollow\" class=\"hd_s_tag <#if req.filter?index_of(\"e\")!=-1>hd_s_select</#if>\" href=\"<#if req.filter?index_of(\"e\")!=-1>${SearchPrefix + req.urlUnFilter(\"e\")}<#else>${SearchPrefix + req.urlFilter(\"e\")}</#if>\" onclick=\"addTrackPositionToCookie('1','search_filter_<#if req.filter?index_of(\"e\")!=-1>cancel_</#if>e');\" <#if req.filter?index_of(\"e\")==-1>data-tcd=\"SEARCH_FILTER.13\" data-tcs=\"3.0\"</#if>>"
//				+ "<u></u>贵1赔20</a>"
//				+ "<#elseif sf.filterValue?exists && sf.filterValue==\"g\">"
//				+ "<a rel=\"nofollow\" class=\"hd_s_tag <#if req.filter?index_of(\"g\")!=-1>hd_s_select</#if>\" href=\"<#if req.filter?index_of(\"g\")!=-1>${SearchPrefix + req.urlUnFilter(\"g\")}<#else>${SearchPrefix + req.urlFilter(\"g\")}</#if>\" onclick=\"addTrackPositionToCookie('1','search_filter_<#if req.filter?index_of(\"g\")!=-1>cancel_</#if>g');\" <#if req.filter?index_of(\"g\")==-1>data-tcd=\"SEARCH_FILTER.14\" data-tcs=\"3.0\"</#if>>"
//				+ "<u></u>满减</a>"
//				+ "<#elseif sf.filterValue?exists && sf.filterValue==\"h\">"
//				+ "<a rel=\"nofollow\" class=\"hd_s_tag <#if req.filter?index_of(\"h\")!=-1>hd_s_select</#if>\" href=\"<#if req.filter?index_of(\"h\")!=-1>${SearchPrefix + req.urlUnFilter(\"h\")}<#else>${SearchPrefix + req.urlFilter(\"h\")}</#if>\" onclick=\"addTrackPositionToCookie('1','search_filter_<#if req.filter?index_of(\"h\")!=-1>cancel_</#if>h');\" <#if req.filter?index_of(\"h\")==-1>data-tcd=\"SEARCH_FILTER.15\" data-tcs=\"3.0\"</#if>>"
//				+ "<u></u>满赠</a>"
//		        + "</#if></#if></#list></div><#-- 外露筛选 end -->");
//	}

        if (typeof(pageCount) != "undefined" && pageCount > 0) {
            if (searchPageNo > 1) {
                $(".hd_s_page").html($(".hd_s_page").html() + "<a id=\"leftBtu\" class=\"hd_s_iconfont\" url=\""+searchPageUrl(parseInt(searchPageNo)-1)+"\" href=\"#page="+(parseInt(searchPageNo)-1)+"&sort="+$(".hd_s_cur").attr("orderbyid")+"\" onClick=\"new_LazyLoad_AdHtmlData("+searchPageNo+","+(parseInt(searchPageNo)-1)+");getPageCpcAd("+searchPageNo+","+(parseInt(searchPageNo)-1)+");pageClick("+(parseInt(searchPageNo)-1)+");\">&#xe603;</a>");
            } else {
                $(".hd_s_page").html($(".hd_s_page").html() + " <a id=\"leftBtu\" class=\"hd_s_iconfont hd_s_nopre\" url=\"0\" href=\"javascript:void(0);\" >&#xe603;</a>");
            }

            $(".hd_s_page").html($(".hd_s_page").html() + "<span>"+searchPageNo+"</span>/<em>"+pageCount+"</em>");
            if (searchPageNo < pageCount) {
                $(".hd_s_page").html($(".hd_s_page").html() + "<a id=\"rightBtu\" class=\"hd_s_iconfont\" url=\""+searchPageUrl(parseInt(searchPageNo)+1)+"\" href=\"#page="+(parseInt(searchPageNo)+1)+"&sort="+$(".hd_s_cur").attr("orderbyid")+"\" onClick=\"new_LazyLoad_AdHtmlData("+searchPageNo+","+(parseInt(searchPageNo)+1)+");getPageCpcAd("+searchPageNo+","+(parseInt(searchPageNo)+1)+");pageClick("+(parseInt(searchPageNo)+1)+");\">&#xe606;</a>");
            } else {
                $(".hd_s_page").html($(".hd_s_page").html() + "<a id=\"rightBtu\" class=\"hd_s_iconfont hd_s_nonext\" url=\"0\" href=\"javascript:void(0);\">&#xe606;</a>");
            }
        }

    }
}

function pageClick(value) {
    if (value > 1 && value < pageCount) {
        $("#leftBtu").attr("class","hd_s_iconfont");
        $("#leftBtu").attr("url",""+ajaxLongUrl.replace(/-p(\d)+-/,'-p'+(parseInt(value)-1)+'-')+"");
        $("#leftBtu").attr("href","#page="+value+"&sort="+$(".hd_s_cur").attr("orderbyid")+"");
        $("#leftBtu").attr("onClick","new_LazyLoad_AdHtmlData("+value+","+(parseInt(value)-1)+");getPageCpcAd("+value+","+(parseInt(value)-1)+");pageClick("+(parseInt(value)-1)+");");
        $("#leftBtu").html("&#xe603;");
        $("#rightBtu").attr("class","hd_s_iconfont");
        $("#rightBtu").attr("url",""+ajaxLongUrl.replace(/-p(\d)+-/,'-p'+(parseInt(value)+1)+'-')+"");
        $("#rightBtu").attr("href","#page="+value+"&sort="+$(".hd_s_cur").attr("orderbyid")+"");
        $("#rightBtu").attr("onClick","new_LazyLoad_AdHtmlData("+value+","+(parseInt(value)+1)+");getPageCpcAd("+value+","+(parseInt(value)+1)+");pageClick("+(parseInt(value)+1)+");");
        $("#rightBtu").html("&#xe606;");
    }else if (value <= 1) {
        $("#leftBtu").attr("class","hd_s_iconfont hd_s_nopre");
        $("#leftBtu").attr("url","0");
        $("#leftBtu").attr("href","#page="+value+"&sort="+$(".hd_s_cur").attr("orderbyid")+"");
        $("#leftBtu").attr("onClick","");
        $("#leftBtu").html("&#xe603;");
        $("#rightBtu").attr("class","hd_s_iconfont");
        $("#rightBtu").attr("url",""+ajaxLongUrl.replace(/-p(\d)+-/,'-p'+(parseInt(value)+1)+'-')+"");
        $("#rightBtu").attr("href","#page="+value+"&sort="+$(".hd_s_cur").attr("orderbyid")+"");
        $("#rightBtu").attr("onClick","new_LazyLoad_AdHtmlData("+value+","+(parseInt(value)+1)+");getPageCpcAd("+value+","+(parseInt(value)+1)+");pageClick("+(parseInt(value)+1)+");");
        $("#rightBtu").html("&#xe606;");
    }else if (value >= pageCount) {
        $("#leftBtu").attr("class","hd_s_iconfont");
        $("#leftBtu").attr("url",""+ajaxLongUrl.replace(/-p(\d)+-/,'-p'+(parseInt(value)-1)+'-')+"");
        $("#leftBtu").attr("href","#page="+value+"&sort="+$(".hd_s_cur").attr("orderbyid")+"");
        $("#leftBtu").attr("onClick","new_LazyLoad_AdHtmlData("+value+","+(parseInt(value)-1)+");getPageCpcAd("+value+","+(parseInt(value)-1)+");pageClick("+(parseInt(value)-1)+");");
        $("#leftBtu").html("&#xe603;");
        $("#rightBtu").attr("class","hd_s_iconfont hd_s_nonext");
        $("#rightBtu").attr("url","0");
        $("#rightBtu").attr("href","#page="+value+"&sort="+$(".hd_s_cur").attr("orderbyid")+"");
        $("#rightBtu").attr("onClick","");
        $("#rightBtu").html("&#xe606;");
    }
    $(".hd_s_page").find("span").html(value);
}

function searchFixPriceInputMinValue() {
    if (typeof(priceRangeMin) != "undefined" && priceRangeMin > 0) {
        return priceRangeMin;
    } else if (typeof(priceRangeMax) != "undefined" && priceRangeMax > 0) {
        return "0";
    } else {
        return "";
    }
}

function searchFixPriceInputMaxValue() {
    if (typeof(priceRangeMax) != "undefined" && priceRangeMax > 0) {
        return priceRangeMax;
    } else if (typeof(priceRangeMin) != "undefined" && priceRangeMin > 0) {
        return "";
    } else {
        return "";
    }
}

function changeUrl(value) {
    return longUrl.replace(/-s./,'-s'+value);
}

function changeMoreSortUrl(value) {
    if (typeof (selectedFilter) != "undefined" && selectedFilter.indexOf(value) != -1) {
        selectedFilter = selectedFilter.replace(value,"");
        return longUrl.replace(/-f[^-]*-/,"-f"+selectedFilter+"-");
    } else {
        return longUrl.replace(/-f/,"-f"+value);
    }
}

function priceSelectUrl() {
    return longUrl.replace(/-p(\d)+-/,'-p1-');
}

function searchPageUrl(value) {
    return ajaxLongUrl.replace(/-p(\d)+-/,'-p'+value+'-');
}

function clickFunc(element) {
    var borther = $(".hd_s_cur").parent().children();
    for ( var i = 0; i < borther.length; i++) {
        if (borther[i] != element) borther[i].className = "";
    }
    var elmClass = element.className;
    if (typeof(elmClass) == "undefined" || elmClass == "") {
        element.className = "hd_s_cur";
    }
}

function secondSort(value) {
    if (typeof(sortby) != "undefined" && sortby != "") {

        var borther = $(".hd_s_cur").parent().children();
        for ( var i = 0; i < borther.length; i++) {
            if (i == value) {
                borther[i].className = "hd_s_cur";
            } else {
                borther[i].className = "";
            }
        }
    }
}

function moreFilterClick(element,value) {
    var className = element.className;
    if (typeof(className) != "undefined" && className == "hd_s_tag" && selectedFilter.indexOf(value) == -1) {
        className = "hd_s_tag hd_s_select";
        element.setAttribute("data-tcd","SEARCH_FILTER."+value);
        element.setAttribute("data-tcs","3.0");
        element.setAttribute("href",longUrl.replace(/-f/,"-f"+value));

    } else if (typeof(className) != "undefined" && className == "hd_s_tag hd_s_select" && selectedFilter.indexOf(value) == -1) {
        className = "hd_s_tag hd_s_select";
        element.setAttribute("data-tcd","");
        element.setAttribute("data-tcs","");
        element.setAttribute("href",longUrl.replace(/-f[^-]*-/,"-f"+selectedFilter.replace(value,"")+"-"));
    }
}

function moreSortClick() {
    $('.hd_search_price').addClass(" hd_s_show");
    $('.hd_search_price').mouseleave(function(){
        $('.hd_search_price').removeClass('hd_s_show');

    });
}

function priceIptClick() {
    $('.hd_search_price').addClass(" hd_s_show");
    $('.hd_search_price').mouseleave(function(){
        $('.hd_search_price').removeClass('hd_s_show');

    });
}

function cancleClick() {
    $('#searchFixPriceRangeMin').val("");
    $('#searchFixPriceRangeMax').val("");
    return ;
}

function confirmClick() {
    var url = $(".hd_s_btn2").attr("url");
    var inputRangeMin = $('#searchFixPriceRangeMin')[0];
    var inputRangeMax = $('#searchFixPriceRangeMax')[0];
    var temp;
    if ((inputRangeMin.value == "" || /^[0]+$/.test(inputRangeMin.value))
        && (inputRangeMax.value == "" || /^[0]+$/.test(inputRangeMax.value))) {
        inputRangeMax.value="";
        inputRangeMin.value="";
    }
    var regInteger = /^[0-9]*$/;
    if ((!regInteger.test(inputRangeMin.value))||(!regInteger.test(inputRangeMax.value))) {
        return ;
    }
    if ((inputRangeMin.value != "") && (inputRangeMax.value != "")) {
        if (Number(inputRangeMax.value) < Number(inputRangeMin.value)) {
            temp = inputRangeMax.value;
            inputRangeMax.value = inputRangeMin.value ;
            inputRangeMin.value = temp;
        } else if(Number(inputRangeMax.value) == Number(inputRangeMin.value)) {
            inputRangeMin.value = "";
        }

    }
    if(inputRangeMax.value!="" && Number(inputRangeMax.value)>21474836) {
        inputRangeMax.value = "";
    }
    if(inputRangeMin.value!="" && Number(inputRangeMin.value)>21474836) {
        inputRangeMin.value = "";
    }
    var newUrl = url.replace(/-price[0-9,]*-/, "-price"+ inputRangeMin.value +","+ inputRangeMax.value +"-");
    if ((inputRangeMin.value == "") && (inputRangeMax.value == "")) {
        newUrl = url.replace(/-price[0-9,]*-/, "-price"+"-");
    }
    else{
        newUrl = url.replace(/-price[0-9,]*-/, "-price"+ inputRangeMin.value +
            ","+ inputRangeMax.value +
            "," + priceTemplateId +"-");
    }
// 	addTrackPositionToCookie("1","search_in_price_"+inputRangeMin.value+"_"+inputRangeMax.value);
// 	loli.spm.refreshPage(newUrl, this);
    window.location.href = newUrl;
}

function pageSearch(searchPageNo,pageCount) {
    if (typeof(sortby) != "undefined" && sortby != "") {
        if (pageCount > 0) {
            $(".hd_s_page").html("");
            if (searchPageNo > 1) {
                $(".hd_s_page").html($(".hd_s_page").html() + "<a id=\"leftBtu\" class=\"hd_s_iconfont\" url=\""+searchPageUrl(parseInt(searchPageNo)-1)+"\" href=\"#page="+(parseInt(searchPageNo)-1)+"&sort="+$(".hd_s_cur").attr("orderbyid")+"\" onClick=\"new_LazyLoad_AdHtmlData("+searchPageNo+","+(parseInt(searchPageNo)-1)+");getPageCpcAd("+searchPageNo+","+(parseInt(searchPageNo)-1)+");pageClick("+(parseInt(searchPageNo)-1)+");\">&#xe603;</a>");
            } else {
                $(".hd_s_page").html($(".hd_s_page").html() + " <a id=\"leftBtu\" class=\"hd_s_iconfont hd_s_nopre\" url=\"0\" href=\"javascript:void(0);\" >&#xe603;</a>");
            }

            $(".hd_s_page").html($(".hd_s_page").html() + "<span>"+searchPageNo+"</span>/<em>"+pageCount+"</em>");
            if (searchPageNo < pageCount) {
                $(".hd_s_page").html($(".hd_s_page").html() + "<a id=\"rightBtu\" class=\"hd_s_iconfont\" url=\""+searchPageUrl(parseInt(searchPageNo)+1)+"\" href=\"#page="+(parseInt(searchPageNo)+1)+"&sort="+$(".hd_s_cur").attr("orderbyid")+"\" onClick=\"new_LazyLoad_AdHtmlData("+searchPageNo+","+(parseInt(searchPageNo)+1)+");getPageCpcAd("+searchPageNo+","+(parseInt(searchPageNo)+1)+");pageClick("+(parseInt(searchPageNo)+1)+");\">&#xe606;</a>");
            } else {
                $(".hd_s_page").html($(".hd_s_page").html() + "<a id=\"rightBtu\" class=\"hd_s_iconfont hd_s_nonext\" url=\"0\" href=\"javascript:void(0);\">&#xe606;</a>");
            }
        }

    }

}

function secondPriceSort(value) {
    if (typeof(sortby) != "undefined" && sortby != "") {
        var borther = $(".hd_s_cur").parent().children();
        for ( var i = 0; i < borther.length; i++) {
            if (i == borther.length-1 && value == 3) {
                borther[i].className = "hd_s_cur hd_s_up";
                borther[i].setAttribute("orderbyId", "4");
                borther[i].setAttribute("href", "#page=1&sort=4");
                borther[i].setAttribute("url", longUrl.replace(/-s./,'-s'+4));
                borther[i].setAttribute("data-tcd", "SEARCH_SORT.3");
                borther[i].setAttribute("onClick", "priceClick(this,4)");
                borther[i].setAttribute("title", "价格升序排列");
                borther[i].setAttribute("data-tcd", "SEARCH_SORT.4");
            } else if (i == borther.length-1 && value == 4) {
                borther[i].className = "hd_s_cur hd_s_down";
                borther[i].setAttribute("orderbyId", "3");
                borther[i].setAttribute("href", "#page=1&sort=3");
                borther[i].setAttribute("url", longUrl.replace(/-s./,'-s'+3));
                borther[i].setAttribute("data-tcd", "SEARCH_SORT.3");
                borther[i].setAttribute("onClick", "priceClick(this,3)");
                borther[i].setAttribute("title", "价格降序排列");
                borther[i].setAttribute("data-tcd", "SEARCH_SORT.3");
            } else {
                borther[i].className = "";
            }
        }
    }
}

function priceClick(element) {

    var borther = $(".hd_s_cur").parent().children();
    for ( var i = 0; i < borther.length; i++) {
        if (borther[i] != element) borther[i].className = "";
    }
    var elmClass = element.className;
    if (typeof(elmClass) == "undefined" || elmClass == "" || elmClass == "hd_s_cur hd_s_down") {
        element.className = "hd_s_cur hd_s_up";
        element.setAttribute("orderbyId", "4");
        element.setAttribute("href", "#page=1&sort=4");
        element.setAttribute("url", longUrl.replace(/-s./,'-s'+4));
        element.setAttribute("data-tcd", "SEARCH_SORT.3");
        element.setAttribute("onClick", "priceClick(this)");
        element.setAttribute("title", "价格升序排列");
        element.setAttribute("data-tcd", "SEARCH_SORT.4");

    } else if (elmClass == "hd_s_cur hd_s_up") {
        element.className = "hd_s_cur hd_s_down";
        element.setAttribute("orderbyId", "3");
        element.setAttribute("href", "#page=1&sort=3");
        element.setAttribute("url", longUrl.replace(/-s./,'-s'+3));
        element.setAttribute("data-tcd", "SEARCH_SORT.3");
        element.setAttribute("onClick", "priceClick(this)");
        element.setAttribute("title", "价格降序排列");
        element.setAttribute("data-tcd", "SEARCH_SORT.3");
    }
}







/**
 * 搜索列表页对比选中功能
 *
 * cookie相关定义
 *	var siteDomain = URLPrefix.sitedomain;
 *	var op={path:'/', domain:siteDomain , expireDays:-1};
 *	jQuery.cookie("search_compare_products", null, {path:'/', domain:siteDomain , expireDays:-1}); //将过期时间设置为过去来删除一个cookie
 */
var searchCompareSeleteFed = {
    /**
     *
     * @param productId 产品id
     * @param operaType 操作类型:0,insert; 1,delete; 2, deleteAll
     */
    updateSearchCompareCookies : function(operaType, productId) {
        // 入参不合格
        if(typeof(operaType)=="undefined" // 无操作类型
            || (operaType!=2 && typeof(productId)=="undefined")) { // 插入和删除操作需指明sku
            return ;
        }
        var siteDomain = URLPrefix.sitedomain;
        var op={path:'/', domain:siteDomain , expireDays:-1};
        if(operaType == 2) {
            jQuery.cookie("search_compare_products", null, op);
            return ;
        }
        var searchCompareIds = jQuery.cookie("search_compare_products");
        if(searchCompareIds) {
            searchCompareIds = searchCompareIds.split(",");
            if(operaType == 0) {
                searchCompareIds.push(productId);
            } else if (operaType == 1) {
                var _tempArr = $.grep(searchCompareIds, function(val, key){
                    if(val == productId) {
                        return false;
                    }
                    return true;
                });
                searchCompareIds = _tempArr;
            }
        } else {
            if(operaType == 0) {
                searchCompareIds = [productId];
            }
        }

        jQuery.cookie("search_compare_products", searchCompareIds, op);

    },

    /**
     * 根据特定模板和数据模式，生成制定html
     * @param tempHtml
     * @param data
     * @returns
     */
    substitute : function(data, tempHtml) {
        if(!tempHtml) {
            tempHtml = [
                "<li data-val='{val}'><span class='empty'></span>",
                "<dl class='item_has clearfix'>",
                "<dt><a href='{link}' target='_blank' onClick='addTrackPositionToCookie(\"1\",\"pro_compare_select_{val}\");'><img width='60' height='60' src='{src}'></a></dt><dd>",
                "<a class='item_name' href='{link}' target='_blank' onClick='addTrackPositionToCookie(\"1\",\"pro_compare_select_{val}\");'>{txt}</a>",
                "<strong class='s_price'>&yen;{price}</strong>",
                "</dd></dl></li>"
            ].join("");
        }

        return tempHtml.replace(/\\?\{([^}]+)\}/g, function (match, name) {
            if (match.charAt(0) == '\\') return match.slice(1);
            return (data[name] != undefined) ? data[name] : '';
        });
    },
    /**
     * 添加到对比栏
     * @param data
     * @param val
     */
    addtoComPareBar : function(data,val){
        var comPareBar = $(".mod_compare_bar");
        var items = $('.mod_compare_bar .itemList');
        comPareBar.addClass("fixed");
        var html = searchCompareSeleteFed.substitute(data);
        items.append($(html));
        items.find("li").hover(function(){
            $(this).addClass("current");
        },function(){
            $(this).removeClass("current");
        });

        items.find("li .empty").click(function(){
            var val = $(this).parents("li").attr("data-val");
            var obj = $(".mod_search_pro .contrast[data-val="+val+"]");
            if(obj) {
                $(obj).removeClass("select");
            }
            $(".mod_compare_bar .itemList li[data-val="+ val +"]").remove();

            if(items.find("li").length < 2){
                $(".mod_compare_bar .compareBtn").removeClass("cur");
            }else{
                $(".mod_compare_bar .compareBtn").addClass("cur");
            }
            searchCompareSeleteFed.updateSearchCompareCookies(1, val);
        });

    },
    /**
     *3c类目对比功能实现
     *
     **/
    itemCompare:function(){
        var items = $('.mod_compare_bar .itemList');
        var popTips = $('.mod_compare_bar .compareList .errorTips');
        var comPareBar = $(".mod_compare_bar");
        var maxNum = 4;
        $("#plist").delegate('.contrast', 'click' , function(){
            var _itemsLength = items.find("li").length;
            if($(this).hasClass("serialPro"))	{ // 系列商品对比
                var productId = $(this).attr("parentId");
                var subProdId = $(this).attr("data-val");
                if($(this).hasClass("select")){
                    $(this).removeClass("select");
                    $(".mod_compare_bar .itemList li[data-val="+ subProdId +"]").remove();
                } else {
                    getSerialAttrs(jQuery('#buyButton_' + productId)[0], 1);
                }
            } else { // 普通商品对比
                if($(this).hasClass("select")){
                    var dataValue = $(this).attr("data-val");
                    removeComPare(dataValue);
                    _itemsLength = items.find("li").length;
                    if(_itemsLength < 2){$(".mod_compare_bar .compareBtn").removeClass("cur");}
                    items.find("li:last").addClass("last");
                    searchCompareSeleteFed.updateSearchCompareCookies(1, dataValue);
                    gotracker('2','search_compare_cancel',dataValue);
                }else{
                    if(_itemsLength > 0){
                        $(".mod_compare_bar .compareBtn").addClass("cur");
                    }
                    if(_itemsLength < maxNum){
                        items.show();
                        $(this).addClass("select");
                        var dataVal = $(this).attr("data-val");
                        var str = $(this).attr("data-msg");
                        var json = eval('(' + str + ')');
                        if(json.src==null || typeof(json.src)=="undefined" ||json.src=="undefined" || json.src==""){
                            json.src = $("#pdlink1_" + dataVal).children("img").attr("src");
                        }
                        var data = {
                            src:json.src,
                            link:json.link,
                            price:json.price,
                            txt:json.txt,
                            val:dataVal
                        };
                        searchCompareSeleteFed.addtoComPareBar(data,dataVal);
                        searchCompareSeleteFed.updateSearchCompareCookies(0, dataVal);
                        gotracker('2','search_compare_add',dataValue);
                    }else{
                        comPareBar.addClass("fixed");
                        items.show();
                        popTips.show().find("span").html("对比栏已满");
                        hideTips();
                    }
                }
            }
        });

        // 取消对比
        var removeComPare = function(dataVal){
            var obj = $(".mod_search_pro .contrast[data-val="+dataVal+"]");
            if(obj) {
                $(obj).removeClass("select");
            }
            $(".mod_compare_bar .itemList li[data-val="+ dataVal +"]").remove();
        };
        var timer=0;
        var hideTips = function(){
            clearInterval(timer);
            timer = setTimeout(function(){
                popTips.hide();
            },3000);
        };
        //清空对比栏
        $('.mod_compare_bar .compareBtn .btn_empty').click(function(){
            items.find('li').remove();
            items.hide();
            $('.mod_search_pro a.select').removeClass("select");
            $(".mod_compare_bar .compareBtn").removeClass("cur");
            searchCompareSeleteFed.updateSearchCompareCookies(2);
        });
        // 立即对比
        $('.mod_compare_bar .compareBtn .btn_cpr').click(function(){
            var compareProdIds = "";
            if(items.find('li').size() < 2) {
                $(this).attr("href", "javascript:void(0);");
                popTips.show().find("span").html("请至少选择2件商品");
                hideTips();
                return ;
            }
            items.find('li').each(function(i){
                var _$this = $(this);
                var dataVal = _$this.attr("data-val");
                if(i>0) {
                    compareProdIds += "-";
                }
                compareProdIds += dataVal;
            });

            var cprHref = URLPrefix.search_keyword + "/compareProduct/cps" + compareProdIds;
            $(this).attr("href", cprHref);
            $(this).attr("target", "_blank");
            addTrackPositionToCookie('1','search_compare_result');
        });
        $(".mod_compare_bar .close").click(function(){
            comPareBar.removeClass("fixed");
        });
    },
    /**
     * 页面加载时，显示对比框
     */
    displayCompareBoxBystart : function() {
        var items = $('.mod_compare_bar .itemList');
        var _compareCategoryFlag = 0;
        if(typeof(compareCategoryFlag) != "undefined") {
            _compareCategoryFlag = parseInt(compareCategoryFlag);
        }
        // 当前类目不是支持对比功能类目
        if(_compareCategoryFlag == 0) {
            return ;
        }

        var searchCompareIds = jQuery.cookie("search_compare_products");
        var compareProdIds = "";
        if(searchCompareIds) {
            searchCompareIds = searchCompareIds.split(",");
            compareProdIds = searchCompareIds.join("-");
            var preUrl = URLPrefix.search_keyword;
            var url = preUrl + "/searchCompareProductBase.do?compareProdIds=" + compareProdIds;
            url += "&callback=?";
            jQuery.getJSON(url, function(data) {
                if (data && data.value) {
                    alert("ERROR = " + data.ERROR);
                } else {
                    var busystcok = URLPrefix.busystock ? URLPrefix.busystock : "//gps.yhd.com";
                    var param="?mcsite="+currSiteId + "&provinceId=" + jQuery.cookie("provinceId");
                    if((typeof(secondAreaFlag)!="undefined" && secondAreaFlag==1)){
                        param+="&cityId="+jQuery.cookie("cityId");
                        var detailAdd=jQuery.cookie("detail_yhdareas");
                        if(detailAdd!=null && "undefined"!=detailAdd){
                            var detailAddArr=detailAdd.split('_');
                            if(detailAddArr.length>=3 && detailAddArr[2]>0){
                                param+="&countyId="+detailAddArr[2];
                            }
                        }
                    }
                    var url=busystcok + "/busystock/restful/truestock";
                    $.each(searchCompareIds, function(i, v){
                        param += "&productIds=" + v;
                    });
                    var scProducts = $.parseJSON(data.success);
                    jQuery.getJSON(url+param+"&callback=?",function(bsdata){
                        var len=bsdata.length;
                        for (var i = 0; i < len; i++) {
                            var product = bsdata[i];
                            if (product == null) continue; //不可见商品
                            if (product.productId == null) continue; //不可见商品
                            var productId = product.productId;
                            var pmInfoId = product.pmId;
                            var baseProduct = scProducts[productId];
                            var price = product.productPrice.toFixed(2);
                            var link = URLPrefix.IdcYhdDetailDomain + "/item/" + pmInfoId;

                            var spdata = {
                                src:baseProduct.src,
                                link:link,
                                price:price,
                                txt:baseProduct.txt,
                                val:productId
                            };

                            searchCompareSeleteFed.addtoComPareBar(spdata, productId);
                            if(items.find("li").length < 2){
                                $(".mod_compare_bar .compareBtn").removeClass("cur");
                            }else{
                                $(".mod_compare_bar .compareBtn").addClass("cur");
                            }
                        }
                    });
                }
            });
        }
    },
    main : function() {
        if(typeof(compareCategoryFlag) != "undefined" && compareCategoryFlag==1){
            this.itemCompare();
            this.displayCompareBoxBystart();
        }
    }
};
$(function(){
    /*车型筛选*/
    var i = 155;
    $('.car_box').click(function(){
        if($(this).hasClass("unavailable")) return false;
        $(this).addClass('cur').addClass("hover").siblings().removeClass('cur');
        var include = $(this).find('.car_choice_include'),
            includeHeight = include.outerHeight(true);
        if(includeHeight > i){
            include.css({height : i , overflowY : 'scroll'});
        }

    }).hover(
        function(){},
        function(){
            $(this).removeClass('cur').removeClass("hover");
        });
    carSelected();
});

var car_brand=$("#car_brand");
var old_brandId=0;
var old_seriseId=0;
var car_selected =$("#car_model_box");
function search_car_brand(){
    if(car_brand=="" || typeof(car_brand.val()) == "undefined"){
        return;
    }
    var chooseArray = choosedAttrItemsCar.split(",");
    var brand_id = chooseArray[0];
    var serial_id = chooseArray[1];
    var displacement_id = chooseArray[2];
    if(brand_id > 0){
        $("#car_confirm_btn").attr("style","display:block;");
    }
    var brandUrl = URLPrefix.search_keyword +"/carBrandAttribute.do?callback=?";
    jQuery.getJSON(brandUrl, function(rs) {
        if(!rs || !rs.brands){
            return;
        }
        var data = eval(rs.brands);
        var car_brand_list = $("#car_brand_list");
        car_brand_list.html('<li>请选择品牌</li>');
        var length=data.length;
        for(var i=0;i<length;i++){
            var bid = data[i].carBrandId;
            var bname=data[i].carBrandName;
            var brand;
            if(bid==brand_id){
                brand = '<li><a href="javascript:void(0);" id="firstCarAnchor" valueId="'+bid+'">'+bname+'</a></li>';
                $("#cur_car_brand").attr("selectedid",bid);
                $("#cur_car_brand").html("<span>"+bname+"</span><u></u>");
//				$("#cur_car_brand").attr("name","firstCarAnchor");
//				car_selected.html("<u></u><span>"+bname+"</span>");
            }else{
                brand = '<li><a href="javascript:void(0);" valueId="'+bid+'">'+bname+'</a></li>';
            }
            car_brand_list.append(brand);
        }

    });

    search_car_serise(1,brand_id,serial_id);
    search_car_displacements(1,brand_id,serial_id,displacement_id);

}

function search_car_serise(flag,brand_id,serial_id){
    var car_brand_list = $("#car_serial_list");
    //切换品牌时，选中的型号需要清空
    if(flag==0){
        $("#cur_car_serial").attr("selectedid","");
        $("#cur_car_serial").html("<span>厂家+型号</span><u></u>");
        car_brand_list.html("<li>请选择车系</li>");
        $("#car_serial").addClass("unavailable");
    }
    var new_brandId = brand_id;
    if(brand_id==0){
        new_brandId = $("#cur_car_brand").attr("selectedid");
    }
    if(new_brandId != "" && typeof(new_brandId) != "undefined"){
        $("#car_serial").removeClass("unavailable");
        var seriseUrl = URLPrefix.search_keyword +"/carAttributeSerise.do?carBrandId="+new_brandId+"&callback=?";
        jQuery.getJSON(seriseUrl, function(rs) {
            if(!rs || !rs.serise){
                return;
            }
            var data = eval(rs.serise);
            car_brand_list.html("");
            for(var i=0;i<data.length;i++){
                var factory = '<li>==='+data[i].key+'===</li>';
                car_brand_list.append(factory);
                var dataValue = data[i].value;
                for(var j=0;j<dataValue.length;j++){
                    var serise = '<li><a href="javascript:void(0);" valueId="'+dataValue[j].carSerialId+'">'+dataValue[j].carSerialName+'</a></li>';
                    car_brand_list.append(serise);
                    if(serial_id==dataValue[j].carSerialId){
                        $("#cur_car_serial").attr("selectedid",dataValue[j].carSerialId);
                        $("#cur_car_serial").html("<span>"+dataValue[j].carSerialName+"</span><u></u>");
//						car_selected.append("<span>"+dataValue[j].carSerialName+"</span>");
                    }
                }

            }
        });
    }
}

function search_car_displacements(flag,brand_id,serial_id,displacement_id){
    var car_brand_list = $("#car_displacement_list");
    //切换品牌或车系时，选中的排量需要清空
    if(flag==0){
        $("#cur_car_displacement").attr("selectedid","");
        $("#cur_car_displacement").html("<span>排量</span><u></u>");
        car_brand_list.html("<li>排量</li>");
        $("#car_displacement").addClass("unavailable");
    }
    var new_brandId = brand_id;
    var new_serise = serial_id;
    if(brand_id==0){
        new_brandId = $("#cur_car_brand").attr("selectedid");
    }
    if(serial_id==0){
        new_serise = $("#cur_car_serial").attr("selectedid");
    }
    if(new_brandId != "" && typeof(new_brandId) != "undefined"
        && new_serise !="" && typeof(new_serise) != "undefined"){
        $("#car_displacement").removeClass("unavailable");
        var seriseUrl = URLPrefix.search_keyword+"/carAttributeDisplacements.do?carBrandId="+new_brandId+"&carSeriseId="+new_serise+"&callback=?";
        jQuery.getJSON(seriseUrl, function(rs) {
            if(!rs || !rs.displacements){
                return;
            }
            car_brand_list.html("");
            var data = eval(rs.displacements);
            for(var i=0;i<data.length;i++){
                var displacement = '<li><a href="javascript:void(0);" valueId="'+data[i].displacementId+'">'+data[i].displacementName+'</a></li>';
                car_brand_list.append(displacement);
                if(displacement_id==data[i].displacementId){
                    $("#cur_car_displacement").attr("selectedid",data[i].displacementId);
                    $("#cur_car_displacement").html("<span>"+data[i].displacementName+"</span><u></u>");
//				    car_selected.append("<span>"+data[i].displacementId+"</span>");
                }
            }
        });
    }
}
//获取选中的汽车信息
function carSelected(){
    //切换品牌信息
//	if(obj==car_brand){
//
//	}
    $('.car_box li>a').live("click",function(){
        old_brandId=$("#cur_car_brand").attr("selectedid");
        old_seriseId=$("#cur_car_serial").attr("selectedid");
        var valueId = $(this).attr("valueId");
        var valueName = $(this).html();
        var valueObj = $(this).parents(".car_box").find(".car_choice_title");
        $(valueObj).attr("selectedId",valueId);
        $(valueObj).html('<span>'+valueName+'</span><u></u>');
        $(valueObj).parent().removeClass('cur').removeClass("hover");
        //切换品牌
        if($(valueObj).parent().attr("id")=="car_brand"){
            $(this).parent().siblings().find("a").removeAttr('name');
//			 $(this).attr("name","firstCarAnchor");
            if(old_brandId != valueId){
                search_car_serise(0,0,0);
                search_car_displacements(0,0,0);
            }else{
                search_car_serise(1,0,0);
                search_car_displacements(1,0,0);
            }

            gotracker('2','search_selected_car_brand',valueId);

        }

        //切换车系
        if($(valueObj).parent().attr("id")=="car_serial"){
            if(old_seriseId !=valueId){
                search_car_displacements(0,0,0,0);
            }else{
                search_car_displacements(1,0,0,0);
            }
            gotracker('2','search_selected_car_serial',valueId);
        }

        //选择排量
        if($(valueObj).parent().attr("id")=="car_displacement"){
            $("#car_confirm_btn").attr("style","display:block;");
            gotracker('2','search_selected_car_displacement',valueId);
        }else{
            $("#car_confirm_btn").attr("style","display:none;");
        }

    });

    $(".car_model_box >u").live("click",function(){
        //清空汽车品牌、车型、排量、年份rAnchor;
//		location.href='#firstCarAnchor';
//		$(".car_choice_con #ca
        addTrackPositionToCookie('1','search_clear_car');
        window.location.href = searchCarUrl.replace("-car", "");
    });

    $(".btn_model").live("click",function(){
        $("#car_brand").addClass("cur hover");
        $(".choice_before").attr("style","");
        $(".choice_later").attr("style","display:none;");
        gotracker('2','search_selected_car_info',0);
//		window.location.hash = firstCar_brand_list").stop().animate({scrollTop:$("#firstCarAnchor").position().top},200);
//		alert($("#firstCarAnchor").position().top);
    });
}


//选择车型搜索
function search_car(){
    var brandId = $("#cur_car_brand").attr("selectedid");
    var seriseId = $("#cur_car_serial").attr("selectedid");
    var disId = $("#cur_car_displacement").attr("selectedid");
//	var brandName=$("#cur_car_brand span").html();
//	var seriseName=$("#cur_car_serial span").html();
//	var disName = $("#cur_car_displacement span").html();
//	alert(jQuery.cookie("search_car_selected_info"));
    var ids = brandId+","+seriseId+","+disId;
    var carUrl = searchCarUrl.replace("-car-", "-car" + ids + "-");
    //汽车搜索的tracker
    addTrackPositionToCookie('1','search_car');
//	jQuery.cookie("search_car_selected_info",brandName+"_"+seriseName+"_"+disName);
    window.location.href = carUrl;
}
var searchQuickView = {
    modPopQuickView:function(){
        $("#plist").delegate("#search_quick_view", "click", function(){
            searchQuickView.quickView($(this));
        });
    },
    quickView:function(obj){
        var provinceId = jQuery.cookie("provinceId");
        if(!provinceId) {
            return ;
        }
        // 先清空,后弹框，再加载
        $("#similar_product_pop_show").empty();
        yhdLib2.dialog({
            popupName:".mod_search_beautiCare",
            maskLayer:true,
            popupFixed:true
        });

        var productId = $(obj).attr("productId");
        var categoryId = $(obj).attr("categoryId");
        var brandId = $(obj).attr("brandId");
        var manageBrandId = $(obj).attr("manageBrandId");
        var merchantId = $(obj).attr("merchantId");
        var productIndex = $(obj).attr("productIndex");
//        	var coreAttrIds = $(obj).attr("coreAttrIds");
        var coreAttrIds = $("#itemSearchResultCon_"+productId).find(".bg_border").attr("coreAttrIds");

        var inshop=$("#shop_"+productId).val();
        var currProdInfo = $("#pdlink1_"+productId);
        var currProdTagInfo=$("#itemSearchResultCon_"+productId).find(".ico_abs");//角标
        var pminfoId = currProdInfo.attr("pmid");

        //自动打点
        var spmData=loli.spm.getData(obj);
        gotracker(2, "search_quick_view_"+productIndex, null, spmData);

        var tempUrl = currProdInfo.attr("href");   //商品链接
        var tempImg = currProdInfo.find("img").attr("src");
        if(typeof(tempImg)=="undefined" || tempImg==""){
            tempImg = currProdInfo.find("img").attr("original");
        }
        var imgSrc = tempImg.substring(0,tempImg.lastIndexOf("_"));
        tempImg = imgSrc + "_250*250.jpg";   //商品图片

        var promotion = $("#promotion_"+pminfoId).html();//商品促销信息
        var promotionUrl= $("#promotion_"+pminfoId).attr("href");
        var promotionTitle = $("#promotion_"+pminfoId).attr("title");
        if(promotion==null || typeof(promotion)=="undefined" || promotion==""){
            promotion = $("#promostyle_"+pminfoId).find(".tip").html();
            promotionTitle = $("#promostyle_"+pminfoId).find(".tip").attr("title");
        }
        var price = $("#price0_"+productId).html();   //商家价格
        var productName = $("#pdlink2_"+productId).attr("title");  //商品名称
        var merchantName = $("#merchant_"+productId).html();
        var merchantUrl = "";
        if(inshop==1){
            merchantUrl = $("#merchant_"+productId).attr("href");
        }
        var tagInfo = "";
        if (currProdTagInfo.children("span").length > 0 && currProdTagInfo.find("span:eq(0)").attr("class") != "tag_video"){
            tagInfo = currProdTagInfo.children("span").html();//角标信息
        }
        //核心导购属性
        var coreAttr = "";
        $("#beautiCare_tag_"+productId).find("a").each(function(){
            coreAttr = coreAttr + '<span class="tags">'+$(this).html()+'</span>';
        });
        var experienceCount = $("#pdlinkcomment_"+productId).attr("experienceCount");//评价数
        var positiveRate=$("#pdlinkcomment_"+productId).attr("positiveRate");//好评率

        //购买按钮
        var buyBtn = $("#shopping_act_"+productId);
        var buyNum=0;
        if(buyBtn !=null && typeof(buyBtn)!="undefined"){
            buyNum = buyBtn.attr("shoppingcount");
            if(buyNum==null || typeof(buyBtn)=="undefined" ){
                buyNum = 0;
            }
        }

        //数据填充
        var quickViewInfo = $("#quick_view_info");
        //图片填充
        quickViewInfo.find("#proImg a").attr("href",tempUrl);
        quickViewInfo.find("#proImg a").attr("onClick","addTrackPositionToCookie('1','pro_5010_"+ productIndex + "');");
        quickViewInfo.find("#proImg img").attr("src",tempImg);
        quickViewInfo.find("#proImg").parent().attr("data-tcd","PRODUCT."+pminfoId);

        //商品名称
        var nameStr = '<a href="'+tempUrl+'"  target="_blank">'+productName+'</a>';
        quickViewInfo.find("#proName").html(nameStr);
        quickViewInfo.find("#proName a").attr("onClick","addTrackPositionToCookie('1','pro_5010_"+ productIndex + "');");

        //价格
        price=price.replace(/i/g,"b");
        quickViewInfo.find("#proPrice em").html(price);

        //促销信息
        quickViewInfo.find("#item_promotion_text a").html(promotion);
        if(promotionUrl !=null && promotionUrl != "null" && promotionUrl !="" ){
            quickViewInfo.find("#item_promotion_text a").attr("href",promotionUrl);
        }else{
            quickViewInfo.find("#item_promotion_text a").removeAttr("href");
        }
        quickViewInfo.find("#item_promotion_text a").attr("title",promotionTitle);

        //商家信息
        if(merchantUrl==""){
            quickViewInfo.find("#storeName a").removeAttr("href");
        }else{
            quickViewInfo.find("#storeName a").attr("href",merchantUrl);
            quickViewInfo.find("#storeName a").attr("onClick","addTrackPositionToCookie('1','search_store_5010_"+productIndex+"');");
        }

        quickViewInfo.find("#storeName a").html(merchantName);

        //右侧顶部产品名及角标addToTraker
        var nameTagStr ="<em><a href='"+tempUrl+"' target='_blank'>"+productName+"</a></em>";
        if(tagInfo !=""){
            nameTagStr = nameTagStr+'<span class="hg">'+tagInfo+'</span>';
        }else{//大促角标
            if(currProdTagInfo.find(".sixdc").length>0){
                var tagImg = currProdTagInfo.find(".sixdc").attr("detailImgUrl");
                nameTagStr = nameTagStr+'<span class="dc"><img src="'+tagImg+'"></span>';
            }
        }
        quickViewInfo.find("#topTitle").html(nameTagStr);
        quickViewInfo.find("#topTitle a").attr("onClick","addTrackPositionToCookie('1','pro_5010_"+ productIndex + "');");
        quickViewInfo.find("#topTitle").parent().attr("data-tcd","PRODUCT."+pminfoId);

        //评价、好评率 、核心属性标签
        var attr="";
        if(experienceCount > 0){
            attr = '<span>'+experienceCount+'位用户评论</span>' +'<span class="good">'+positiveRate+'%好评</span>';
        }
        attr = attr+coreAttr;
        quickViewInfo.find("#bottom").html(attr);
        var productInfoValue = quickViewInfo.html();
        $("#quick_view_pop").html(productInfoValue);

        //加入购物车处理
        var serise=$("#serise_"+productId).val();//serise=2表示系列产品以子码格式展示
        var productType = $(obj).attr("productType");//商品类型
        //系列产品显示查看详情
        if(buyNum==0 || ((productType==1 || productType==2) &&  serise !=2)){
            $("#quick_view_pop").find("#addCart").attr("target","_blank")  ;
            $("#quick_view_pop").find("#addCart").attr("href",tempUrl);
            $("#quick_view_pop").find("#addCart").html("查看详情");
        }else{
            $("#quick_view_pop").find("#addCart").attr("href","javascript:void(0);");//,"javascript:void(0);"
            $("#quick_view_pop").find("#addCart").removeAttr("target");
            if(buyNum==1){
                $("#quick_view_pop").find("#addCart").html("加入购物车");
                $("#quick_view_pop").find("#addCart").attr("onClick",'addToCart(this,' +productId+',' +merchantId+',1, true, \'btn_'+productIndex+'\');gotracker('+pminfoId+',\'btn_'+productIndex+'\','+productId+');');
            }else{
                $("#quick_view_pop").find("#addCart").html(buyNum+"件起购");
                $("#quick_view_pop").find("#addCart").attr("onClick",'addToCart(this,' +productId+',' +merchantId+','+buyNum+', true, \'btn_'+productIndex+'\');gotracker('+pminfoId+',\'btn_'+productIndex+'\','+productId+');');
            }
        }


        //ajax请求加载数字化属性标签及搭配tu
        if(coreAttrIds==""||typeof (coreAttrIds) == "undefined"){
            coreAttrIds="0";
        }
        var ajaxUrl = URLPrefix.search +"/qv/c"+categoryId+"/b"+brandId+"-"+manageBrandId+"/mid"
            +merchantId+"/d"+inshop+"/a"+coreAttrIds+"/pid"+productId+"/p"+provinceId;
        var dataParm = "productId="+productId+"&merchantId="+merchantId+"&inshop="+inshop;

        searchQuickView.attrLable(dataParm,tempUrl, ajaxUrl,pminfoId);

    },

    //数字化属性标签
    attrLable:function(dataParm,productUrl,ajaxUrl,pminfoId){
        var url = URLPrefix.search +"/attrLabelAction.do?"+dataParm+"&callback=?";
        jQuery.getJSON(url, function(data){
            if(data==null || data.ERROR) {
                alert("ERROR = " + data.ERROR);
            }else{
                if(data.value !=null && data.value != "" ){
                    $("#search_beautiCare").find("#search_product_score").html(data.value);
                    $("#search_beautiCare").find("#search_product_score").attr("data-tcd","PRODUCT."+pminfoId);
                    $("#search_beautiCare").find("#search_product_score a").attr("href",productUrl);
                }
            }
        });
        searchQuickView.recommendProduct(ajaxUrl);
    },
    //搭配推荐
    recommendProduct:function(ajaxUrl){
        $.ajax({
            url : ajaxUrl,
            dataType : 'jsonp',
            jsonp : "callback",
            success : function(data) {
                if (data.ERROR)
                    alert("ERROR = " + data.ERROR);
                else{
                    if(data.value !=null && data.value != "" ){
                        $("#search_beautiCare #search_product_match").html(data.value);
                        var productIds = $("#search_beautiCare").find("#search_product_match #productIds").val();
                        //调用bs更新价格
                        searchQuickView.refreshPrice(productIds);
                    }
                }
            }
        });

    },

    //搭配推荐价格刷新
    refreshPrice:function(productIds){
        var busystcok = URLPrefix.busystock ? URLPrefix.busystock : "//gps.yhd.com";
        var url=busystcok + "/busystock/restful/truestock";
        var pids="";
        if(productIds!=null && productIds != ""){
            var pArray = productIds.split(",");
            for(var i=0;i<pArray.length;i++){
                pids = pids + "&productIds="+pArray[i];
            }
        }

        var param="?mcsite="+currSiteId + "&provinceId=" + jQuery.cookie("provinceId") + pids;
        if((typeof(secondAreaFlag)!="undefined" && secondAreaFlag==1)){
            param+="&cityId="+jQuery.cookie("cityId");
            var detailAdd=jQuery.cookie("detail_yhdareas");
            if(detailAdd!=null && "undefined"!=detailAdd){
                var detailAddArr=detailAdd.split('_');
                if(detailAddArr.length>=3 && detailAddArr[2]>0){
                    param+="&countyId="+detailAddArr[2];
                }
            }
        }
        jQuery.getJSON(url+param+"&callback=?",function(data){
            if(data && data.length > 0){
                var len=data.length;
                for (var i = 0; i < len; i++) {
                    var product = data[i];
                    if (product == null) return false; //不可见商品
                    if (product.productId == null) return false; //不可见商品
                    if (product.productStock == -1) return false; //未知
                    if (product.currentMerchantId == -1) return false; //未知
                    if (product.productPrice == -1) return false; //未知
                    var productId = product.productId;
                    var pmInfoId = product.pmId;
                    var priceSpan = $("#recPrice_"+productId)[0];
                    //价格刷新
                    if(product.productPrice > 0){
                        $(priceSpan).attr("yhdPrice",product.productPrice);
                        var strPrice = product.productPrice.toFixed(2);
                        var curP=strPrice.split(".");
                        //小数点后两位均为0
                        if(curP[1].search("^00$")!=-1){
                            priceSpan.innerHTML = "¥" + curP[0];
                        }
                        //小数点后只有一位有效数字
                        else if(curP[1].search("^[1-9]0$")!=-1){
                            priceSpan.innerHTML = "¥" + curP[0]+"<b>."+curP[1].substring(0,1)+"</b>";
                        }else{
                            priceSpan.innerHTML = "¥" + curP[0]+"<b>."+curP[1]+"</b>";
                        }
                    }else{
                        priceSpan.innerHTML = "";
                        $(priceSpan).attr("yhdPrice","");
                    }

                    //链接更新
                    if(pmInfoId>0){
                        var productDetailUrl = URLPrefix.IdcYhdDetailDomain + "/item/" + pmInfoId;
                        $("#recImg_"+productId).attr("href",productDetailUrl);
                        $("#recName_"+productId).attr("href",productDetailUrl);
                    }
                }
            }
        });
    }
};
/**入口曝光js
 * Created by dongrui on 2016/10/26.
 */
jQuery(document).ready(function () {
    var entry = $("#MYSEARCH_ENTRY");
    if (entry.length > 0) {
        require(["base_observer"], function (observer) {
            observer.fire('impressionEvent', entry);
        });
    }
});