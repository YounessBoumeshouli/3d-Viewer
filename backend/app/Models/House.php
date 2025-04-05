<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class House extends Model
{
    protected $guarded = [];
    public function creator()
    {
      return $this->belongsTo(Designer::class);
    }

}
