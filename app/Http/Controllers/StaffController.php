<?php

namespace App\Http\Controllers;

use App\Exports\StaffExport;
use App\Helpers\Helper;
use App\Http\Resources\StaffResource;
use App\Models\Staff;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;
use Spatie\Permission\Models\Role;

class StaffController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $staffQuery = Staff::query();
        $staffQuery->when($request->has('department_id') &&
            $request->department_id !== 'all', function ($q) use ($request) {
            return $q->where('department_id', $request->department_id);
        });

        $staffQuery->when($request->has('rank_id') &&
            $request->rank_id !== 'all', function ($q) use ($request) {
            return $q->where('rank_id', $request->rank_id);
        });

        $staffQuery->when($request->has('job_category_id') &&
            $request->job_category_id !== 'all', function ($q) use ($request) {
            return $q->whereRelation('jobDetail', static function ($jQuery) use ($request) {
                return $jQuery->where('job_category_id', $request->job_category_id);
            });
        });

        if(!Auth::user()->hasRole('super-admin')) {
            $staffQuery->where('branch_id', Auth::user()->userable->branch_id);
        }

        if ($request->has('export') && $request->export === 'true') {
            return Excel::download(new StaffExport(StaffResource::collection($staffQuery->get())),
                'Expenses.xlsx');
        }

        if ($request->has('print') && $request->print === 'true') {
            return $this->pdf('print.staff.all', StaffResource::collection($staffQuery->get()), 'Expenses',
                'landscape');
        }

        return StaffResource::collection($staffQuery->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse|StaffResource
    {
        DB::beginTransaction();
        try {
            if (!$request->has('branch_id')) {
                $request['branch_id'] = Auth::user()->userable->branch_id;
            }
            $staff = Staff::create($request->all());

            $userName = Helper::createUserName($request->first_name, $request->last_name);

            $user = $staff->user()->create([
                'username' => $userName,
                'email' => $request->email,
                'password' => Hash::make($userName),
            ]);

            $role = Role::query()->where('name', $request->type)->first();
            $user->roles()->syncWithoutDetaching($role?->id);

            DB::commit();
            return new StaffResource($staff);
        } catch (Exception $exception) {
            DB::rollBack();
            Log::error('Add Staff Error', [$exception]);

            return response()->json([
                'message' => 'Something went wrong'
            ], 400);
        }
    }

    /**
     * @param Request $request
     * @param Staff $staff
     * @return StaffResource|JsonResponse
     */
    public function update(Request $request, Staff $staff): StaffResource|JsonResponse
    {
        DB::beginTransaction();
        try {
            $staff->update($request->all());

           $staff->user()->update(['email' => $request->email]);
            DB::commit();
            return new StaffResource($staff);
        } catch (Exception $exception) {
            DB::rollBack();
            Log::error('Add Staff Error', [$exception]);

            return response()->json([
                'message' => 'Something went wrong'
            ], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Staff $staff)
    {
        //
    }
}
