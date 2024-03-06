<?php

namespace Database\Factories;

use App\Models\Balance;

use App\Models\Payment;
use Illuminate\Database\Eloquent\Factories\Factory;

class PaymentFactory extends Factory
{
    protected $model = Payment::class;

    public function definition(): array
    {

        return [
            'name' => $this->faker->name,
            'description' => $this->faker->title,
            'value' => $this->faker->randomFloat(2, 10, 1000),
            'balance_id' => Balance::factory()->create()->id,
        ];
    }
}
