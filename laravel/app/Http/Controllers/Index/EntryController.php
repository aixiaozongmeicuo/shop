<?php

namespace App\Http\Controllers\Index;

use App\Model\Attr;
use App\Model\Category;
use App\Model\Goods;
use App\Model\Huopin;
use App\Model\Reg;
use Illuminate\Support\Facades\DB;
use Request;
use App\Http\Controllers\Controller;
use houdunwang\arr\Arr;
use Auth;
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


        $allCategory = Category::get()->toArray();

        $allCategory= Arr::channelLevel($allCategory, 0, "&nbsp;", 'id', 'pid');
//        dd($allCategory);
        //获得热门商品
        foreach ($allCategory as $k=>$v){
            $a = [];
            foreach ($v['_data'] as $kk => $vv){
                foreach ($vv['_data'] as $kkk => $vvv){
                    $a[] = $vvv['id'];
                }
            }
            $allCategory[$k]['hot'] =  Goods::whereIn('category_id',$a)->orderBy('numLook','desc')->limit(5)->get()->toArray();
        }

//        dd($allCategory);
        $qiangou = Goods::orderBy('numLook','desc')->limit(5)->get()->toArray();
//        dd($qiangou);
        return view("index.entry.index",compact("oneCategory","allCategory","qiangou"));

    }

//    商品列表页
    public function lists($id){
        $attr = new Attr();
        //先获取二级分类id的数组
        $secondCate = $attr->secondCategory();
        if (in_array($id,$secondCate)){//如果是二级分类
            //获得二级分类下所有的三级分类
            $threeCategorys = Category::where("pid",$id)->get()->toArray();
            foreach ($threeCategorys as $v){
                $cids[] =$v['id'];
            }
            //获得当前分类下所有的商品
            $goods = Goods::whereIn("category_id",$cids)->get()->toarray();

        }else{//如果是三级分类
            //获得当前分类下所有的商品
            $goods = Goods::where("category_id",$id)->get();
        }
        $dingjiAIDS=[];
        foreach ($goods as $v){
            $dingjiAIDS=array_merge($dingjiAIDS,explode(',',$v['attribute_id']));
        }
        $dingjiAIDS = array_unique($dingjiAIDS);
        //获得该分类下所有商品可用的顶级属性数据
        $attrs =Attr::whereIn("id",$dingjiAIDS)->get()->toarray();
        //获得所有的货品数据
        $huopins=[];
        foreach ($goods as $v){
            $huopins[]=Huopin::where("gid",$v['id'])->get()->toarray();
        }
        //获得该分类下可用属性的id
        $zuhe =[];
        foreach ($huopins as $v){
            foreach ($v as $vv)
                $zuhe=array_merge($zuhe,explode(',',$vv['zuhe']));
        }
        $zuhe =array_unique($zuhe);
        foreach ($attrs as $k=>$v){
            $attrs[$k]['sonattr'] =Attr::whereIn("id",$zuhe)->where("pid",$v['id'])->get()->toarray();
        }


        //获得当前分类的数据  面包屑
        if (in_array($id,$secondCate)){//二级分类
            $model = Category::find($id);
            //获得顶级分类数据
            $data =Category::find($model['pid'])->toarray();
            $data['secCategory'] =Category::find($id)->toArray();
        }else{//三级分类
            $model = Category::find($id);
            $secondcate = Category::find($model['pid']);
            $data = Category::find($secondcate['pid'])->toarray();
            $data['secCategory'] =$secondcate = Category::find($model['pid'])->toarray();;
            $data['secCategory']['thrCategory'] =Category::find($id)->toArray();
        }

        return view("index.entry.lists",compact("goods","attrs","data","id"));
    }




