<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProgramModuleResource extends JsonResource
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
            'module_id' => $this->module_id,
            'module' => [
                'code' => $this->module->code,
                'name' => $this->module->name,
                'uuid' => $this->module->uuid,
            ],
            'ongoing_program_id' => $this->ongoing_program_id,
            'program_id' => $this->program_id,
            'duration_id' => $this->duration_id,
            'contact_hours' => $this->contact_hours,
            'year' => $this->year,
            'semester' => $this->semester,
        ];
    }
}
