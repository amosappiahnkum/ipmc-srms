<?php

namespace App\Enums;

enum BatchStatus: string
{
    case COMPLETED = 'completed';

    case CURRENT = 'current';

    case PENDING = 'pending';
}
