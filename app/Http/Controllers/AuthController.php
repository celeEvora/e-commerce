<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Facade;

class AuthController extends Controller
{

    public function register(Request $request) {
    try {
        $data = $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|string|unique:users',
            'password' => 'required|string|min:8',
            'phone' => 'required|string'
        ]);
        User::create($data);

        $user = User::where('email', $request->email)->first();

        return response()->json([
            'message' => 'User registered successfully!',
            'user' => $user,
            'token' => $user->createToken('API TOKEN')->plainTextToken,
        ], 201);
    } catch (Exception $e) {
        return response()->json(['error' => 'Couldn\'t register user', $e->getMessage()], 500);
    }
    }


public function login (Request $request) {
    if(Auth::check()) return response()->json(['msg' => "You are already authenticated!"], 200);
    $validator = Validator::make($request->all(), [
        'email' => ['required', 'email'],
        'password' => ['required']
    ]);
    if($validator-> fails()) return response()->json(['errors' => $validator->errors()], 400);
    if(Auth::attempt(["email" => $request->email, "password" => $request->password])){
        $request->session()->regenerate();
        $user = User::where('email', $request->email)->first();
        return response()->json(["user" => Auth::user(),
        'token' => $user->createToken('API TOKEN')->plainTextToken,
    ], 200);
    }
    return response()->json(['errors' => 'Invalid credentials'], 400);
}

public function logout () {
    Auth::logout();
    return response()->json(['is_auth' => Auth::check()], 200);
}

}