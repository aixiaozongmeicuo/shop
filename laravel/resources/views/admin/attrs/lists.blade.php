@extends('admin.public.father')
@section('content')
    <!-- TAB NAVIGATION -->
    <ul class="nav nav-tabs" role="tablist">
        <li class="active"><a href="/admin/attr">属性列表</a></li>
        <li><a href="/admin/attr/create">添加属性</a></li>
    </ul>
    <div class="panel panel-default">
        <div class="panel-body">
            <table class="table table-hover">
                <thead>
                <tr>
                    <th width="80">id</th>
                    <th>属性名称</th>
                    <th>所属父级属性</th>
                    <th width="120">操作</th>
                </tr>
                </thead>
                <tbody>
                @foreach($attrs as $v)
                <tr>
                    <td>{{$v['id']}}</td>
                    <td>{{$v['_aname']}}</td>
                    <td>{{$v['pid']}}</td>
                    <td>
                        <div class="btn-group btn-group-sm">
                            <a href="/admin/attr/{{$v['id']}}/edit" class="btn btn-default">编辑</a>
                            <a href="javascript:;" onclick="remove({{$v['id']}})" class="btn btn-default">删除</a>
                        </div>
                    </td>
                </tr>
                    @endforeach
                </tbody>
            </table>
            <script>
                function remove(id){
//                    alert(id)
                    require(['hdjs'], function (hdjs) {
                        hdjs.confirm('确定删除吗?', function () {
                            $.ajax({
                                url:'/admin/attr/'+id,
                                method:'DELETE',
                                success:function (res) {
                                    console.log(res)
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
        </div>
    </div>

@endsection