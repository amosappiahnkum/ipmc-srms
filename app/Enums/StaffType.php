<?php

namespace App\Enums;

enum StaffType: string
{
    case INSTRUCTOR = 'instructor';

    case ADMINISTRATOR = 'administrator';

    case ASSISTANT_ADMINISTRATOR = 'assistant-administrator';

    case COUNSELOR = 'counselor';

    case CASHIER = 'cashier';
}
