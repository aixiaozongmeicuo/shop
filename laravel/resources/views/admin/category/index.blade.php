@extends('admin.public.father')

@section('content')
    <!-- TAB NAVIGATION -->
    <ul class="nav nav-tabs" role="tablist">
        <li class="active"><a href="javascript:;">分类列表</a></li>
        <li><a href="/admin/category/create">添加分类</a></li>
    </ul>
    <table class="table table-hover">
        <thead>
        <tr>
            <th>ID</th>
            <th>分类名称</th>
            <th>分类图片</th>
            <th>父级分类</th>
            <th>操作</th>
        </tr>
        </thead>
        <tbody>
       @foreach($categorys as $v)
            <tr>
                <td>{{$v['id']}}</td>
                <td>{{$v['_cname']}}</td>
                <td><img src="{{$v['thumb']}}" style="width: 40px;height: 40px"></td>
                <td>{{$v['pid']}}</td>
                <td>
                    <div class="btn-group">
                        <a href="/admin/category/{{$v['id']}}/edit" class="btn btn-default">编辑</a>
                        <a href="javascript:;" onclick="remove({{$v['id']}})" class="btn btn-default">删除</a>
                    </div>
                </td>
            </tr>
       @endforeach
        </tbody>
            <script>
            function remove(id){
                require(['hdjs'], function (hdjs) {
                    hdjs.confirm('确定删除该分类吗?', function () {
                        $.ajax({
                            url:'/admin/category/'+id,
                            method:'DELETE',
                            success:function (res) {
                                if (res.valid){
                                    hdjs.message(res.message,'refresh','success');
                                }else{
                                    hdjs.message(res.message,'refresh','error');
                                }

                            }
                        })
                    })
                })

            }
        </script>
    </table>
    {{--{{ $datas->links() }}--}}
@endsection