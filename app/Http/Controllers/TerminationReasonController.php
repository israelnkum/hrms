<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTerminationReasonRequest;
use App\Http\Requests\UpdateTerminationReasonRequest;
use App\Models\TerminationReason;

class TerminationReasonController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreTerminationReasonRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTerminationReasonRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\TerminationReason  $terminationReason
     * @return \Illuminate\Http\Response
     */
    public function show(TerminationReason $terminationReason)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\TerminationReason  $terminationReason
     * @return \Illuminate\Http\Response
     */
    public function edit(TerminationReason $terminationReason)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateTerminationReasonRequest  $request
     * @param  \App\Models\TerminationReason  $terminationReason
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateTerminationReasonRequest $request, TerminationReason $terminationReason)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TerminationReason  $terminationReason
     * @return \Illuminate\Http\Response
     */
    public function destroy(TerminationReason $terminationReason)
    {
        //
    }
}
