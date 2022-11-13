<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class ContactDetail extends ApplicationModel
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'employee_id',
        'address',
        'city',
        'region',
        'zip_code',
        'country',
        'telephone',
        'work_telephone',
        'work_email',
        'other_email',
        'nationality',
        'user_id',
    ];
}
