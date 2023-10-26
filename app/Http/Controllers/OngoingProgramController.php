<?php

namespace App\Http\Controllers;

use App\Enums\RegistrationType;
use App\Exports\OngoingProgramExport;
use App\Http\Resources\BatchStudentsResource;
use App\Http\Resources\OngoingProgramResource;
use App\Models\Holiday;
use App\Models\OngoingProgram;
use App\Models\Registration;
use App\Traits\UsePrint;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class OngoingProgramController extends Controller
{
    use UsePrint;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response|BinaryFileResponse|AnonymousResourceCollection
    {
        $ongoingProgramsQuery = OngoingProgram::query();
        $ongoingProgramsQuery->when($request->has('program_id') && $request->program_id !== 'all',
            function ($q) use ($request) {
                return $q->where('program_id', $request->program_id);
            });

        $ongoingProgramsQuery->when($request->has('staff_id') &&
            $request->staff_id !== 'all', function ($q) use ($request) {
            return $q->where('staff_id', $request->staff_id);
        });

        $ongoingProgramsQuery->when($request->has('start_date') &&
            $request->start_date !== 'null', function ($q) use ($request) {
            return $q->where('start_date', $request->start_date);
        });

        $ongoingProgramsQuery->when($request->has('end_date') &&
            $request->end_date !== 'null', function ($q) use ($request) {
            return $q->where('end_date', $request->end_date);
        });

        if (!Auth::user()->hasRole('super-admin')) {
            $ongoingProgramsQuery->where('branch_id', Auth::user()->userable->branch_id);
        }

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
            if (!$request->has('branch_id')) {
                $request['branch_id'] = Auth::user()->userable->branch_id;
            }

            $request['user_id'] = Auth::id();
            $request['batch_time'] = $request->batch_time;
            $request['staff_id'] = $request->staff_id;
            $request['start_date'] = $request->start_date;
            $request['end_date'] = $request->end_date;

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
            $request['batch_time'] = $request->batch_time;
            $request['start_date'] = $request->start_date;
            $request['end_date'] = $request->end_date;
            $ongoingProgram->update($request->all());

            $registrations = $ongoingProgram->registrations();
            if ($request->status === 'completed') {
                $registrations->update([
                    'status' => RegistrationType::COMPLETED
                ]);
            } else {
                $registrations->update([
                    'status' => RegistrationType::IN_SCHOOL
                ]);
            }
            DB::commit();
            return new OngoingProgramResource($ongoingProgram);
        } catch (Exception $exception) {
            DB::rollBack();
            Log::error('Update OngoingProgram Error', [$exception->getMessage()]);

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

    public function printAttendance(Request $request)
    {
        $ongoingProgram = OngoingProgram::find($request->batch_id);

        if ($ongoingProgram->registrations->count() == 0) {
            return response()->json([
                'message' => 'There is no student in this batch'
            ], 400);
        }
        $addWeekends = $request->type == 'both';
        $weekendOnly = $request->type == 'weekends';
        $weekdaysOnly = $request->type == 'weekdays';
        $start = Carbon::createFromFormat('m', $request->month)->startOfMonth();
        $end = Carbon::createFromFormat('m', $request->month)->endOfMonth();
        $range = CarbonPeriod::create($start, $end);

        $holidays = Holiday::all()->pluck('start_date');

        $mapped = Arr::map($range->toArray(),
            static function (Carbon $date, string $key) use ($addWeekends, $weekendOnly, $weekdaysOnly, $holidays) {

                if ($holidays->contains($date->format('Y-m-d'))) {
                    return null;
                }

                $day = Carbon::parse($date)->format('d');
                if ($addWeekends) {
                    return $day;
                }

                if ($weekendOnly && $date->isWeekend()) {
                    return $day;
                }

                if ($weekdaysOnly && $date->isWeekday()) {
                    return $day;
                }

                return null;
            });

        $dates = array_values(array_filter($mapped));
        return $this->pdf('print.ongoing-programs.attendance',
            [
                'batch' => new OngoingProgramResource($ongoingProgram),
                'dates' => $dates,
                'month' => $end
            ],
            'Batches', 'landscape');
    }


    public function printBatchPlan(Request $request)
    {
        $ongoingProgram = OngoingProgram::find($request->batch_id);

        if ($request->has('sem') && $request->sem > 0) {
            $modules = $ongoingProgram->program->modules->where('semester', $request->sem);
        } else {
            $modules = $ongoingProgram->program->modules;
        }

//        return \response()->json([
//            'batch' => $ongoingProgram,
//            'modules' => $modules,
//            'totalDuration' => $modules->sum('duration.duration')
//        ]);
        return $this->pdf('print.ongoing-programs.batch-plan',
            [
                'batch' => $ongoingProgram,
                'modules' => $modules,
                'totalDuration' => $modules->sum('duration.duration')
            ], 'BatchPlan');
    }

    /**
     * @return JsonResponse
     */
    public function getAllBatches(Request $request): JsonResponse
    {
        $ongoingProgramsQuery = OngoingProgram::query();
        $ongoingProgramsQuery->when($request->has('staff_id')
            && $request->staff_id !== '', function ($q) use ($request) {
            return $q->where('staff_id', $request->staff_id);
        });
        return response()->json(OngoingProgramResource::collection($ongoingProgramsQuery->get()));
    }

    /**
     * @param $ongoingProgramId
     * @return AnonymousResourceCollection
     */
    public function getBatchStudents($ongoingProgramId): AnonymousResourceCollection
    {
        $enrollments = Registration::where('ongoing_program_id', $ongoingProgramId)->paginate(10);
        return BatchStudentsResource::collection($enrollments);
    }
}
