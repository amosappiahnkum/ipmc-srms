<?php

use App\Http\Controllers\EnquiryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\InstructorController;
use App\Http\Controllers\OngoingProgramController;
use App\Http\Controllers\ProgramController;
use App\Http\Controllers\PublicPageController;
use App\Http\Controllers\StudentController;
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
Route::get('enquiry/programs', [PublicPageController::class, 'getPrograms']);
Route::post('enquiry', [PublicPageController::class, 'newEnquiry']);

Route::group(['middleware' => ['auth:sanctum']], static function () {
    Route::get('commons', [HomeController::class, 'getCommonData']);
    Route::prefix('user')->group(function () {
        Route::get('/{id}/roles/active', [UserController::class, 'getActiveRoles']);
        Route::get('/{id}/roles', [UserController::class, 'getUserRoles']);
        Route::post('/{id}/delete', [UserController::class, 'deleteUser']);
        Route::post('/roles/add', [UserController::class, 'addUserRoles']);
        Route::post('/roles/actions', [UserController::class, 'enableOrDisableRole']);
    });
    Route::prefix('report')->group(function () {
        Route::get('/chart/enrollment', [HomeController::class, 'getEnrollmentChart']);
        Route::get('/enquiry/print/{enquiry}', [StudentController::class, 'printEnquiry']);
        Route::get('/print/{student}', [StudentController::class, 'printStudentData']);
    });

    Route::apiResource('enquiries', EnquiryController::class);
    Route::apiResource('/users', UserController::class);
    Route::apiResource('/programs', ProgramController::class);
    Route::get('/all-programs', [ProgramController::class, 'allPrograms']);
    Route::post('/students/{student}/enroll', [StudentController::class, 'enrollStudent']);
    Route::apiResource('/students', StudentController::class);
    Route::apiResource('/instructors', InstructorController::class);
    Route::post('/ongoing-programs/attendance', [OngoingProgramController::class, 'printAttendance']);
    Route::post('/ongoing-programs/batch-plan', [OngoingProgramController::class, 'printBatchPlan']);
    Route::apiResource('/ongoing-programs', OngoingProgramController::class);
    Route::get('/all-batches', [OngoingProgramController::class, 'getAllBatches']);
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
