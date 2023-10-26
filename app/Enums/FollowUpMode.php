<?php

namespace App\Enums;

enum FollowUpMode: string
{
    case PHONE_CALL = 'Phone Call';

    case WHATSAPP = 'Whatsapp';

    case SMS = 'SMS';

    case EMAIL = 'Email';
}
