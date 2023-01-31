<?php

namespace Database\Seeders;

use App\Models\LeaveType;
use Illuminate\Database\Seeder;

class LeaveTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        $types = [
            [
                'name' => 'Annual Leave',
                'description' => NULL,
                'entitlement_type' => 'custom',
                'number_of_days' => 0,
                'start_of_annual_cycle' => '2023-01-01',
                'allow_half_day' => 1,
                'allow_carry_forward' => 0,
                'maximum_allotment' => 0,
                'maximum_consecutive_days' => 0,
                'should_request_before' => 1,
                'user_id' => 1
            ],
            [
                'name' => 'Casual Leave',
                'description' => NULL,
                'entitlement_type' => 'custom',
                'number_of_days' => 0,
                'start_of_annual_cycle' => '2023-01-01',
                'allow_half_day' => 1,
                'allow_carry_forward' => 0,
                'maximum_allotment' => 0,
                'maximum_consecutive_days' => 0,
                'should_request_before' => 1,
                'user_id' => 1
            ],
            [
                'name' => 'Maternity Leave',
                'description' => NULL,
                'entitlement_type' => 'custom',
                'number_of_days' => 0,
                'start_of_annual_cycle' => '2023-01-01',
                'allow_half_day' => 1,
                'allow_carry_forward' => 0,
                'maximum_allotment' => 0,
                'maximum_consecutive_days' => 0,
                'should_request_before' => 1,
                'user_id' => 1
            ],
            [
                'name' => 'Study Leave',
                'description' => NULL,
                'entitlement_type' => 'custom',
                'number_of_days' => 0,
                'start_of_annual_cycle' => '2023-01-01',
                'allow_half_day' => 1,
                'allow_carry_forward' => 0,
                'maximum_allotment' => 0,
                'maximum_consecutive_days' => 0,
                'should_request_before' => 1,
                'user_id' => 1
            ],
            [
                'name' => 'Sick Leave',
                'description' => NULL,
                'entitlement_type' => 'custom',
                'number_of_days' => 0,
                'start_of_annual_cycle' => '2023-01-01',
                'allow_half_day' => 1,
                'allow_carry_forward' => 0,
                'maximum_allotment' => 0,
                'maximum_consecutive_days' => 0,
                'should_request_before' => 1,
                'user_id' => 1
            ],
            [
                'name' => 'Bereavement Leave',
                'description' => NULL,
                'entitlement_type' => 'custom',
                'number_of_days' => 0,
                'start_of_annual_cycle' => '2023-01-01',
                'allow_half_day' => 1,
                'allow_carry_forward' => 0,
                'maximum_allotment' => 0,
                'maximum_consecutive_days' => 0,
                'should_request_before' => 1,
                'user_id' => 1
            ]
        ];

        foreach ($types as $type){
            LeaveType::updateOrCreate(['name' => $type['name']], $type);
        }
    }
}
