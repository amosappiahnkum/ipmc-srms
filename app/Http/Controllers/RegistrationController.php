<?php

namespace App\Http\Controllers;

use App\Exports\RegistrationExport;
use App\Http\Requests\StoreRegistrationRequest;
use App\Http\Requests\UpdateRegistrationRequest;
use App\Http\Resources\RegistrationResource;
use App\Models\Registration;
use App\Models\Student;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;

class RegistrationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $registrationQuery = Registration::query();

        $registrationQuery->when($request->has('program_id') &&
            $request->program_id !== 'all', function ($q) use ($request) {
            return $q->whereJsonContains('programs', (int)$request->program_id);
        });

        $registrationQuery->when($request->has('date') &&
            $request->date !== 'null', function ($q) use ($request) {
            return $q->whereBetween('created_at', $this->dateRange($request->date));
        });

        if (!Auth::user()?->hasRole('super-admin')) {
            $registrationQuery->where('branch_id', Auth::user()->userable->branch_id);
        }

        if ($request->has('export') && $request->export === 'true') {
            return Excel::download(new RegistrationExport($registrationQuery->get()),
                'Enquiries.xlsx');
        }

        if ($request->has('print') && $request->print === 'true') {
            return $this->pdf('print.students.all', RegistrationResource::collection($registrationQuery->get()),
                'Enquiries',
                'landscape');
        }

        $perPage = $request->query('per_page', 10);

        return RegistrationResource::collection($registrationQuery->paginate($perPage));
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRegistrationRequest $request)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(
        UpdateRegistrationRequest $request,
        Registration $registration
    ): RegistrationResource|\Illuminate\Http\JsonResponse {
        DB::beginTransaction();
        try {
            $registration->update($request->all());

            $student = Student::find($registration->student_id);
            $student->update([
                'status' => $request->status
            ]);

            DB::commit();

            return new RegistrationResource($registration);
        } catch (Exception $exception) {
            DB::rollBack();
            Log::error('Update Registration Error', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Something went wrong'
            ], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Registration $registration)
    {
        //
    }
}
