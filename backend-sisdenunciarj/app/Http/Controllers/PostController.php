<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use App\Http\Requests\StorePostRequest;
use Illuminate\Support\Facades\Storage;
use PHPOpenSourceSaver\JWTAuth\Claims\Custom;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
       $request->category==null || $request->category==''?

          
            $posts = Post::with('category')->whereRelation('statusPost','status','=','Ativo')->orderByDesc('created_at')
            ->paginate(12)
        :

        $posts = Post::with('category')->whereRelation('statusPost','status','=','Ativo')->whereRelation('category','slug','=',$request->category)->orderByDesc('created_at')
        ->paginate(12)
        ;

        
        return response()->json([
            'status' => true,
            'message' => 'Postagens',
            'data'=>$posts,           
        ], 200);
    }


    public function all(Request $request)
    {

        $posts = Post::with('category','statusPost')->orderByDesc('created_at')->get();
        // ->paginate(12);

        
        return response()->json([
            'status' => true,
            'message' => 'Postagens',
            'data'=>$posts,           
        ], 200);


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
    public function store(StorePostRequest $request)
    {
    
     $userId = Auth::id();    
      
     $customer = Customer::whereRelation('user','id','=',$userId)->first();

     if (!$customer) {
        return response()->json([
            'status' => false,
            'message' => 'Ocorreu um erro ao cadastrar a Postagem'
        ], 200);
    }

     
      $photo = '';
       
       if ($request->hasFile('photo')) {     
             
        $filename = time() . '.' . $request->file('photo')->extension();

        $photo = $request->photo->storeAs('images',  $filename , 'public');
      
       }


        $post = new Post();
        $post->title = $request->title ;
        $post->content = $request->content ;
        $post->photo = $photo!=''?$photo:null;
        $post->customer_id =  $customer->id;
        $post->category_id =  $request->category;
        $post->type_post_id =  1;
        $post->status_post_id =  1;
        
        $post->save();


        if (!$post) {
            return response()->json([
                'status' => false,
                'message' => 'Ocorreu um erro ao cadastrar a Postagem'
            ], 200);
        }

        $address =  $post->address()->create([
            'street' => $request->street,
            'city' => $request->city,
            'state' => $request->state,
            'number'=>$request->number!=''?$request->number:null,   
            'zip_code' => $request->zip_code,            
            'maps' => $request->maps!=''?$request->maps:null           
        ]);

       
        if (!$address) {
            return response()->json([
                'success' => false,
                'message' => 'Ocorreu um erro ao cadastrar o endereço'
            ], 200);
        }


        return  response()->json([
            'status' => true,
            'message' => 'Post cadastrado',
            'data' => $post,            
        ], 200);


    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        if (!$post) {
            return response()->json([
                'status' => false,
                'message' => 'Ocorreu um erro ao buscar o Cliente'
            ], 200);
        }
        return response()->json([
            'status' => true,
            'data' => $post
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Post $post)
    {           
        if (!$post) {
            return response()->json([
                'status' => false,
                'message' => 'Ocorreu um erro ao buscar o cliente'
            ], 200);
        }

        $status = $request->status == "Ativo"? 2 : 1;

        $post->status_post_id = $status;

        $post->save();

        if (!$post) {
            return response()->json([
                'status' => false,
                'message' => 'Ocorreu um erro ao buscar o cliente'
            ], 200);
        }

        return response()->json([
            'status' => true,
            'message' => 'Postagem atualizada com sucesso',
            'data'=>$post->load('category','statusPost'),           
        ], 200);




    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {

        $userId = Auth::id();

        $customer = Customer::with('posts')->whereRelation('user','id','=',$userId)->first();
             
        if (!$customer) {
            return response()->json([
                'status' => false,
                'message' => 'Ocorreu um erro ao buscar o cliente'
            ], 200);
        }

        
    //    $post = $customer->posts()->where('id',$request->id)->delete();

           $post = $customer->posts()->where('id',$request->id)->first();

            
        if($post->photo != null){
            $checkPhoto = $this->deletePhoto($post->photo);
          }
  
           $post->delete();

        if (!$post) {
            return response()->json([
                'status' => false,
                'message' => 'Ocorreu um erro ao excluir a postagem'
            ], 200);
        }

           
        return response()->json([
            'status' => true,
            'message' => 'Postagem excluida com sucesso',
            'data'=>$post
        ]);
    }





    public function viaCep(Request $request){

        $url = "https://viacep.com.br/ws/{$request->cep}/json/";

        $response = Http::get($url);
         
             
        $error = $response->object();

       
          if(isset($error->erro)){
            return response()->json([
           "status"=>false,
           "message"=>'Invalid Cep'
            ]);
        }

        return response()->json([
             "status"=>true,
            "data"=> $response->json()
        ]
        );

    }




    public function myPost(Request $request){
       
        $userId = Auth::id();

        // $customer = Customer::with('posts.category','user')->whereRelation('user','id','=',$userId)->first();
        $customer = Customer::whereRelation('user','id','=',$userId)->first();

        $posts = Post::with('category')->whereRelation('customer','customer_id','=',$customer->id)->orderByDesc('created_at')
        ->paginate(12);


        return response()->json([
            'status' => true,
            'message' => 'Postagens',           
            'data'=>$posts,           
        ], 200);
        

    }


    public function deletePhoto($photo){

        if (Storage::disk('public')->exists($photo)) {
           
          $result =  Storage::disk('public')->delete($photo);
        
          return $result;      

        }       

      }



    public function deletePost(Request $request,Post $post){
      

        if (!$post) {
            return response()->json([
                'status' => false,
                'message' => 'Ocorreu um erro ao excluir a postagem'
            ], 200);
        }


        $post->delete();

           
        return response()->json([
            'status' => true,
            'message' => 'Postagem excluida com sucesso',           
        ]);






    }




}
