<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <title>laravelVideo视频管理</title>
    <meta name="csrf-token" content="67b3440b78219e1f96830264c1e183ca">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon"/>

    <script src="/node_modules/hdjs/dist/static/requirejs/require.js?version=v2.0.91"></script>
    <script src="/node_modules/hdjs/dist/static/requirejs/config.js?version=v2.0.91"></script>
    <link href="/css/hdcms.css" rel="stylesheet">
    <script>
        require(['hdjs'], function () {
            //为异步请求设置CSRF令牌
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
        })
    </script>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
</head>
<body class="hdcms-login">
<div class="container logo">
    <div style="background: url('/images/logo.png') no-repeat; background-size: contain;height: 60px;"></div>
</div>
<div class="container well">
    <div class="row ">
        <div class="col-md-6">
            <form method="post">
                {{ csrf_field() }}
                <div class="form-group ">
                    <label>帐号</label>
                    <div class="input-group">
                        <div class="input-group-addon"><i class="fa fa-w fa-user"></i></div>
                        <input type="text" name="username" class="form-control input-lg" placeholder="请输入帐号" value="">
                    </div>
                </div>
                <div class="form-group ">
                    <label>密码</label>
                    <div class="input-group">
                        <div class="input-group-addon"><i class="fa fa-w fa-key"></i></div>
                        <input type="password" name="password" class="form-control input-lg" placeholder="请输入密码"
                               value="">
                    </div>
                </div>
                @if(session('error'))
                    <div class="alert alert-danger">
                        {{session('error')}}
                    </div>
                @endif
                <button class="btn btn-primary btn-lg">登录</button>
            </form>
        </div>
        <div class="col-md-6">
            <div style="background: url('http://www.houdunwang.com/resource/images/houdunwang.jpg');background-size:100% ;height:230px;"></div>
        </div>
    </div>
    <div class="copyright">
        Powered by hdcms v2.0 © 2014-2019 www.hdcms.com
    </div>
</div>
</body>
</html>