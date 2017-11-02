<?php

namespace App\Http\Controllers\Index;

use App\Http\Requests\IndexPasswordRequest;
use App\Model\Address;
use App\Model\Goods;
use App\Model\Huopin;
use App\Model\Myorder;
use App\Model\MyorderLists;
use App\Model\UserInformation;
use Request;
use App\Http\Controllers\Controller;
use Auth;
use Illuminate\Http\Request as r;
class MyhomeController extends Controller
{

    public function __construct()
    {
        $this->middleware('check.myhomelogin');
    }

    //加载个人中心首页
    public function home(){

        //获得当前登录用户的订单数据，先获取订单表
        $orders = Myorder::where('userid',Auth::guard("reg")->user()->id)->get()->toArray();
        foreach ($orders as $k => $v){
            //获取订单列表对应到订单表的数据
            $orderLists = MyorderLists::where('myorder_id',$v['ordernumber'])->get()->toArray();
            //订单列表中的每个关联商品表，获取商品图片和名称
            foreach ($orderLists as $kk => $vv){
                $orderLists[$kk]['zuhe'] = Huopin::find($vv['huopin_id'])->zuhe;
                $orderLists[$kk]['goodsid'] = Huopin::find($vv['huopin_id'])->gid;
                $orderLists[$kk]['goodsinfo'] = Goods::find(Huopin::find($vv['huopin_id'])->gid)->toArray();
            }
            $orders[$k]['orderList'] = $orderLists;

        }
//        dd($orders);
        return view("index.myhome.myhome",compact("orders"));

    }

    //加载个人资料
    public function myinformation($id){
        //获得对应用户的个人资料数据
        $userInformation = UserInformation::where("userid",$id)->get()->toArray();
//        dd($userInformation);
        if ($userInformation){
            return view("index.myhome.myinformation",compact("userInformation"));
        }else{
            return view("index.myhome.myinformation");
        }
    }

    //添加个人资料
    public function myinformationsave($id,Request $request){
        //获得登录用户的旧数据
        $model= UserInformation::find($id);
        $postDate = Request::all();
       if ($model){
           $model->nickname =$postDate['nickname'];
           $model->realname =$postDate['realname'];
           $model->birthday =$postDate['birthday'];
           $model->sex =$postDate['sex'];
           $model->userid =$postDate['userid'];
           $model->save();
       }else{
           UserInformation::create($postDate);
       }
        return redirect("/index/home");
    }


    //加载地址管理页面
    public function myaddress($id){

        //获得对应用户的地址数据
       $address =  Address::where("userid",$id)->get();
        return view("index.myhome.myaddress",compact("address"));
    }

//  添加地址管理页面
    public function myaddresssave(){

        Address::create(Request::all());
        $uid =Request::input('userid');
//        flash("添加地址成功")->overlay();
        return redirect("/index/myaddress/{$uid}");
    }

    //加载编辑地址页面
    public function editaddress($id){
       $data =  Address::find($id);
       return response()->json(['valid'=>1,"data"=>$data]);
    }

    //保存编辑地址数据
    public function editsave($id){
        $model = Address::find($id);
        $model->userid =Request::input("userid");
        $model->recname =Request::input("recname");
        $model->recaddress =Request::input("recaddress");
        $model->phonenumber =Request::input("phonenumber");
        $model->addresstag =Request::input("addresstag");
        $model->save();
        flash("修改成功")->overlay();
        return redirect("/index/myaddress");
    }

    //删除地址
    public function addressdel($id){
        Address::destroy($id);
        return response()->json(['valid'=>1,"message"=>"删除成功"]);
    }

    //加载修改密码模板
    public function mychangepasswd($id){

        return view("index.myhome.mychangepasswd");
    }

    //验证修改密码
    public function mychangepasswdcheck(IndexPasswordRequest $request){
        $model =Auth::guard("reg")->user();
        $model->password =bcrypt(Request::input("password"));
        $model->save();
        flash("修改成功")->overlay();
        return redirect("/index/home");

    }
}
