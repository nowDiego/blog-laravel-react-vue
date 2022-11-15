<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
       
        $admin = new Admin();       
        $admin->save();
        
        if (!$admin) {
            return response()->json([
                'status' => false,
                'message' => 'Ocorreu um erro ao cadastrar o Administrador'
            ], 200);
        }

        $user =  $admin->user()->create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)        
        ]);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Ocorreu um erro ao cadastrar o usuario'
            ], 200);
        }


        $user = User::where('id', $admin->user->id)->with(['Userable'])->first();             

     
        $token = Auth::login($user);


        $data = [
            'id'=>$user->id,
            'name'=>$user->name,
            'email'=>$user->email,           
         ];

       

        return  response()->json([
            'status' => true,
            'message' => 'Cliente cadastrado',
            'data' => $data,
            'access_token'=>$token,
            'user'=>$user
        ], 200);




    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Admin  $admin
     * @return \Illuminate\Http\Response
     */
    public function show(Admin $admin)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Admin  $admin
     * @return \Illuminate\Http\Response
     */
    public function edit(Admin $admin)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Admin  $admin
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Admin $admin)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Admin  $admin
     * @return \Illuminate\Http\Response
     */
    public function destroy(Admin $admin)
    {
        //
    }
}
