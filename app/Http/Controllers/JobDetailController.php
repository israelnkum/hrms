<?php

namespace App\Http\Controllers;

use App\Helpers\SaveFile;
use App\Http\Requests\UpdateJobDetailRequest;
use App\Http\Resources\JobDetailResource;
use App\Models\ActivityLog;
use App\Models\Employee;
use App\Models\JobDetail;
use App\Models\PreviousPosition;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class JobDetailController extends Controller
{
    protected string $docPath = 'docs/job_contract';

    protected array $allowedFiles = ['pdf'];

    /**
     * Display the specified resource.
     *
     * @param $employeeId
     *
     * @return JobDetailResource
     */
    public function show($employeeId): JobDetailResource
    {
        $employee = Employee::findOrFail($employeeId);

        return new JobDetailResource($employee->jobDetail);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateJobDetailRequest $request
     * @param $id
     *
     * @return JobDetailResource|JsonResponse
     */
    public function update(UpdateJobDetailRequest $request, $id): JobDetailResource|JsonResponse
    {
        DB::beginTransaction();
        try {
            $detail = JobDetail::findOrFail($id);

            $detail->update($request->all());

            if ($request->has('file') && $request->file !== "null") {
                $saveFile = new SaveFile($detail, $request->file('file'), $this->docPath, $this->allowedFiles);
                $saveFile->save();
            }

            PreviousPosition::updateOrCreate([
                'position_id' => $request->position_id,
                'employee_id' => $detail->employee_id
            ], [
                'position_id' => $request->position_id,
                'employee_id' => $detail->employee_id,
                'user_id' => Auth::id()
            ]);

            $user = Auth::user();

            ActivityLog::add($user->employee->name . 'update the job details for ' . $detail->employee->name,
                'updated', [''], 'job-details')
                ->to($detail)
                ->as($user);

            DB::commit();

            return new JobDetailResource($detail);
        } catch (Exception $exception) {
            Log::error('Job Detail Update: ', [$exception]);

            return response()->json([
                'message' => $exception->getMessage()
            ], 400);
        }
    }
}
