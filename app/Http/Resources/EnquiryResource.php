<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EnquiryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'student_id' => $this->student_id,
            'student' => new StudentResource($this->student),
            'programs' => $this->programs,
            'enquiry_programs' => ProgramResource::collection($this->enquiryPrograms()),
            'other_program' => $this->other_program,
            'preferred_timings' => $this->preferred_timings,
            'other_preferred_timing' => $this->other_preferred_timing,
            'heard' => $this->heard,
            'other_heard' => $this->other_heard,
            'school_name' => $this->school_name,
            'evaluated_by' => $this->evaluated_by,
            'evaluation_date' => $this->evaluation_date
        ];
    }
}
