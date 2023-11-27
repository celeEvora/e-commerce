<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Book extends Model
{
    use HasFactory;

    protected $table = 'books';

    protected $fillable = [
        'ISBN',
        'genre_id',
        'publisher',
        'author',
        'year',
        'title',
        'description',
        'image',
        'buy_price',
        'sale_price',
        'stock'
    ];

    protected $primaryKey = 'book_id';

    // protected $guarded = [
        
    // ];

    // protected $casts = [
    //     'created_at' => 'datetime',
    //     'updated_at' => 'datetime'
    // ];

    public function genre():BelongsTo
{
    return $this->belongsTo(Genre::class, 'genre_id');
}

    public function orders(): HasMany {
        return $this->hasMany(OrderDetail::class, 'book_id', 'book_id');
    } 

}
