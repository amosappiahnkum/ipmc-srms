<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OngoingProgramResource extends JsonResource
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
            'program_id' => $this->program_id,
            'program' => $this->program->name,
            'instructor' => $this->instructor->name,
            'instructor_id' => $this->instructor_id,
            'batch_time' => $this->batch_time,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'students' => $this->enrollments->count(),
        ];
    }
}
