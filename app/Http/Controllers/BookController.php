<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use App\Models\Book;
use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function showCatalog() {
        $books = Book::all();
    
        return $books;
    }

    public function ShowBookByGenre() {
        $books = Book::with('Genre')->get();
        return $books;
    }

    public function store(Request $request) {

        try {
        $book = new Book();
        $book->ISBN = $request->ISBN;
        $book->genre_id = $request->genre_id;
        $book->publisher = $request->publisher;
        $book->author = $request->author;
        $book->year = $request->year;
        $book->title = $request->title;
        $book->description = $request->description;
        $book->image = $request->image;
        $book->buy_price = $request->buy_price;
        $book->sale_price = $request->sale_price;
        $book->stock = $request->stock;

        $book->save();

        return response()->json(['status' => 'success', 'message' => 'Book saved successfully']);
        } catch (Exception $e) {
            // Manejar el error y devolver una respuesta JSON indicando el error
            return response()->json(['status' => 'error', 'message' => 'Error saving book', 'error' => $e->getMessage()], 500);

    }

}

    public function find($id) {
        // $book = Book::find($id);
        $book = Book::with('genre')->find($id);
        return $book;
    }

    public function update(Request $request, $id) {

        try {
            $book = Book::findOrFail($request->id);
            $book->ISBN = $request->ISBN;
            $book->genre_id = $request->genre_id;
            $book->publisher = $request->publisher;
            $book->author = $request->author;
            $book->year = $request->year;
            $book->title = $request->title;
            $book->description = $request->description;
            $book->image = $request->image;
            $book->buy_price = $request->buy_price;
            $book->sale_price = $request->sale_price;
            $book->stock = $request->stock;

            $book-> save();
            return $book;
        } catch (Exception $e) {
            return response($e->getMessage(), 500);
        }

    }

    public function destroy($id) {
        try {$book = Book::destroy($id);
            // return $book;
            return response()->json(['message' => 'Book deleted successfully']);
            }catch (Exception $e) {
                return response($e->getMessage  (), 500);
            }
        
    }
}
