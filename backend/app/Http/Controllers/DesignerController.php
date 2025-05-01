<?php

namespace App\Http\Controllers;

use App\Enums\offers;
use App\Models\Designer;
use App\Models\User;
use Illuminate\Http\Request;

class DesignerController extends Controller
{
    public function store (Request $request){
        $user = auth()->user();
        if (!$user->designer){

        $user->designer()->create();
        $user->role('creator');
        $user->save();
        }
        if (!$user->designer->offer){
            $user->designer->offer()->create(["offer_id"=>1,"start_date"=>now()->format('Y-m-d'),"end_date"=> now()->addDays(90)]);
        }else {

           return response()->json(["status"=>"success","offer"=>$user->designer->offer]);

        }
        return response()->json(["status"=>"success"]);
    }
    public function index()
    {
        return Designer::with('socialLinks','user')->get();

    }
    public function modelsByCreator(Designer $designer)
    {
        return $designer->load(['user.designer.houses']);
    }
    public function profile()
    {
        $designer = auth()->user()->designer;
        return $designer->load(['offer','user']);
    }
    public function show($id)
    {
        return Designer::with('socialLinks','user')->where('id',$id)->first();
    }
}
