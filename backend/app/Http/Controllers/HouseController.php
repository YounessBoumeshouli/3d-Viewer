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
use Illuminate\Support\Facades\Log;

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
            'components' => 'array|min:1',
            'components.*.path' => 'string|min:1',
            'stage' => 'required|integer'
        ]);

        $house->update([
            'stage' => $validated['stage']
        ]);




        if ($validated['components']){
            $size = 0;
            $currentComponents = $house->components()->pluck('component_id')->toArray();

            $newComponentIds = [];
            foreach ($validated['components'] as $componentData) {
                $component = Component::where('path', $componentData['path'])->first();
                if ($component) {
                    $newComponentIds[] = $component->id;
                    if (!in_array($component->id, $currentComponents)) {
                        $house->components()->create([
                            'component_id' => $component->id,
                        ]);
                        $size += $component->size;
                    }
                }
            }
            $toDelete = array_diff($currentComponents, $newComponentIds);

            if (!empty($toDelete)) {
                foreach ($toDelete as $componentId) {
                    $houseComponent = component::where('id', $componentId)->first();

                    if ($houseComponent) {
                        $house->components()->where('component_id', $houseComponent->id)->delete();
                        $size -= $houseComponent->size;
                    }
                }
            }
        }


        $house->load('designer');
        $house->designer->increment("storage_size", $size);
        return response()->json('House updated successfully.');
    }
    public function store(Request $request)
    {
       $validated =  $request->validate([
            "dxf_file_id"=>'required|integer',
            'components' => 'array|nullable',
            'components.*.path' => 'string|nullable',
            'stage'=>'required|integer'
        ]);
       $dxfFile = DxfFile::where(['id'=>$validated['dxf_file_id']])->first();
       $size = $dxfFile->size;
        $dxfFileid = $request->input('dxf_file_id');
        $stage = $request->input('stage');
        if ($validated){

        $house = House::create(["dxf_file_id"=>$dxfFileid,'stage'=>$stage,"designer_id"=>auth()->id()]);
            if ($validated['components']){
                foreach ($validated['components'] as $component){
                    $component = Component::where('path', $component['path'])->first();
                    if ($component){
                        $house->components()->create(['component_id'=>$component->id]);
                        $size += $component->size;

                    }
                }
            }
        }
        $user = auth()->user();
        $user->designer->increment("storage_size", $size);
        $house->increment("size", $size);

        return response()->json([
            "status"=>'house saved successfully',
            "house_id"=>$house->id
        ], 201);


    }


}
