<?php




// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
namespace Database\Seeders;
use App\Models\Book;
use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        // \App\Models\User::factory(10)->create();
        // \App\Models\Book::factory(10)->create();
        // \App\Models\Order::factory(10)->create();
        
        User::factory(15)->hasAddresses(1)->create();
        Book::factory(10)->create();
        Order::factory(20)->create();
        foreach(Order::pluck('order_id') as $order) {
            for ($i = 0; $i < 4; $i++) {
                DB::table('order_details')->insert([
                    'book_id' => fake()->unique(true)->randomElement(Book::pluck('book_id')),
                    'order_id' => $order,
                    'quantity_order' => fake()->numberBetween(1, 10),
                    // 'price' => fake()->randomFloat(null, 50, 400),
                    'price' => fake()-> randomElement(Book::pluck('sale_price')),
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
            }
        }



    }
}
