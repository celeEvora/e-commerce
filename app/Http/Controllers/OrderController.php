<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Book;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;

class OrderController extends Controller
{
    public function showOrders() {
        $ordersPlaced = Order::where('status', 'placed')->get();
    
        return $ordersPlaced;
    }

    public function cancelOrder($orderId)
{
    try {
        $order = Order::findOrFail($orderId);
        
        $order->status = 'canceled';
        $order->save();

        $orderDetails = OrderDetail::where('order_id', $orderId)->get();

        foreach ($orderDetails as $orderDetail) {
            $book = Book::findOrFail($orderDetail->book_id);
            $book->stock += $orderDetail->quantity_order;
            $book->save();
        }

        return response()->json(['message' => 'Order canceled successfully']);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Error canceling order', 'error' => $e->getMessage()], 500);
    }
}


        public function showAllOrders($id) {
            $orders = Order::where('user_id', $id)->get();

            return $orders;
        }
}
