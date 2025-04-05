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
            'file' => 'required|file|mimetypes:application/dxf,text/plain,image/jpeg,image/png,application/pdf|max:5120',
            'type'=>'required|integer',
            'dimensions'=>'string',
            'price'=>'integer'
        ]);


        $file = $request->file('file');

        $type = $request->input('type');
        $dimensions = $request->input('dimensions');
        $price = $request->input('price');
        $category = Category::find($type);
        if (!$category){
        $path = $file->store('dxf-files', 'public');
            DxfFile::create(['user_id'=>auth()->id(),'path'=>$path]);
        return response()->json([
            'message' => 'DXF file uploaded successfully',
            'path' => asset("storage/$path"),
        ], 201);
        } else{
            $path = $file->store('components/'.$type, 'public');
            component::create(["path"=>$path,"category_id"=>$type,"dimensions"=>$dimensions,"price"=>$price]);
            return response()->json([
                'message' => 'component file uploaded successfully',
                'path' => asset("storage/$path"),
            ], 201);
        }
    }
}
