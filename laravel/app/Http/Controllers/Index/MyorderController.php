<?php

namespace App\Http\Controllers\Index;

use App\Model\Address;
use App\Model\Attr;
use App\Model\Cart;
use App\Model\Category;
use App\Model\Goods;
use App\Model\Huopin;
use App\Model\Myorder;
use App\Model\MyorderLists;
use DB;
use Request;
use App\Http\Controllers\Controller;
use Symfony\Component\VarDumper\Cloner\Data;
use Auth;
class MyorderController extends Controller
{

    public function __construct()
    {
        $this->middleware("check.myhomelogin");
    }


    //加载确认订单页面
    public function confirmOrder(){
        //获得用户的id
        $id = Auth::guard("reg")->user()->id;
        //从购物车表拿到该用户的添加的所有货品
//        $huopins = Cart::where("userid",$id)->get();
        $huopins =DB::table('carts')->join('goods', 'carts.gid', '=', 'goods.id')->select('carts.*', 'goods.gname', 'goods.id', 'goods.price',"goods.attribute_id","goods.listImages")->where("userid",$id)->get();
        //获得该用户添加的所有地址
        $address =Address::where("userid",$id)->get();
//        dd($huopins);
        return view("index.myorder.confirmOrder",compact("huopins","address"));
    }



    //添加订单
    public function addMyorder(){
        $postDate = Request::all();
        //先把总价，用户id,订单号，订单状态，地址存入订单表
//        $orderId = time()+mt_rand(0,100);
        $orderdata = [
            "total"=>$postDate['total'],
            "recaddress"=>$postDate['aid'],
            "userid"=>Auth::guard("reg")->user()->id,
            "status"=>0,
            "ordernumber"=> $postDate['ordernum'],
        ];
        Myorder::create($orderdata);

        //保存订单列表的数据
        $idnumpri =explode("/",$postDate['idnumpri']);
        foreach ($idnumpri as $v){
            $orderlists =explode(',',$v);
            //获得对应货品的数据,并修改对应货品的库存数量
            $huopins = Huopin::find($orderlists[0]);
            if ($huopins['kucun'] > $orderlists[1]){
                return response()->json(["valid"=>0,"message"=>"购买的数量已超出库存"]);
            }else{
                $huopins->kucun =$huopins['kucun']-$orderlists[1];
                $huopins->save();
            }

            $orderListData = [
                'myorder_id' => $postDate['ordernum'],
                'goodsnum' => $orderlists[1],
                'huopin_id' => $orderlists[0],
                'goodsprice' => $orderlists[2],
            ];
            MyorderLists::create($orderListData);
        }

        Cart::where("userid",Auth::guard("reg")->user()->id)->delete();
        return response()->json(["valid"=>1]);
    }




    //加载支付页面
    public function pay($ordernum){
        //根据订单号获得对应数据
       $data =  Myorder::where("ordernumber",$ordernum)->get()->toArray();
       $time = time()-strtotime($data[0] ['created_at']);
//       dd($time);
        return view("index.myorder.pay",compact("data"));
    }




    //加载我的订单首页
    public function myorderlist($id){
        //获得当前登录用户的订单数据，先获取订单表
        $orders = Myorder::where('userid',$id)->get()->toArray();
        foreach ($orders as $k => $v){
            //关联地址表，获取收货地址相关数据
            $orders[$k]['address'] = Address::find($v['recaddress'])->toArray();
            //获取订单列表对应到订单表的数据
            $orderLists = MyorderLists::where('myorder_id',$v['ordernumber'])->get()->toArray();
            //订单列表中的每个关联商品表，获取商品图片和名称
            foreach ($orderLists as $kk => $vv){
                $orderLists[$kk]['shuxing'] = Huopin::find($vv['huopin_id'])->shuxing;
                $orderLists[$kk]['goodsid'] = Huopin::find($vv['huopin_id'])->gid;
                $orderLists[$kk]['goodsinfo'] = Goods::find(Huopin::find($vv['huopin_id'])->gid)->toArray();
            }
            $orders[$k]['orderList'] = $orderLists;

        }
//        dd($attrs);

        return view("index.myorder.myorder",compact("orders"));
    }




