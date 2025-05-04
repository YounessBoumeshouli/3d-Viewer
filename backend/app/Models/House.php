<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class House extends Model
{
    protected $guarded = [];
    public $incrementing = false;
    protected $keyType = 'string';
    public function dxfFile()
    {
      return $this->belongsTo(DxfFile::class);
    }
    public function designer()
    {
      return $this->belongsTo(Designer::class);
    }
    public function components()
    {
      return $this->hasMany(HouseComponent::class,'house_id');
    }
    public function ratings()
    {
      return $this->hasMany(Rating::class);
    }
    public function likes()
    {
      return $this->hasMany(Like::class);
    }
    public function comments()
    {
      return $this->hasMany(Comment::class);
    }

}
