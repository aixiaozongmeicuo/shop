<?php
/**
* Created by PhpStorm.
 * User: hb
* Date: 2017/10/20
* Time: 11:46
*/
//展示前台首页路由
Route::get('/','Index\\EntryController@index');

//展示列表页路由
Route::get('/index/lists/{id}','Index\\EntryController@lists');

//列表页异步筛选路由
Route::post('/index/shaixuan','Index\\EntryController@shaixuan');

//商品详情页
Route::get('/index/item/{id}','Index\\EntryController@item');
//异步判断货品数量
Route::post('/index/panduan','Index\\EntryController@panduan');


//添加货品路由
Route::post('/index/addcart','Index\\CartController@addcart');
//加载购物车模板
Route::get("/index/showcart","Index\\CartController@showcart");
//删除购物车中数据
Route::get("/index/huopindelete/{cid}","Index\\CartController@huopindelete");

Route::post("/index/changenum","Index\\CartController@changenum");


//加载个人中心路由
Route::get("/index/home","Index\\MyhomeController@home");

//加载个人资料路由
Route::get("/index/myinformation/{id}","Index\\MyhomeController@myinformation");
//添加个人资料路由
Route::post("/index/myinformation/{id}","Index\\MyhomeController@myinformationsave");


//加载地址管理路由
Route::get("/index/myaddress/{uid}","Index\\MyhomeController@myaddress");
//添加地址地址管理路由
Route::post("/index/myaddresssave","Index\\MyhomeController@myaddresssave");
//编辑地址路由
Route::get("/index/editaddress/{id}","Index\\MyhomeController@editaddress");
//保存编辑地址路由
Route::post("/index/editsave/{id}","Index\\MyhomeController@editsave");
//删除地址路由
Route::get("/index/addressdel/{id}","Index\\MyhomeController@addressdel");


//加载修改密码管理路由
Route::get("/index/mychangepasswd/{id}","Index\\MyhomeController@mychangepasswd");
//修改修改密码管理路由
Route::post("/index/mychangepasswdcheck","Index\\MyhomeController@mychangepasswdcheck");

//前台首页登录路由
Route::get("/index/login","Index\\EntryController@login");
//验证登录路由
Route::post("/index/login","Index\\EntryController@logincheck");

//退出登录
Route::get("/index/loginout","Index\\EntryController@loginout");


//前台注册页面
Route::get("/index/reg","Index\\EntryController@reg");
//验证注册信息
Route::post("/index/reg","Index\\EntryController@regcheck");



//加载确认订单路由
Route::get("/index/confirmOrder","Index\\MyorderController@confirmOrder");
//添加订单
Route::post("/index/addMyorder","Index\\MyorderController@addMyorder");


//加载支付页面
Route::get("/index/pay/{ordernum}","Index\\MyorderController@pay");
//立即支付后异步修改订单状态
Route::get("/index/changestatus/{orderId}","Index\\MyorderController@changestatus");

//加载我的订单首页
Route::get("/index/myorderlist/{id}","Index\\MyorderController@myorderlist");
//加载订单详情页
Route::get("/index/orderdetail/{ordernum}","Index\\MyorderController@orderdetail");


//异步取消订单状态
Route::get("/index/quxiao/{ordernum}","Index\\MyorderController@quxiao");




//确认订单页面地址管理
//添加地址地址管理路由
Route::post("/index/myorderaddresssave","Index\\MyorderController@myorderaddresssave");
//编辑地址路由
Route::get("/index/myordereditaddress/{id}","Index\\MyorderController@myordereditaddress");
//保存编辑地址路由
Route::post("/index/myordereditsave/{id}","Index\\MyorderController@myordereditsave");
//删除地址路由
Route::get("/index/myorderaddressdel/{id}","Index\\MyorderController@myorderaddressdel");

//异步修改默认地址
Route::post("/index/changedefault","Index\\MyorderController@changedefault");



//异步筛选销量
Route::get("/index/xiaoliang/{id}","Index\\MyorderController@xiaoliang");
//价格降序排列
Route::get("/index/jiage/{id}","Index\\MyorderController@jiage");


//搜索框
Route::post("/index/search","Index\\EntryController@search");
