<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Designer extends Model
{
    protected $guarded = [];
    public function socialLinks()
    {
        return $this->hasMany(DesignerSocialLink::class);
    }
    public function houses()
    {
        return $this->hasMany(House::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
