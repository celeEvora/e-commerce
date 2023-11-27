<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id('book_id');
            $table->string('ISBN');
            $table->foreignId('genre_id');
            $table->string('publisher');
            $table->string('author');
            $table->integer('year');
            $table->string('title');
            $table->string('description');
            $table->string('image');
            $table->decimal('buy_price', 10, 2, true);
            $table->decimal('sale_price', 10, 2, true);
            $table->unsignedInteger('stock');

            $table->timestamps();
            $table->foreign('genre_id')->references('genre_id')->on('genres');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
