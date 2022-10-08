<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EducationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request): array|\JsonSerializable|\Illuminate\Contracts\Support\Arrayable
    {
        return [
            'id' => $this->id,
            'employee_id' => $this->employee_id,
            'employee' => new EmployeeResource($this->employee),
            'education_level_id' => $this->education_level_id,
            'education_level' => $this->educationLevel,
            'institute' => $this->institute,
            'major' => $this->major,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
        ];
    }
}
