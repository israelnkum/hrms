<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEmergencyContactRequest;
use App\Http\Requests\UpdateEmergencyContactRequest;
use App\Http\Resources\EmergencyContactResource;
use App\Models\EmergencyContact;
use App\Models\Employee;
use App\Traits\InformationUpdate;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class EmergencyContactController extends Controller
{
    use InformationUpdate;

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return AnonymousResourceCollection
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $emergencyContacts = EmergencyContact::where('employee_id', $request->employeeId)->paginate(10);

        return EmergencyContactResource::collection($emergencyContacts);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreEmergencyContactRequest $request
     * @return EmergencyContactResource|JsonResponse
     */
    public function store(StoreEmergencyContactRequest $request): EmergencyContactResource|JsonResponse
    {
        DB::beginTransaction();
        try {
            $employee = Employee::findOrFail($request->employee_id);

            $contact = $employee->emergencyContacts()->create([
                'user_id' => Auth::id()
            ]);

            $this->infoDifference($contact, $request->all());
            $this->requestUpdate($contact);

            DB::commit();

            return new EmergencyContactResource($contact);
        } catch (Exception $exception) {
            return response()->json([
                'message' => $exception->getMessage()
            ], 400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param UpdateEmergencyContactRequest $request
     * @param $id
     * @return EmergencyContactResource|JsonResponse
     */
    public function update(UpdateEmergencyContactRequest $request, $id): JsonResponse|EmergencyContactResource
    {
        DB::beginTransaction();
        try {
            $emergencyContact = EmergencyContact::findOrFail($id);

            $this->infoDifference($emergencyContact, $request->all());
            $this->requestUpdate($emergencyContact);

            DB::commit();
            return new EmergencyContactResource($emergencyContact);
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
            $emergencyContact = EmergencyContact::findOrFail($id);
            $emergencyContact->informationUpdate()->delete();
            $emergencyContact->delete();
            DB::commit();
            return response()->json([
                'message' => 'Emergency Contact Deleted'
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'message' => $exception->getMessage()
            ], 400);
        }
    }
}
