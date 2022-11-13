<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use JsonSerializable;

class EmployeeResource extends JsonResource
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
            'title' => $this->title,
            'first_name' => $this->first_name,
            'middle_name' => $this->middle_name,
            'last_name' => $this->last_name,
            'name' => $this->name,
            'staff_id' => $this->staff_id,
            'dob' => $this->dob,
            'age' => Carbon::parse($this->dob)->age,
            'gender' => $this->gender,
            'marital_status' => $this->marital_status,
            'telephone' => $this->telephone,
            'work_telephone' => $this->work_telephone,
            'work_email' => $this->work_email,
            'other_email' => $this->other_email,
            'ssnit_number' => $this->ssnit_number,
            'gtec_placement' => $this->gtec_placement,
            'gtec_placement_name' => $this->gtecPlacement->name,
            'rank_id' => $this->rank_id,
            'rank' => $this->rank->name,
            'department_id' => $this->department_id,
            'department' => $this->department->name,
            'photo' => $this->photo ? '/storage/images/employees/'.$this->photo->file_name : null,
        ];
    }
}
