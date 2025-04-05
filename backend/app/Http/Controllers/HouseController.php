<?php

namespace App\Http\Controllers;

use App\Http\Middleware\JwtMiddleware;
use App\Models\component;
use App\Models\DxfFile;
use App\Models\House;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HouseController extends Controller
{
    public function ModelsByCreator(){

    }
    public function store(Request $request)
    {
       $validated =  $request->validate([
            "dxf_file_id"=>'required|integer',
            'components' => 'required|array|min:1',
            'components.*.path' => 'required|string|min:1',
        ]);
        $dxfFileid = $request->input('dxf_file_id');
        if ($validated){
        $house = House::create(["dxf_file_id"=>$dxfFileid]);
            foreach ($validated['components'] as $component){
                $id = Component::where('path', $component['path'])->first();
                $house->components()->create(['component_id'=>$id->id]);
            }
        }
        return response()->json('house saved successfully', 201);


    }
}
