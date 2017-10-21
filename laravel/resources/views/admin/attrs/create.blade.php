@extends('admin.public.father')
@section('content')
    <!-- TAB NAVIGATION -->
    <ul class="nav nav-tabs" role="tablist">
        <li><a href="/admin/attr">属性列表</a></li>
        <li class="active"><a href="/admin/attr/create">添加属性</a></li>
    </ul>
    <div class="panel panel-default">
        <div class="panel-body">
            <form action="/admin/attr" method="post" class="form-horizontal" role="form">
                {{csrf_field()}}
                <div class="form-group">
                    <label class="col-sm-2 control-label">父级属性:</label>
                    <div class="col-sm-10" >
                        <select name="pid" id="inputATTR" class="form-control">
                            <option value="0" selected="selected">顶级属性</option>
                            @foreach($attrs as $v)
                            <option value="{{$v['id']}}">{{$v['aname']}}</option>
                                @endforeach
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">属性名称:</label>
                    <div class="col-sm-10">
                        <input type="text" name="aname" class="form-control" value="">
                    </div>
                </div>
                <div class="form-group" id="category">
                    <label class="col-sm-2 control-label">所属分类:</label>
                    <div class="col-sm-10">
                        @foreach($facategory as $v)
                            <label class="checkbox-inline">
                                <input type="checkbox" name="gid[]" value="{{$v['id']}}"> {{$v['cname']}}
                            </label>
                        @endforeach
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
        $(function () {
            $("#inputATTR").change(function () {
                if ($(this).val() ==0){

                    $("#category").show();
                }else {
                    $("#category").hide();
                }
            })
        })
    </script>
@endsection