<?php

namespace Database\Factories;

use App\Models\Staff;
use App\Models\Program;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OngoingProgram>
 */
class OngoingProgramFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'program_id' => Program::query()->inRandomOrder()->first()->id,
            'staff_id' => Staff::query()->inRandomOrder()->first()->id,
            'batch_time' => $this->faker->time(),
            'start_date' => $this->faker->date,
            'end_date' => $this->faker->date,
            'user_id' => 1
        ];
    }
}
