@extends('admin.public.father')
@section('content')
    <!-- TAB NAVIGATION -->
    <ul class="nav nav-tabs" role="tablist">
        <li class="active"><a href="javascript:;">订单列表</a></li>
    </ul>
    <div class="panel panel-default">
        <div class="panel-body">
            <table class="table table-hover">
                <thead>
                <tr>
                    <th width="80">id</th>
                    <th>所属用户</th>
                    <th>订单号</th>
                    <th>订单状态</th>
                    <th width="120">操作</th>
                </tr>
                </thead>
                <tbody>
                @foreach($myorders as $v)
                <tr>
                    <td>{{$v['id']}}</td>
                    <td>{{$v['username']}}</td>
                    <td>{{$v['ordernumber']}}</td>
                    <td>{{$v['status_name']}}</td>
                    <td>
                        <div class="btn-group btn-group-sm">
                            <a href="/index/orderdetail/{{$v['ordernumber']}}" class="btn btn-default">查看订单详情</a>

                        </div>
                    </td>
                </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>

@endsection