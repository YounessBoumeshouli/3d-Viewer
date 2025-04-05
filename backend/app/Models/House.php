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
    public function dxfFile()
    {
      return $this->belongsTo(DxfFile::class);
    }
    public function components()
    {
      return $this->hasMany(HouseComponent::class);
    }

}
