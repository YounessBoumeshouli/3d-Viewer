<?php

namespace App\Http\Controllers;

use App\Events\CommentEvent;
use App\Models\Category;
use App\Models\component;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ComponentController extends Controller
{
    public function index(){
        return DB::table('categories')->get();
    }
    public function show($type){
        return DB::table('components')->where('category_id',$type)->get();
    }
    public function store(Request $request){
        $request->validate([
            'name'=>'required|string',
            'description'=>'required|string',
            'url'=>'string'
        ]);
        $name = $request->input('name');
        $description = $request->input('description');
        Category::create(['name'=>$name,'description'=>$description]);

        return response()->json([
            'message' => 'Category added successfully',
        ], 201);
    }
}
