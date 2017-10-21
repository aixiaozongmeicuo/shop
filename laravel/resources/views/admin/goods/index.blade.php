@extends('admin.public.father')
@section('content')
    <!-- TAB NAVIGATION -->
    <ul class="nav nav-tabs" role="tablist">
        <li class="active"><a href="/admin/goods">商品列表</a></li>
        <li><a href="/admin/goods/create">添加商品</a></li>
    </ul>
    <div class="panel panel-default">
        <div class="panel-body">
            <table class="table table-hover">
                <thead>
                <tr>
                    <th width="50">id</th>
                    <th>商品名称</th>
                    <th>商品价格</th>
                    <th>商品查看次数</th>
                    <th>商品图片</th>
                    <th>所属分类</th>
                    <th width="180">操作</th>
                </tr>
                </thead>
                <tbody>
                @foreach($goods as $v)
                    <tr>
                        <td>{{$v['id']}}</td>
                        <td>{{$v['gname']}}</td>
                        <td>{{$v['price']}}元</td>
                        <td>{{$v['numLook']}}</td>
                        <td><img src="{{$v['listImages']}}" alt="" style="width: 50px"></td>
                        <td>{{$v['category_id']}}</td>
                        <td>
                            <div class="btn-group btn-group-sm">
                                <a href="/admin/huopin/lists/{{$v['id']}}" class="btn btn-default">货品管理</a>
                                <a href="/admin/goods/{{$v['id']}}/edit" class="btn btn-default">编辑</a>
                                <a href="javascript:;" onclick="remove({{$v['id']}})" class="btn btn-default">删除</a>
                            </div>
                        </td>
                    </tr>
                @endforeach
                </tbody>
            </table>
            <script>
                function remove(id){
                    require(['hdjs'], function (hdjs) {
                        hdjs.confirm('确定删除吗?', function () {
                            $.ajax({
                                url:'/admin/goods/'+id,
                                method:'DELETE',
                                success:function (res) {
                                    if (res.valid){
                                        hdjs.message(res.message,'refresh','success');
                                    }
                                }
                            })
                        })
                    })
                }
            </script>
        </div>
    </div>

@endsection