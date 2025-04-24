<?php

namespace App\Listeners;

use App\Events\BroadcastNotificationCreated;
use App\Models\User;
use App\Notifications\FollowNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class SendFollowNotification
{
    /**
     * Handle the event.
     *
     * @param  \App\Events\BroadcastNotificationCreated  $event
     * @return void
     */
    public function handle(BroadcastNotificationCreated $event)
    {

        $user = User::find($event->notificationData['user_id']);
        $follower = User::find($event->notificationData['follower_id']);
        Log::info( $user );
        Log::info( $follower );
        $user->notify(new FollowNotification($follower));
    }
}
