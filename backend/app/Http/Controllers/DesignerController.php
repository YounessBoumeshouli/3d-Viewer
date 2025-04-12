<?php

namespace App\Http\Controllers;

use App\Models\Designer;
use App\Models\User;
use Illuminate\Http\Request;

class DesignerController extends Controller
{
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
        $designer = Designer::find(['user_id'=>auth()->id()]);
        return $designer->load(['user.designer']);

    }
    public function show($id)
    {
        return Designer::with('socialLinks','user')->where('id',$id)->first();
    }
}
