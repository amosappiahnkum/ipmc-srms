<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use function Symfony\Component\Translation\t;

class ProgramResource extends JsonResource
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
            'name' => $this->allPrograms->name,
            'duration' => $this->allPrograms->duration,
            'type' => $this->allPrograms->type,
            'fee' => $this->allPrograms->fee,
            'students' => 0,
            'registration_fee' => $this->allPrograms->registration_fee,
            'total_fee' => $this->allPrograms->total_fee,
            'number_of_installment' => $this->allPrograms->number_of_installment,
        ];
    }
}
