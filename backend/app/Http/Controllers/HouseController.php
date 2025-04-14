<?php

namespace App\Http\Controllers;

use App\Events\CommentEvent;
use App\Http\Middleware\JwtMiddleware;
use App\Models\component;
use App\Models\Designer;
use App\Models\DxfFile;
use App\Models\House;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HouseController extends Controller
{
    public function index()
    {
        $houses = House::all();
      return $houses->load(['dxfFile.designer']);
    }
    public function ModelsByCreator(){
       return Designer::with('user','houses')->where('user_id',auth()->id())->first();
    }
    public function show(House $house){
        return $house->load(['dxfFile.designer','components.component.category']);
    }
    public function update(Request $request, House $house)
    {
        $validated = $request->validate([
            "dxf_file_id" => 'required|integer',
            'components' => 'required|array|min:1',
            'components.*.path' => 'required|string|min:1',
            'stage'=>'required|integer'

        ]);

        // Update house data
        $house->update(['dxf_file_id' => $validated['dxf_file_id'] ,'stage'=>$validated['stage']]);

        // Delete old component relations
        $house->components()->delete();

        foreach ($validated['components'] as $componentData) {
            $component = Component::where('path', $componentData['path'])->first();
            if ($component) {
                $house->components()->create([
                    'component_id' => $component->id,
                ]);
            }
        }

        return response()->json('House updated successfully.');
    }
    public function store(Request $request)
    {
       $validated =  $request->validate([
            "dxf_file_id"=>'required|integer',
            'components' => 'required|array|min:1',
            'components.*.path' => 'string|min:1|nullable',
            'stage'=>'required|integer'
        ]);
        $dxfFileid = $request->input('dxf_file_id');
        $stage = $request->input('stage');
        if ($validated){
        $house = House::create(["dxf_file_id"=>$dxfFileid,'stage'=>$stage]);
            foreach ($validated['components'] as $component){
                $id = Component::where('path', $component['path'])->first();
                $house->components()->create(['component_id'=>$id->id]);
            }
        }
        return response()->json('house saved successfully', 201);


    }


}
