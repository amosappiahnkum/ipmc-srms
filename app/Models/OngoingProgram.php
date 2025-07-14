<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class OngoingProgram extends BaseModel
{

    protected $fillable = [
        'program_id',
        'staff_id',
        'batch_time',
        'start_date',
        'end_date',
        'room',
        'status',
        'branch_id',
        'user_id'
    ];

    /**
     * @return BelongsTo
     */
    public function program(): BelongsTo
    {
        return $this->belongsTo(Program::class, 'program_id');
    }

    /**
     * @return BelongsTo
     */
    public function staff(): BelongsTo
    {
        return $this->belongsTo(Staff::class);
    }

    /**
     * @return HasMany
     */
    public function registrations(): HasMany
    {
        return $this->hasMany(Registration::class);
    }

    public function exams(): HasMany
    {
        return $this->hasMany(Exam::class);
    }

    protected function batchTime(): Attribute
    {
        return Attribute::make(
            get: static fn($value) => $value ? Carbon::parse($value)->format('h:i A') : NULL,
            set: static fn($value) => $value !== 'null' ? Carbon::parse($value)->format('H:i') : null,
        );
    }

    protected function startDate(): Attribute
    {
        return Attribute::make(
            get: static fn($value) => $value ? Carbon::parse($value)->format('Y-m-d') : NULL,
            set: static fn($value) => $value !== 'null' ? Carbon::parse()->format('Y-m-d') : null,
        );
    }

    protected function endDate(): Attribute
    {
        return Attribute::make(
            get: static fn($value) => $value ? Carbon::parse($value)->format('Y-m-d') : NULL,
            set: static fn($value) => $value !== 'null' ? Carbon::parse()->format('Y-m-d') : null,
        );
    }

    protected function staffId(): Attribute
    {
        return Attribute::make(
            get: static fn($value) => $value,
            set: static fn($value) => $value !== 'null' ? $value : null,
        );
    }

    protected function room(): Attribute
    {
        return Attribute::make(
            get: static fn($value) => $value,
            set: static fn($value) => $value !== 'null' ? $value : null,
        );
    }
}
