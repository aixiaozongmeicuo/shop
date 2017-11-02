<?php

namespace App\Http\Middleware;

use Closure;
use Auth;
class MyhomeCheck
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (!Auth::guard("reg")->check()){
            return redirect("/index/login");
        }

        return $next($request);
    }
}
