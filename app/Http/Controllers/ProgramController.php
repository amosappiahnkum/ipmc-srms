<?php

namespace App\Http\Controllers;

use App\Exports\ProgramExport;
use App\Http\Resources\ProgramResource;
use App\Models\AllPrograms;
use App\Models\Program;
use App\Traits\UsePrint;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class ProgramController extends Controller
{
    use UsePrint;


    /**
     * @param Request $request
     * @return Response|BinaryFileResponse|AnonymousResourceCollection
     */
    public function index(Request $request): Response|BinaryFileResponse|AnonymousResourceCollection
    {
        $programsQuery = Program::query();

        $programsQuery->when($request->filled('search') && $request->search !== 'null', function ($q) use ($request) {
            return $q->whereHas('allPrograms', function ($q) use ($request) {
                return $q->where('name', 'like', "%{$request->search}%");
            });
        });

        if ($request->has('export') && $request->export === 'true') {
            return Excel::download(new ProgramExport(ProgramResource::collection($programsQuery->get())),
                'Programs.xlsx');
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
            $program = AllPrograms::create($request->all());
            DB::commit();
            return new ProgramResource($program);
        } catch (Exception $exception) {
            DB::rollBack();
            Log::error('Add AllPrograms Error', [$exception]);

            return response()->json([
                'message' => 'Something went wrong'
            ], 400);
        }
    }

    /**
     * @param Request $request
     * @param AllPrograms $program
     * @return ProgramResource|JsonResponse
     */
    public function update(Request $request, AllPrograms $program): ProgramResource|JsonResponse
    {
        DB::beginTransaction();
        try {
            $request['user_id'] = Auth::id();
            $program->update($request->all());
            DB::commit();
            return new ProgramResource($program);
        } catch (Exception $exception) {
            DB::rollBack();
            Log::error('Add AllPrograms Error', [$exception]);

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

    /**
     * @return AnonymousResourceCollection
     */
    public function allPrograms(): AnonymousResourceCollection
    {
        return ProgramResource::collection(Program::all());
    }
}
