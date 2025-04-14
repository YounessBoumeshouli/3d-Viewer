<?php

// app/Events/CommentEvent.php
namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

// app/Events/CommentEvent.php
class CommentEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $comment;

    public function __construct($comment)
    {
        $this->comment = $comment;
    }
    public function broadcastWith()
    {
        return [
            'comment' => $this->comment,
            'timestamp' => now()->toDateTimeString()
        ];
    }
    public function broadcastOn()
    {
        Log::info("Attempting to broadcast comment: {$this->comment}");
        return new Channel('comments-global');
    }

    public function broadcastAs()
    {
        return 'comment.added';
    }
}
