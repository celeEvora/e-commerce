<?php

namespace App\Http\Controllers;

use App\Models\User; 
use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use DB;

class UserController extends Controller
{

    public function showUsers() {
        $users = User::all();
        return $users;
    }

    public function destroy($id) {
        try {$user = User::destroy($id);
            return response()->json(['message' => 'User deleted successfully']);
            }catch (Exception $e) {
                return response($e->getMessage  (), 500);
            }
        
    }

    public function makeAdmin(Request $request, $id)
    {
        try {
            $user = User::findOrFail($id);
            $user->is_admin = 1; 
            $user->save();

            return response()->json(['success' => true, 'message' => 'User is now an admin']);
        } catch (\Exception $e) {
            \Log::error('Error making user admin: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }

    public function removeAdmin($id)
    {
        try {
            $user = User::findOrFail($id);
            $user->is_admin = 0; 
            $user->save();

            return response()->json(['success' => true, 'message' => 'Admin privileges removed']);
        } catch (\Exception $e) {
            \Log::error('Error removing admin privileges: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }
}
