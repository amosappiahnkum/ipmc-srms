<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProgramResource extends JsonResource
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
            'name' => $this->allPrograms->name . ($this->year ? ' - ' . $this->year : ''),
            'duration' => $this->duration->duration,
            'type' => $this->allPrograms->type,
            'fee' => $this->fee,
            'registration_fee' => $this->registration_fee,
            'year' => $this->year,
            'modules' => ProgramModuleResource::collection($this->modules),
            'sems' => array_unique($this->modules->pluck('semester')->toArray()),
            'program_type' => $this->allPrograms->type,
            'students' => $this->students->count(),
            'total_fee' => $this->total_fee,
            'installments' => $this->installments,
        ];
    }
}
