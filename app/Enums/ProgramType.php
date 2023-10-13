<?php

namespace App\Enums;

enum ProgramType: string
{
    case PROFESSIONAL = 'Professional Diploma';

    case SHORT_TERM = 'Short-term Certificate';

    case DEGREE = 'Degree';
}
