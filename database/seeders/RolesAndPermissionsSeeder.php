<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // firstOrCreate permissions
        Permission::firstOrCreate(['name' => 'add employee', 'group' => 'Employee']);
        Permission::firstOrCreate(['name' => 'edit employee', 'group' => 'Employee']);
        Permission::firstOrCreate(['name' => 'delete employee', 'group' => 'Employee']);
        Permission::firstOrCreate(['name' => 'view employees', 'group' => 'Employee']);

        // firstOrCreate permissions
        Permission::firstOrCreate(['name' => 'add department', 'group' => 'Department']);
        Permission::firstOrCreate(['name' => 'edit department', 'group' => 'Department']);
        Permission::firstOrCreate(['name' => 'delete department', 'group' => 'Department']);
        Permission::firstOrCreate(['name' => 'view departments', 'group' => 'Department']);

        $role1 = Role::firstOrCreate(['name' => 'super-admin']);
        $role1->givePermissionTo(Permission::all());

        $user = User::query()->where('username', 'israelnkum')->first();
        $user->assignRole($role1);
    }
}
