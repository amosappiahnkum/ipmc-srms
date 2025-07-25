<?php

namespace App\Http\Controllers;

use App\Exports\EnquiryExport;
use App\Http\Requests\StoreEnquiryRequest;
use App\Http\Requests\UpdateEnquiryRequest;
use App\Http\Resources\EnquiryResource;
use App\Models\Enquiry;
use App\Traits\UseDateRage;
use App\Traits\UsePrint;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;

class EnquiryController extends Controller
{
    use UsePrint, UseDateRage;
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $enquiryQuery = Enquiry::query();

        $enquiryQuery->when($request->has('program_id') &&
            $request->program_id !== 'all', function ($q) use ($request) {
            return $q->whereJsonContains('programs', (int) $request->program_id);
        });

        $enquiryQuery->when($request->has('date') &&
            $request->date !== 'null', function ($q) use ($request) {
            return $q->whereBetween('created_at', $this->dateRange($request->date));
        });

        if(!Auth::user()?->hasRole('super-admin')) {
            Log::info('super', [Auth::user()->userable->branch_id]);
            $enquiryQuery->where('branch_id', Auth::user()->userable->branch_id);
        }

        if ($request->has('export') && $request->export === 'true') {
            return Excel::download(new EnquiryExport($enquiryQuery->get()),
                'Enquiries.xlsx');
        }

        if ($request->has('print') && $request->print === 'true') {
            return $this->pdf('print.students.all', EnquiryResource::collection($enquiryQuery->get()),
                'Enquiries',
                'landscape');
        }

        $perPage = $request->query('per_page', 10);

        return EnquiryResource::collection($enquiryQuery->paginate($perPage));
    }
}
