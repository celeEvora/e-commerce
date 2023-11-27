<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class GenreController extends Controller
{
    public function showGenres() {
        $genres = Genre::all();
    
        return $genres;
    }

    public function store(Request $request)
{
    try {
        $genre = new Genre();
        $genre->name = $request->name; 
        $genre->save();

        return response()->json(['status' => 'success', 'message' => 'Genre saved successfully']);
    } catch (\Exception $e) {
        return response()->json(['status' => 'error', 'message' => 'Error saving genre', 'error' => $e->getMessage()], 500);
    }
}
}
