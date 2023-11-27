<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
    use HasFactory;

    protected $table = 'orders';

    protected $fillable = [
        'status',
        'payment_method',
        'payment_date',
        'payment_amount'
    ];

    protected $primaryKey = 'order_id';

    public function user():BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function orders(): HasMany {
        return $this->hasMany(OrderDetail::class, 'order_id', 'order_id');
    } 
    
}
