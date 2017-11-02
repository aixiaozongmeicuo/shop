<?php

namespace App\Http\Controllers\Index;

use App\Model\Attr;
use App\Model\Cart;
use App\Model\Goods;
use App\Model\Huopin;
use Illuminate\Support\Facades\DB;
use Request;
use App\Http\Controllers\Controller;
use Auth;
class CartController extends Controller
{
    public function __construct()
    {
        $this->middleware('check.myhomelogin')->except("addcart");
    }

    //添加货品到购物车表
    public function addcart(){
        if (isset(Auth::guard("reg")->user()->id)){
            $zuhe =explode(',',Request::input("zuhe"));
            //获得所有非顶级属性数据
            $attrs =Attr::where("pid","!=",0)->get()->toArray();
            foreach ($attrs as $v){
                if (in_array($v['id'],$zuhe)){
                    $name[]=$v['aname'];
                }
            }
            $aname = implode('/',$name);
            //获得货品的id
            $huopins = Huopin::where("zuhe",Request::input("zuhe"))->where("gid",Request::input("gid"))->get()->toArray();
            //先获得购物车中该货品的数据
            $carts = Cart::where("hid",$huopins[0]['id'])->first();
            if (!empty($carts)){
                $carts->goodsnum = Request::input("goodsnum")*1 + $carts['goodsnum']*1;
                $carts->save();
                return response()->json(['valid'=>1]);
            }else{
                $postDate =[
                    "gid"=> Request::input("gid"),
                    "goodsnum"=> Request::input("goodsnum"),
                    "userid"=> Auth::guard("reg")->user()->id,
                    "zuhe"=> $aname,
                    "hid"=> $huopins[0]['id'],
                ] ;
                Cart::create($postDate);
                return response()->json(['valid'=>1]);
            }

        }else{
            return response()->json(['valid'=>0,"message"=>"请先登录，再加入购物车"]);
        }



    }

    //加载购物车模板
    public function showcart(){
        //获得登录用户加入购物车的数据
        $goods =DB::table('carts')->join('goods', 'carts.gid', '=', 'goods.id')
            ->join('Huopins', 'carts.hid', '=', 'Huopins.id')
            ->select('carts.*', 'goods.gname', 'goods.price',"goods.attribute_id","goods.listImages","Huopins.kucun")->where("userid",Auth::guard("reg")->user()->id)->get()->toArray();
//        dd($goods);
        return view("index.cart.cart",compact("goods"));
    }

    //删除购物车商品数据
    public function huopindelete($cid){
        Cart::destroy($cid);
        return response()->json(['valid'=>1,"message"=>"删除成功"]);

    }



    //异步改变购买数量
    public function changenum(){
        $postDate = Request::ALL();
        //修改购物车表对应货品的购买数量
        $carts = Cart::find($postDate['cartid']);
        $carts->goodsnum = $postDate['num'];
        $carts->save();
        return response()->json(['valid'=>1]);
    }


}
