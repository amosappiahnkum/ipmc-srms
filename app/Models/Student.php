<?php

namespace App\Models;

use App\Enums\StudentStatus;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Student extends Model
{
    use HasFactory, SoftDeletes;

    protected $appends = [
        'name'
    ];

    protected $casts = [
        'education_qualifications' => 'array',
        'status' => StudentStatus::class
    ];

    protected $fillable = [
        'first_name',
        'last_name',
        'other_name',
        'phone_number',
        'dob',
        'country',
        'nationality',
        'gender',
        'alt_phone_number',
        'email',
        'address',
        'box_address',
        'house_number',
        'digital_address',
        'id_type',
        'id_number',
        'education_qualifications',
        'other_qualification',
        'sponsor_id',
        'branch_id',
        'status',
        'user_id'
    ];

    /**
     * @return string
     */
    public function getNameAttribute(): string
    {
        return $this->first_name . " " . $this->other_name . " " . $this->last_name;
    }

    /**
     * @return BelongsTo
     */
    public function sponsor(): BelongsTo
    {
        return $this->belongsTo(Sponsor::class);
    }

    /**
     * @return HasMany
     */
    public function educationalQualifications(): HasMany
    {
        return $this->hasMany(EducationalQualification::class);
    }

    /**
     * @return HasMany
     */
    public function registrations(): HasMany
    {
        return $this->hasMany(Registration::class);
    }

    /**
     * @return HasOne
     */
    public function enquiry(): HasOne
    {
        return $this->hasOne(Enquiry::class);
    }

    protected function educational_qualifications(): Attribute
    {
        return Attribute::make(
            get: static fn(string $value) => json_decode($value, JSON_THROW_ON_ERROR, 512, JSON_THROW_ON_ERROR),
            set: static fn(string $value) => json_encode($value, JSON_THROW_ON_ERROR)
        );
    }

    public function user(): MorphOne
    {
        return $this->morphOne(User::class,'userable');
    }

    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class);
    }
}
