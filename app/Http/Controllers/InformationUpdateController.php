<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreInformationUpdateRequest;
use App\Http\Requests\UpdateInformationUpdateRequest;
use App\Http\Resources\InformationUpdateResource;
use App\Models\InformationUpdate;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class InformationUpdateController extends Controller
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
        $infoUpdates = InformationUpdate::query()->where('status', $request->status)->paginate(10);

        return InformationUpdateResource::collection($infoUpdates);
    }


    /**
     * @param InformationUpdate $informationUpdate
     *
     * @return InformationUpdateResource
     */
    public function show(InformationUpdate $informationUpdate): InformationUpdateResource
    {
        return new InformationUpdateResource($informationUpdate);
    }
}
