<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EnquiryController;
use App\Http\Controllers\FollowUpController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\StaffController;
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
Route::get('enquiry/branches', [PublicPageController::class, 'getBranches']);

Route::post('/auth/login', [AuthController::class, 'login']);

Route::post('enquiry', [PublicPageController::class, 'newEnquiry']);

Route::group(['middleware' => ['auth:sanctum']], static function () {
    Route::get('commons', [HomeController::class, 'getCommonData']);
    Route::prefix('user')->group(function () {
        Route::get('/{id}/roles/active', [UserController::class, 'getActiveRoles']);
        Route::get('/{id}/roles', [UserController::class, 'getUserRoles']);
        Route::post('/{id}/delete', [UserController::class, 'deleteUser']);
        Route::post('/roles/add', [UserController::class, 'addUserRoles']);
        Route::post('/roles/actions', [UserController::class, 'enableOrDisableRole']);
        Route::post('/change-password',[UserController::class, 'changePassword']);

    });
    Route::prefix('report')->group(function () {
        Route::get('/chart/registrations', [HomeController::class, 'getEnrollmentChart']);
        Route::get('/enquiry/print/{enquiry}', [StudentController::class, 'printEnquiry']);
        Route::get('/print/{student}', [StudentController::class, 'printStudentData']);
    });

    Route::apiResource('enquiries', EnquiryController::class);
    Route::apiResource('feedbacks', FollowUpController::class);
    Route::apiResource('registrations', RegistrationController::class);
    Route::apiResource('/users', UserController::class);
    Route::apiResource('/programs', ProgramController::class);
    Route::get('/all-programs', [ProgramController::class, 'allPrograms']);
    Route::prefix('students')->group(static function () {
        Route::post('/{student}/enroll', [StudentController::class, 'enrollStudent']);
        Route::get('/{student}/my-programs', [StudentController::class, 'getMyPrograms']);
        Route::get('/my-programs/{ongoing_program}', [StudentController::class, 'getProgramDetail']);
    });
    Route::apiResource('/students', StudentController::class);
    Route::apiResource('/staff', StaffController::class);
    Route::prefix('ongoing-programs')->group(function () {
        Route::post('attendance', [OngoingProgramController::class, 'printAttendance']);
        Route::post('batch-plan', [OngoingProgramController::class, 'printBatchPlan']);
        Route::post('/{exam}/get-questions', [OngoingProgramController::class, 'getExamQuestions']);
        Route::post('schedule-exam', [OngoingProgramController::class, 'scheduleExam']);
        Route::post('submit-result', [OngoingProgramController::class, 'submitResult']);
        Route::get('{ongoing_program}/students', [OngoingProgramController::class, 'getBatchStudents']);
        Route::get('{ongoing_program}/get-exams', [OngoingProgramController::class, 'getExam']);
    });
    Route::apiResource('/ongoing-programs', OngoingProgramController::class);
    Route::get('/all-batches', [OngoingProgramController::class, 'getAllBatches']);

    Route::prefix('common')->group(function () {
        Route::get('permissions/{id}', [HomeController::class, 'getAllPermissions']);
        Route::post('permissions/assign', [HomeController::class, 'assignPermissions']);
    });
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
