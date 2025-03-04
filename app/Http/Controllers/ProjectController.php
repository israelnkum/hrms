<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Project::with(['employee', 'user'])
            ->paginate(10);
    }

    public function userProjects(Request $request)
    {
        return Project::where('user_id', auth()->id())
            ->with(['employee', 'user'])
            ->paginate(10);
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
     * @param  \App\Http\Requests\StoreProjectRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StoreProjectRequest $request)
    {
        $project = Project::create([
            'title' => $request->title,
            'year' => $request->year,
            'location' => $request->location,
            'significance' => $request->significance,
            'description' => $request->description,
            'user_id' => auth()->id(),
            'employee_id' => $request->employee_id,
        ]);

        return response()->json($project->load(['employee', 'user']), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function show(Project $project)
    {
        return $project->load(['employee', 'user']);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateProjectRequest  $request
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $project->update([
            'title' => $request->title,
            'year' => $request->year,
            'location' => $request->location,
            'significance' => $request->significance,
            'description' => $request->description,
            'employee_id' => $request->employee_id,
        ]);

        return response()->json($project->load(['employee', 'user']));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Project $project)
    {
        $project->delete();
        return response()->json(null, 204);
    }
}
