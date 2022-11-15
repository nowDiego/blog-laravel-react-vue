<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Customer
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
      
        if (! $request->expectsJson()) {
       
            return response('Unauthorized.', 403);
      
        }else{

        if (!Auth::check()) {
            return response('Unauthorized.', 403);
        }         
        else{        
     
        $part_type = str_replace("App\\Models\\","",Auth::user()->userable_type);
         
        if ($part_type == "Customer") {

            return $next($request); 

        }else{
            return response('Unauthorized.'.$part_type, 403);   
        }


    }

    }
    



    }
}
