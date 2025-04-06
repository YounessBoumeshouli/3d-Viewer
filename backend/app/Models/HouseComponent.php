<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HouseComponent extends Model
{
    protected $guarded = [];

    public function house()
    {
        return $this->belongsTo(House::class);
    }
    public function component()
    {
        return $this->belongsTo(Component::class);
    }
}
