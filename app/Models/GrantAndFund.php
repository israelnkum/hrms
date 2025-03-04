<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GrantAndFund extends Model
{
    use HasFactory;

    protected $fillable = [
        'source',
        'purpose',
        'amount',
        'benefactor',
        'date',
        'description',
        'employee_id',
        'user_id'
    ];

    protected $casts = [
        'date' => 'date'
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
