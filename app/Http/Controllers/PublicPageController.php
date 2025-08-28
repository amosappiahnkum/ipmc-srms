<?php

namespace App\Http\Controllers;

use App\Helpers\Helper;
use App\Http\Requests\NewEnquiryRequest;
use App\Http\Resources\AllProgramsResource;
use App\Http\Resources\EnquiryResource;
use App\Http\Resources\OngoingProgramResource;
use App\Http\Resources\ProgramResource;
use App\Http\Resources\SubjectResource;
use App\Models\AllPrograms;
use App\Models\Branch;
use App\Models\Enquiry;
use App\Models\Holiday;
use App\Models\OngoingProgram;
use App\Models\Program;
use App\Models\Sponsor;
use App\Models\Student;
use App\Models\Module;
use Carbon\Carbon;
use Exception;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PublicPageController extends Controller
{
    public function index(): View|\Illuminate\Foundation\Application|Factory|Application
    {
//        $this->dispatch(new SendNewEnquiryJob([]));
        return view('public-enquiry.home');
//        $data =  Enquiry::first();

//        return view('print.students.enquiry', compact('data'));
    }

    public function getPrograms(): Collection
    {
        return AllProgramsResource::collection(AllPrograms::all())->collection->groupBy('type');
    }

    public function getBranches(): Collection
    {
        return Branch::all();
    }

    public function newEnquiry(NewEnquiryRequest $request): JsonResponse|EnquiryResource
    {
        try {
            $enquiry = DB::transaction(function () use ($request) {
                $enquiry = Enquiry::create($request->only([
                    'first_name',
                    'last_name',
                    'other_name',
                    'phone_number',
                    'alt_phone_number',
                    'email',
                    'other_program',
                    'preferred_timings',
                    'other_preferred_timing',
                    'heard',
                    'other_heard',
                    'branch_id',
                    'school_name',
                ]));

                // If enquiryPrograms is a hasMany relation
                $enquiry->enquiryPrograms()->createMany(
                    collect($request->programs)->map(fn($id) => ['program_id' => $id])->toArray()
                );

                return $enquiry;
            });

            return new EnquiryResource($enquiry);

        } catch (Exception $exception) {
            Log::error('new enquiry: ', [$exception->getMessage(), $exception->getTraceAsString()]);
            return response()->json(['message' => 'Something went wrong'], 400);
        }
    }

    public function debug()
    {
        $ongoingProgram = OngoingProgram::query()->find(1);

        $modules = $ongoingProgram->program->modules->where('semester', 1);

        $data = [
            'batch' => $ongoingProgram,
            'modules' => $modules,
            'totalDuration' => $modules->sum('duration.duration')
        ];

        return \view('print.ongoing-programs.batch-plan', compact('data'));
    }

    public function getHolidays(): Collection
    {
        return Holiday::all()->pluck('start_date');
    }
}
