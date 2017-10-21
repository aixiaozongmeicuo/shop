<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\CategoryRequest;
use App\Model\Attr;
use App\Model\Category;
use houdunwang\arr\Arr;
use Request;
use App\Http\Controllers\Controller;

class CategoryController extends CommonController
{
    //展示首页
    public function index()
    {
        //获得分类所有数据
//        $datas = Category::paginate(10);
        $data = Category::get()->toArray();
        $categorys  =Arr::tree($data, "cname", 'id',  'pid');
        return view("admin.category.index",compact("categorys"));
    }

    /**
     * Show the form for creating a new resource.
     *展示添加页面
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //获得所有一级和二级分类的数据
        $attrs =new Attr();
        $threeCategory =$attrs->threeCategory();
        $data = Category::whereNotIn('id',$threeCategory)->get()->toArray();
        $categorys  =Arr::tree($data, "cname", 'id',  'pid');
        return view("admin.category.create",compact("categorys"));
    }

    /**
     * Store a newly created resource in storage.
     *保存数据
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CategoryRequest $categoryRequest)
    {
        //获得提交的数据
        $data = Request::all();
        //保存数据
        Category::create($data);
        flash('添加成功')->overlay();
        return redirect("/admin/category");
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
     *展示编辑页面
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $attrs =new Attr();
        //获得一级分类主键id数组
        $oneCategory = $attrs->oneCategory();
        //获得二级分类主键id数组
        $secondCategory = $attrs->secondCategory();
        //获得三级分类主键id数组
        $threeCategory = $attrs->threeCategory();
        if (in_array($id,$oneCategory)){
            $data ="";
        }elseif (in_array($id,$secondCategory)){
            $data = Category::whereIn("id",$oneCategory)->get()->toArray();
        }elseif (in_array($id,$threeCategory)){
            $data = Category::whereNotIn("id",$threeCategory)->get()->toArray();
        }
        $categorys  =Arr::tree($data, "cname", 'id',  'pid');
        //获得对应序号的数据
        $model = Category::find($id);
        return view("admin.category.edit",compact("categorys","model"));
    }

    /**
     * Update the specified resource in storage.
     *修改数据
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(CategoryRequest $categoryRequest, $id)
    {
        //获得数据模型
        $model = Category::find($id);
        $model->cname =Request::input("cname");
        $model->pid =Request::input("pid");
        $model->thumb =Request::input("thumb");
        $model->description =Request::input("description");
        $model->save();
        flash('修改成功')->overlay();
        return redirect("/admin/category");
    }

    /**
     * Remove the specified resource from storage.
     *删除对应序号的数据
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = Category::where("pid",$id)->get()->toArray();
        if ($data){
            return response()->json(['valid'=>0,'message'=>'请先删除该分类的子集分类']);
        }
        Category::destroy($id);
        return response()->json(['valid'=>1,'message'=>'删除成功']);
    }
}
