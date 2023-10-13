<?php

namespace App\Http\Controllers;

use App\Exports\OngoingProgramExport;
use App\Http\Resources\OngoingProgramResource;
use App\Models\OngoingProgram;
use App\Traits\UsePrint;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;

class OngoingProgramController extends Controller
{
    use UsePrint;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $ongoingProgramsQuery = OngoingProgram::query();
        $ongoingProgramsQuery->when($request->has('program_id') && $request->program_id !== 'all', function ($q) use ($request) {
            return $q->where('program_id', $request->program_id);
        });

        $ongoingProgramsQuery->when($request->has('instructor_id') &&
            $request->instructor_id !== 'all', function ($q) use ($request) {
            return $q->where('instructor_id', $request->instructor_id);
        });

        $ongoingProgramsQuery->when($request->has('start_date') &&
            $request->start_date !== 'null', function ($q) use ($request) {
            return $q->where('start_date', $request->start_date);
        });

        $ongoingProgramsQuery->when($request->has('end_date') &&
            $request->end_date !== 'null', function ($q) use ($request) {
            return $q->where('end_date', $request->end_date);
        });

        if ($request->has('export') && $request->export === 'true') {
            return Excel::download(new OngoingProgramExport(OngoingProgramResource::collection($ongoingProgramsQuery->get())),
                'Batches.xlsx');
        }

        if ($request->has('print') && $request->print === 'true') {
            return $this->pdf('print.ongoingPrograms.all',
                OngoingProgramResource::collection($ongoingProgramsQuery->get()),
                'Batches', 'landscape');
        }

        return OngoingProgramResource::collection($ongoingProgramsQuery->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            $request['user_id'] = Auth::id();
            $request['batch_time'] = Carbon::parse($request->batch_time);
            $request['start_date'] = Carbon::parse($request->batch_time)->format('Y-m-d');
            $request['end_date'] = Carbon::parse($request->batch_time)->format('Y-m-d');
            $ongoingProgram = OngoingProgram::create($request->all());
            DB::commit();
            return new OngoingProgramResource($ongoingProgram);
        } catch (Exception $exception) {
            DB::rollBack();
            Log::error('Add OngoingProgram Error', [$exception]);

            return response()->json([
                'message' => 'Something went wrong'
            ], 400);
        }
    }

    /**
     * @param Request $request
     * @param OngoingProgram $ongoingProgram
     * @return OngoingProgramResource|JsonResponse
     */
    public function update(Request $request, OngoingProgram $ongoingProgram): OngoingProgramResource|JsonResponse
    {
        DB::beginTransaction();
        try {
            $request['user_id'] = Auth::id();
            $request['batch_time'] = Carbon::parse($request->batch_time);
            $request['start_date'] = Carbon::parse($request->batch_time)->format('Y-m-d');
            $request['end_date'] = Carbon::parse($request->batch_time)->format('Y-m-d');
            $ongoingProgram->update($request->all());
            DB::commit();
            return new OngoingProgramResource($ongoingProgram);
        } catch (Exception $exception) {
            DB::rollBack();
            Log::error('Add OngoingProgram Error', [$exception]);

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
