<?php

namespace App\Models;

use App\Http\Traits\UseUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Result extends Model
{
    use HasFactory, UseUuid;

    protected $fillable = [
        'current_question',
        'student_id',
        'program_module_id',
        'total_questions',
        'total_mark',
        'time_left',
        'key_strokes',
        'mark'
    ];

    protected $casts = [
      'key_strokes' => 'array'
    ];

    public function examType(): MorphTo
    {
        return $this->morphTo();
    }
}
