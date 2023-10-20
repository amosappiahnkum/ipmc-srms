<?php

namespace App\Http\Controllers;

use App\Models\Enrollment;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Carbon;

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
        $enrollment = Enrollment::query()->get()->groupBy('ongoingProgram.program.allPrograms.name')->map->count();

        $enrollmentByMonth = Enrollment::query()
            ->whereYear('created_at','2023')
            ->get()
            ->groupBy(function ($val) {
                return Carbon::parse($val->created_at)->format('M');
            })->map->count();
        return response()->json([
            'enrollment' => $enrollment,
            'byMonth' => $enrollmentByMonth
        ]);
    }
}
