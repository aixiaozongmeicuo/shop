<?php

namespace App\Http\Controllers\Admin;

use App\Model\Attr;
use App\Model\Goods;
use App\Model\Huopin;
use Request;
use App\Http\Controllers\Controller;

class HuopinController extends CommonController
{
    //货品列表页
    public function lists($gid){
        //获得所有货品数据
        $huopins = Huopin::where("gid",$gid)->get();
        return view("admin.huopin.lists",compact("huopins","gid"));
    }

    //添加货品页面
    public function create($gid){
        //获得对应序号商品的数据
        $goods = Goods::find($gid);
        if ($goods['attribute_id']){
            //获得对应商品下的属性id
            $attrIds =explode(',',$goods['attribute_id']);
            foreach ($attrIds as $v){
                //获得对应id的顶级属性数据
                $attrs[]=Attr::find($v)->toArray();
            }
            foreach ($attrs as $k=>$v){
                //获得主键是$v对应下的子类数据
                $attrs[$k]['sonAttrs'] = Attr::where('pid',$v['id'])->get()->toArray();
            }
        }else{
            $attrs="";
        }

        return view("admin.huopin.create",compact("gid","attrs"));
    }

    //处理添加货品信息的方法
    public function store(){
        //获得所有提交的信息
        $data = Request::all();
        //获得所有非顶级属性
        $Attrs = Attr::get()->toArray();
//        dd($Attrs);
        $name=[];
        foreach ($Attrs as $v){
            if (in_array($v['id'],$data['zuhe'])){
                $name[]=$v['aname'];
            }
        }
        $data['shuxing'] =implode('/',$name);
        $data['zuhe'] = implode(',',$data['zuhe']);
        Huopin::create($data);
//        flash("添加成功")->overlay();
        return redirect("/admin/huopin/create/{$data['gid']}");
    }

    //展示编辑页面
    public function edit($id,$gid){

        //获得对应序号商品的数据
        $goods = Goods::find($gid);
        //获得对应商品下的属性id
        $attrIds =explode(',',$goods['attribute_id']);
        foreach ($attrIds as $v){
            //获得对应id的顶级属性数据
            $attrs[]=Attr::find($v)->toArray();
        }
        foreach ($attrs as $k=>$v){
            //获得主键是$v对应下的子类数据
            $attrs[$k]['sonAttrs'] = Attr::where('pid',$v['id'])->get()->toArray();
        }
        //获得对应序号的旧数据
        $model = Huopin::find($id);
        $zuhe=explode(',',$model['zuhe']);
        return view("admin/huopin/edit",compact("attrs","id","gid","model","zuhe"));
    }

    //修改数据
    public function update($id){
        $data =Request::all();
        //获得所有非顶级属性
        $Attrs = Attr::get()->toArray();
        $name=[];
        foreach ($Attrs as $v){
            if (in_array($v['id'],$data['zuhe'])){
                $name[]=$v['aname'];
            }
        }
        $data['shuxing'] =implode('/',$name);
        $data['zuhe'] = implode(',',$data['zuhe']);
        //获得编辑数据模型
        $model =Huopin::find($id);
        $model->zuhe = $data['zuhe'];
        $model->shuxing = $data['shuxing'];
        $model->kucun = $data['kucun'];
        $model->gid = $data['gid'];
        $model->save();
        flash("修改成功")->overlay();
        return redirect("/admin/huopin/lists/{$data['gid']}");
    }

    //删除对应序号货品数据
    public function delete($id){
        Huopin::destroy($id);
        return response()->json(['valid'=>1,"message"=>"删除成功"]);
    }
}
