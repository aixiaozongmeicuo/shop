<?php

namespace App\Http\Controllers\PicUpload;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UploadController extends Controller
{

    public function upload(Request $request){
        //获得上传文件
        $upload = $request->file;
        //判断上传文件是否合法
        if ($upload->isValid()){
            //组合上传图片路径
            $path = $upload->store(date('ymd'),'upload');
            //返回成功消息
            return response()->json(['valid' => 1, 'message' => asset('/uploadImg/' . $path)]);
        }
        return response()->json(["valid"=>0,"message"=>"文件上传失败"]);
    }



    //获取上传的图片
    public function getPics(){

        $files = glob('uploadImg/*/*');
        foreach ($files as $f) {
            $data[] = ['url' => "http://yhd.huangbaovip.com/".$f, 'path' => 'http://yhd.huangbaovip.com/'.$f];
        }
    //返回数据 data为文件列表 page 为分页数据，
        $json = ['data' => $data,'page'=>[]];
        die(json_encode($json));
    }
}
