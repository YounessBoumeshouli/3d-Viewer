<?php

namespace App\Listeners;

use App\Events\CommentEvent;
use App\Notifications\CommentNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Log;

class SendCommentNotification
{
    
    public function __construct()
    {
        
    }

    
    public function handle(CommentEvent $event): void
    {
        $comment = $event->comment->load('house.dxfFile.designer.user');
        $modelOwner = $comment->house->dxfFile->designer->user;
        $modelOwner->notify(new CommentNotification($event->comment));
    }
}
