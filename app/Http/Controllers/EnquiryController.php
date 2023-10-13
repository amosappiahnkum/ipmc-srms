<?php

namespace App\Http\Controllers;

use App\Enums\StudentStatus;
use App\Exports\EnquiryExport;
use App\Http\Requests\StoreEnquiryRequest;
use App\Http\Requests\UpdateEnquiryRequest;
use App\Http\Resources\EnquiryResource;
use App\Models\Enquiry;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class EnquiryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $studentsQuery = Enquiry::query();
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
            return Excel::download(new EnquiryExport(EnquiryResource::collection($studentsQuery->get())),
                'Enquiries.xlsx');
        }

        if ($request->has('print') && $request->print === 'true') {
            return $this->pdf('print.students.all', EnquiryResource::collection($studentsQuery->get()),
                'Enquiries',
                'landscape');
        }

        $studentsQuery->whereRelation('student', function ($q) {
            return $q->where('status', '!=', StudentStatus::IN_SCHOOL);
        });

        return EnquiryResource::collection($studentsQuery->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEnquiryRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Enquiry $enquiry)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEnquiryRequest $request, Enquiry $enquiry)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Enquiry $enquiry)
    {
        //
    }
}
