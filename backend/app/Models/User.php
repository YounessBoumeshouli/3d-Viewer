<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Model;

class User extends Authenticatable implements JWTSubject
{
    protected $guarded = [];
    use HasFactory, Notifiable;
    public function receivesBroadcastNotificationsOn()
    {
        return 'users.' . $this->id;
    }
    public function conversations()
    {
        return $this->belongsToMany(Conversation::class,'conversation_participants');
    }
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
    public function following()
    {
        return $this->belongsToMany(User::class,'followers','follower_id','followed_id');
    }
    public function followers()
    {
        return $this->belongsToMany(User::class,'followers','followed_id','follower_id');
    }
    public function friends()
    {
        return $this->following()->whereIn('users.id', function($query) {
            $query->select('follower_id')
                ->from('followers')
                ->where('followed_id', $this->id);
        });
    }
    public function getJWTCustomClaims()
    {
        return [];
    }
}
