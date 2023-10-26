<?php

namespace App\Enums;

enum RegistrationType: string
{
    case DEFERRED = 'deferred';

    case IN_SCHOOL = 'in-school';

    case COMPLETED = 'completed';

    case DISCONTINUED = 'discontinued';
}
