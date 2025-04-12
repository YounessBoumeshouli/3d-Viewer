<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\CommentReply;
use App\Models\House;
use Illuminate\Http\Request;

class CommentReplyController extends Controller
{
    public function store(Comment $comment,Request $request)
    {
        $validated =  $request->validate([
            "reply"=>'required|string|min:1',
        ]);
        $content = $request->input('reply');
        $user_id = auth()->id();
        if ($validated){
            $comment->replies()->create(["content"=>$content,'user_id'=>$user_id]);
        }
        return response()->json('reply added successfully', 201);


    }
}
