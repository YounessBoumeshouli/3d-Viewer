<?php

namespace App\Http\Controllers;

use App\Events\CommentEvent;
use App\Jobs\SendComment;
use App\Models\Comment;
use App\Models\House;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;


class CommentController extends Controller
{
    public function store(House $house,Request $request)
    {
        $validated = $request->validate([
            "comment" => 'required|string|min:1',

        ]);

        $house->comments()->create([
            "content" => $validated['comment'],
            'user_id' => auth()->id()
        ]);

        SendComment::dispatch($validated);
        return response()->json($validated['comment'], 201);
    }
    public function index(House $house){
        return $house->load(['comments.user','comments.replies.user']);
    }



}
