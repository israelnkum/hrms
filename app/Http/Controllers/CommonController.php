<?php

namespace App\Http\Controllers;

use App\Http\Resources\EmployeeResource;
use App\Models\Employee;
use App\Models\LeaveRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Spatie\Permission\Models\Permission;

class CommonController extends Controller
{

    public function getAllPermissions($id): JsonResponse
    {
        $employee = Employee::find($id)->userAccount;

        $permissions = Permission::all()->groupBy('group');

        if (!$employee) {
            return response()->json([
                'userPermissions' => [],
                'permissions' => $permissions
            ]);
        }
        $userPermissions = $employee->getAllPermissions()->pluck('id');

        return response()->json([
            'userPermissions' => $userPermissions,
            'permissions' => $permissions
        ]);
    }

    public function assignPermissions(Request $request): JsonResponse
    {
        $userAccount = Employee::find($request->employeeId)->userAccount;

        if (!$userAccount) {
            return response()->json('No User Account Found', 422);
        }

        DB::beginTransaction();
        try {
            $selectedPermissions = Permission::query()->whereIn('id', $request->permissions)->get()->pluck('name');

            $currentPermissions = $userAccount->getPermissionsViaRoles()->pluck('name');

            $userAccount->syncPermissions($selectedPermissions->diff($currentPermissions));
            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Permission(s) Added',
                'data' => new EmployeeResource($userAccount->employee)
            ]);
        } catch (\Exception $exception) {
            DB::rollBack();

            Log::error('Assign Permissions: ', [$exception]);

            return response()->json([
                'status' => 'success',
                'message' => 'Something went wrong'
            ], 400);
        }
    }

    /**
     * @return array
     */
    public function getNotificationNavs(): array
    {
        if ($this->isSupervisor() && $this->isHr()) {
            $approved = LeaveRequest::where('hr_status', 'approved')->orWhere('status', 'approved')->count();
            $pending = LeaveRequest::where('hr_status', 'pending')->orWhere('status', 'pending')->count();
            return [
                'leave_request' => [
                    'approved' => $approved,
                    'pending' => $pending
                ],
                'total' => $approved + $pending
            ];
        }

        if ($this->isSupervisor()) {
            $approved = LeaveRequest::where('status', 'approved')->count();
            $pending = LeaveRequest::where('status', 'approved')->count();
            return [
                'leave_request' => [
                    'approved' => $approved,
                    'pending' => $pending
                ],
                'total' => $pending + $approved
            ];
        }

        if ($this->isHr()) {
            $approved = LeaveRequest::where('hr_status', 'approved')->count();
            $pending = LeaveRequest::where('hr_status', 'pending')->count();
            return [
                'leave_request' => [
                    'approved' => $approved,
                    'pending' => $pending
                ],
                'total' => $pending + $approved
            ];
        }

        return [
            'leave_request' => [
                'approved' => 0,
                'pending' => 0
            ]
        ];
    }
}
