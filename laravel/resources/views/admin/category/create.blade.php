@extends('admin.public.father')
@section('content')
<div class="panel panel-default">
    <ul class="nav nav-tabs" role="tablist">
        <li ><a href="/admin/category">分类列表</a></li>
        <li class="active"><a href="javascript:;">添加分类</a></li>
    </ul>
    <div class="panel-body" >
        <form action="/admin/category" method="post" class="form-horizontal" role="form">
            {{ csrf_field() }}
            <div class="form-group">
                <label for="" class="col-sm-2 control-label">父级分类:</label>
                <div class="col-sm-10">
                    <select name="pid" class="form-control" >
                        <option value="0">顶级分类</option>
                        @foreach($categorys as $v)
                            <option value="{{$v['id']}}" >{{$v['_cname']}}</option>
                        @endforeach
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label for="" class="col-sm-2 control-label">分类名称:</label>
                <div class="col-sm-10">
                    <input type="text" name="cname" class="form-control" value="">
                </div>
            </div>
            <div class="form-group">
                <label for="" class="col-sm-2 control-label">分类描述:</label>
                <div class="col-sm-10">
                    <input type="text" name="description" class="form-control" value="">
                </div>
            </div>
            <div class="form-group">
                <label for="" class="col-sm-2 control-label">分类图册</label>
                {{--图片上传--}}
                <div class="col-sm-10">
                    <div class="input-group">
                        <input class="form-control" name="thumb" readonly="" value="">
                        <div class="input-group-btn">
                            <button onclick="upImage(this)" class="btn btn-default" type="button">选择图片</button>

                        </div>
                    </div>
                    <div class="input-group" style="margin-top:5px;">
                        <img src="/images/nopic.jpg" class="img-responsive img-thumbnail" width="150">
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
                                $("[name='thumb']").val(images[0]);
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
            <div class="form-group">
                <div class="col-sm-10 col-sm-offset-2">
                    <button type="submit" class="btn btn-primary">保存数据</button>
                </div>
            </div>
        </form>
    </div>
</div>

@endsection