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
      return $houses->load(['dxfFile','designer']);
    }
    public function ModelsByCreator(){
       return Designer::with('user','houses')->where('user_id',auth()->id())->first();
    }
    public function show(House $house){
        return $house->load(['dxfFile.designer','components.component.category']);
    }
    public function delete(House $house){
        if ($house && $house->designer->user->id == auth()->user()->id || auth()->user()->role == "admin"){
            $house->delete();
        }
    }
    public function update(Request $request, House $house)
    {
        $validated = $request->validate([
            'components' => 'array|nullable',
            'components.*.path' => 'string|nullable',
            'stage'=>'required|integer'
        ]);

        $house->update([
            'stage' => $validated['stage']
        ]);


// check if the size is ok
        $designer = auth()->user()->designer;
        $max_size = $designer->useroffer->offer->storage;

        if ($validated['components']){
            $size = 0;
            $currentComponents = $house->components()->pluck('component_id')->toArray();

            $newComponentIds = [];
            foreach ($validated['components'] as $componentData) {
                $component = Component::where('path', $componentData['path'])->first();
                if ($component) {
                    $newComponentIds[] = $component->id;
                    if (!in_array($component->id, $currentComponents)) {
                        $size += $component->size;
                        if ($designer->storage_size + $size > $max_size){
                            return response()->json([
                                "status"=>" Some components can't be saved you have to Upgrade your plan or delete your previous models",
                            ], 201);
                        }
                        $house->components()->create([
                            'component_id' => $component->id,
                        ]);

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


        $user = auth()->user();
        $user->designer->increment("storage_size", $size);
        $house->increment("size", $size);

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
       // check if the size is ok
        $designer = auth()->user()->designer;
        $max_size = $designer->useroffer->offer->storage;
        if ($designer->storage_size + $size > $max_size){
             return response()->json([
                "status"=>" house can't be saved you have to Upgrade your plan or delete your previous models",
            ], 201);
        }
        $dxfFileid = $request->input('dxf_file_id');
        $stage = $request->input('stage');
        if ($validated){
        $designer_id = $designer->id;
        $house = House::create(["dxf_file_id"=>$dxfFileid,'stage'=>$stage,"designer_id"=>$designer_id]);
            if ($validated['components']){
                foreach ($validated['components'] as $component){
                    $component = Component::where('path', $component['path'])->first();
                    if ($component){
                        $size += $component->size;
                        if ($designer->storage_size + $size > $max_size){
                            return response()->json([
                                "status"=>" some components can't be saved you have to Upgrade your plan or delete your previous models",
                            ], 201);
                        }
                        $house->components()->create(['component_id'=>$component->id]);

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
