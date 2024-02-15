<?php

namespace Database\Factories;

use App\Helpers\Helper;
use App\Models\Branch;
use App\Models\Sponsor;
use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

/**
 * @extends Factory<\App\Models\Student>
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
            'user_id' => 1,
            'branch_id' => Branch::query()->inRandomOrder()->first()->id,
        ];
    }

    public function configure(): static
    {
        return $this->afterCreating(static function (Student $student) {
            $userName = Helper::createUserName($student->first_name, $student->last_name);
            $user = $student->user()->create([
                'username' => $userName,
                'email' => strtolower($student->first_name.'.'.$student->last_name.'@ipmcghana.com'),
                'password' => Hash::make($userName),
            ]);

            $role = Role::query()->where('name', 'student')->first();
            $user->roles()->syncWithoutDetaching($role?->id);
        });
    }
}
