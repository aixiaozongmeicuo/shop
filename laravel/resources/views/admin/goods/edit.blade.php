@extends('admin.public.father')
@section('content')
    <div class="panel panel-default">
        <ul class="nav nav-tabs" role="tablist">
            <li><a href="/admin/goods">分类列表</a></li>
            <li class="active"><a href="javacript:;">添加分类</a></li>
        </ul>
        <div class="panel-body">
            <form action="/admin/goods/{{$model['id']}}" method="post" class="form-horizontal" role="form">
                {{ csrf_field() }}
                {{ method_field('PUT') }}
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">所属分类:</label>
                    <div class="col-sm-10">
                        <select name="category_id" class="form-control" id="category">
                            <option value="">分类列表</option>
                            @foreach($facategory as $v)
                                <option value="{{$v['id']}}" {{$model['category_id']==$v['id']?"selected":""}}>{{$v['cname']}}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
                <div class="form-group" id="attrs" style="display: none">
                    <label for="" class="col-sm-2 control-label">可选属性:</label>
                    <div class="col-sm-10">
                        <div class="checkbox" id="spshuxing">
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">商品名称:</label>
                    <div class="col-sm-10">
                        <input type="text" name="gname" class="form-control" value="{{$model['gname']}}">
                    </div>
                </div>
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">商品价格:</label>
                    <div class="col-sm-10">
                        <input type="text" name="price" class="form-control" value="{{$model['price']}}">
                    </div>
                </div>
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">查看次数:</label>
                    <div class="col-sm-10">
                        <input type="text" name="numLook" class="form-control" value="{{$model['numLook']}}">
                    </div>
                </div>
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">列表图册</label>
                    {{--图片上传--}}
                    <div class="col-sm-10">
                        <div class="input-group">
                            <input class="form-control" name="listImages" readonly="" value="{{$model['listImages']}}">
                            <div class="input-group-btn">
                                <button onclick="upImage(this)" class="btn btn-default" type="button">选择图片</button>
                            </div>
                        </div>
                        <div class="input-group" style="margin-top:5px;">
                            <img src="{{$model['listImages']}}?:/images/nopic.jpg" class="img-responsive img-thumbnail" width="150">
                            <em class="close" style="position:absolute; top: 0px; right: -14px;" title="删除这张图片"
                                onclick="removeImg(this)">×</em>
                        </div>
                    </div>
                    <script>
                        require(['hdjs']);
                        //上传图片
                        function upImage() {
                            require(['hdjs'], function (hdjs) {
                                options = {
                                    multiple: false,//是否允许多图上传
                                    //data是向后台服务器提交的POST数据
                                    data: {name: '后盾人', year: 2099},
                                };
                                hdjs.image(function (images) {
                                    //上传成功的图片，数组类型
                                    $("[name='listImages']").val(images[0]);
                                    $(".img-thumbnail").attr('src', images[0]);
                                }, options)
                            });
                        }
                        //移除图片
                        function removeImg(obj) {
                            $(obj).prev('img').attr('src','/node_modules/hdjs/dist/static/image/nopic.jpg');
                            $(obj).parent().prev().find('input').val('');
                        }
                    </script>
                </div>
                <style>
                    #box img {
                        width: 200px;
                        float: left;
                        margin-right: 10px;
                        border: solid 1px #999;
                        padding: 10px;
                        height: 200px;
                    }
                </style>
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">详情图册</label>
                    {{--图片上传--}}
                    <div class="col-sm-10">
                        <div class="input-group">
                            <div class="input-group-btn">
                                <button onclick="upImage2(this)" class="btn btn-default" type="button">选择图片</button>
                                <button onclick="delAllImage()" class="btn btn-default" type="button">删除所有图片</button>
                            </div>
                        </div>
                        <div id="box">
                            <input type="text" hidden name="photos" id="photos" value="{{$model['photos']}}">
                        </div>
                    </div>
                    <script>
                        //删除所有图片方法
                        function delAllImage() {
                            $("#photos").val("") ;
                            $(".image").remove();
                        }

                        $(function () {
                            //展示单条数据所有图片
                            var pics = $("#photos").val().split('|');
//                            console.log(pics)
                            $(pics).each(function (k, v) {
//                                alert()
                                    $("<img src='" + v + "' class='image'/>").appendTo('#box');
                            })
                        })
                    </script>
                    <script>
                        require(['hdjs']);
                        //上传图片
                        function upImage2(obj) {
                            var photos = $("#photos").val()
                            require(['hdjs'], function (hdjs) {
                                hdjs.image(function (images) {
                                    $(images).each(function (k, v) {
                                        photos +=  v + '|' ,
                                            $("<img src='" + v + "' class='image'/>").appendTo('#box');
                                    })
                                    photos = photos.substring(0,photos.length - 1);
                                    $('#photos').val(photos);
                                }, {
                                    //上传多图
                                    multiple: true,
                                })
                            });
                        }
                    </script>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">商品详情</label>

                    <div class="col-sm-10">
                        <div id="app">
                            <textarea id="container" style="height:300px;width:100%;" name="details">{{$model['details']}}</textarea>
                        </div>
                        <script>
                            require(['hdjs'], function (hdjs) {
                                var ueditor =  hdjs.ueditor('container', {hash: 2, data: 'hd'}, function (editor) {
                                });
                            })
                        </script>
                    </div>
                </div>
                <div style="width: 10px;height: 20px;" id="attribute_id">{{$model['attribute_id']}}</div>
                <div class="form-group">
                    <div class="col-sm-10 col-sm-offset-2">
                        <button type="submit" class="btn btn-primary">保存数据</button>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <script>
        $(function () {
            //页面加载时判断
            if($("#category").val() != ""){
                //获得对应分类的id
                var cid =$("#category").val();
                var aids =$("#attribute_id").html();
//                alert(id);
                //发送异步
                $.ajax({
                    url:'/admin/getCategoryAttrs/'+cid,
                    method:'get',
                    dataType:'json',
                    success:function (res) {
//                        console.log(res);
                        var html = '';
                        if (res.valid){
                            $(res.data).each(function (k, v) {
                                //把gid字段转换成数组
                                var aidsarr =aids.split(',');
//                                console.log(aidsarr)
                                var aa =$.inArray(String(v['id']),aidsarr);
//                                console.log(aa)
                                if (aa>=0){
                                    html += '<label class="checkbox-inline"><input type="checkbox" name="attribute_id[]" value="'+v.id+'" checked="checked">'+v.aname+'</label>';
                                }else{
                                    html += '<label class="checkbox-inline"><input type="checkbox" name="attribute_id[]" value="'+v.id+'">'+v.aname+'</label>';
                                }
                            })
                            $('#spshuxing').html(html);
                        }
                    }
                })
                $("#attrs").css("display","block");
            }else{
                $("#attrs").css("display","none");
            }

//            选择改变时判断
            $("#category").change(function () {
                if ($(this).val() != ''){
                    //获得对应分类下的属性数据
                    //获得对应分类的id
                    var cid =$(this).val();
                    //发送异步
                    $.ajax({
                        url:'/admin/getCategoryAttrs/'+cid,
                        method:'get',
                        dataType:'json',
                        success:function (res) {
//                            console.log(res);
                            var html = '';
                            if (res.valid){
                                $(res.data).each(function (k, v) {
                                    html += '<label class="checkbox-inline"><input type="checkbox" name="attribute_id[]" value="'+v.id+'">'+v.aname+'</label>';
                                })
                                $('#spshuxing').html(html);
                            }
                        }
                    })


                    $("#attrs").css("display","block");
                }else {
                    $("#attrs").css("display","none");
                }


            })



        })
    </script>
@endsection