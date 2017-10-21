<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

header('Access-Control-Allow-Origin:*');
include __DIR__."/admin/admin.php";
include __DIR__."/index/index.php";

//上传文件路由
Route::any('/PicUpload/upload','PicUpload\\UploadController@upload');
//获取文件路由
Route::any('/PicUpload/getPics','PicUpload\\UploadController@getPics');