<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FollowUpResource extends JsonResource
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
            'follow_up_date' => $this->follow_up_date,
            'mode' => $this->mode,
            'feedback' => $this->feedback,
            'student' => $this->enquiry->student->name,
            'user_id' => $this->user_id,
            'enquiry_id' => $this->enquiry_id
        ];
    }
}
