<?php
namespace App\Http\Controllers;

use App\Models\DxfFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
class FileUploadController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimetypes:application/dxf,text/plain|max:5120', // Allow DXF files (up to 5MB)
        ]);

        $file = $request->file('file');

        // Store the file in 'public/dxf-files'
        $path = $file->store('dxf-files', 'public');
        DxfFile::create(["path"=>$path]);
        return response()->json([
            'message' => 'DXF file uploaded successfully',
            'path' => asset("storage/$path"),
        ], 201);
    }
}
