<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SubjectResource extends JsonResource
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
            'name' => $this->name,
            'duration_id' => $this->duration_id,
            'duration' => $this->duration->duration,
            'contact_hours' => $this->contact_hours,
            'year' => $this->year,
            'semester' => $this->semester,
            'code' => $this->code,
            'user_id' => $this->user_id
        ];
    }
}
