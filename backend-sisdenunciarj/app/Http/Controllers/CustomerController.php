<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\StoreCustomerRequest;

class CustomerController extends Controller
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
    public function store(StoreCustomerRequest $request)
    {
        $customer = new Customer();
        $customer->photo = '';
        $customer->save();
        
        if (!$customer) {
            return response()->json([
                'status' => false,
                'message' => 'Ocorreu um erro ao cadastrar o Cliente'
            ], 200);
        }

        $user =  $customer->user()->create([
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


        $user = User::where('id', $customer->user->id)->with(['Userable'])->first();             

     
        $token = Auth::login($user);


        $data = [
            'id'=>$user->id,
            'name'=>$user->name,
            'email'=>$user->email,
            'photo'=>$user->userable->photo
         ];

        // $data = [
        // 'id'=>$customer->user->id,
        // 'name'=>$customer->user->name,
        // 'email'=>$customer->user->email,
        // 'photo'=>$customer->photo
        // ];


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
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function show(Customer $customer)
    {
        if (!$customer) {
            return response()->json([
                'status' => false,
                'message' => 'Ocorreu um erro ao buscar o Cliente'
            ], 200);
        }
        return response()->json([
            'status' => true,
            'data' => $customer
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function edit(Customer $customer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Customer $customer)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function destroy(Customer $customer)
    {
        $customer->delete();

        return response()->json([
            'success' => true,
            'message' => 'Cliente excluido com sucesso'
        ]);
    }


      public function updatePhoto(Request $request){

        $userId = Auth::id();

        $customer = Customer::whereRelation('user','id','=',$userId)->first();
             

        if (!$customer) {
            return response()->json([
                'status' => false,
                'message' => 'Ocorreu um erro ao buscar o cliente'
            ], 200);
        }

        $photo = '';
       
       if ($request->hasFile('photo')) {   
                           
        
        if($customer->photo != null){
          $checkPhoto = $this->deletePhoto($customer->photo);
        }

        $filename = time() . '.' . $request->file('photo')->extension();

        $photo = $request->photo->storeAs('avatar',  $filename , 'public');

        $customer->photo = $photo;
        $customer->save();

        if (!$customer) {
            return response()->json([
                'status' => false,
                'message' => 'Ocorreu um erro ao atualizar a foto'
            ], 200);
         }


         return  response()->json([
            'status' => true,
            'message' => 'Foto atualizada com sucesso',
            'data' => $photo,   
        ], 200);       
    

        }


      }


      public function deletePhoto($photo){

        if (Storage::disk('public')->exists($photo)) {
           
          $result =  Storage::disk('public')->delete($photo);
        
          return $result;      

        }       

      }

}
