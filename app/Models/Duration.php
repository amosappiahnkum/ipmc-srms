<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Duration extends BaseModel
{
    protected $fillable = [
        'duration',
        'duration_type',
    ];
}
