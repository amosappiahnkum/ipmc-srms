<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->userable->name,
            'username' => $this->username,
            'branch' => $this->userable->branch->name ?? '-',
            'type' => $this->userable->type ?? 'Student',
            'staff_id' => $this->userable_id,
            'password_changed' => $this->password_changed,
            'student_number' => $this->userable->student_number ?? '-',
        ];
    }
}
