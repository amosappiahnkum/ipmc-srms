<?php

namespace Database\Seeders;

use App\Models\OngoingProgram;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OngoingProgramSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        OngoingProgram::factory()->count(20)->create();
    }
}
