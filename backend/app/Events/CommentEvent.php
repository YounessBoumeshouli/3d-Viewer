<?php

namespace App\Events;

use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Broadcasting\Channel;
use Illuminate\Support\Facades\Log;

class CommentEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $comment;

    public function __construct($comment)
    {
        Log::info("CommentEvent constructor called with: " . $comment);
        $this->comment = $comment;
    }

    public function broadcastOn()
    {
        try {
            Log::info("Broadcasting comment: {$this->comment}");
            return new Channel('comments-global');
        } catch (\Exception $e) {
            Log::error("Broadcasting failed: " . $e->getMessage());
            throw $e;
        }
    }

    public function broadcastAs()
    {
        return 'comment.added';
    }
}
