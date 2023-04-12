<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDirectReportRequest;
use App\Http\Requests\UpdateDirectReportRequest;
use App\Http\Resources\DirectReportResource;
use App\Models\EmployeeSupervisor;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class DirectReportController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     *
     * @return AnonymousResourceCollection
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $dependants = EmployeeSupervisor::where('supervisor_id', $request->supervisorId)->paginate(10);

        return DirectReportResource::collection($dependants);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreDirectReportRequest $request
     * @return DirectReportResource|JsonResponse
     */
    public function store(StoreDirectReportRequest $request): DirectReportResource|JsonResponse
    {
        DB::beginTransaction();
        try {
            $request['user_id'] = Auth::user()->id;
            $request['dob'] = $request->dob !=  null ? Carbon::parse($request->dob)->format('Y-m-d') : null;
            $dependant = EmployeeSupervisor::create($request->all());
            DB::commit();

            return new DirectReportResource($dependant);
        }catch (Exception $exception){
            return response()->json([
                'message' => $exception->getMessage()
            ], 400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param UpdateDirectReportRequest $request
     * @param $id
     * @return DirectReportResource|JsonResponse
     */
    public function update(UpdateDirectReportRequest $request, $id): JsonResponse|DirectReportResource
    {
        DB::beginTransaction();
        try {
            $request['dob'] = $request->dob !== 'null' ? Carbon::parse($request->dob)->format('Y-m-d') : null;
            $dependant = EmployeeSupervisor::findOrFail($id);
            $dependant->update($request->all());
            DB::commit();

            return new DirectReportResource($dependant);
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
            $dependant = EmployeeSupervisor::findOrFail($id);
            $dependant->delete();

            DB::commit();
            return response()->json([
                'message' =>'Emergency Contact Deleted'
            ]);
        }catch (Exception $exception){
            return response()->json([
                'message' => $exception->getMessage()
            ], 400);
        }
    }
}
