<?php

namespace App\Http\Controllers;

use App\Http\Resources\CelebrationResource;
use App\Models\Department;
use App\Models\EducationLevel;
use App\Models\Employee;
use App\Models\Instructor;
use App\Models\JobCategory;
use App\Models\OngoingProgram;
use App\Models\Position;
use App\Models\Program;
use App\Models\Rank;
use App\Models\Student;
use App\Models\SubUnit;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Auth;

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

        $programs = Program::count();
        $instructors = Instructor::count();
        $batches = OngoingProgram::count();
        $students = Student::all();
        return response([
            'programs' => $programs,
            'instructors' => $instructors,
            'batches' => $batches,
            'students' => [
                'total' => $students->count(),
                'male' => $students->where('gender', 'Male')->count(),
                'female' => $students->where('gender', 'Female')->count()
            ],
            'permissions' => []
        ]);
    }


    public function formatData(Builder $builder): array
    {
        return [
            'series' => $builder->pluck('name'),
            'values' => $builder->pluck('employees_count')
        ];
    }

    public function getRoles()
    {
        return Auth::user()?->getRoleNames();
    }

    public function isHr(): bool
    {
        return $this->can('approve-leave') || $this->can('disapprove-leave');
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
