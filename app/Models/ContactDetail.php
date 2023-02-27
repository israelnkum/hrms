<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class ContactDetail extends ApplicationModel
{
    use HasFactory, Notifiable, SoftDeletes;

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

    /**
     * @return BelongsTo
     */
    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }

    /**
     * @param $notification
     *
     * return string
     */
    public function routeNotificationForMail($notification): string
    {
        return $this->work_email;
    }
}
