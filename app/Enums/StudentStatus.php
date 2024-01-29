<?php

namespace App\Enums;

enum StudentStatus: string
{
    case ADMITTED = 'admitted';

    case IN_SCHOOL = 'in-school';

    case ENQUIRY = 'enquiry';


    case COMPLETED = 'completed';

    case DISCONTINUED = 'discontinued';
}
