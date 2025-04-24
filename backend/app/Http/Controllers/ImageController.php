<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;

class ImageController extends Controller
{

    public function getImage($directory, $filename)
    {
        $path = storage_path('app/public/components/' . $directory . '/' . $filename);

        if (!file_exists($path)) {
            return response()->json(['error' => 'Image not found'], 404);
        }


        $file = Storage::get($path);
        $type = Storage::mimeType($path);

        return (new Response($file, 200))
            ->header('Content-Type', $type)
            ->header('Access-Control-Allow-Origin', '*');
    }

}
