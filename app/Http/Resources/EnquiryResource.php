<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EnquiryResource extends JsonResource
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
            'programs' => $this->programs,
            'enquiry_programs' => $this->enquiryPrograms,
            'other_program' => $this->other_program,
            'preferred_timings' => $this->preferred_timings,
            'other_preferred_timing' => $this->other_preferred_timing,
            'heard' => $this->heard,
            'other_heard' => $this->other_heard,
            'follow_ups' => FollowUpResource::collection($this->followUps),
            'follow_ups_count' => $this->followUps->count(),
            'school_name' => $this->school_name,
            'educational_qualification' => $this->school_name,
            'evaluated_by' => $this->evaluated_by,
            'evaluation_date' => $this->evaluation_date,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'name' => $this->first_name . ' ' . $this->last_name,
            'email' => $this->email,
            'phone_number' => $this->phone_number,
            'alt_phone_number' => $this->alt_phone_number,
        ];
    }
}
