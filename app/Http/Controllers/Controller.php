<?php

namespace App\Http\Controllers;

use App\Http\Resources\CelebrationResource;
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
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function getCommonData()
    {
        $loggedInUser  = Auth::user();


        if (!$loggedInUser) {
            return response()->json([
                'message' => 'Unauthenticated'
            ], 422);
        }

        $isStaff = $loggedInUser->getRoleNames()->contains('staff') || $loggedInUser->getRoleNames()->contains('admin');
        $educationalLevels = EducationLevel::all();
        $jobCategories = JobCategory::all();
        $subUnits = SubUnit::all();
        $ranks = Rank::all();
        $departments = Department::all();
        $employees = Employee::count();
        $males = Employee::where('gender', 'Male')->count();
        $females = Employee::where('gender', 'Female')->count();

        $celebrations = Employee::query();

        $celebrations->when($isStaff, static function ($q) {
           return $q->where('department_id', Auth::user()->employee->department_id);
        })->orderBy('dob')->limit(20);


        $celebrations = $celebrations->get();

        $dashboardRanks = Rank::query()->withCount('employees');

        $daa = ['Deputy Registrar', 'Senior Assistant Registrar', 'Associate Professor', 'Lecturer', 'Senior Lecturer'];

        $dashboardRanks->whereIn('name', $daa);

        $topDepartment = Department::query()->withCount('employees')
            ->orderByDesc('employees_count')->limit(24);

        return response([
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
            'celebrations' => CelebrationResource::collection($celebrations)
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
