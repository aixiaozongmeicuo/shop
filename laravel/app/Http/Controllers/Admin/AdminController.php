<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\ChangepasswordRequest;
use App\Model\Admin;
use App\Http\Controllers\Controller;
use Request;
use Auth;


class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('check.login')->except("login","logincheck");
    }

    //展示后台首页
    public function index(){
        return view("admin.entry.index");
    }
    //展示后台登录首页
    public function login(){
        return view('admin.entry.login');
    }

    //验证登录信息
    public function logincheck(){
        $data = Auth::guard("admin")->attempt([
            "username"=>Request::input('username'),
            "password"=>Request::input("password"),
        ]);
        if($data){
            return redirect("/admin/index");
        }
        return redirect("/admin/login")->with("error","输入的用户名或密码错误");
    }

    //展示修改密码页面
    public function mychangepassword(){
        return view("admin.entry.mychangepassword");
    }

    //修改密码
    public function changepassword(ChangepasswordRequest $request){
        //首先获得用户数据
        $model =Auth::guard("admin")->user();
        $model->password =bcrypt(Request::input("password"));
        $model->save();
        flash("修改成功")->overlay();
        return redirect("/admin/mychangepassword");
    }

    //退出登录
    public function loginout(){
        Auth::guard("admin")->logout();
       return redirect("/admin/login");
    }
}
