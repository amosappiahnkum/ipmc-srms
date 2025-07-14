<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class QuestionBank extends BaseModel
{
    protected $casts = [
        'answers' => 'array'
    ];

    protected $fillable = [
        'module_id',
        'text',
        'type',
        'answers',
        'correct_answer',
        'mark',
        'timed',
        'time'
    ];
}
