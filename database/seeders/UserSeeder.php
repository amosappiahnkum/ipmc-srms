<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        $user = User::updateOrcreate(['username' => 'israelnkum'],
            [
                'username' => 'israelnkum',
                'email' => 'israelnkum@gmail.com',
                'password' => Hash::make(1)
            ]
        );

        $superAdminRole = Role::firstOrCreate(['name' => 'super-admin']);
        $superAdminRole->givePermissionTo(Permission::all());

//        $user = User::query()->where('username', 'israelnkum')->first();
        $user?->assignRole($superAdminRole);
    }
}
