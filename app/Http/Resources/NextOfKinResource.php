<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class NextOfKinResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'employee_id' => $this->employee_id,
            'phone_number' => $this->phone_number,
            'alt_phone_number' => $this->alt_phone_number,
            'address' => $this->address,
            'email' => $this->email,
            'info_update' => $this->informationUpdate,
        ];
    }
}
