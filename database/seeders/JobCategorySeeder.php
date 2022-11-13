<?php

namespace Database\Seeders;

use App\Models\JobCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JobCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        $categories = [
            'Craft workers',
            'Laborers and Helpers',
            'Office and Clerical Workers',
            'Officials and Managers',
            'Operatives',
            'Professionals',
            'Sales Workers',
            'Service Workers',
            'Technicians',
            'Senior Members',
            'Junior Members',
            'Senior Staff'
        ];

        foreach ($categories as $category){
            JobCategory::updateOrCreate(['name' => $category]);
        }
    }
}
