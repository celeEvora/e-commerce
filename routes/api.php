<?php

use App\Http\Controllers\GenreController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\UserController; 
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

Route::post('auth/register', [AuthController::class, 'create']);
Route::post('auth/login', [AuthController::class, 'login']);

// Route::middleware(['auth:sanctum'])->group(function () {
//     Route::get('auth/logout', [AuthController::class, 'logout']);
// });

// Route::controller(BookController::class)->group(function(){
//     Route::get('/catalog', 'showCatalog');
//     Route::get('/catalog-genre', 'ShowBookByGenre');
//     Route::post('/catalog/store-book', 'store');
//     Route::get('/catalog/{id}', 'find');
//     Route::put('/catalog/{id}', 'update');
//     Route::delete('/catalog/{id}', 'destroy');

// });

// Route::get('/genres',[GenreController::class, 'showGenres']);

// Route::controller(UserController::class)->group(function(){
//     Route::get('/users',[UserController::class, 'showUsers']);
//     Route::delete('/users/{id}',[UserController::class, 'destroy']);
// });

// Route::controller(BookController::class)->group(function(){
//     Route::get('/catalog', 'showCatalog']);
//     Route::get('/catalog', 'showCatalog']);
// });