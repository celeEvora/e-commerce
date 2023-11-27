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
        Schema::create('order_details', function (Blueprint $table) {
            $table->foreignId('book_id');
            $table->foreignId('order_id');
            $table->unsignedInteger('quantity_order');
            $table->decimal('price', 10, 2, true);

            $table->timestamps();
            $table->foreign('book_id')->references('book_id')->on('books');
            $table->foreign('order_id')->references('order_id')->on('orders');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_details');
    }
};
