<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StaffResource extends JsonResource
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
            'other_name' => $this->other_name ?? '',
            'phone_number' => $this->phone_number,
            'email' => $this->user->email ?? '',
            'username' => $this->user->username ?? '',
            'type' => $this->type,
            'permissions' => $this->user?->getPermissionsViaRoles()->pluck('id')->merge
            ($this->user?->getDirectPermissions()->pluck('id'))
        ];
    }
}
