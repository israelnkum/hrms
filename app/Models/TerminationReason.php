<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TerminationReason extends Model
{
    use HasFactory;

    protected $fillable = [
        'reason', 'user_id'
    ];
}
