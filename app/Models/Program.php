<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Program extends BaseModel
{

    protected $fillable = [
        'all_programs_id',
        'duration_id',
        'year',
        'program_code',
        'fee',
        'registration_fee',
        'total_fee',
        'type',
        'installments',
    ];

    public function students (): HasManyThrough
    {
        return $this->hasManyThrough(Registration::class,OngoingProgram::class);
    }

    public function allPrograms(): BelongsTo
    {
        return $this->belongsTo(AllPrograms::class);
    }

    /**
     * @return BelongsTo
     */
    public function duration(): BelongsTo
    {
        return $this->belongsTo(Duration::class);
    }

    /**
     * @return HasMany
     */
    public function modules(): HasMany
    {
        return $this->hasMany(ProgramModule::class);
    }
}
