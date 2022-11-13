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
            UserSeeder::class,
            JobCategorySeeder::class,
            SubUnitSeeder::class,
            RoleSeeder::class,
//            DepartmentSeeder::class,
//            RankSeeder::class,
            TerminationReasonSeeder::class,
            EducationLevelSeeder::class
        ]);
    }
}
