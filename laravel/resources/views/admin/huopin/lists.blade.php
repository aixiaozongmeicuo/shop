@extends('admin.public.father')
@section('content')
    <!-- TAB NAVIGATION -->
    <ul class="nav nav-tabs" role="tablist">
        <li class="active"><a href="javascript:;">货品列表</a></li>
        <li><a href="/admin/huopin/create/{{$gid}}">添加货品</a></li>
    </ul>
    <div class="panel panel-default">
        <div class="panel-body">
            <table class="table table-hover">
                <thead>
                <tr>
                    <th width="80">id</th>
                    <th>属性组合</th>
                    <th>库存数量</th>
                    <th>所属商品</th>
                    <th width="120">操作</th>
                </tr>
                </thead>
                <tbody>
                @foreach($huopins as $v)
                <tr>
                    <td>{{$v['id']}}</td>
                    <td>{{$v['shuxing']}}</td>
                    <td>{{$v['kucun']}}</td>
                    <td>{{$v['gid']}}</td>
                    <td>
                        <div class="btn-group btn-group-sm">
                            <a href="/admin/huopin/edit/{{$v['id']}}/{{$v['gid']}}" class="btn btn-default">编辑</a>
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
                                url:'/admin/huopin/delete/'+id,
                                method:'get',
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