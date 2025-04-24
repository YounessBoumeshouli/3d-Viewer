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

    /**
     * Create a new event instance.
     *
     * @param $notificationData
     * @return void
     */
    public function __construct($notificationData)
    {
        $this->notificationData = $notificationData;
        Log::info('users.' . $this->notificationData['user_id']);
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel|PresenceChannel
     */
    public function broadcastOn()
    {

        return new PrivateChannel('users.' . $this->notificationData['user_id']);
    }

    /**
     * Broadcast the notification data.
     *
     * @return array
     */
    public function broadcastWith()
    {
        return [
            'message' => $this->notificationData['message'],
            'follower_name' => $this->notificationData['follower_name'],
            'follower_id' => $this->notificationData['follower_id'],
        ];
    }

    /**
     * The name of the event that will be triggered on the front end.
     *
     * @return string
     */
    public function broadcastAs()
    {
        return 'BroadcastNotificationCreated';
    }
}
