<?php


namespace App\Http\Traits;


use Illuminate\Support\Str;

trait UseUuid
{
    protected static function booted(): void
    {
        static::creating(static function ($model) {
            if (!$model->getKey()) {
                $model->{$model->getKeyName()} = (string) Str::uuid();
            }
        });
    }

    public function getIncrementing(): bool
    {
        return false;
    }

    public function getKeyType(): string
    {
        return 'string';
    }
}
