<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BatchStudentsResource extends JsonResource
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
            'student_id' => $this->student_id,
            'student' => [
                'name' => $this->student->name,
                'phone_number' => $this->student->phone_number,
                'email' => $this->student->email
            ],
            'ongoing_program_id' => $this->ongoing_program_id,
            'total_course_fee' => $this->total_course_fee,
            'registration_fee' => $this->registration_fee,
            'discounted_fee' => $this->discounted_fee,
            'net_payable_fee' => $this->net_payable_fee,
        ];
    }
}
