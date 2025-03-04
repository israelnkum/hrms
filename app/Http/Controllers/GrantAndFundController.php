<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGrantAndFundRequest;
use App\Http\Requests\UpdateGrantAndFundRequest;
use App\Models\GrantAndFund;
use Illuminate\Http\Response;

class GrantAndFundController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $grants = GrantAndFund::with(['user', 'employee'])
            ->when(auth()->user()->is_admin !== true, function ($query) {
                return $query->where('user_id', auth()->id());
            })
            ->latest()
            ->paginate(10);

        return response()->json($grants);
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
        $grant = GrantAndFund::create([
            ...$request->validated(),
            'user_id' => auth()->id()
        ]);

        return response()->json($grant, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\GrantAndFund  $grantAndFund
     * @return \Illuminate\Http\Response
     */
    public function show(GrantAndFund $grantAndFund)
    {
        $grantAndFund->load(['user', 'employee']);
        return response()->json($grantAndFund);
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
        $this->authorize('update', $grantAndFund);
        
        $grantAndFund->update($request->validated());

        return response()->json($grantAndFund);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\GrantAndFund  $grantAndFund
     * @return \Illuminate\Http\Response
     */
    public function destroy(GrantAndFund $grantAndFund)
    {
        $this->authorize('delete', $grantAndFund);
        
        $grantAndFund->delete();

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
