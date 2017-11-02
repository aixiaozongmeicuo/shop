<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Hash;
use Auth;
use Validator;
class IndexPasswordRequest extends FormRequest
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

    //自定义验证规则
    public function checkPassword(){

        Validator::extend('check_password', function ($attribute, $value, $parameters, $validator) {

            //$value就是当前自定义的验证方法给哪个字段使用,$value就等于哪个字段的的值
            return Hash::check($value,Auth::guard('reg')->user()->password);
        });
    }
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        //自定义验证规则,用来判断原密码是否相等
        $this->checkPassword();
        return [
            'old_password' => 'required|check_password',
            'password' => 'required|confirmed',
            'password_confirmation' => 'required'
        ];
    }

    public function messages()
    {
        return [
            'old_password.required' => '原密码不能为空',
            'password.required' => '新密码不能为空',
            'password_confirmation.required' => '确认密码不能为空',
            'old_password.check_password' => '原密码输入不正确',
            'password.confirmed' => '两次密码输入不相同',
        ];
    }
}
