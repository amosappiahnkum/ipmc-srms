<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReportedQuestion extends BaseModel
{
    protected $fillable = [
        'question',
        'user_id',
        'report',
    ];
}
