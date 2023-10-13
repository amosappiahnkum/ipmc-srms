<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PhotoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param Request $request
     * @return array
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'filepath' => '/storage/docs/qualifications/',
            'photoable_id' => $this->photoable_id,
            'photoable_type' => $this->photoable_type,
            'file_name' => $this->file_name,
            'info_update' => $this->informationUpdate,
        ];
    }
}
