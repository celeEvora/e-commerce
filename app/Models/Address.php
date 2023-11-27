<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class Address extends Model
{
    use HasFactory;

    protected $table = 'adresses';

    protected $fillable = [
        'street',
        'city',
        'state',
        'country',
        'postal_code'
        
    ];

    protected $primaryKey = 'address_id';

    protected $guarded = [
        'user_id'
    ];

    protected $hidden = [
        'street',
        'city',
        'state',
        'country',
        'postal_code'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class, 'user_id');
    }
}
