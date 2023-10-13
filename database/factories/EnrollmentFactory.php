<?php

namespace Database\Factories;

use App\Models\OngoingProgram;
use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Enrollment>
 */
class EnrollmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $program = OngoingProgram::query()->inRandomOrder()->first();
        $discount = (50 / 100) * $program?->fee;
        return [
            'student_id' => Student::query()->inRandomOrder()->first()->id,
            'ongoing_program_id' => $program?->id,
            'total_course_fee' => $program?->program?->fee,
            'registration_fee' => 0,
            'discounted_fee' => $discount,
            'net_payable_fee' => $program?->program?->fee - $discount,
            'created_at' => $this->faker->dateTimeBetween('2020-01-01'),
        ];
    }
}
