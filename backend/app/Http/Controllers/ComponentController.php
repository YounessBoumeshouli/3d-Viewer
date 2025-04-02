<?php

namespace App\Http\Controllers;

use App\Models\component;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ComponentController extends Controller
{
    public function index(){
        return DB::table('components')->get();
    }
    public function show($type){
        return DB::table('components')->where('type',$type)->get();
    }
}
