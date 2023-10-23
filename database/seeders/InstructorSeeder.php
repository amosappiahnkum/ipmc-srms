<?php

namespace Database\Seeders;

use App\Models\Staff;
use Illuminate\Database\Seeder;

class InstructorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Staff::factory()->count(20)->create();
    }
}
