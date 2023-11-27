<?php

namespace Database\Factories;
use App\Models\Book;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;



/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $price = Book::pluck('sale_price');
        $idUsers = User::pluck('user_id');
        return [
            
            // 'user_id' => fake()->numberBetween(1,10),
            'user_id' => fake()->randomElement($idUsers),
            'status' => 'placed',
            'payment_method' => fake()->randomElement(['VISA', 'MASTERCAD','Apple Pay']),
            'payment_amount' => fake()->randomFloat(2, 1, 200)
            
        ];
    }
}
