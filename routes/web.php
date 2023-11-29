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
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\OrderDetailController;

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


Route::controller(AuthController::class)->group(function(){
    Route::post('/register', 'register');
    Route::post('/login', 'login');
    Route::get('/logout', 'logout');
});

//private routes
Route::middleware(['auth:sanctum','is.admin'])->group(function() {

    Route::controller(BookController::class)->group(function(){
        Route::post('/catalog/store-book', 'store');
        Route::put('/catalog/{id}', 'update');
        Route::delete('/catalog/{id}', 'destroy');

    });

    Route::controller(UserController::class)->group(function(){
        Route::get('/users', 'showUsers');
        Route::delete('/users/{id}', 'destroy');
        Route::post('/admin-role/{id}', 'makeAdmin');
        Route::post('/remove-admin/{id}', 'removeAdmin');
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
    Route::get('/catalog/{id}', 'find');
});

Route::get('/genres',[GenreController::class, 'showGenres']);

Route::controller(CartController::class)->group(function(){
    Route::post('/cart-add/{id}', 'addToCart');
    Route::post('/cart-update', 'updateCart');
    Route::delete('/cart-remove/{id}', 'removeItem');
    Route::get('/cart', 'getCart');
});

Route::controller(CheckoutController::class)->group(function(){
    Route::post('/checkout', 'checkout');
});

Route::middleware('auth:sanctum')->group(function() {

    Route::get('/show-my-orders/{id}',[OrderController::class, 'showAllOrders']);
    Route::get('/order-details/{id}',[OrderDetailController::class, 'showOrderDetails']);

});


// route::view('/{path?}', 'index');
Route::view('/{path?}', 'index')->where('path', '.*');
//this allows to have any parameter on the path
