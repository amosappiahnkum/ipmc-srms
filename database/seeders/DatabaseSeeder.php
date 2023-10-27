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
            RolesAndPermissionsSeeder::class,
            BranchSeeder::class,
            SponsorSeeder::class,
            StudentSeeder::class,
            UserSeeder::class,
//            ProgramSeeder::class,
            StaffSeeder::class,
            OngoingProgramSeeder::class,
            RegistrationSeeder::class
        ]);
    }
}
