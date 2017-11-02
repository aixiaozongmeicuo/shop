<?php

namespace App\Model;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User;

class Reg extends User
{
    //
    protected $guarded=[];
    protected $rememberTokenName = '';
}
