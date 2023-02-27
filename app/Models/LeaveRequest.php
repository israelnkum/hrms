<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LeaveRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id',
        'supervisor_id',
        'leave_type_id',
        'days_requested',
        'start_date',
        'end_date',
        'reason',
        'status'
    ];

    /**
     * @return BelongsTo
     */
    public function leaveType (): BelongsTo
    {
        return $this->belongsTo(LeaveType::class);
    }

    /**
     * @return BelongsTo
     */
    public function approver (): BelongsTo
    {
        return $this->belongsTo(Employee::class, 'supervisor_id');
    }

    /**
     * @return BelongsTo
     */
    public function employee (): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }
}
