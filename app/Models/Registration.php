<?php

namespace App\Models;

use App\Enums\RegistrationType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Registration extends Model
{
    use HasFactory, SoftDeletes;

    protected $casts = [
        'status' => RegistrationType::class
    ];

    protected $fillable = [
        'student_id',
        'ongoing_program_id',
        'total_course_fee',
        'registration_fee',
        'discounted_fee',
        'net_payable_fee',
        'branch_id',
        'status',
        'created_at'
    ];

    public function ongoingProgram(): BelongsTo
    {
        return $this->belongsTo(OngoingProgram::class);
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }
}
