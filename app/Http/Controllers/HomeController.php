<?php

namespace App\Http\Controllers;

use App\Http\Resources\StaffResource;
use App\Models\Staff;
use App\Models\Registration;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Spatie\Permission\Models\Permission;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
//    public function __construct()
//    {
//        $this->middleware('auth');
//    }

    public function index(): Factory|View|Application
    {
        return view('home');
    }

    public function getEnrollmentChart(): JsonResponse
    {
        $registration = Registration::query()->get()->groupBy('ongoingProgram.program.allPrograms.name')->map->count();

        $enrollmentByMonth = Registration::query()
            ->whereYear('created_at','2023')
            ->get()
            ->groupBy(function ($val) {
                return Carbon::parse($val->created_at)->format('M');
            })->map->count();
        return response()->json([
            'registrations' => $registration,
            'byMonth' => $enrollmentByMonth
        ]);
    }



    public function getAllPermissions($id): JsonResponse
    {
        $staff = Staff::find($id)->userAccount;

        $permissions = Permission::all()->groupBy('group');

        if (!$staff) {
            return response()->json([
                'userPermissions' => [],
                'permissions' => $permissions
            ]);
        }
        $userPermissions = $staff->getAllPermissions()->pluck('id');

        return response()->json([
            'userPermissions' => $userPermissions,
            'permissions' => $permissions
        ]);
    }

    public function assignPermissions(Request $request): JsonResponse
    {
        $userAccount = Staff::find($request->staffId)->user;

        if (!$userAccount) {
            return response()->json('No User Account Found', 422);
        }

        DB::beginTransaction();
        try {
            $selectedPermissions = Permission::query()->whereIn('id', $request->permissions)->get()->pluck('name');

            $currentPermissions = $userAccount->getPermissionsViaRoles()->pluck('name');

            $userAccount->syncPermissions($selectedPermissions->diff($currentPermissions));
            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Permission(s) Added',
                'data' => new StaffResource($userAccount->userable)
            ]);
        } catch (\Exception $exception) {
            DB::rollBack();

            Log::error('Assign Permissions: ', [$exception]);

            return response()->json([
                'status' => 'success',
                'message' => 'Something went wrong'
            ], 400);
        }
    }
}
