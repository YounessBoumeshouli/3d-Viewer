<?php

    namespace App\Http\Controllers;

    use App\Events\MessageEvent;
    use App\Models\Conversation;
    use Illuminate\Broadcasting\PrivateChannel;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Log;

    class ConversationController extends Controller
    {
        public function index()
        {
            return auth()->user()->conversations()->get();
        }
        public function store(Request $request)
        {
            $validated  =  $request->validate([
                'title' => 'string',
                'participants' => 'required|array|min:1',
                'participants.*.id' => 'integer',
                'participants.*.friend_id' => 'required|integer',
                'participants.*.name' => 'string',
            ]);
            $conversation = Conversation::create(["title"=>$validated['title']]);
            $conversation->participants()->attach(auth()->id());
            foreach ($validated['participants'] as $participant){
                $conversation->participants()->attach($participant['friend_id']);
            }

        }
        public function show(Conversation $conversation)
        {
        return $conversation->messages()->with('user')->get();
        }
        public function sendMessage(Conversation $conversation,Request $request)
        {
            $validated = $request->validate([
                "message" =>'required|string|min:1',
            ]);

       $message =  $conversation->messages()->create(["user_id"=>auth()->id(),"message"=>$validated['message']]);
            Log::info('conversation.',['conversation.'.$message->conversation_id]);
            $message->load('user');
            broadcast(new MessageEvent($message))->toOthers();
        }
    }
