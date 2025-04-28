<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Offer extends Model
{
    protected $guarded = [];
    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
}
