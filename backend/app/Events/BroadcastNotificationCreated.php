<?php
namespace App\Events;

use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\BroadcastManager;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class BroadcastNotificationCreated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $notificationData;

    
    public function __construct($notificationData)
    {
        $this->notificationData = $notificationData;
        Log::info('users.' . $this->notificationData['user_id']);
    }

    
    public function broadcastOn()
    {

        return new PrivateChannel('users.' . $this->notificationData['user_id']);
    }

    
    public function broadcastWith()
    {
        return [
            'message' => $this->notificationData['message'],
            'follower_name' => $this->notificationData['follower_name'],
            'follower_id' => $this->notificationData['follower_id'],
        ];
    }

    
    public function broadcastAs()
    {
        return 'BroadcastNotificationCreated';
    }
}
