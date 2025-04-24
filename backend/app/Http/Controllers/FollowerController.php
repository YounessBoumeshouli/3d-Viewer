<?php

namespace App\Http\Controllers;

use App\Events\BroadcastNotificationCreated;
use App\Models\User;
use App\Notifications\FollowNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class FollowerController extends Controller
{
    public function follow(User $user)
    {
        $follower = auth()->user();
        $id = auth()->id();
        Log::info('follow methode start ');
        Log::info($user->id);
        Log::info($follower->id);
        Log::info($follower->name);
        Log::info($id);
        event(new BroadcastNotificationCreated([
            'user_id' => $user->id,
            'message' => "{$follower->name} followed you!",
            'follower_name' => $follower->name,
            'follower_id' => $follower->id,
        ]));
        if ($follower->id === $user->id) {
            return response()->json(['message' => 'You cannot follow yourself.'], 400);
        }
        if (!$follower->following()->where('followed_id', $user->id)->exists()) {
            $follower->following()->attach($user->id);
            Log::info('event will be sent');

            event(new BroadcastNotificationCreated([
                'user_id' => $user->id,
                'message' => "{$follower->name} followed you!",
                'follower_name' => $follower->name,
                'follower_id' => $follower->id,
            ]));
        }
    }
    public function following()
    {
       return auth()->user()->following()->where('follower_id',auth()->id());
    }
    public function followers()
    {
       return auth()->user()->following()->where('followed_id',auth()->id());
    }
    public function friends()
    {
       return auth()->user()->friends()->get();
    }
    public function unfollow(User $user)
    {
        $user->following()->detach($user->id);
    }
}
