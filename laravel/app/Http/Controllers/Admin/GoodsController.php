<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\GoodsRequest;
use App\Model\Attr;
use App\Model\Category;
use App\Model\Goods;
use Request;
use App\Http\Controllers\Controller;

class GoodsController extends CommonController
{
   //商品列表
    public function index()
    {
        //获得所有商品信息
        $goods = Goods::get();
        return view("admin.goods.index",compact("goods"));
    }

    //展示添加商品页面
    public function create(Goods $goods)
    {
        //获得所最低级分类数据
        $facategory = $goods->getCategory();
        return view("admin.goods.create",compact("categorys","facategory"));
    }

//    添加商品
    public function store(GoodsRequest $request)
    {
        $data = Request::all();
        $data['attribute_id'] = implode(',',$data['attribute_id']);
        Goods::create($data);
//        flash("添加成功")->overlay();
        return redirect("/admin/goods");
    }


//    展示编辑页面
    public function edit($id)
    {
        //获得所最低级分类数据
        $goods =new Goods();
        $facategory = $goods->getCategory();
        //获得对应序号的数据
        $model = Goods::find($id);
        return view("admin.goods.edit",compact("facategory","model"));
    }

//    修改商品
    public function update(GoodsRequest $request, $id)
    {
        //获得对应序号的数据
        $model = Goods::find($id);
        $model->category_id =Request::input("category_id");
        $model->gname =Request::input("gname");
        $model->price =Request::input("price");
        $model->numlook =Request::input("numlook");
        $model->listImages =Request::input("listImages");
        $model->photos =Request::input("photos");
        $model->details =Request::input("details");
        $model->attribute_id =implode(',',Request::input("attribute_id"));
//        dd($model);
        $model ->save();
        flash("修改成功")->overlay();
        return redirect("/admin/goods");
    }

//    删除商品
    public function destroy($id)
    {
        //通过id直接删除对应的数据
        Goods::destroy($id);
        return response()->json(['valid'=>1,"message"=>"删除成功"]);
    }


    //获得对应分类下的属性数据
    public function getCategoryAttrs($cid){
        //获得所有属性数据
        $allAttrs = Attr::get()->toArray();
        //获得转换gid字段后的数组
        $newAttrs = [];
        foreach ($allAttrs as $v){
            $newAttrs[$v['id']] = explode(',',$v['gid']);
        }
        //循环判断分类的cid是否在该数组中
        $ids =[];
        foreach ($newAttrs as $k=>$v){
            if (in_array($cid,$v)){
                $ids[]=$k;
            }
        }
        //获得属性是顶级分类的数据
        $categoryAttrs = Attr::whereIn('id',$ids)->where("pid",0)->get();
        return response()->json(["valid"=>1,"data"=>$categoryAttrs]);
    }

}
