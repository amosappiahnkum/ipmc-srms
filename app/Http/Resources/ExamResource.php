<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Arr;

class ExamResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'ongoing_program_id' => $this->ongoing_program_id,
            'program' => $this->ongoingProgram->program->allPrograms->name,
            'subject' => $this->programModule->module->name,
            'shuffle' => $this->shuffle,
            'id' => $this->id,
            'date' => $this->date,
            'time' => $this->time,
            'duration' => $this->duration,
            'time_left' => $this->time_left
        ];
    }
}
