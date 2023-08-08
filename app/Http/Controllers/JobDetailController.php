<?php

namespace App\Http\Controllers;

use App\Helpers\SaveFile;
use App\Http\Requests\UpdateJobDetailRequest;
use App\Http\Resources\JobDetailResource;
use App\Models\ActivityLog;
use App\Models\Employee;
use App\Models\JobDetail;
use App\Models\PreviousPosition;
use App\Traits\InformationUpdate;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class JobDetailController extends Controller
{
    use InformationUpdate;

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
            $jobDetail = JobDetail::findOrFail($id);

            $request['joined_date'] = $this->getDate($request->joined_date);
            $request['contract_start_date'] = $this->getDate($request->contract_start_date);
            $request['contract_end_date'] = $this->getDate($request->contract_end_date);

            $this->infoDifference($jobDetail, $request->all());
            $this->requestUpdate($jobDetail);

            if ($request->has('file') && $request->file !== "null") {
                $saveFile = new SaveFile($jobDetail, $request->file('file'), $this->docPath, $this->allowedFiles);
                $photo = $saveFile->save($jobDetail->photo->file_name ?? null);

                $this->infoDifference($photo, [
                    'file_name' => $saveFile->fileName
                ]);

                $this->requestUpdate($photo);
            }

            if ($request->has('position_id') && $request->position_id != 'null') {
                PreviousPosition::updateOrCreate([
                    'position_id' => $request->position_id,
                    'employee_id' => $jobDetail->employee_id
                ], [
                    'position_id' => $request->position_id,
                    'employee_id' => $jobDetail->employee_id,
                    'user_id' => Auth::id()
                ]);
            }

            $user = Auth::user();

            ActivityLog::add($user->employee->name . 'update the job details for ' . $jobDetail->employee->name,
                'updated', [''], 'job-details')
                ->to($jobDetail)
                ->as($user);

            DB::commit();

            return new JobDetailResource($jobDetail);
        } catch (Exception $exception) {
            Log::error('Job Detail Update: ', [$exception]);

            return response()->json([
                'message' => $exception->getMessage()
            ], 400);
        }
    }

    public function getDate($date): ?string
    {
        if ($date !== 'null') {
            return Carbon::parse($date)->format('Y-m-d');
        }

        return null;
    }

}
