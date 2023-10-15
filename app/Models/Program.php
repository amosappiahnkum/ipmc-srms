<?php

namespace App\Models;

use App\Enums\ProgramType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\SoftDeletes;

class Program extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'all_programs_id',
        'duration_id',
        'year',
    ];

    public function students (): HasManyThrough
    {
        return $this->hasManyThrough(Enrollment::class,OngoingProgram::class);
    }

    public function allPrograms(): BelongsTo
    {
        return $this->belongsTo(AllPrograms::class);
    }
}
