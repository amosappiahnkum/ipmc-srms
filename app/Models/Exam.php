<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Exam extends Model
{
    use HasFactory;

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

    protected $casts = [
        'questions' => 'array',
        'answer' => 'array'
    ];

    public function exam_type(): MorphTo
    {
        return $this->morphTo();
    }
}
