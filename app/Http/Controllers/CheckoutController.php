<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Address;
use App\Models\Book;
use App\Models\User;


class CheckoutController extends Controller
{
    public function checkout(Request $request)
    {
        try {
        $request->validate([
            'payment_method' => 'required|in:CREDIT CARD,APPLE PAY,PAYPAL',
            'street' => 'required|string',
            'city' => 'required|string',
            'state' => 'required|string',
            'country' => 'required|string',
            'postal_code' => 'required|string',
            'payment_amount' => 'required|numeric',
            'books' => 'required|array',
            'books.*.book_id' => 'required|exists:books,book_id',
            'books.*.quantity' => 'required|numeric|min:1',
            'books.*.sale_price' => 'required|string',
        ]);

        //to obtain an auth user
        $user = auth()->user();

        $address = new Address([
            'street' => $request->input('street'),
            'city' => $request->input('city'),
            'state' => $request->input('state'),
            'country' => $request->input('country'),
            'postal_code' => $request->input('postal_code'),
        ]);

        $user->addresses()->save($address);

        $order = new Order([
            'payment_method' => $request->input('payment_method'),
            'payment_amount' => $request->input('payment_amount'),
            'status' => 'placed', 
        ]);


        $user->orders()->save($order);

        foreach ($request->input('books') as $book) {
            $orderDetail = new OrderDetail([
                'book_id' => $book['book_id'],
                'order_id' => $order->order_id,
                'quantity_order' => $book['quantity'],
                'price' => $book['sale_price'],
            ]);

            $orderDetail->save();

            $bookModel = Book::findOrFail($book['book_id']);
            $bookModel->stock -= $book['quantity'];
            $bookModel->save();
        }


        $this->clearCart();

        return response()->json(['success' => true, 'message' => 'Order placed successfully']);
    } catch (\Exception $e) {
        \Log::error('Error during checkout: ' . $e->getMessage());
        return response()->json(['error' => 'Internal Server Error'], 500);
    }
    }

    protected function clearCart()
    {
        session(['cart' => []]);
    }
}
