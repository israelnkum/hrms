<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLeaveRequestRequest;
use App\Http\Requests\UpdateLeaveRequestRequest;
use App\Http\Resources\LeaveRequestResource;
use App\Models\Employee;
use App\Models\Holiday;
use App\Models\LeaveRequest;
use App\Models\LeaveType;
use App\Notifications\LeaveRequestNotification;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;

class LeaveRequestController extends Controller
{

    private string $lastDate = '';

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     *
     * @return AnonymousResourceCollection
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $leaveRequestQuery = LeaveRequest::query();

        $leaveRequestQuery->when($request->has('status'), function ($q) use ($request) {
            return $q->where('status', $request->status);
        });

        return LeaveRequestResource::collection($leaveRequestQuery->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreLeaveRequestRequest $request
     *
     * @return JsonResponse
     */
    public function store(StoreLeaveRequestRequest $request): JsonResponse
    {
        DB::beginTransaction();
        try {
            $startDate = Carbon::parse($request->start_date)->format('Y-m-d');
            $daysRequested = $request->number_of_days;

            $days = $this->getLeaveDays($startDate, $daysRequested);

            if ($days < $daysRequested) {
                $this->getLeaveDays($startDate, $daysRequested + ($daysRequested - $days));
            }

            $leaveRequest = LeaveRequest::create([
                'employee_id' => Auth::user()->employee_id,
                'supervisor_id' => $request->employee_id,
                'leave_type_id' => $request->leave_type_id,
                'days_requested' => $daysRequested,
                'start_date' => $startDate,
                'reason' => $request->reason,
                'end_date' => $this->lastDate,
            ]);

            $supervisor = Employee::find($request->employee_id);

            Notification::route('mail', $supervisor->contactDetail->work_email)
                ->notify(new LeaveRequestNotification($supervisor));

            DB::commit();

            return response()->json(New LeaveRequestResource($leaveRequest));
        } catch (Exception $exception) {
            DB::rollBack();

            Log::error('Leave Request Error', [$exception]);

            return \response()->json('Something went wrong');
        }
    }

    /**
     * @param $startDate
     * @param $numberOfDays
     *
     * @return int
     */
    public function getLeaveDays($startDate, $numberOfDays): int
    {
        $holidays = $this->getHolidays();
        $start = Carbon::parse($startDate)->startOfDay();
        $endDate = Carbon::parse($startDate)->addWeekdays($numberOfDays)->startOfDay();

        return $start->diffInDaysFiltered(function (Carbon $date) use ($holidays) {
            $check = $date->isWeekday() && !$holidays->contains($date->format('Y-m-d'));

            if ($check) {
                $this->lastDate = $date->format('Y-m-d');
            }

            return $check;
        }, $endDate);
    }

    /**
     * @return Collection
     */
    public function getHolidays(): Collection
    {
        return Holiday::all()->pluck('start_date');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * @return Collection
     */
    public function getLeaveTypes(): Collection
    {
        return LeaveType::all();
    }

    /**
     * Display the specified resource.
     *
     * @param LeaveRequest $leaveRequest
     *
     * @return Response
     */
    public function show(LeaveRequest $leaveRequest)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param LeaveRequest $leaveRequest
     *
     * @return Response
     */
    public function edit(LeaveRequest $leaveRequest)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateLeaveRequestRequest $request
     * @param LeaveRequest $leaveRequest
     *
     * @return Response
     */
    public function update(UpdateLeaveRequestRequest $request, LeaveRequest $leaveRequest)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param LeaveRequest $leaveRequest
     *
     * @return Response
     */
    public function destroy(LeaveRequest $leaveRequest)
    {
        //
    }
}
