<?php

namespace App\Imports;

use App\Models\Department;
use App\Models\Employee;
use App\Models\Rank;
use Carbon\Carbon;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithProgressBar;

class EmployeeImport implements ToModel, WithHeadingRow, WithProgressBar
{
    use Importable;

    /**
     * @return Employee
     */
    public function model(array $collection)
    {
        $data = $collection;

        $rank = null;
        if ($data['rank'] != ''){
            $rank = Rank::firstOrCreate([
                'name' => $data['rank']
            ]);
        }

        $gtec_placement = null;
        if ($data['gtec_placement'] != ''){
            $gtec_placement = Rank::firstOrCreate([
                'name' => $data['gtec_placement']
            ]);
        }

        $department = Department::firstOrCreate([
            'name' => $data['department']
        ]);

        $employee = Employee::updateOrCreate([
            'first_name' => $data['first_name'] ?: '',
            'middle_name' => $data['middle_name'] ?: '',
            'last_name' => $data['last_name'] ?: '',
            'staff_id' => $data['staff_id'] ?: '',
        ],[
            'title' => $data['title'] ?: '',
            'first_name' => $data['first_name'] ?: '',
            'middle_name' => $data['middle_name'] ?: '',
            'last_name' => $data['last_name'] ?: '',
            'staff_id' => $data['staff_id'] ?: '',
            'dob' => Carbon::parse(\PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($data['date_of_birth']))->format('Y-m-d'),
            'gender' => $data['gender'] ?: '',
            'ssnit_number' => $data['ssnit_no'] ?: '',
            'gtec_placement' => $gtec_placement?->id,
            'qualification' => $data['qualification'] ?: '',
            'rank_id' => $rank->id,
            'department_id' => $department->id,
            'user_id' => 1
        ]);

        $employee->contactDetail()->create([
            'telephone' => $data['phone_number'] ?: '',
            'work_telephone' => $data['other_phone_number'] ?: '',
            'work_email' => $data['work_email'] ?: '',
            'other_email' => $data['personal_email'] ?: '',
            'user_id' => 1,
        ]);

        $employee->jobDetail()->create([
            'status' => $data['status']
        ]);

        return $employee;
    }
}
