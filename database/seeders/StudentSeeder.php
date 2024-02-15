<?php

namespace Database\Seeders;

use App\Helpers\Helper;
use App\Models\Student;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 0; $i < 20; $i++) {
            Student::factory()->create([
                'student_number' => Helper::generateStudentNumber()
            ]);
        }
    }
}
