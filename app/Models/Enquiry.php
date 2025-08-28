<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Log;

class Enquiry extends BaseModel
{
    protected $fillable = [
        'first_name',
        'last_name',
        'other_name',
        'phone_number',
        'alt_phone_number',
        'email',
        'other_program',
        'preferred_timings',
        'other_preferred_timing',
        'heard',
        'other_heard',
        'branch_id',
        'school_name',
    ];

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }

    protected function preferredTimings(): Attribute
    {
        return Attribute::make(
            get: static fn(string $value) => json_decode($value, JSON_THROW_ON_ERROR, 512, JSON_THROW_ON_ERROR),
            set: static fn(array $value) => json_encode($value, JSON_THROW_ON_ERROR)
        );
    }

    protected function heard(): Attribute
    {
        return Attribute::make(
            get: static fn(string $value) => json_decode($value, JSON_THROW_ON_ERROR, 512, JSON_THROW_ON_ERROR),
            set: static fn(array $value) => json_encode($value, JSON_THROW_ON_ERROR)
        );
    }

    public function enquiryPrograms (): HasMany
    {
        return $this->hasMany(EnquiryProgram::class);
    }

    public function followUps (): HasMany
    {
        return $this->hasMany(FollowUp::class);
    }
}
