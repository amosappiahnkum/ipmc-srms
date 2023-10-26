<?php

namespace App\Http\Controllers;

use App\Enums\StaffType;
use App\Enums\StudentStatus;
use App\Models\AllPrograms;
use App\Models\Branch;
use App\Models\OngoingProgram;
use App\Models\Staff;
use App\Models\Student;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Permission;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function getCommonData()
    {
        $loggedInUser = Auth::user();

        if (!$loggedInUser) {
            return response()->json([
                'message' => 'Unauthenticated'
            ], 422);
        }

        $programs = AllPrograms::query()->count();
        $branches = Branch::all();
        $staffs = Staff::query()->count();
        $instructors = Staff::query()->where('type', StaffType::INSTRUCTOR)->count();
        $batches = OngoingProgram::query()->count();
        $students = Student::query()->get();
        $permissions = Permission::all()->groupBy('group');

        $user = Auth::user();
        if ($user->userable_type != null && $user->roles->contains('name', 'instructor')) {
            $myBatches = OngoingProgram::where('staff_id', $user->userable->id)->count();
        }else {
            $myBatches = 0;
        }

        return response([
            'programs' => $programs,
            'branches' => $branches,
            'staff' => $staffs,
            'instructors' => $instructors,
            'batches' => $batches,
            'students' => [
                'total' => $students->count(),
                'male' => $students->where('gender', 'Male')->count(),
                'female' => $students->where('gender', 'Female')->count()
            ],
            'my_batches' => $myBatches,
            'permissions' => $permissions
        ]);
    }

    public function getRoles()
    {
        return Auth::user()?->getRoleNames();
    }

    public function can($permission)
    {
        return Auth::user()?->can($permission);
    }

    public function isSupervisor(): bool
    {
        return $this->can('approve-leave-request') || $this->can('decline-leave-request');
    }
}
