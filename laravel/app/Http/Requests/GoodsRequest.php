<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GoodsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "gname"=>"required",
            "price"=>"required|alpha_num",
            "numLook"=>"required|alpha_num",
            "photos"=>"required",
            "listImages"=>"required",
            "details"=>"required",
        ];
    }

    public function messages()
    {
        return [
            "gname.required"=>"商品名称必填",
            "price.required"=>"商品价格必填",
            "price.alpha_num"=>"商品价格必须为数字",
            "numLook.alpha_num"=>"查看次数必须为数字",
            "numLook.required"=>"查看次数必填",
            "photos.required"=>"详情图片必选",
            "listImages.required"=>"列表图片必选",
            "details.required"=>"商品详情必填",
        ];
    }
}
