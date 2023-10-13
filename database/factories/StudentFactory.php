<?php

namespace Database\Factories;

use App\Models\Sponsor;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $gender = $this->faker->randomElement(['Male', 'Female']);
        return [
            'first_name' => $this->faker->firstName($gender),
            'last_name' => $this->faker->lastName(),
            'phone_number' => $this->faker->phoneNumber(),
            'dob' => $this->faker->date(),
            'nationality' => $this->faker->country(),
            'gender' => $gender,
            'alt_phone_number' => $this->faker->phoneNumber(),
            'email' => $this->faker->email(),
            'address' => $this->faker->address(),
            'id_type' => $this->faker->randomElement([
                'Voter\'s ID',
                'Ghana Card',
                'Passport'
            ]),
            'id_number' => $this->faker->creditCardNumber,
            'sponsor_id' => Sponsor::query()->inRandomOrder()->first()->id,
            'user_id' => 1
        ];
    }
}
