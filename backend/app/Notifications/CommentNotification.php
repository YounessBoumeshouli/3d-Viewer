<?php
namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;
use App\Models\Comment;

class CommentNotification extends Notification
{
    use Queueable;

    public $comment;

    public function __construct(Comment $comment)
    {
        $this->comment = $comment;
    }

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toDatabase($notifiable)
    {
        return [
            'comment_id' => $this->comment->id,
            'content' => $this->comment->content,
            'user_id' => $this->comment->user_id,
            'house_id' => $this->comment->house_id,
            'created_at' => $this->comment->created_at,
            'url' => url('/house/' . $this->comment->house_id)
        ];
    }
}
