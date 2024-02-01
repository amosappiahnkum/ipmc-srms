<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class ProgramModule extends Model
{
    use HasFactory;

    protected $fillable = [
        'module_id',
        'ongoing_program_id',
        'program_id',
        'duration_id',
        'contact_hours',
        'year',
        'semester',
        'user_id'
    ];

    public function module(): BelongsTo
    {
        return $this->belongsTo(Module::class);
    }

    public function program(): BelongsTo
    {
        return $this->belongsTo(Program::class);
    }


    /**
     * @return BelongsTo
     */
    public function duration(): BelongsTo
    {
        return $this->belongsTo(Duration::class);
    }

    public function regularExams(): HasOne
    {
        return $this->hasOne(RegularExam::class)->withDefault(null);
    }

    public function resitExams(): HasMany
    {
        return $this->hasMany(ResitExam::class);
    }
}
