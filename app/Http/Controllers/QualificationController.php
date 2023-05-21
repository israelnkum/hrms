<?php

namespace App\Http\Controllers;

use App\Helpers\SaveFile;
use App\Http\Requests\StoreQualificationRequest;
use App\Http\Requests\UpdateQualificationRequest;
use App\Http\Resources\QualificationResource;
use App\Models\Education;
use App\Models\Employee;
use App\Traits\InformationUpdate;
use App\Traits\UsePrint;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class QualificationController extends Controller
{
    protected string $docPath = 'docs/qualifications';

    protected array $allowedFiles = ['pdf', 'jpeg', 'png'];

    use UsePrint, InformationUpdate;

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     *
     * @return AnonymousResourceCollection|Response|BinaryFileResponse
     */
    public function index(Request $request): Response|BinaryFileResponse|AnonymousResourceCollection
    {
        $educations = Education::query();

        /* if ($request->has('export') && $request->export === 'true'){
             return  Excel::download(new EducationExport(
                 QualificationResource::collection($educations->get())), 'Educations.xlsx');
         }

         if ($request->has('print') && $request->print === 'true'){
             return $this->pdf('print.employee-dashboard.qualifications',
                 QualificationResource::collection($educations->get()),'Educations');
         }
         if ($request->has('page') && $request->page == 0){
             return QualificationResource::collection($educations->get());
         }*/

        $educations->where('employee_id', $request->employeeId);

        return QualificationResource::collection($educations->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreQualificationRequest $request
     * @return QualificationResource|JsonResponse
     */
    public function store(StoreQualificationRequest $request): JsonResponse|QualificationResource
    {
        DB::beginTransaction();
        try {
            $employee = Employee::findOrFail($request->employee_id);

            $qualification = $employee->qualifications()->create([
                'user_id' => Auth::id()
            ]);

            $request['date'] = Carbon::parse($request->date)->format('Y-m-d');

            $this->infoDifference($qualification, $request->all());
            $this->requestUpdate($qualification);

            if ($qualification && $request->has('file') && $request->file !== "null") {
                $saveFile = new SaveFile($qualification, $request->file('file'), $this->docPath, $this->allowedFiles);
                $photo = $saveFile->save();

                $this->infoDifference($photo, [
                    'file_name' => $saveFile->fileName
                ]);

                $this->requestUpdate($photo);
            }

            DB::commit();
            return new QualificationResource($qualification);
        } catch (Exception $exception) {
            Log::error('Add Qualification Error: ', [$exception]);

            return response()->json([
                'message' => $exception->getMessage()
            ], 400);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateQualificationRequest $request
     * @param $id
     * @return QualificationResource|JsonResponse
     */
    public function update(UpdateQualificationRequest $request, $id): JsonResponse|QualificationResource
    {
        DB::beginTransaction();
        try {
            $qualification = Education::findOrFail($id);
            $request['date'] = Carbon::parse($request->date)->format('Y-m-d');

            $this->infoDifference($qualification, $request->all());
            $this->requestUpdate($qualification);

            if ($request->has('file') && $request->file !== "null") {
                $saveFile = new SaveFile($qualification, $request->file('file'), $this->docPath, $this->allowedFiles);
                $photo = $saveFile->save($qualification->photo->file_name ?? null);

                $this->infoDifference($photo, [
                    'file_name' => $saveFile->fileName
                ]);

                $this->requestUpdate($photo);
            }
            DB::commit();
            return new QualificationResource($qualification);
        } catch (Exception $exception) {
            return response()->json([
                'message' => $exception->getMessage()
            ], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param $id
     * @return JsonResponse|null
     */
    public function destroy($id): ?JsonResponse
    {
        DB::beginTransaction();
        try {
            $education = Education::findOrFail($id);
            $education->photo()->delete();
            $education->informationUpdate()->delete();
            $education->delete();
            DB::commit();
            return response()->json([
                'message' => 'Qualification Deleted'
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'message' => $exception->getMessage()
            ], 400);
        }
    }
}
