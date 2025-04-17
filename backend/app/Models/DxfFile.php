<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DxfFile extends Model
{
    protected $guarded = [];
    public function house()
    {
        return $this->hasOne(House::class);
    }
    public function designer()
    {
        return $this->belongsTo(Designer::class);
    }
}
