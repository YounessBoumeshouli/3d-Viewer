<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserOffer extends Model
{
    protected $guarded = [];
    public function designer()
    {
       return $this->belongsTo(Designer::class);
    }
    public function offer()
    {
       return $this->belongsTo(Offer::class);
    }

}
