<?php

namespace App\Http\Controllers;

use App\Enums\StudentStatus;
use App\Exports\StudentExport;
use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Http\Resources\EnquiryResource;
use App\Http\Resources\EnrollmentResource;
use App\Http\Resources\StudentResource;
use App\Models\AllPrograms;
use App\Models\Enquiry;
use App\Models\Enrollment;
use App\Models\Program;
use App\Models\Sponsor;
use App\Models\Student;
use App\Traits\UsePrint;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;

class StudentController extends Controller
{

    use UsePrint;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $studentsQuery = Student::query();
        $studentsQuery->when($request->has('department_id') &&
            $request->department_id !== 'all', function ($q) use ($request) {
            return $q->where('department_id', $request->department_id);
        });

        $studentsQuery->when($request->has('rank_id') &&
            $request->rank_id !== 'all', function ($q) use ($request) {
            return $q->where('rank_id', $request->rank_id);
        });

        $studentsQuery->when($request->has('program_id') &&
            $request->program_id !== 'all', function ($q) use ($request) {
            return $q->whereRelation('enrollments', static function ($jQuery) use ($request) {
                return $jQuery->whereRelation('ongoingProgram', function ($q) use ($request) {
                    return $q->where('program_id', $request->program_id);
                });
            });
        });


        if ($request->has('export') && $request->export === 'true') {
            return Excel::download(new StudentExport(StudentResource::collection($studentsQuery->get())),
                'Students.xlsx');
        }

        if ($request->has('print') && $request->print === 'true') {
            return $this->pdf('print.students.all', StudentResource::collection($studentsQuery->get()),
                'Students',
                'landscape');
        }

        $studentsQuery->where('status', 'in-school');

        return StudentResource::collection($studentsQuery->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStudentRequest $request): StudentResource|JsonResponse
    {
        DB::beginTransaction();

        try {
            $sponsor = Sponsor::create([
                'name' => $request->sponsor_name,
                'email' => $request->sponsor_email,
                'phone_number' => $request->sponsor_number,
            ]);

            $request['user_id'] = Auth::id();
            $request['sponsor_id'] = $sponsor->id;
            $request['dob'] = Carbon::parse($request->dob)->format('Y-m-d');
            $student = Student::create($request->all());

            DB::commit();
            return new StudentResource($student);
        } catch (Exception $exception) {
            DB::rollBack();
            Log::error('Add Student Error', [$exception]);

            return response()->json([
                'message' => 'Something went wrong'
            ], 400);
        }
    }


    /**
     * @param Student $student
     * @param $qualifications
     * @return void
     */
    public function saveQualifications(Student $student, $qualifications): void
    {
        $student->educationalQualifications()->delete();
        $mapped = Arr::map(explode(',', $qualifications), static function (string $value, string $key) {
            return ['name' => $value];
        });

        $student->educationalQualifications()->createMany($mapped);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStudentRequest $request, Student $student): StudentResource|JsonResponse
    {
        DB::beginTransaction();
        try {
            $student->sponsor()->update([
                'name' => $request->sponsor_name,
                'email' => $request->sponsor_email,
                'phone_number' => $request->sponsor_number,
            ]);
            $request['dob'] = Carbon::parse($request->dob)->format('Y-m-d');
            $student->update($request->all());

            $this->saveQualifications($student, $request->education_qualifications);

            DB::commit();
            return new StudentResource($student);
        } catch (Exception $exception) {
            Log::error('Update Student Error', [$exception]);
            DB::rollBack();

            return response()->json([
                'message' => 'Something went wrong'
            ], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student)
    {
        //
    }


    /**
     * @param Request $request
     * @param Student $student
     * @return EnrollmentResource|JsonResponse
     */
    public function enrollStudent(Request $request, Student $student): EnrollmentResource|JsonResponse
    {
        $checkEnrollment = Enrollment::query()
            ->where('student_id', $student->id)
            ->where('ongoing_program_id', $request->ongoing_program_id)
            ->first();

        if ($checkEnrollment) {
            return response()->json([
                'message' => $student->name . ' is already enrolled in this batch'
            ], 400);
        }

        DB::beginTransaction();
        try {
            $program = Program::find($request->program_id);
            $discount = ($request->discount / 100) * $program->fee;

            $enrollment = $student->enrollments()->create([
                'ongoing_program_id' => $request->ongoing_program_id,
                'total_course_fee' => $program->total_fee,
                'registration_fee' => $program->registration_fee,
                'discounted_fee' => $discount,
                'net_payable_fee' => $program->total_fee - $discount,
            ]);

            if ($student->status != StudentStatus::IN_SCHOOL){
                $student->update([
                    'status' => StudentStatus::IN_SCHOOL
                ]);
            }

            DB::commit();

            return new EnrollmentResource($enrollment);

        } catch (Exception $exception) {
            DB::rollBack();
            Log::error('New Enrollment Error', [$exception]);

            return response()->json([
                'message' => 'Something went wrong'
            ], 400);
        }
    }

    /**
     * @param Student $student
     * @return Response
     */
    public function printStudentData(Student $student): Response
    {
        return $this->pdf('print.students.single', new StudentResource($student), 'Student');
    }

    /**
     * @param Enquiry $enquiry
     * @return Response
     */
    public function printEnquiry(Enquiry $enquiry): Response
    {
        $data = new EnquiryResource($enquiry);
        return $this->pdf('print.students.enquiry', $data , 'Enquiry');
    }
}
