<?php

namespace App\Http\Controllers;

use App\Exports\ProgramExport;
use App\Http\Resources\ProgramResource;
use App\Models\Program;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;

class ProgramController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $programsQuery = Program::query();
        $programsQuery->when($request->has('department_id') &&
            $request->department_id !== 'all', function ($q) use ($request) {
            return $q->where('department_id', $request->department_id);
        });

        $programsQuery->when($request->has('rank_id') &&
            $request->rank_id !== 'all', function ($q) use ($request) {
            return $q->where('rank_id', $request->rank_id);
        });

        $programsQuery->when($request->has('job_category_id') &&
            $request->job_category_id !== 'all', function ($q) use ($request) {
            return $q->whereRelation('jobDetail', static function ($jQuery) use ($request) {
                return $jQuery->where('job_category_id', $request->job_category_id);
            });
        });


        if ($request->has('export') && $request->export === 'true') {
            return Excel::download(new ProgramExport(ProgramResource::collection($programsQuery->get())),
                'Expenses.xlsx');
        }

        if ($request->has('print') && $request->print === 'true') {
            return $this->pdf('print.programs.all', ProgramResource::collection($programsQuery->get()), 'Expenses',
                'landscape');
        }

        return ProgramResource::collection($programsQuery->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            $request['user_id'] = Auth::id();
            $program = Program::create($request->all());
            DB::commit();
            return new ProgramResource($program);
        } catch (Exception $exception) {
            DB::rollBack();
            Log::error('Add Program Error', [$exception]);

            return response()->json([
                'message' => 'Something went wrong'
            ], 400);
        }
    }

    /**
     * @param Request $request
     * @param Program $program
     * @return ProgramResource|JsonResponse
     */
    public function update(Request $request, Program $program): ProgramResource|JsonResponse
    {
        DB::beginTransaction();
        try {
            $request['user_id'] = Auth::id();
            $program->update($request->all());
            DB::commit();
            return new ProgramResource($program);
        } catch (Exception $exception) {
            DB::rollBack();
            Log::error('Add Program Error', [$exception]);

            return response()->json([
                'message' => 'Something went wrong'
            ], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
