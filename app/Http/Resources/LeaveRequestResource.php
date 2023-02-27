<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LeaveRequestResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     *
     * @return array
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'leave_type_id' => $this->leave_type_id,
            'leave_type' => $this->leaveType->name,
            'reason' => $this->reason,
            'days_requested' => $this->days_requested,
            'employee_id' => $this->employee_id,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'status' => $this->status,
            'supervisor_id' => $this->supervisor_id,
            'employee' => $this->employee->name,
            'approver' => $this->approver->name
        ];
    }
}
