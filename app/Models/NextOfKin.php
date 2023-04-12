<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class NextOfKin extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'employee_id',
        'phone_number',
        'alt_phone_number',
        'address',
        'email'
    ];

    /**
     * @return BelongsTo
     */
    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }
}


