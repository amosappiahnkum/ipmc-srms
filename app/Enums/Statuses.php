<?php

namespace App\Enums;

enum Statuses: string
{
    case PENDING = 'pending';
    case APPROVED = 'approved';
    case CANCELED = 'canceled';

    case REJECTED = 'rejected';
    case VIEWED = 'viewed';
}
