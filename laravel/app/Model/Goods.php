<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Goods extends Model
{
    //
    protected $guarded=[];

    public function getCategory(){
        //获得所有非顶级分类数据
        $categorys = Category::get();
        //获得该分类下所有的主键id
        $ids =[];
        foreach ($categorys as $v){
            $ids[]=$v['id'];
        }
        //获得最底层分类id
        $lastid =[];
        foreach ($ids as $v){
            $data = Category::where("pid",$v)->get();
            if (empty($data->toArray())){
                $lastid[]=$v;
            }
        }
//        获得最低层分类数据
        $facategory =[];
        foreach ($lastid as $v){
            $facategory[]=Category::find($v)->toArray();
        }

        return $facategory;
    }
}
