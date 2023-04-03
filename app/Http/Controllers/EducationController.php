<?php

namespace App\Http\Controllers;

use App\Exports\EducationExport;
use App\Helpers\Helper;
use App\Helpers\SaveFile;
use App\Http\Requests\StoreEducationRequest;
use App\Http\Requests\UpdateEducationRequest;
use App\Http\Resources\EducationResource;
use App\Models\Education;
use App\Traits\UsePrint;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class EducationController extends Controller
{
    protected string $docPath = 'docs/qualifications';
    protected array $allowedFiles = ['pdf'];

    use UsePrint;

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
                EducationResource::collection($educations->get())), 'Educations.xlsx');
        }

        if ($request->has('print') && $request->print === 'true'){
            return $this->pdf('print.employee-dashboard.qualifications',
                EducationResource::collection($educations->get()),'Educations');
        }
        if ($request->has('page') && $request->page == 0){
            return EducationResource::collection($educations->get());
        }*/

        $educations->where('employee_id', $request->employeeId);

        return EducationResource::collection($educations->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreEducationRequest $request
     * @return EducationResource|JsonResponse
     */
    public function store(StoreEducationRequest $request): JsonResponse|EducationResource
    {
        DB::beginTransaction();
        try {
            $education = Education::create(Helper::formatDate($request));
            if ($education && $request->has('file') && $request->file !== "null"){
                $saveFile = new SaveFile($education, $request->file('file'), $this->docPath, $this->allowedFiles);
                $saveFile->save();
            }

            DB::commit();
            return new EducationResource($education);
        }catch (Exception $exception){
            return response()->json([
                'message' => $exception->getMessage()
            ], 400);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateEducationRequest $request
     * @param $id
     * @return EducationResource|JsonResponse
     */
    public function update(UpdateEducationRequest $request, $id)
    {
        DB::beginTransaction();
        try {
            $education = Education::findOrFail($id);
            $education->update(Helper::formatDate($request));
            if ($request->has('file') && $request->file !== "null"){
                $saveFile = new SaveFile($education, $request->file('file'), $this->docPath, $this->allowedFiles);
                $saveFile->save();
            }
            DB::commit();
            return new EducationResource($education);
        }catch (Exception $exception){
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
            $education->delete();
            DB::commit();
            return response()->json([
                'message' =>'Qualification Deleted'
            ]);
        }catch (Exception $exception){
            return response()->json([
                'message' => $exception->getMessage()
            ], 400);
        }
    }
}
