<?php

namespace Database\Factories;

use App\Models\Program;
use App\Models\User;
use Spatie\Permission\Models\Role;
use App\Models\Staff;
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
        $staff = Staff::query()->inRandomOrder()->first();

        $superadminRole = Role::where('name', 'administrator')->first();
        $user = User::role($superadminRole)->get();
        return [
            'program_id' => Program::query()->inRandomOrder()->first()->id,
            'staff_id' => $staff->id,
            'batch_time' => $this->faker->time(),
            'start_date' => $this->faker->date,
            'end_date' => $this->faker->date,
            'room' => $this->faker->randomElement(['1', '2', '3', '4', '5', '6', '7', '8']),
            'status' => $this->faker->randomElement(['completed', 'current', 'pending',]),
            'user_id' => 1,
            'branch_id' => $staff->branch_id
        ];
    }
}
