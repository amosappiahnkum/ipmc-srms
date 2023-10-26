<?php

namespace App\Models;

use App\Enums\FollowUpMode;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class FollowUp extends Model
{
    use HasFactory, SoftDeletes;

    protected $casts = [
        'mode' => FollowUpMode::class
    ];

    protected $fillable = [
        'follow_up_date',
        'mode',
        'feedback',
        'user_id',
        'enquiry_id'
    ];

    public function enquiry(): BelongsTo
    {
        return $this->belongsTo(Enquiry::class);
    }
}
