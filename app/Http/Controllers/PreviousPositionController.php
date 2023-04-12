<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePreviousPositionRequest;
use App\Http\Requests\UpdatePreviousPositionRequest;
use App\Http\Resources\PreviousPositionResource;
use App\Models\PreviousPosition;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PreviousPositionController extends Controller
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
        $previousPositions = PreviousPosition::where('employee_id', $request->employeeId)->paginate(10);

        return PreviousPositionResource::collection($previousPositions);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StorePreviousPositionRequest $request
     * @return PreviousPositionResource|JsonResponse
     */
    public function store(StorePreviousPositionRequest $request): PreviousPositionResource|JsonResponse
    {
        DB::beginTransaction();
        try {
            $request['user_id'] = Auth::user()->id;
            $previousPosition = PreviousPosition::create($request->all());
            DB::commit();

            return new PreviousPositionResource($previousPosition);
        }catch (Exception $exception){
            return response()->json([
                'message' => $exception->getMessage()
            ], 400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param UpdatePreviousPositionRequest $request
     * @param $id
     * @return PreviousPositionResource|JsonResponse
     */
    public function update(UpdatePreviousPositionRequest $request, $id): JsonResponse|PreviousPositionResource
    {
        DB::beginTransaction();
        try {
            $previousPosition = PreviousPosition::findOrFail($id);
            $previousPosition->update($request->all());

            DB::commit();
            return new PreviousPositionResource($previousPosition);
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
            $previousPosition = PreviousPosition::findOrFail($id);
            $previousPosition->delete();
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
