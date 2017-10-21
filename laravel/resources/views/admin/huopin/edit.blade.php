@extends('admin.public.father')
@section('content')
    <!-- TAB NAVIGATION -->
    <ul class="nav nav-tabs" role="tablist">
        <li><a href="/admin/huopin/lists/{{$gid}}">货品列表</a></li>
        <li class="active"><a href="/admin/huopin/create/{{$gid}}">添加属性</a></li>
    </ul>
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">编辑属性</h3>
        </div>
        <div class="panel-body">
            <form action="/admin/huopin/update/{{$id}}" method="post" class="form-horizontal" role="form">
                {{csrf_field()}}
                @foreach($attrs as $v)
                    <div class="form-group">
                        <label class="col-sm-2 control-label">{{$v['aname']}}:</label>
                        <div class="col-sm-10" >
                            <select name="zuhe[]" id="inputATTR" class="form-control">
                                <option value="0">请选择属性</option>
                                @foreach($v['sonAttrs'] as $vv)
                                    <option value="{{$vv['id']}}" {{in_array($vv['id'],$zuhe)?"selected":""}}>{{$vv['aname']}}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>.
                @endforeach
                <div class="form-group">
                    <label class="col-sm-2 control-label">库存数量:</label>
                    <div class="col-sm-10">
                        <input type="text" name="kucun" class="form-control" value="{{$model['kucun']}}">
                        <input type="hidden" name="gid" value="{{$gid}}">
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-10 col-sm-offset-2">
                        <button type="submit" class="btn btn-primary">提交</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <script>
        //        $(function () {
        //            $('#inputATTR').change(function () {
        //                if($(this).val() == 0){
        //                    $("#category").show();
        //                }else{
        //                    $("#category").hide();
        //                }
        //            })
        //        })
    </script>
@endsection