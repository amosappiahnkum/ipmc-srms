<?php

namespace App\Models;

use App\Enums\ProgramType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\SoftDeletes;

class Program extends Model
{
    use HasFactory, SoftDeletes;

    protected $casts = [
        'program_type' => ProgramType::class
    ];

    protected $fillable = [
        'name',
        'duration',
        'fee',
    ];

    public function students (): HasManyThrough
    {
        return $this->hasManyThrough(Enrollment::class,OngoingProgram::class);
    }
}
