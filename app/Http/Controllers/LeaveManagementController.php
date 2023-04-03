<?php

namespace App\Http\Controllers;

use App\Http\Resources\LeaveRequestResource;
use App\Models\LeaveRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class LeaveManagementController extends Controller
{
    public function getLeaveRequests(Request $request): AnonymousResourceCollection
    {
        $leaveRequestQuery = LeaveRequest::query();

        if ($this->getRoles()->contains('hr')) {
            $leaveRequestQuery->when($request->has('status'), function ($q) use ($request) {
                return $q->where('hr_status', $request->status);
            });

            $leaveRequestQuery->where('status', 'approved');
        }else {
            $leaveRequestQuery->when($request->has('status'), function ($q) use ($request) {
                return $q->where('status', $request->status);
            });

            $leaveRequestQuery->where('supervisor_id', Auth::user()->employee->id);
        }

        return LeaveRequestResource::collection($leaveRequestQuery->paginate(10));
    }
}
