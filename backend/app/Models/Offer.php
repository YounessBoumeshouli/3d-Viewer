<?php

namespace App\Models;

use App\Enums\offers;
use Illuminate\Database\Eloquent\Model;

class Offer extends Model
{
    protected $casts = [
        'type' => offers::class,
    ];
    protected $guarded = [];
    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
}
