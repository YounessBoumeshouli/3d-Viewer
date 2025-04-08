<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\House;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(House $house,Request $request)
    {
        $validated =  $request->validate([
            "comment"=>'required|string|min:1',
            "house_id"=>'required|integer'
        ]);
        $content = $request->input('comment');
        $house_id = $request->input('house_id');
        $user_id = auth()->id();
         if ($validated){
            Comment::create(["content"=>$content,"house_id"=>$house_id,'user_id'=>$user_id]);
        }
        return response()->json('comment added successfully', 201);


    }
    public function index(House $house){
        return $house->load(['comments.user']);
    }



}
