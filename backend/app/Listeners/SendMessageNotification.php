<?php

namespace App\Listeners;

use App\Events\MessageEvent;
use App\Models\Conversation;
use App\Notifications\MessageNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class SendMessageNotification
{
    /**
     * Handle the event.
     *
     * @param  \App\Events\MessageEvent  $event
     * @return void
     */
    public function handle(MessageEvent $event)
    {
        $message = $event->message;
        $infos = $message->load('conversation.participants');

        Log::info($infos);
        $participants = $infos->conversation->participants;
        foreach ($participants as $user){
        $user->notify(new MessageNotification($message));
        }
        Log::info($participants);

    }


}
