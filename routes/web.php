<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;


use App\Http\Controllers\GenreController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\UserController; 
use App\Http\Controllers\OrderController; 
use App\Http\Controllers\AuthController; 

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Route::get('/', function () {
//     return view('index');
// });

// Route::post('/register',

// Route::post('/login', function (Request $request) {
//     if(Auth::check()) return response()->json(['msg' => "You are already authenticated!"], 200);
//     $validator = Validator::make($request->all(), [
//         'email' => ['required', 'email'],
//         'password' => ['required']
//     ]);
//     if($validator-> fails()) return response()->json(['errors' => $validator->errors()], 400);
//     if(Auth::attempt(["email" => $request->email, "password" => $request->password])){
//         $request->session()->regenerate();
//         return response()->json(["user" => Auth::user()], 200);
//     }
//     return response()->json(['errors' => 'Invalid credentials'], 400);
// })-> name('login');

// Route::get('/logout', function() {
//     Auth::logout();
//     return response()->json(['is_auth' => Auth::check()], 200);
// });

Route::controller(AuthController::class)->group(function(){
    Route::post('/register', 'register');
    Route::post('/login', 'login');
    Route::get('/logout', 'logout');
});

//private routes
Route::middleware(['auth:sanctum','is.admin'])->group(function() {

    Route::controller(BookController::class)->group(function(){
        Route::post('/catalog/store-book', 'store');
        Route::get('/catalog/{id}', 'find');
        Route::put('/catalog/{id}', 'update');
        Route::delete('/catalog/{id}', 'destroy');

    });

    Route::controller(UserController::class)->group(function(){
        Route::get('/users', 'showUsers');
        Route::delete('/users/{id}', 'destroy');
    });

    Route::controller(OrderController::class)->group(function(){
        Route::get('/orders', 'showOrders');
        Route::put('/orders/{orderId}', 'cancelOrder');
    });

    Route::post('/genres',[GenreController::class, 'store']);

});

// public routes
Route::controller(BookController::class)->group(function(){
    Route::get('/catalog', 'showCatalog');
    Route::get('/catalog-genre', 'ShowBookByGenre');
});

Route::get('/genres',[GenreController::class, 'showGenres']);




// route::view('/{path?}', 'index');
Route::view('/{path?}', 'index')->where('path', '.*');
//this allows to have any parameter on the path
