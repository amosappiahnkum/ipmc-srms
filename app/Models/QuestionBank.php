<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuestionBank extends Model
{
    use HasFactory;

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
