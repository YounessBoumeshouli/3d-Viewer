<?php

namespace App\Http\Controllers;

use App\Models\House;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function store( House $house)
    {

        $like =  $house->likes()->where('user_id',auth()->id())->first();
        if (!$like){
            $house->likes()->create([
                'user_id'=>auth()->id(),
            ]);
            return response()->json(['status'=>'liked']);
        }
        $like->delete();
        return response()->json(['status'=>'the user remove the like ']);


    }
    public function show(House $house)
    {

        $reaction =  $house->likes()->where('user_id',auth()->id())->first();
        if ($reaction){
            return response()->json(['status'=>true]);
        }else {
            return response()->json(['status'=>false]);
        }


    }
    public function index(House $house)
    {
        return $house->likes()->count('user_id');

    }
}
