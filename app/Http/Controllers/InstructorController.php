<?php

namespace App\Http\Controllers;

use App\Exports\InstructorExport;
use App\Http\Resources\InstructorResource;
use App\Models\Instructor;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;

class InstructorController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $instructorsQuery = Instructor::query();
        $instructorsQuery->when($request->has('department_id') &&
            $request->department_id !== 'all', function ($q) use ($request) {
            return $q->where('department_id', $request->department_id);
        });

        $instructorsQuery->when($request->has('rank_id') &&
            $request->rank_id !== 'all', function ($q) use ($request) {
            return $q->where('rank_id', $request->rank_id);
        });

        $instructorsQuery->when($request->has('job_category_id') &&
            $request->job_category_id !== 'all', function ($q) use ($request) {
            return $q->whereRelation('jobDetail', static function ($jQuery) use ($request) {
                return $jQuery->where('job_category_id', $request->job_category_id);
            });
        });


        if ($request->has('export') && $request->export === 'true') {
            return Excel::download(new InstructorExport(InstructorResource::collection($instructorsQuery->get())),
                'Expenses.xlsx');
        }

        if ($request->has('print') && $request->print === 'true') {
            return $this->pdf('print.instructors.all', InstructorResource::collection($instructorsQuery->get()), 'Expenses',
                'landscape');
        }

        return InstructorResource::collection($instructorsQuery->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse|InstructorResource
    {
        DB::beginTransaction();
        try {
            $request['user_id'] = Auth::id();
            $instructor = Instructor::create($request->all());
            DB::commit();
            return new InstructorResource($instructor);
        } catch (Exception $exception) {
            DB::rollBack();
            Log::error('Add Instructor Error', [$exception]);

            return response()->json([
                'message' => 'Something went wrong'
            ], 400);
        }
    }

    /**
     * @param Request $request
     * @param Instructor $instructor
     * @return InstructorResource|JsonResponse
     */
    public function update(Request $request, Instructor $instructor): InstructorResource|JsonResponse
    {
        DB::beginTransaction();
        try {
            $request['user_id'] = Auth::id();
            $instructor->update($request->all());
            DB::commit();
            return new InstructorResource($instructor);
        } catch (Exception $exception) {
            DB::rollBack();
            Log::error('Add Instructor Error', [$exception]);

            return response()->json([
                'message' => 'Something went wrong'
            ], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Instructor $instructor)
    {
        //
    }
}
