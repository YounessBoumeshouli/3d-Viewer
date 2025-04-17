<?php

namespace App\Events;

use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Broadcasting\Channel;
use Illuminate\Support\Facades\Log;

class createCategoryEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message;

    public function __construct($message)
    {
        Log::info("Category constructor called with: " . $message);
        $this->message = $message;
    }
    public function broadcastOn()
    {
        try {
            Log::info("Broadcasting message: {$this->message}");
            return new Channel('comments-global'); // Use Channel class
        } catch (\Exception $e) {
            Log::error("Broadcasting failed: " . $e->getMessage());
            throw $e;
        }
    }

    public function broadcastAs()
    {
        return 'category.added';
    }
}
