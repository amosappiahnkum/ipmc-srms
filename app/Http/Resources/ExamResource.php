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
        $here = Arr::except($this->exam->questions, ['correct_answer']);
        return [
            'id' => $this->id,
            'subject_id' => $this->subject_id,
            'questions' => $here,
            'date' => $this->exam->date,
            'time' => $this->exam->time,
            'duration' => $this->exam->duration,
            'time_left' => $this->exam->time_left
        ];
    }
}
