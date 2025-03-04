<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGrantAndFundRequest;
use App\Http\Requests\UpdateGrantAndFundRequest;
use App\Models\GrantAndFund;

class GrantAndFundController extends Controller
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
     * @param  \App\Http\Requests\StoreGrantAndFundRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreGrantAndFundRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\GrantAndFund  $grantAndFund
     * @return \Illuminate\Http\Response
     */
    public function show(GrantAndFund $grantAndFund)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\GrantAndFund  $grantAndFund
     * @return \Illuminate\Http\Response
     */
    public function edit(GrantAndFund $grantAndFund)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateGrantAndFundRequest  $request
     * @param  \App\Models\GrantAndFund  $grantAndFund
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateGrantAndFundRequest $request, GrantAndFund $grantAndFund)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\GrantAndFund  $grantAndFund
     * @return \Illuminate\Http\Response
     */
    public function destroy(GrantAndFund $grantAndFund)
    {
        //
    }
}
