<?php
/**
 * Created by PhpStorm.
 * User: hb
 * Date: 2017/10/17
 * Time: 18:30
 */

//后台登录
Route::get('/admin/index','Admin\\AdminController@index');
//登录页面路由
Route::get('/admin/login','Admin\\AdminController@login');
//验证登录信息
Route::post('/admin/login','Admin\\AdminController@logincheck');
//修改密码
Route::get('/admin/mychangepassword','Admin\\AdminController@mychangepassword');
//验证密码信息
Route::post('/admin/changepassword','Admin\\AdminController@changepassword');
//退出登录
Route::get('/admin/loginout','Admin\\AdminController@loginout');

//商品分类路由
Route::resource('/admin/category', 'Admin\\CategoryController');

//商品信息资源路由
Route::resource('/admin/goods', 'Admin\\GoodsController');

//获得对应分类下属性数据路由
Route::get("/admin/getCategoryAttrs/{cid}","Admin\\GoodsController@getCategoryAttrs");

//商品属性资源路由
Route::resource('/admin/attr', 'Admin\\AttrController');

//展示货品列表页面路由
Route::get("/admin/huopin/lists/{id}","Admin\\HuopinController@lists");
//展示添加货品页面路由
Route::get("/admin/huopin/create/{id}","Admin\\HuopinController@create");
//处理添加货品信息的路由
Route::post("/admin/huopin/store","Admin\\HuopinController@store");
//展示编辑货品信息页面的路由
Route::get("/admin/huopin/edit/{id}/{gid}","Admin\\HuopinController@edit");
//修改货品信息的路由
Route::any("/admin/huopin/update/{id}","Admin\\HuopinController@update");
//删除对应序号的货品数据路由
Route::get("/admin/huopin/delete/{id}","Admin\\HuopinController@delete");

//后台展示订单列表
Route::get("/admin/myorderlists","Admin\\MyorderlistsController@lists");


