<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExamQuestionResource extends JsonResource
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
            'correct_answer' => $this->correct_answer,
            'text' => $this->text,
            'options' => json_decode($this->answers),
            'type' => $this->type,
            'mark' => $this->mark,
            'timed' => $this->timed,
            'time' => $this->time
        ];
    }
}
