<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentResource extends JsonResource
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
            'name' => $this->name,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'other_name' => $this->other_name,
            'phone_number' => $this->phone_number,
            'dob' => $this->dob,
            'registrations' => RegistrationResource::collection($this->registrations),
            'nationality' => $this->nationality,
            'gender' => $this->gender,
            'alt_phone_number' => $this->alt_phone_number,
            'education_qualifications' => $this->education_qualifications,
            'email' => $this->email,
            'digital_address' => $this->digital_address,
            'country' => $this->country,
            'house_number' => $this->house_number,
            'box_address' => $this->box_address,
            'address' => $this->address,
            'id_type' => $this->id_type,
            'id_number' => $this->id_number,
            'status' => $this->status,
            'sponsor_id' => $this->sponsor_id,
            'sponsor_name' => $this->sponsor->name,
            'sponsor_email' => $this->sponsor->email,
            'sponsor_number' => $this->sponsor->phone_number,
            'sponsor_relationship' => $this->sponsor->relationship
        ];
    }
}