//    商品详情页
    public function item($id){
        //面包屑部分
        //获得对应序号的商品数据
        $goods =Goods::find($id);
        //获得其所属的三级分类数据
        $thrCategory = Category::find($goods['category_id']);
        //获得当前分类下的所有商品
       $ALLgoods = Goods::where("category_id",$goods['category_id'])->get();
        //获得所属的二级分类数据
        $secCategory =Category::find($thrCategory['pid']);
        //获得所属一级分类数据
        $oneCategory =Category::find($secCategory['pid']);


        //获得左侧放大图片部分数据
        $photos =explode("|",$goods['photos']);
        //货品属性字段数据
        $huopins = Huopin::where("gid",$goods['id'])->get()->toarray();
        //获得该商品可用的顶级属性数据
        $attrs =Attr::whereIn("id",explode(',',$goods['attribute_id']))->get()->toarray();
        $zuhe =[];
        foreach ($huopins as $v){
            $zuhe=array_merge($zuhe,explode(',',$v['zuhe']));
        }
        $zuhe =array_unique($zuhe);
        foreach ($attrs as $k=>$v){
            $attrs[$k]['sonattr'] =Attr::whereIn("id",$zuhe)->where("pid",$v['id'])->get()->toarray();
        }



        return view("index.entry.item",compact("goods","ALLgoods","photos","attrs","id","secCategory","thrCategory","oneCategory"));
    }






//    异步判断勾选的货品是否有存货
    public function panduan(){
        $dataRequest =Request::all();
        $data =Huopin::where("zuhe",$dataRequest['zuhe'])->where("gid",$dataRequest['cid'])->get()->toArray();
        if ($data){
            return response()->json(['valid'=>1,"data"=>$data]);
        }else{
            return response()->json(['valid'=>0]);
        }


    }


    //列表页异步筛选商品方法
    public function shaixuan(Request $request){
        $postData = Request::all();
        //获取所有货品数据
        $huopin = Huopin::get()->toArray();
        $shaixuanGoods = [];
        //将筛选条件的空值去掉,组成一个新数组
        $newArr = [];
        foreach (explode(',',$postData['shaixuan']) as $v){
            if ($v != ''){
                $newArr[] = $v;
            }
        }

        foreach ($huopin as $v){
            $a = [];
            foreach ($newArr as $vv){
                if (in_array($vv,explode(',',$v['zuhe']))){
                    $a[] = 1;
                }else{
                    $a[] = 0;
                }
            }
            if (!in_array(0,$a)){
                $shaixuanGoods[] = $v['gid'];
            }
        }

        //判断当前分类的所属级别
        $attr = new Attr();
        //先获取二级分类id的数组
        $secondCate = $attr->secondCategory();
        if (in_array($postData['cid'],$secondCate)){//二级分类
            //获得其分类下所有的三级分类数据
            $thrCategorys = Category::where("pid",$postData['cid'])->get();
            $thrids =[];
            foreach ($thrCategorys as $v){
                $thrids[]=$v['id'];
            }
            //获取商品数据
            $zuizhongGoods = Goods::whereIn('id',$shaixuanGoods)->whereIn("category_id",$thrids)->get()->toArray();
        }else{//三级分类
            //获取商品数据
            $zuizhongGoods = Goods::whereIn('id',$shaixuanGoods)->where("category_id",$postData['cid'])->get()->toArray();
        }

        return response()->json(['valid' => 1, 'data' => $zuizhongGoods]);
    }





    //展示前台首页登录页面
    public function login(){

        return view("index.entry.login");
    }


    //验证登录信息
    public function logincheck(){
        $data = Auth::guard("reg")->attempt([
            "username"=>Request::input('username'),
            "password"=>Request::input("password"),
        ]);
        if($data){
            return redirect("/");
        }
        return redirect("/index/login")->with("error","输入的用户名或密码错误");
    }


    //保存注册信息
    public function regcheck(){
        //判断数据库里该用户名是否已存在
        $userinfo =Reg::where("username",Request::input("username"))->get()->toArray();
        if ($userinfo){
            return redirect("/index/reg")->with("errot","输入的用户名已存在");
        }
        $data=[
            "username"=>Request::input('username'),
            "password"=>bcrypt(Request::input("password")),
        ];
        Reg::create($data);
        flash("注册成功")->overlay();
        return redirect("/index/login");
    }


    //加载注册页面
    public function reg(){
        return view("index.entry.reg");
    }

    //退出登录
    public function loginout(){
        Auth::guard("reg")->logout();
        return redirect("/index/login");
    }



    //搜索框
    public function search(){
        $data = DB::table('goods')->where('gname', 'like', "%" . Request::input("keyword") . "%")->get()->toarray();
        return view("index.entry.search",compact("data"));
    }
}
