<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Instructor extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'first_name',
        'last_name',
        'other_name',
        'phone_number',
        'email',
        'specialization',
    ];

    public function getNameAttribute(): string
    {
        return $this->first_name . " " . $this->other_name . " " . $this->last_name;
    }
}
