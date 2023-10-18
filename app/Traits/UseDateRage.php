<?php

namespace App\Traits;

use Carbon\Carbon;

trait UseDateRage
{
    public function dateRange($date): ?array
    {
        if ($date) {
            $explode = explode(',', $date);

            return [
                Carbon::parse($explode[0])->startOfDay(),
                Carbon::parse($explode[1])->endOfDay()
            ];
        }

        return null;
    }
}
