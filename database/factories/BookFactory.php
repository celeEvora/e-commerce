<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Book>
 */
class BookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
           
            'ISBN' => fake()->numerify('###-##########'),
            'genre_id' => fake()->numberBetween(1, 11),
            'publisher' => fake()->sentence(),
            'author' => fake()->name(),
            'year' => fake()->year(),
            'title' => fake()->sentence(10),
            'description' => fake()->sentence(),
            'image' => fake()->imageUrl(),
            'buy_price' => fake()->randomFloat(2, 0, 100),
            'sale_price' => fake()->randomFloat(2, 0, 100),
            'stock' => fake()->numberBetween(0, 100),
            // 'created_at' => now()->format('Y-m-d H:i:s'),
            // 'updated_at' => now()->format('Y-m-d H:i:s'),
        ];
    }
}
