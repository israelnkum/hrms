<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateJobDetailRequest;
use App\Http\Resources\NextOfKinResource;
use App\Models\ActivityLog;
use App\Models\Employee;
use App\Models\NextOfKin;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class NextOfKinController extends Controller
{
    public function show($employeeId): NextOfKinResource
    {
        $employee = Employee::findOrFail($employeeId);

        return new NextOfKinResource($employee->nextOfKin);
    }

    /**
     * @param UpdateJobDetailRequest $request
     * @param $id
     *
     * @return NextOfKinResource|JsonResponse
     */
    public function update(UpdateJobDetailRequest $request, $id): NextOfKinResource|JsonResponse
    {
        DB::beginTransaction();
        try {
            $detail = NextOfKin::updateOrCreate([
                'employee_id' => $request->employee_id
            ], [
                'name' => $request->name,
                'employee_id' => $request->employee_id,
                'phone_number' => $request->phone_number,
                'alt_phone_number' => $request->alt_phone_number,
                'address' => $request->address,
                'email' => $request->email
            ]);

            $user = Auth::user();

            $employee = Employee::findOrFail($request->employee_id);

            ActivityLog::add($user->employee->name . 'update the next of kin details for ' . $employee->name,
                'updated', [''], 'next of kin')
                ->to($detail)
                ->as($user);

            DB::commit();

            return new NextOfKinResource($detail);
        } catch (Exception $exception) {
            Log::error('Next of Kin Update: ', [$exception]);

            return response()->json([
                'message' => $exception->getMessage()
            ], 400);
        }
    }
}
