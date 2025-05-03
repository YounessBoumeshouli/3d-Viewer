<?php

namespace App\Http\Controllers;

use App\Models\House;
use Illuminate\Http\Request;

class RatingController extends Controller
{
    public function store(Request $request , House $house)
    {
        $validateData = $request->validate([
            'stars'=>'required|integer',
        ]);
       $rating =  $house->ratings()->where('user_id',auth()->id())->first();
       if (!$rating){
           $house->ratings()->create([
               'user_id'=>auth()->id(),
               "stars"=>$validateData['stars']
           ]);
           return response()->json(['message'=>'rate added successfully']);
       }
       $rating->stars = $validateData["stars"];

        $rating->save();
       return response()->json(['message'=>'rate added successfully']);


    }
    public function show(House $house)
    {
        return  $house->ratings()->where('user_id',auth()->id())->first();

    }
    public function index(House $house)
    {
        return  ['sum'=>$house->ratings()->sum('stars'),
          'count'=>$house->ratings()->count('user_id')];

    }
}
