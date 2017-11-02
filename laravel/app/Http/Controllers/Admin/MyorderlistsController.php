<?php

namespace App\Http\Controllers\Admin;

use App\Model\Myorder;
use App\Model\Reg;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class MyorderlistsController extends Controller
{
    //展示订单信息
    public function lists(){


        //获得对应用户的订单数据
        $myorders = Myorder::get()->toarray();
        //获得所有用户表
        $userinfo = Reg::get()->toarray();
        foreach ($myorders as $k=>$v){
            foreach ($userinfo as $vv){
                if ($vv['id'] == $v['userid']){
                    $myorders[$k]["username"]=$vv['username'];
                }
            }
            //转换订单状态
            if ($v['status']==0){
                $myorders[$k]['status_name']="待支付";
            }elseif ($v['status']==1){
                $myorders[$k]['status_name']="已支付";
            }elseif ($v['status']==2){
                $myorders[$k]['status_name']="已取消";
            }

        }

//        dd($myorders);
        return view("admin.myorder.lists",compact("myorders"));
    }
}
