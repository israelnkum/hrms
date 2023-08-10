<?php

namespace Database\Seeders;

use App\Models\Position;
use Illuminate\Database\Seeder;

class PositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $positions = [
            'Administrator',
            'Univ. Printing Press Manager',
            'Sign Language Interpreter',
            'Assistant Pharmacist',
            'Chief Medical Assistant',
            'Midwife',
            'Project Officer',
            'Hardware Engineer',
            'Webmaster',
            'Software Engineer',
            'Driver',
            'Legal',
            'Safety Officer'
        ];

        foreach ($positions as $position) {
            Position::updateOrCreate(['name' => $position]);
        }
    }
}
