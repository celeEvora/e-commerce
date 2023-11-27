<?php

namespace App\Http\Controllers;

use App\Models\User; 
use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use DB;

class UserController extends Controller
{
    // public function store(){
        
    // }

    public function showUsers() {
        $users = User::all();
        return $users;
    }

    // public function store(Request $request)
    // {
    //     $rules = [
    //         'first_name' => 'required|string|min:1|max:100',
    //         'last_name' => 'required|string|min:1|max:100',
    //         'email' => 'required|email|max:80',
    //         'phone' => 'required|string|max:15',
    //         'is_admin' =>'required|boolean|max:1'
    //     ];
    // }

    public function destroy($id) {
        try {$user = User::destroy($id);
            return response()->json(['message' => 'User deleted successfully']);
            }catch (Exception $e) {
                return response($e->getMessage  (), 500);
            }
        
    }
}
