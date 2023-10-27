<?php

namespace Database\Factories;

use App\Helpers\Helper;
use App\Models\Branch;
use App\Models\Staff;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

/**
 * @extends Factory<Staff>
 */
class StaffFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $gender =$this->faker->randomElement(['Male', 'Female']);
        $type =$this->faker->randomElement(['instructor', 'administrator', 'counselor', 'cashier']);
        $branch = Branch::query()->inRandomOrder()->first()->id;
        return [
            'first_name' => $this->faker->firstName($gender),
            'last_name' => $this->faker->lastName(),
            'phone_number' => $this->faker->phoneNumber,
            'type'  => $type,
            'branch_id'  => $branch
        ];
    }

    public function configure(): static
    {
        return $this->afterCreating(static function (Staff $staff) {
            $userName = Helper::createUserName($staff->first_name, $staff->last_name);
            $user = $staff->user()->create([
                'username' => $userName,
                'email' => strtolower($staff->first_name.'.'.$staff->last_name.'@ipmcghana.com'),
                'password' => Hash::make($userName),
            ]);

            $role = Role::query()->where('name', $staff->type)->first();
            $user->roles()->syncWithoutDetaching($role?->id);
        });
    }
}
