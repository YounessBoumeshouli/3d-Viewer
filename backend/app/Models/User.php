<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    protected $guarded = [];
    use HasFactory, Notifiable;

    public function designer()
    {
        return $this->hasOne(Designer::class);
    }
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
    public function replies()
    {
        return $this->hasMany(CommentReply::class);
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
