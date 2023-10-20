<?php

namespace App\Models;

use App\Enums\ProgramType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class AllPrograms extends Model
{
    use HasFactory;

    protected $casts = [
        'type' => ProgramType::class
    ];

    protected $fillable = [
        'name',
        'type'
    ];

    public function duration(): BelongsTo
    {
        return $this->belongsTo(Duration::class);
    }
}
