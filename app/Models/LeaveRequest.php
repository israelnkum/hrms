<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class LeaveRequest extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'employee_id',
        'supervisor_id',
        'leave_type_id',
        'days_requested',
        'days_approved',
        'start_date',
        'end_date',
        'reason',
        'viewed',
        'status',
        'hr_status',
        'sup_approval',
        'hr_approval',
        'sup_reason',
        'hr_reason'
    ];

//    protected $casts = [
//        'days_requested' => 'integer'
//    ];

    /**
     * @return BelongsTo
     */
    public function leaveType(): BelongsTo
    {
        return $this->belongsTo(LeaveType::class);
    }

    /**
     * @return BelongsTo
     */
    public function approver(): BelongsTo
    {
        return $this->belongsTo(Employee::class, 'supervisor_id');
    }

    /**
     * @return BelongsTo
     */
    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }
}
