<?php

namespace App\Http\Controllers;

use App\Http\Resources\LeaveRequestResource;
use App\Models\LeaveRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class LeaveManagementController extends Controller
{
    /**
     * @param Request $request
     *
     * @return JsonResponse|AnonymousResourceCollection
     */
    public function getLeaveRequests(Request $request): JsonResponse|AnonymousResourceCollection
    {
        if ($this->isHr() || $this->isSupervisor()) {
            $leaveRequestQuery = LeaveRequest::query();
            if ($this->isHr() && $this->isSupervisor()) {
                $leaveRequestQuery->when($request->has('status'), function ($q) use ($request) {
                    return $q->where('hr_status', strtolower($request->status))
                        ->orWhere('status', strtolower($request->status));
                });

                $leaveRequestQuery->where('supervisor_id', Auth::user()->employee->id);

                return LeaveRequestResource::collection($leaveRequestQuery->paginate(10));
            }

            if ($this->isHr()) {
                $leaveRequestQuery->when($request->has('status'), function ($q) use ($request) {
                    return $q->where('hr_status', strtolower($request->status));
                });

                $leaveRequestQuery->where('status', 'approved');

                return LeaveRequestResource::collection($leaveRequestQuery->paginate(10));
            }

            if ($this->isSupervisor()) {
                $leaveRequestQuery->when($request->has('status'), function ($q) use ($request) {
                    return $q->where('status', strtolower($request->status));
                });

                $leaveRequestQuery->where('supervisor_id', Auth::user()->employee->id);

                return LeaveRequestResource::collection($leaveRequestQuery->paginate(10));
            }
        }

        return response()->json([
            'status' => 'error',
            'message' => 'Not enough permissions'
        ], 400);
    }

    /**
     * @return JsonResponse
     */
    public function getFilterParams(): JsonResponse
    {
        $supervisors = LeaveRequest::with('approver:id,first_name,middle_name,last_name')
            ->distinct('supervisor_id')->get()->pluck('approver');
        $hrs = LeaveRequest::with('approvedHr:id,first_name,middle_name,last_name')
            ->distinct('hr_id')->get()->pluck('approvedHr');

        return response()->json([
            "status" => "success",
            "message" => "Filter Params",
            "data" => [
                'supervisors' => $supervisors,
                'hrs' => $hrs,
            ]
        ]);
    }
}
