<?php

namespace Database\Seeders;

use App\Models\SubUnit;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubUnitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        $units = [
          'ICT Unit'
        ];

        foreach ($units as $unit){
            SubUnit::updateOrCreate(['name' => $unit]);
        }
    }
}
