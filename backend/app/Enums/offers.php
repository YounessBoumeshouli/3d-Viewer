<?php

namespace App\Enums;

enum offers : int
{
    case None = 0;
    case ThreeMonths = 90;
    case SixMonths = 180;
    case OneYear = 365;
}
