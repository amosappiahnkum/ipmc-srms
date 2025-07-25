<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Sponsor extends BaseModel
{

    protected $fillable = [
        'name',
        'email',
        'phone_number',
        'relationship',
    ];
}
