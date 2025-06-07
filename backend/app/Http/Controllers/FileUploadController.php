<?php
namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\component;
use App\Models\DxfFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
class FileUploadController extends Controller
{
    public function upload(Request $request)
    {

        $request->validate([
            'file' => 'required|file|mimetypes:model/gltf-binary,application/octet-stream,image/jpeg,image/png,application/pdf,application/dxf,text/plain',
            'type'=>'required|integer',
            'dimensions'=>'string',
            'price'=>'integer',
            'name'=>'string'
        ]);
        return response()->json([
            'message' => 'file uploaded successfully',
        ], 200);

        $file = $request->file('file');
        $size = $request->file('file')->getSize() / (1024* 1024) ;
        $type = $request->input('type');
        $dimensions = $request->input('dimensions');
        $price = $request->input('price');
        $name = $request->input('name');
        $category = Category::find($type);
        if (!$category){
        $path = $file->store('dxf-files', 'public');
            DxfFile::create(['designer_id'=>auth()->id(),'path'=>$path,"size"=>$size]);
        return response()->json([
            'message' => 'DXF file uploaded successfully',
            'path' => asset("storage/$path"),
        ], 201);
        } else{
            $path = $file->store('components/'.$category->name, 'public');
            component::create(["path"=>$path,"category_id"=>$type,"dimensions"=>$dimensions,"price"=>$price,"name"=>$name,"size"=>$size]);
            return response()->json([
                'message' => 'component file uploaded successfully',
                'path' => asset("storage/$path"),
            ], 201);
        }
    }
}
