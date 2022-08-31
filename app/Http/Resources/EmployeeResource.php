<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeResource extends JsonResource
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
            'gtech_placement' => $this->gtech_placement,
            'rank_id' => $this->rank_id,
            'rank' => $this->rank->name,
            'department_id' => $this->department_id,
            'department' => $this->department->name,
        ];
    }
}
