<?php

namespace App\Http\Controllers;

use App\Events\CommentEvent;
use App\Models\DxfFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    public function show($id)
    {
        return  DxfFile::find($id);
    }
    public function index()
    {
        Log::info("Before event dispatch");
        return DxfFile::all()->where("designer_id",\auth()->id());
    }
    public function serve(Request $request, $path = null) {
        \Log::info('File requested: ' . $path);

        if (!$path) {
            return response()->json(['error' => 'No file path provided'], 400);
        }

        if (!Storage::disk('public')->exists($path)) {
            \Log::warning('File not found: ' . $path);
            return response()->json(['error' => 'File not found: ' . $path], 404);
        }

        try {
            $content = Storage::disk('public')->get($path);
            $mimeType = Storage::disk('public')->mimeType($path) ?: 'text/plain';

            Log::info('Serving file: ' . $path . ' with mime type: ' . $mimeType);
            return response($content)
                ->header('Content-Type', $mimeType)
                ->header('Content-Disposition', 'inline; filename="' . basename($path) . '"');
        } catch (\Exception $e) {
            Log::error('Error serving file: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to retrieve file'], 500);
        }
    }}
