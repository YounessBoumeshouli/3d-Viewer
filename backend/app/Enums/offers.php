<?php

namespace App\Enums;

enum offers: string
{
    case None = 'None';
    case ThreeMonths = 'ThreeMonths';
    case SixMonths = 'SixMonths';
    case OneYear = 'OneYear';

    public function days(): int
    {
        return match($this) {
            self::None => 0,
            self::ThreeMonths => 90,
            self::SixMonths => 180,
            self::OneYear => 365,
        };
    }
}
