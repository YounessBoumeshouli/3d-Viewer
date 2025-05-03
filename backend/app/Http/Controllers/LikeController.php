<?php

namespace App\Http\Controllers;

use App\Models\House;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function store( House $house)
    {

        $like =  $house->ratings()->where('user_id',auth()->id())->first();
        if (!$like){
            $house->likes()->create([
                'user_id'=>auth()->id(),
            ]);
            return response()->json(['status'=>'liked']);
        }
        $like->delete();

        $like->save();
        return response()->json(['status'=>'the user remove the like ']);


    }
    public function show(House $house)
    {
        return  $house->ratings()->where('user_id',auth()->id())->first();

    }
    public function index(House $house)
    {
        return $house->likes()->count('user_id');

    }
}
