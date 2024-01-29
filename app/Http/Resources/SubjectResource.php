<?php

namespace App\Http\Resources;

use App\Models\RegularExam;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SubjectResource extends JsonResource
{

    public function checkExamDate($data)
    {
        if ($data && Carbon::parse($data->exam->date)->isToday()) {
            return [
                'id' => $data->id,
                'ongoing_program_id' => $data->ongoing_program_id,
                'program_module_id' => $data->program_module_id
            ];
        }

        return null;
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'program_id' => $this->program_id,
            'name' => $this->module->name,
            'duration_id' => $this->duration_id,
            'duration' => $this->duration->duration,
            'contact_hours' => $this->contact_hours,
            'year' => $this->year,
            'semester' => $this->semester,
            'questions' => 0,
            'exam_available' => $this->checkExamDate(RegularExam::query()
                ->where('program_module_id', $this->id)
                ->where('ongoing_program_id', $this->regularExams?->ongoing_program_id)->first())
            ,
            'code' => $this->code,
            'user_id' => $this->user_id
        ];
    }
}
