<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Attr extends Model
{
    //
    protected $guarded=[];

    //获得最底层分类方法
//    public function getCategory(){
//        //获得所有非顶级分类数据
//        $categorys = Category::get();
//        //获得该分类下所有的主键id
//        $ids =[];
//        foreach ($categorys as $v){
//            $ids[]=$v['id'];
//        }
//        //获得最底层分类id
//        $lastid =[];
//        foreach ($ids as $v){
//            $data = Category::where("pid",$v)->get();
//            if (empty($data->toArray())){
//                $lastid[]=$v;
//            }
//        }
////        获得最低层分类数据
//        $facategory =[];
//        foreach ($lastid as $v){
//            $facategory[]=Category::find($v)->toArray();
//        }
//
//        return $facategory;
//    }

    //获得所有顶级分类的主键id
    public function oneCategory(){
        //获得所有顶级分类数据
        $data = Category::where("pid",0)->get();
        //循环获得所有顶级分类数据的主键id
        $oneCategory = [];
        foreach ($data as $v){
            $oneCategory[] =$v['id'];
        }
        return $oneCategory;
    }

    //获得所有二级分类的主键id
    public function secondCategory(){
        //获得顶级分类的主键数组
        $oneCategory =$this->oneCategory();
        //获得所有非顶级分类的数据
        $data = Category::where("pid","!=",0)->get();
        //循环获得二级分类的主键id
        $secondCategory=[];
        foreach ($data as $v){
            if (in_array($v['pid'],$oneCategory)){
                $secondCategory[]=$v['id'];
            }
        }
        return $secondCategory;
    }

    //获得所有三级分类的主键id
    public function threeCategory(){
        //获得顶级分类的主键数组
        $oneCategory = $this->oneCategory();
        //获得所有非顶级分类的数据
        $data = Category::where("pid","!=",0)->get();
        //循环获得三级分类的主键id
        $threeCategory=[];
        foreach ($data as $v){
            if (!in_array($v['pid'],$oneCategory)){
                $threeCategory[]=$v['id'];
            }
        }
        return $threeCategory;
    }
}
