<?php

namespace App\Http\Controllers\Index;

use App\Model\Attr;
use App\Model\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class EntryController extends Controller
{
//    加载前台首页
    public function index(){
        //获得所有一级分类数据
        $attr =new Attr();
        //获得所有一级分类主键id数组
        $oneIds = $attr->oneCategory();
        foreach ($oneIds as $v){
            $oneCategory[]=Category::find($v)->toArray();
            foreach ($oneCategory as $k=>$v){
                $oneCategory[$k]['secondCategory'] = Category::where("pid",$v['id'])->get()->toArray();
                foreach ($oneCategory[$k]['secondCategory'] as $kk=>$vv){
                    $oneCategory[$k]['secondCategory'][$kk]['threeCategory'] =Category::where("pid",$vv['id'])->get()->toArray();
                }
            }
        }

        //获得国产食品部分的分类数据
       $title = Category::where("pid",0)->where("cname","国产食品")->get()->toArray();
        foreach ($title as $v){
            $gcmodel =$v;
        }
        //国产食品的子集分类数据
        $childgc = Category::where("pid",$gcmodel['id'])->get();
        //左侧循环的三条数据
        $threechildgc = Category::where("pid",$gcmodel['id'])->limit(3)->get();


        //一号生鲜部分数据



        //服饰鞋包部分数据
        $fushi = Category::where("pid",0)->where("cname","服饰鞋包")->get()->toArray();
        foreach ($fushi as $v){
            $fxmodel =$v;
        }
        $childfx = Category::where("pid",$fxmodel['id'])->get();
        //左侧循环的三条数据
        $threechildfx = Category::where("pid",$fxmodel['id'])->limit(3)->get();


        //手机家电部分数据
        $shouji = Category::where("pid",0)->where("cname","手机家电")->get()->toArray();
        foreach ($shouji as $v){
            $phonemodel =$v;
        }
        $childphone = Category::where("pid",$phonemodel['id'])->get();
        //左侧循环的三条数据
        $threechildphone = Category::where("pid",$phonemodel['id'])->limit(3)->get();


        //家具部分数据
        $jiaju = Category::where("pid",0)->where("cname","居家生活")->get()->toArray();
        foreach ($jiaju as $v){
            $jjmodel =$v;
        }
        $childjj = Category::where("pid",$jjmodel['id'])->get();
        //左侧循环的三条数据
        $threechildjj = Category::where("pid",$jjmodel['id'])->limit(3)->get();






//        dd($threechildgc);
        return view("index.entry.index",compact("oneCategory","gcmodel","childgc","threechildgc","fxmodel","childfx","threechildfx","phonemodel","childphone","threechildphone","jjmodel","childjj","threechildjj"));







    }




}
