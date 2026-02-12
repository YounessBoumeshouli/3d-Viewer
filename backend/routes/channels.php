<?php

use App\Models\Conversation;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Log;




Broadcast::channel('comments-global', function () {
    return true;
});
Broadcast::channel('users.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});
Broadcast::channel('conversation.{conversation_id}', function ($user, $conversation_id) {
    return true;
});





