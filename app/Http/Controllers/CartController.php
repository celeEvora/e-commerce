<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Book;

class CartController extends Controller
{

    public function addToCart($id)
    {
        try {
            $book = Book::findOrFail($id);
    
            $cart = session()->get('cart', []);
    
            if (isset($cart[$id])) {
                if ($cart[$id]['quantity'] < $book->stock) {
                    $cart[$id]['quantity']++;
                } else {
                    return response()->json(['success' => false, 'message' => 'Cannot add more items to cart. Stock limit reached.']);
                }
            } else {
                $cart[$id] = [
                    "book_id" => $book->book_id,
                    "title" => $book->title,
                    "quantity" => 1,
                    "sale_price" => $book->sale_price,
                    "image" => $book->image,
                    "author" => $book->author,
                    "stock" => $book->stock,
                ];
            }
    
            session()->put('cart', $cart);
    
            return response()->json(['success' => true, 'message' => 'Product added to cart successfully', 'cart' => array_values($cart)]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Error adding product to cart', 'error' => $e->getMessage()]);
        }
    }
    

    public function updateCart(Request $request)
{
    try {
        $id = $request->input('id');
        $quantity = $request->input('quantity');

        $cart = session()->get('cart', []);

        if (isset($cart[$id])) {
            $cart[$id]['quantity'] = $quantity;

            session()->put('cart', $cart);

            return response()->json(['success' => true, 'message' => 'Cart updated successfully', 'cart' => array_values($cart)]);
        } else {
            return response()->json(['success' => false, 'message' => 'Product not found in cart']);
        }
    } catch (\Exception $e) {
        return response()->json(['success' => false, 'message' => 'Error updating cart', 'error' => $e->getMessage()]);
    }
}


    public function removeItem($id)
{
    try {
        $cart = session()->get('cart', []);

        if (isset($cart[$id])) {
            unset($cart[$id]);

            session()->put('cart', $cart);

            return response()->json(['success' => true, 'message' => 'Product removed from cart successfully', 'cart' => array_values($cart)]);
        } else {
            return response()->json(['success' => false, 'message' => 'Product not found in cart']);
        }
    } catch (\Exception $e) {
        return response()->json(['success' => false, 'message' => 'Error removing product from cart', 'error' => $e->getMessage()]);
    }
}


    
    public function getCart()
    {
        $cart = session()->get('cart', []);
        return response()->json(['cart' => $cart]);
    }
}
