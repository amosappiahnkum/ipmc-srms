<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RegularExamResource extends JsonResource
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
            'ongoing_program_id' => $this->ongoing_program_id,
            'program_module_id' => $this->program_module_id,
            'exam' => new ExamResource($this->exam),
        ];
    }
}
