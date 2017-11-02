<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\AttrRequest;
use App\Model\Attr;
use App\Model\Category;
use houdunwang\arr\Arr;
use Request;
use App\Http\Controllers\Controller;

class AttrController extends CommonController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //获得所有商品属性数据
        $data = Attr::get()->toarray();
        $attrs  =Arr::tree($data, "aname", 'id',  'pid');
        return view("admin.attrs.lists",compact("attrs"));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Attr $attr)
    {
        //获得最底层的分类id数组
        $threeCategory = $attr->threeCategory();
        //获得所有三级分类的数据
        $facategory = Category::whereIn('id',$threeCategory)->get();
//        dd($facategory);
        //获得所有商品顶级属性数据
        $attrs = Attr::where("pid",0)->get();
        return view("admin.attrs.create",compact("facategory","attrs"));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(AttrRequest $request)
    {
        //获得全部提交数据
       $data = Request::all();
       //重组gid字段
        $data['gid'] =isset($data['gid'])?implode(",",$data['gid']):"";
       //保存数据
       Attr::create($data);
       flash('添加成功')->overlay();
       return redirect("/admin/attr");
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //获得所有商品顶级属性数据
        $attrs = Attr::where("pid",0)->get();
        //获得对应序号的数据
        $model = Attr::find($id);
        //把gid字段转换成数组
        $gids = explode(",",$model['gid']);
        $attr = new Attr();
        //获得最底层的分类id数组
        $threeCategory = $attr->threeCategory();
        //获得所有三级分类的数据
        $facategory = Category::whereIn('id',$threeCategory)->get();
        return view("admin.attrs.edit",compact("attrs","model","facategory","gids"));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(AttrRequest $request, $id)
    {
        //分别获得提交的数据
        $model = Attr::find($id);
        $model->pid=Request::input("pid");
        $model->aname=Request::input("aname");
        if (isset(Request::all()['gid'])){
            //重组gid字段
            $model->gid=implode(",",Request::input("gid"));
        }else{
            $model["gid"]="";
        }
        $model->save();
        flash("修改成功")->overlay();
        return redirect("/admin/attr");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = Attr::where("pid",$id)->get()->toArray();
        if ($data){
            return response()->json(['valid'=>0,'message'=>'请先删除该分类的子集']);
        }
        //通过获得id直接删除该条数据
        Attr::destroy($id);
        return response()->json(["valid"=>1,"message"=>"删除成功"]);
    }
}
