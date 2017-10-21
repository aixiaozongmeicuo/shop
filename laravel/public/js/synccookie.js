(function () {
    SyncCookie = function () {
        this.init()
    };
    SyncCookie.prototype = {
        init: function () {
            this.jsonpID = 2000
        }, getService: function (c) {
            var d = this;
            var e = null;
            var b = {
                url: "//mapi.m.jd.com/synccookie/siteList.action",
                method: "post",
                async: false,
                timeout: 1000,
                data: "_format_=json&c=" + c,
                error: function () {
                },
                success: function (h) {
                    e = JSON.parse(h);
                    if (e.sign) {
                        d.sign = e.sign
                    }
                    if (e && e.auth && e.auth.length > 0) {
                        var g = e.auth;
                        for (var f = 0; f < g.length; f++) {
                            if (g[f]) {
                                d.ajaxJsonp({
                                    url: "//mapi.m.jd.com/synccookie/jump.action?url=" + g[f] + "&sign=" + d.sign,
                                    callback: function (i) {
                                    }
                                })
                            }
                        }
                    }
                }
            };
            d.ajax(b)
        }, getCookie: function (c) {
            var b, d = new RegExp("(^| )" + c + "=([^;]*)(;|$)");
            b = document.cookie.match(d);
            if (b) {
                return unescape(b[2])
            } else {
                return null
            }
        }, ajaxJsonp: function (c) {
            var e = this;
            var f = "MAuthentication" + (++e.jsonpID);
            var b = document.createElement("script");
            var d = function () {
                e.removeElement(b);
                delete window[f]
            };
            var g = function () {
                d()
            };
            window[f] = function (h) {
                c.callback.call(e, h);
                d()
            };
            b.onerror = function () {
                g()
            };
            b.onload = function () {
                g()
            };
            b.src = c.url + "&callbackName=" + f;
            document.getElementsByTagName("head")[0].appendChild(b)
        }, removeElement: function (c) {
            var b = c.parentNode;
            if (b) {
                b.removeChild(c)
            }
        }, ajax: function (c) {
            var b;
            try {
                b = new ActiveXObject("Msxml2.XMLHTTP")
            } catch (f) {
                try {
                    b = new ActiveXObject("Microsoft.XMLHTTP")
                } catch (f) {
                    b = new XMLHttpRequest()
                }
            }
            b.ajaxRunError = true;
            try {
                b.withCredentials = true
            } catch (f) {
            }
            try {
                b.open(c.method, c.url, c.async);
                if (c.timeout) {
                    var d = c.source ? c.source : null;
                    setTimeout(function () {
                        if (b.ajaxRunError) {
                            b.onreadystatechange = function () {
                            };
                            b.abort();
                            c.error.call(d)
                        }
                    }, c.timeout)
                }
                b.onreadystatechange = function () {
                    var g = c.source ? c.source : null;
                    if (b.readyState == 4) {
                        if (b.status == 200) {
                            b.ajaxRunError = false;
                            var e = b.responseText;
                            c.success.call(g, e)
                        } else {
                            if (c.error) {
                                c.error.call(g)
                            }
                        }
                    }
                };
                if (c.method == "GET" || c.method == "get") {
                    b.send(null)
                } else {
                    if (c.method == "POST" || c.method == "post") {
                        b.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                        b.send(c.data)
                    }
                }
            } catch (f) {
            }
        }
    };
    var a = new SyncCookie();
    window.synccookie = {
        dosync: function () {
            a.getService.apply(a, arguments)
        }
    }
})();