    //加载订单详情页
    public function orderdetail($ordernum){
        $id =Auth::guard("reg")->user()->id;
        //获得当前登录用户的订单数据，先获取订单表
        $orders = Myorder::where('userid',$id)->where("ordernumber",$ordernum)->get()->toArray();
//        dd($orders);
        foreach ($orders as $k => $v){
            //关联地址表，获取收货地址相关数据
            $orders[$k]['address'] = Address::find($v['recaddress'])->toArray();
            //获取订单列表对应到订单表的数据
            $orderLists = MyorderLists::where('myorder_id',$v['ordernumber'])->get()->toArray();
            //订单列表中的每个关联商品表，获取商品图片和名称
            foreach ($orderLists as $kk => $vv){
                $orderLists[$kk]['shuxing'] = Huopin::find($vv['huopin_id'])->shuxing;
                $orderLists[$kk]['goodsid'] = Huopin::find($vv['huopin_id'])->gid;
                $orderLists[$kk]['goodsinfo'] = Goods::find(Huopin::find($vv['huopin_id'])->gid)->toArray();
            }
            $orders[$k]['orderList'] = $orderLists;

        }
//        dd($orders);
        return view("index.myorder.orderdetail",compact("orders"));
    }


    //异步取消订单
    public function quxiao($ordernum){
        //
        $model = Myorder::find($ordernum);
        $model->status = 2;
        $model->save();
        return response()->json(['valid'=>1,"message"=>"取消成功"]);
    }


    //立即支付后异步修改订单状态
    public function changestatus($orderId){
        //获得对应订单的数据
        $model = Myorder::where("ordernumber",$orderId)->first();
        $model->status = 1;
        $model->save();
        return redirect('/index/myorderlist/' . Auth::guard('reg')->id());
    }


    //  添加地址管理页面
    public function myorderaddresssave(){
        if (Request::input("is_default")==1){
            //获得所有该用户的地址数据
            $allAddress = Address::where("userid",Request::input("userid"))->get()->toArray();
            foreach ($allAddress as $v){
                $model = Address::find($v['id']);
                $model ->is_default = 0;
                $model->save();
            }
            $data = [
                "recname"=>Request::input("recname"),
                "userid"=>Request::input("userid"),
                "recaddress"=>Request::input("recaddress"),
                "phonenumber"=>Request::input("phonenumber"),
                "addresstag"=>Request::input("addresstag"),
                "is_default"=>Request::input("is_default"),
            ];

        }else{
            $data = [
                "recname"=>Request::input("recname"),
                "userid"=>Request::input("userid"),
                "recaddress"=>Request::input("recaddress"),
                "phonenumber"=>Request::input("phonenumber"),
                "addresstag"=>Request::input("addresstag"),
                "is_default"=>0,
            ];
        }

        Address::create($data);
        return redirect("/index/confirmOrder");
    }

    //加载编辑地址页面
    public function myordereditaddress($id){
        $data =  Address::find($id);
        return response()->json(['valid'=>1,"data"=>$data]);
    }

    //保存编辑地址数据
    public function myordereditsave($id){
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
    public function myorderaddressdel($id){
        Address::destroy($id);
        return response()->json(['valid'=>1,"message"=>"删除成功"]);
    }


    //异步修改默认地址
    public function changedefault(){
        //获得所有该用户的地址数据
        $allAddress = Address::where("userid",Auth::guard("reg")->user()->id)->get()->toArray();
        foreach ($allAddress as $v){
            if ($v['id'] != Request::input("morenid")){
                $model = Address::find($v['id']);
                $model ->is_default = 0;
                $model->save();
            }else{
                $model = Address::find($v['id']);
                $model ->is_default = 1;
                $model->save();
            }
        }
        return response()->json(['valid'=>1]);
    }




    //异步筛选销量
    public function xiaoliang($id){
        //判断点击的几级分类
        $attr = new Attr();
        //先获取二级分类id的数组
        $secondCate = $attr->secondCategory();
        if (in_array($id,$secondCate)){
            $thrids =[];
            //获得该分类下所有的三级分类数据
            $thrCategory = Category::where("pid",$id)->get()->toarray();
            foreach ($thrCategory as $v){
                $thrids[]=$v['id'];
            }
            $data = DB::table('goods')->whereIn("category_id",$thrids)->orderBy('numLook', 'desc')->get()->toarray();
        }else{
            $data = DB::table('goods')->where("category_id",$id)->orderBy('numLook', 'desc')->get()->toarray();
        }

        return response()->json(['data'=>$data]);
    }


    //异步筛选价格
    public function jiage($id){
        //判断点击的几级分类
        $attr = new Attr();
        //先获取二级分类id的数组
        $secondCate = $attr->secondCategory();
        if (in_array($id,$secondCate)){
            $thrids =[];
            //获得该分类下所有的三级分类数据
            $thrCategory = Category::where("pid",$id)->get()->toarray();
            foreach ($thrCategory as $v){
                $thrids[]=$v['id'];
            }
            $data = DB::table('goods')->whereIn("category_id",$thrids)->orderBy('price', 'asc')->get()->toarray();
        }else{
            $data = DB::table('goods')->where("category_id",$id)->orderBy('price', 'asc')->get()->toarray();
        }

        return response()->json(['data'=>$data]);
    }








}
