<?php

namespace Database\Seeders;

use App\Models\TerminationReason;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TerminationReasonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $reasons = [
            'Contract Not Renewed',
            'Deceased',
            'Dismissed',
            'Laid-off',
            'Other',
            'Physically Disabled/Compensated',
            'Resigned',
            'Resigned - Company Requested',
            'Resigned - Self Proposed',
            'Retired'
        ];

        foreach ($reasons as $reason){
            TerminationReason::firstOrCreate(['reason' => $reason]);
        }
    }
}
