<?php

namespace App\Http\Controllers;

use App\Enums\RegistrationType;
use App\Exports\OngoingProgramExport;
use App\Helpers\Helper;
use App\Http\Resources\BatchStudentsResource;
use App\Http\Resources\OngoingProgramResource;
use App\Http\Resources\RegularExamResource;
use App\Models\Exam;
use App\Models\Holiday;
use App\Models\OngoingProgram;
use App\Models\ProgramModule;
use App\Models\Registration;
use App\Models\RegularExam;
use App\Models\ResitExam;
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
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use JsonException;
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

        if (!Auth::user()?->hasRole('super-admin')) {
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

        $perPage = $request->query('per_page', 10);

        return OngoingProgramResource::collection($ongoingProgramsQuery->paginate($perPage));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse|OngoingProgramResource
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

    public function printAttendance(Request $request): Response|JsonResponse
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


    public function printBatchPlan(Request $request): Response
    {
        $ongoingProgram = OngoingProgram::find($request->batch_id);

        if ($request->has('sem') && $request->sem > 0) {
            $modules = $ongoingProgram->program->modules->where('semester', $request->sem);
        } else {
            $modules = $ongoingProgram->program->modules;
        }

        return $this->pdf('print.ongoing-programs.batch-plan',
            [
                'batch' => $ongoingProgram,
                'modules' => $modules,
                'totalDuration' => $modules->sum('duration.duration')
            ], 'BatchPlan');
    }

    /**
     * @param Request $request
     * @return AnonymousResourceCollection
     */
    public function getAllBatches(Request $request): AnonymousResourceCollection
    {
        $ongoingProgramsQuery = OngoingProgram::query();
        $ongoingProgramsQuery->when($request->has('staff_id')
            && $request->staff_id !== '', function ($q) use ($request) {
            return $q->where('staff_id', $request->staff_id);
        });

        if (!Auth::user()?->hasRole('super-admin')) {
            $ongoingProgramsQuery->where('branch_id', Auth::user()->userable->branch_id);
        }

        return OngoingProgramResource::collection($ongoingProgramsQuery->paginate($request->perPage ?? 10));
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

    public function getExam(OngoingProgram $ongoingProgram): array
    {
        $regular = RegularExam::query()->where('ongoing_program_id', $ongoingProgram->id)->get();
        $resit = ResitExam::query()->where('ongoing_program_id', $ongoingProgram->id)
            ->where('student_id', Auth::id())->get();

        return [
            'regular' => RegularExamResource::collection($regular),
            'resit' => $resit,
        ];
    }

    /**
     * @throws JsonException
     */
    public function scheduleExam(Request $request): JsonResponse
    {
        $programModule = ProgramModule::query()->findOrFail($request->program_module_id);

        $data = Helper::getQuestions($programModule->module_id, $request->total_questions);

        DB::beginTransaction();
        try {
            $regularExam = RegularExam::create([
                'ongoing_program_id' => $request->batch_id,
                'program_module_id' => $request->program_module_id,
            ]);

            $regularExam->exam()->create([
                'program_module_id' => $request->program_module_id,
                'ongoing_program_id' => $request->batch_id,
                'questions' => $data['questions'],
                'answer' => $data['answers'],
                'date' => Carbon::parse($request->date)->format('Y-m-d'),
                'time' => Carbon::parse($request->time)->format('h:m:i'),
                'duration' => Helper::timeInMinutes($request->duration),
                'shuffle' => true
            ]);

            DB::commit();
            return response()->json([
                "message" => "Exam created"
            ]);
        } catch (Exception $exception) {
            DB::rollBack();

            Log::error('schedule exam', [$exception]);
            return response()->json([
                "message" => "Something went wrong"
            ], 400);
        }
    }

    public function getExamQuestions(Exam $exam): Exam
    {
        return $exam;
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function submitResult(Request $request): JsonResponse
    {
        $exam = Exam::findOrFail($request->exam_id);

        if ($request->type == 'Regular') {
            $examType = RegularExam::findOrFail($request->exam_type);
        } else {
            $examType = ResitExam::findOrFail($request->exam_type);
        }

        DB::beginTransaction();
        try {
            $totalMark = $this->calculateMarks($request->answers, $exam);

            $examType->result()->updateOrCreate(
                [
                    'student_id' => $request->student_id,
                    'program_module_id' => $request->program_module_id,
                    'examable_id' => $request->exam_type,
                ],
                [
                    'current_question' => null,
                    'student_id' => $request->student_id,
                    'program_module_id' => $request->program_module_id,
                    'total_questions' => $request->total_questions,
                    'total_mark' => $request->total_questions * 2,
                    'time_left' => $request->time_left,
                    'key_strokes' => json_encode($request->key_strokes, JSON_THROW_ON_ERROR),
                    'mark' => $totalMark * 2
                ]);

            DB::commit();
            return response()->json([
                'mark' => $totalMark * 2,
                'total_mark' =>  $request->total_questions * 2,
                'total_questions' => $request->total_questions
            ]);
        } catch (\Exception $exception) {
            Log::info('Save Result', [$exception]);

            DB::rollBack();

            return response()->json([
                'message' => 'Oops! Could not save your result, try again!'
            ], 400);
        }
    }

    /**
     * @param array $studentAnswers
     * @param Exam $exam
     * @return int
     */
    public function calculateMarks(array $studentAnswers, Exam $exam): int
    {

        $answers = collect($studentAnswers);
        $correctAnswers = collect($exam->answer);

        $totalMark = 0;

        foreach ($answers as $answer) {
            $correctA = $correctAnswers->where('id', $answer['id'])->first();

            if (is_array($answer['answer'])) {
                $answer['answer'] = implode(',', $answer['answer']);
            }

            if ($correctA && Hash::check($answer['answer'], $correctA['answer'])) {
                ++$totalMark;
            }
        }

        return $totalMark;
    }
}
