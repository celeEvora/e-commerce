<?php

use App\Http\Controllers\GenreController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\UserController; 
use App\Http\Controllers\OrderController; 
use App\Http\Controllers\CartController; 

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController; 

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
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
    Route::post('/cart-put', 'updateCart');
    Route::delete('/cart-remove/{id}', 'removeItem');
    Route::get('/cart', 'getCart');
});

