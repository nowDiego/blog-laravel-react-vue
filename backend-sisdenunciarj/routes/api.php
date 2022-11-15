<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CustomerController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login',[AuthController::class,'login'])->name('login');

Route::get('/me',[AuthController::class,'me'])->name('me')->middleware(['auth:api','Customer']);

Route::post('/customer',[CustomerController::class,'store'])->name('customer.store');

Route::post('/customer/avatar',[CustomerController::class,'updatePhoto'])->name('customer.updatephoto')->middleware(['auth:api','Customer']);

Route::get('/post',[PostController::class,'index'])->name('post.index');

Route::post('/post',[PostController::class,'store'])->name('post.store')->middleware('auth:api');

Route::delete('/post',[PostController::class,'destroy'])->name('post.destroy')->middleware(['auth:api','Customer']);

Route::get('/post/all',[PostController::class,'all'])->name('post.all')->middleware(['auth:api','Administrator']);

Route::patch('/post/update/{post}',[PostController::class,'update'])->name('post.update')->middleware(['auth:api','Administrator']);

Route::delete('/post/delete/{post}',[PostController::class,'deletePost'])->name('post.deletePost')->middleware(['auth:api','Administrator']);

Route::get('/post/{post}',[PostController::class,'show'])->name('post.show');

Route::get('/me/mypost',[PostController::class,'mypost'])->name('mypost')->middleware(['auth:api','Customer']);

Route::post('/cep',[PostController::class,'viaCep'])->name('viacep')->middleware('auth:api');


Route::get('/category',[CategoryController::class,'index'])->name('category.index');



Route::post('/admin',[AdminController::class,'store'])->name('admin.store');

