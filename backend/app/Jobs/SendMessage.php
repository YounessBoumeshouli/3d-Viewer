<?php

namespace App\Jobs;

use App\Events\MessageEvent;
use App\Models\Message;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class SendMessage implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(public Message $message)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        MessageEvent::dispatch([
            'message'=>$this->message
        ]);
    }
}
