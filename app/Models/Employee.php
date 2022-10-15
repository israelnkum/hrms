<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Employee extends Model
{
    use HasFactory, SoftDeletes;

    protected $appends =[
        'name'
    ];

    protected $fillable = [
        'title',
        'first_name',
        'middle_name',
        'last_name',
        'staff_id',
        'dob',
        'gender',
        'marital_status',
        'telephone',
        'work_telephone',
        'work_email',
        'other_email',
        'ssnit_number',
        'gtech_placement',
        'rank_id',
        'department_id'
    ];

    public function getNameAttribute(): string
    {
        return  $this->first_name." ".$this->middle_name." ".$this->last_name;
    }

    public function rank(): BelongsTo
    {
        return $this->belongsTo(Rank::class)->withDefault(['name' => '-']);
    }

    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class)->withDefault(['name' => '-']);
    }

    public function photo(): MorphOne
    {
        return $this->morphOne(Photo::class,'photoable');
    }

    public function contactDetail(): HasOne
    {
        return $this->hasOne(ContactDetail::class);
    }

    public function emergencyContacts(): BelongsTo
    {
        return $this->belongsTo(EmergencyContact::class);
    }
}
