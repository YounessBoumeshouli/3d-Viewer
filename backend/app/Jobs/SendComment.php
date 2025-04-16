<?php

namespace App\Jobs;

use App\Events\CommentEvent;
use App\Models\Comment;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendComment implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(public Comment $comment) {
        //
    }

    public function handle(): void {
        CommentEvent::dispatch([
            'comment' => $this->comment
        ]);
    }
}
