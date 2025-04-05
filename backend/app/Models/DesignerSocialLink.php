<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DesignerSocialLink extends Model
{
    protected $guarded = [];

    public function designer()
    {
        return $this->belongsTo(Designer::class);
    }
}
