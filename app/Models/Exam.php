<?php

namespace App\Models;

use App\Http\Traits\UseUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Exam extends Model
{
    use HasFactory, UseUuid;

    protected $fillable = [
        'program_module_id',
        'ongoing_program_id',
        'questions',
        'answer',
        'date',
        'time',
        'duration',
        'time_left',
        'shuffle'
    ];

    protected $hidden = [
      'answer'
    ];

    protected $casts = [
        'questions' => 'array',
        'answer' => 'array'
    ];

    public function exam_type(): MorphTo
    {
        return $this->morphTo();
    }

    public function ongoingProgram(): BelongsTo
    {
        return $this->belongsTo(OngoingProgram::class);
    }

    public function programModule(): BelongsTo
    {
        return $this->belongsTo(ProgramModule::class);
    }
}
