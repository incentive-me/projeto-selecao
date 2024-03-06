<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;


class BalanceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        for ($i = 5; $i < 16; $i++) {

            $value = rand(100000, 999999);

            DB::table('balances')->insert([
                'name' => 'Saldo teste' . $i,
                'description' => $faker->realText,
                'initial_value' => floatval($value),
                'remaining_value' => floatval($value),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
