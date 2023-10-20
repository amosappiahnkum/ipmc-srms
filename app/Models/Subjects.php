<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Subjects extends Model
{
    use HasFactory;

    protected $fillable = [
        'program_id',
        'name',
        'duration_id',
        'contact_hours',
        'year',
        'semester',
        'code',
        'user_id'
    ];

    public function duration(): BelongsTo
    {
        return $this->belongsTo(Duration::class);
    }
}
