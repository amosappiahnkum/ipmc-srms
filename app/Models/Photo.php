<?php

namespace App\Models;

use App\Http\Traits\UseUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Photo extends BaseModel
{

    public function photoable(): MorphTo
    {
        return $this->morphTo();
    }

    protected $fillable = [
        'photoable',
        'file_name',
    ];
}
