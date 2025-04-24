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

        $this->comment = $comment;
    }

    public function broadcastOn()
    {
        Log::info('Broadcasting on comments-global channel');

        try {
            return new Channel('comments-global');
        } catch (\Exception $e) {
            throw $e;
        }
    }
    public function broadcastWith()
    {
        return [
            'data' => [
                'comment' => $this->comment->content,
                'sender' => $this->comment->user_id,
                'model_id' => $this->comment->house_id,
            ]
        ];
    }
    public function broadcastAs()
    {
        return 'comment.added';
    }
}
