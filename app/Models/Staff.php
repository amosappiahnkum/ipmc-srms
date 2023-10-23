<?php

namespace App\Models;

use App\Enums\StaffType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Staff extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'first_name',
        'last_name',
        'other_name',
        'phone_number',
        'type',
    ];

    protected $casts = [
        'type' => StaffType::class
    ];

    public function getNameAttribute(): string
    {
        return $this->first_name . " " . $this->other_name . " " . $this->last_name;
    }

    public function user(): MorphOne
    {
        return $this->morphOne(User::class,'userable');
    }
}
