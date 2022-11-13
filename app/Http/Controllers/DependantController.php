<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDependantRequest;
use App\Http\Requests\UpdateDependantRequest;
use App\Http\Resources\DependantResource;
use App\Models\Dependant;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class DependantController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection
     */
    public function index(): AnonymousResourceCollection
    {
        $dependants = Dependant::paginate(10);

        return DependantResource::collection($dependants);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreDependantRequest $request
     * @return DependantResource|JsonResponse
     */
    public function store(StoreDependantRequest $request): DependantResource|JsonResponse
    {
        DB::beginTransaction();
        try {
            $request['user_id'] = Auth::user()->id;
            $request['dob'] = $request->dob !=  null ? Carbon::parse($request->dob)->format('Y-m-d') : null;
            $dependant = Dependant::create($request->all());
            DB::commit();

            return new DependantResource($dependant);
        }catch (Exception $exception){
            return response()->json([
                'message' => $exception->getMessage()
            ], 400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param UpdateDependantRequest $request
     * @param $id
     * @return DependantResource|JsonResponse
     */
    public function update(UpdateDependantRequest $request, $id)
    {
        DB::beginTransaction();
        try {
            $request['dob'] = $request->dob !== 'null' ? Carbon::parse($request->dob)->format('Y-m-d') : null;
            $dependant = Dependant::findOrFail($id);
            $dependant->update($request->all());
            DB::commit();

            return new DependantResource($dependant);
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
            $dependant = Dependant::findOrFail($id);
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
