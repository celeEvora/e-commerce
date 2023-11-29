<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\OrderDetail;

class OrderDetailController extends Controller
{
    public function showOrderDetails($id) {
        // $orders = OrderDetail::where('order_id', $id)->get();
        $orders = OrderDetail::with('book')->where('order_id', $id)->get();

        return $orders;
    }
}
