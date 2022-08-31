<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $departments = [
            ['name' => 'ACCOUNTING'],
            ['name'=> 'BUILDING TECHNOLOGY'],
            ['name'=> 'CIVIL ENGINEERING'],
            ['name'=> 'CERAMICS'],
            ['name'=> 'COMPUTER SCIENCE'],
            ['name'=> 'ELECTRICALS'],
            ['name'=> 'FASHION'],
            ['name'=> 'GRAPHICS'],
            ['name'=> 'HOSPITALITY'],
            ['name'=> 'LIBERAL STUDIES'],
            ['name'=> 'MECH (PLANT AND PRO)'],
            ['name'=> 'MARKETING'],
            ['name'=> 'MATH AND STATS'],
            ['name'=> 'PROCUREMENT & SUPPLY'],
            ['name'=> 'PAINTING'],
            ['name'=> 'SCULPTURE TECHNOLOGY'],
            ['name'=> 'SEC AND MGMT'],
            ['name'=> 'TEXTILES'],
            ['name'=> 'TOURISM MANAGEMENT'],
            ['name'=> 'MECH (AUTO & REF)'],
            ['name'=> 'INTERIOR'],
            ['name'=> 'INDUSTRIAL HEALTH'],
            ['name'=> 'PLANNING'],
            ['name'=> 'INDUSTRIAL LIAISON'],
            ['name'=> 'REGISTRARS OFFICE'],
            ['name'=> 'ESTATE']
        ];

        foreach ($departments as $department){
            Department::firstOrCreate($department);
        }
    }
}
