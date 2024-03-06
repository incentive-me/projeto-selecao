<?php

namespace Database\Factories;

use App\Models\Balance;
use Illuminate\Database\Eloquent\Factories\Factory;

class BalanceFactory extends Factory
{
    protected $model = Balance::class;

    public function definition(): array
    {
        $initialValue = $this->faker->randomFloat(2, 0, 1000);
        return [
            'name' => $this->faker->name,
            'description' => $this->faker->title,
            'initial_value' => $initialValue,
            'remaining_value' => $initialValue,
        ];
    }
}
