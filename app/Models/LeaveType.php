<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeaveType extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'entitlement_type',
        'number_of_days',
        'start_of_annual_cycle',
        'allow_half_day',
        'allow_carry_forward',
        'maximum_allotment',
        'maximum_consecutive_days',
        'should_request_before',
        'user_id'
    ];
}
