<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Dependant extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'employee_id',
        'relationship',
        'phone_number',
        'alt_phone_number',
        'dob',
        'user_id',
    ];

    /**
     * @return BelongsTo
     */
    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }

    /**
     * @return MorphOne
     */
    public function informationUpdate(): MorphOne
    {
        return $this->morphOne(InformationUpdate::class, 'information')
            ->where('status', 'pending')
            ->latest();
    }
}
