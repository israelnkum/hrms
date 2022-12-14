<?php

namespace App\Http\Controllers;

use App\Models\EducationLevel;
use App\Models\Employee;
use App\Models\JobCategory;
use App\Models\Rank;
use App\Models\Department;
use App\Models\SubUnit;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function getCommonData()
    {

        $educationalLevels = EducationLevel::all();
        $jobCategories = JobCategory::all();
        $subUnits = SubUnit::all();
        $ranks = Rank::all();
        $departments = Department::all();
        $employees = Employee::count();
        $males = Employee::where('gender', 'Male')->count();
        $females = Employee::where('gender', 'Female')->count();

        $dashboardRanks = Rank::query()->withCount('employees');

        $daa = ['Deputy Registrar', 'Senior Assistant Registrar','Associate Professor','Lecturer','Senior Lecturer'];

        $dashboardRanks->whereIn('name', $daa);

        $topDepartment = Department::query()->withCount('employees')
            ->orderByDesc('employees_count')->limit(24);
        return response()->json([
            'educationalLevels' => $educationalLevels,
            'jobCategories' => $jobCategories,
            'subUnits' => $subUnits,
            'departments' => $departments,
            'ranks' => $ranks,
            'dashboard' => [
                'ranks' => $this->formatData($dashboardRanks),
                'departments' => $this->formatData($topDepartment),
            ],
            'employees' => [
                'total' => $employees,
                'male' => $males,
                'female' => $females
            ],
        ]);
    }


    public function formatData(Builder $builder): array
    {
        return [
            'series' => $builder->pluck('name'),
            'values' => $builder->pluck('employees_count')
        ];
    }
}
