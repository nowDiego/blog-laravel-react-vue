<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\AuthRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(AuthRequest $request){

   
        $user = User::where('name', $request->name)->with(['Userable'])->first();             
              
          if (!$user) {
            return
            response()->json([
                'status'=>false,
                'message'=>'Invalid login',                
            ]);
       }
    
       if (! Hash::check($request->password, $user->password)) {
        return
        response()->json([
            'status'=>false,
            'message'=>'Invalid login'
        ]); 
       
    }
    
   
    $token = Auth::login($user);

     $data = [
        'id'=>$user->id,
        'name'=>$user->name,
        'email'=>$user->email,
        'photo'=>$user->userable->photo
     ];


      return $this->respondWithToken($token,$data,'Success login');

        
   

}


protected function respondWithToken($token,$data,$message)
    {
        $date = Carbon::now();
        $carbon_date = Carbon::parse($date);
        $carbon_date->addHours(5);

        return response()->json([
            'status'=>true,
            'data'=>$data,
            'message'=>$message,            
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' =>   $carbon_date
        ]);
    }


    public function logout(){
        Auth::logout();              
      } 


    public function me(){

        $userId = Auth::id();

        $user = User::with('Userable')->where('id','=',$userId)->first();

                 
        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'Ocorreu um erro ao buscar o usuário'
            ], 200);
        }

              
        return response()->json([
            'status' => true,
            'message' => 'Usuário',           
            'data'=>$user,           
        ], 200);


    }


}
