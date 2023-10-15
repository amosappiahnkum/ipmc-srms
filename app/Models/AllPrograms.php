<?php

namespace App\Models;

use App\Enums\ProgramType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AllPrograms extends Model
{
    use HasFactory;

    protected $casts = [
        'type' => ProgramType::class
    ];

    protected $fillable = [
        'name',
        'duration_id',
        'fee',
        'registration_fee',
        'total_fee',
        'type',
        'number_of_installment',
    ];

    public function duration(): BelongsTo
    {
        return $this->belongsTo(Duration::class);
    }
}
