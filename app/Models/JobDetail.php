<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class JobDetail extends ApplicationModel
{
    use HasFactory, SoftDeletes;

    /**
     * @var string[]
     */
    protected $fillable = [
        'job_title',
        'status',
        'location',
        'joined_date',
        'contract_start_date',
        'contract_end_date',
        'employee_id',
        'user_id',
        'job_category_id',
        'sub_unit_id',
    ];

    protected $casts = [
        'job_category_id' => 'integer',
        'sub_unit_id' => 'integer',
        'employee_id' => 'integer',
        'user_id' => 'integer',
        'joined_date' => 'date',
        'contract_start_date' => 'date',
        'contract_end_date' => 'date',
    ];

    public function photo(): MorphOne
    {
        return $this->morphOne(Photo::class,'photoable');
    }

    public function subUnit(): BelongsTo
    {
        return $this->belongsTo(SubUnit::class)->withDefault([
           'name' => '-'
        ]);
    }

    public function jobCategory(): BelongsTo
    {
        return $this->belongsTo(JobCategory::class)->withDefault([
           'name' => '-'
        ]);
    }
}
