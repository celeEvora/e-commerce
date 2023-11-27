<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    use HasFactory;

    protected $table = 'order_details';

    protected $fillable = [
        'book_id',
        'order_id',
        'quantity_order',
        'price',
    ];

    public function book()
    {
        return $this->belongsTo(Book::class, 'book_id');
    }

    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id');
    }
}
