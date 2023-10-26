<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run(): void
    {
        $this->call([
            BranchSeeder::class,
            UserSeeder::class,
//            ProgramSeeder::class,
//            InstructorSeeder::class,
//            SponsorSeeder::class,
//            StudentSeeder::class,
//            OngoingProgramSeeder::class,
//            RegistrationSeeder::class,
            RolesAndPermissionsSeeder::class,
        ]);
    }
}
