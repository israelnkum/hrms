<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Dependant extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'employee_id',
        'relationship',
        'phone_number',
        'alt_phone_number',
        'dob',
        'user_id',
    ];
}
