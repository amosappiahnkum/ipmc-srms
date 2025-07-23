<?php

namespace App\Http\Controllers;

use App\Exports\FollowUpExport;
use App\Http\Resources\EnquiryResource;
use App\Http\Resources\FollowUpResource;
use App\Models\Enquiry;
use App\Models\FollowUp;
use App\Traits\UseDateRage;
use App\Traits\UsePrint;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;

class FollowUpController extends Controller
{
    use UsePrint, UseDateRage;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $ongoingProgramsQuery = FollowUp::query();

        $ongoingProgramsQuery->when($request->has('program_id') &&
            $request->program_id !== 'all', function ($q) use ($request) {
            return $q->whereRelation('enquiry', function ($eq) use ($request) {
                return $eq->whereJsonContains('programs', (int) $request->program_id);
            });
        });

        $ongoingProgramsQuery->when($request->has('date') &&
            $request->date !== 'null', function ($q) use ($request) {
            return $q->whereBetween('created_at', $this->dateRange($request->date));
        });

//        if (!Auth::user()->hasRole('super-admin')) {
//            $ongoingProgramsQuery->where('branch_id', Auth::user()->userable->branch_id);
//        }

        if ($request->has('export') && $request->export === 'true') {
            return Excel::download(new FollowUpExport($ongoingProgramsQuery->get()),
                'FollowUps.xlsx');
        }

        if ($request->has('print') && $request->print === 'true') {
            return $this->pdf('print.ongoingPrograms.all',
                FollowUpResource::collection($ongoingProgramsQuery->get()),
                'FollowUps', 'landscape');
        }

        $perPage = $request->query('per_page', 10);

        return FollowUpResource::collection($ongoingProgramsQuery->paginate($perPage));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $enquiry = Enquiry::query()->findOrFail($request->enquiry_id);
        DB::beginTransaction();
        try {

            $request['user_id'] = Auth::id();
            $request['follow_up_date'] = Carbon::parse($request->follow_up_date)->format('Y-m-d');
            $enquiry->followUps()->create($request->all());

            DB::commit();

            return new EnquiryResource($enquiry);
        } catch (Exception $exception) {
            DB::rollBack();

            Log::error('Add Follow up exception', [$exception]);
            return response()->json([
                'message' => 'Something went wrong!'
            ], 400);
        }
    }

    /**
     * @param Request $request
     * @param $id
     * @return EnquiryResource|JsonResponse
     */
    public function update(Request $request, $id): JsonResponse|EnquiryResource
    {
        DB::beginTransaction();
        try {
            $request['follow_up_date'] = Carbon::parse($request->follow_up_date)->format('Y-m-d');
            $followUp = FollowUp::query()->findOrFail($id);
            $followUp->update($request->all());
            DB::commit();
            return new EnquiryResource($followUp->enquiry);
        } catch (Exception $exception) {
            DB::rollBack();

            Log::error('Update Follow up exception', [$exception]);
            return response()->json([
                'message' => 'Something went wrong!'
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
