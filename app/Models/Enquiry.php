<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Log;

class Enquiry extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'student_id',
        'programs',
        'other_program',
        'preferred_timings',
        'other_preferred_timing',
        'heard',
        'other_heard',
        'school_name',
        'evaluated_by',
        'evaluation_date'
    ];

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }

    protected function programs(): Attribute
    {
        return Attribute::make(
            get: static fn(string $value) => json_decode($value, JSON_THROW_ON_ERROR, 512, JSON_THROW_ON_ERROR),
            set: static fn(array $value) => json_encode($value, JSON_THROW_ON_ERROR)
        );
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

    public function enquiryPrograms (): Collection|array
    {
        return Program::query()->whereIn('id', $this->programs)->get();
    }
}
