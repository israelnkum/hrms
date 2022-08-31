<?php

use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('dashboard', [HomeController::class, 'getDashboardData']);
    Route::prefix('user')->group(function () {
        Route::get('/{id}/roles/active', [UserController::class, 'getActiveRoles']);
        Route::get('/{id}/roles', [UserController::class, 'getUserRoles']);
        Route::post('/{id}/delete', [UserController::class, 'deleteUser']);
        Route::post('/roles/add', [UserController::class, 'addUserRoles']);
        Route::post('/roles/actions', [UserController::class, 'enableOrDisableRole']);
    });

    Route::prefix('voters')->group(function (){
        Route::get('/', [UserController::class, 'getAllVoters']);
        Route::post('/add', [UserController::class, 'addNewVoter']);
        Route::post('/upload', [UserController::class, 'importVoters']);
        Route::get('/download-format', [UserController::class, 'downloadUploadFormat']);
    });


    Route::prefix('voter')->group(function (){
        Route::post('/{id}/employees/add', [UserController::class, 'addVoterElection']);
        Route::get('/{id}/employees', [UserController::class, 'getVoterElections']);
        Route::post('/{id}/election/remove', [UserController::class, 'removeVoterFromElections']);
        Route::post('/{id}/election/{electionId}/detail', [UserController::class, 'getElectionDetail']);
        Route::get('/{voterId}/election/{electionId}/results', [UserController::class, 'getVoterElectionResults']);
    });

    Route::resource('/users', UserController::class);

    Route::resource('/employees', EmployeeController::class);
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
