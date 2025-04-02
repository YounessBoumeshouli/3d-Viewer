<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;

class ImageController extends Controller
{
    public function getImage($filename)
    {
        $path = storage_path("app/public/components/door/" . $filename);

        if (!file_exists($path)) {
            return response()->json(["error" => "Image not found"], Response::HTTP_NOT_FOUND);
        }

        return response()->file($path, [
            'Access-Control-Allow-Origin' => '*', // ✅ Allow CORS
            'Content-Type' => mime_content_type($path)
        ]);
    }
}
