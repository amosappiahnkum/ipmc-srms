<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        $user = User::updateOrcreate(['username' => 'israelnkum'], [
            'first_name' => 'Israel',
            'last_name' => 'Nkum',
            'username' => 'israelnkum',
            'email' => 'israelnkum@gmail.com',
            'password' => Hash::make(1),
            'phone_number' => '0249051415'
        ]);

//
//        $role = Role::firstOrCreate(['name' => 'Admin'])->first();
//
//        $user->roles()->attach($role->id);
    }
}
