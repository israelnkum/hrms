<?php

use App\Http\Controllers\ContactDetailController;
use App\Http\Controllers\DependantController;
use App\Http\Controllers\EducationController;
use App\Http\Controllers\EmergencyContactController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\JobDetailController;
use App\Http\Controllers\LeaveRequestController;
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

Route::group(['middleware' => ['auth:sanctum']], static function () {
    Route::get('commons', [HomeController::class, 'getCommonData']);
    Route::prefix('user')->group(function () {
        Route::get('/{id}/roles/active', [UserController::class, 'getActiveRoles']);
        Route::get('/{id}/roles', [UserController::class, 'getUserRoles']);
        Route::post('/{id}/delete', [UserController::class, 'deleteUser']);
        Route::post('/roles/add', [UserController::class, 'addUserRoles']);
        Route::post('/roles/actions', [UserController::class, 'enableOrDisableRole']);
    });

    Route::resource('/users', UserController::class);

    Route::prefix('employees')->group(function () {
        Route::get('/search/{query}', [EmployeeController::class, 'searchEmployees']);
    });

    Route::resource('/employees', EmployeeController::class);

    Route::resource('/contact-details', ContactDetailController::class);
    Route::resource('/job-details', JobDetailController::class);
    Route::resource('/qualifications', EducationController::class);
    Route::resource('/emergency-contacts', EmergencyContactController::class);
    Route::resource('/dependants', DependantController::class);
    Route::prefix('leave-request')->group(function () {
        Route::get('holidays', [LeaveRequestController::class, 'getHolidays']);
        Route::get('types', [LeaveRequestController::class, 'getLeaveTypes']);
    });
    Route::resource('/leave-request', LeaveRequestController::class);
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('commons', [HomeController::class, 'getCommonData']);
