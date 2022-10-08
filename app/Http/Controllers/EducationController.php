<?php

namespace App\Http\Controllers;

use App\Exports\EducationExport;
use App\Http\Requests\StoreEducationRequest;
use App\Http\Requests\UpdateEducationRequest;
use App\Http\Resources\EducationResource;
use App\Http\Resources\EmployeeResource;
use App\Models\Education;
use App\Traits\UsePrint;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class EducationController extends Controller
{
    use UsePrint;
    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection|Response|BinaryFileResponse
     */
    public function index(Request $request)
    {
        Log::info($request->page);
        $educations = Education::query();

        if ($request->has('export') && $request->export === 'true'){
            return  Excel::download(new EducationExport(EducationResource::collection($educations->get())), 'Educations.xlsx');
        }

        if ($request->has('print') && $request->print === 'true'){
            return $this->pdf('print.employee.qualifications', EducationResource::collection($educations->get()),'Educations');
        }
        if ($request->has('page') && $request->page == 0){
            return EducationResource::collection($educations->get());
        }

        return EducationResource::collection($educations->paginate(10));
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param StoreEducationRequest $request
     * @return EmployeeResource|JsonResponse
     */
    public function store(StoreEducationRequest $request)
    {
        DB::beginTransaction();
        try {
            $education = Education::create($request->all());
            DB::commit();
            return new EmployeeResource($education->employee);
        }catch (Exception $exception){
            return response()->json([
                'message' => $exception->getMessage()
            ], 400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param Education $education
     * @return Response
     */
    public function show(Education $education)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Education $education
     * @return Response
     */
    public function edit(Education $education)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateEducationRequest $request
     * @param Education $education
     * @return Response
     */
    public function update(UpdateEducationRequest $request, Education $education)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Education $education
     * @return Response
     */
    public function destroy(Education $education)
    {
        //
    }
}
