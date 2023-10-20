<?php

namespace App\Http\Resources;

use Carbon\Carbon;
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
        $time = Carbon::parse($this->batch_time)->format('h:i A');
        return [
            'id' => $this->id,
            'program_id' => $this->program_id,
            'name' => $time . ' - ' . $this->program->allPrograms->name . ' - '.  $this->program->year,
            'instructor' => $this->instructor?->name,
            'program' => $this->program->allPrograms->name . ' - '.  $this->program->year,
            'instructor_id' => $this->instructor_id,
            'sems' => array_filter(array_unique($this->program->modules->pluck('semester')->toArray())),
            'batch_time' => $time,
            'room' => $this->room,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'students' => $this->enrollments->count(),
        ];
    }
}
