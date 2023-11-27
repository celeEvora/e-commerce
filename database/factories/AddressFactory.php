<?php

namespace Database\Factories;
use App\Models\User;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Address>
 */
class AddressFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $idUsers = User::pluck('user_id');
        return [
            //
            'user_id' => fake()->unique()->randomElement($idUsers),
            'street' => fake()->streetAddress(),
            'city' => fake()->city(),
            'state' => fake()->city(),
            'country' => fake()->country(),
            'postal_code' => fake()->numberBetween(1000,9999),            
        ];
    }
}
