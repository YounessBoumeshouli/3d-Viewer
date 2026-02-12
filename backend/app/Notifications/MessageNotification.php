<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Log;

class MessageNotification extends Notification
{
    use Queueable;
    public $message;
    
    public function __construct($message)
    {
        $this->message = $message;
    }

    
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    
    public function toDatabase(object $notifiable)
    {
        return [
            'sender_id' => $this->message->user_id,
            'conversation_id' => $this->message->conversation_id,
        ];
    }

    






}
