<?php

namespace Database\Seeders;

use App\Models\EducationLevel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EducationLevelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $levels = [
            ['name' => 'Junior High/Secondary School'],
            ['name' => 'Senior Secondary School'],
            ['name' => 'Undergraduate'],
            ['name' => 'Graduate'],
            ['name' => 'Post Graduate'],
        ];

        foreach ($levels as $level){
            EducationLevel::firstOrCreate($level);
        }
    }
}
