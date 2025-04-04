<?php

use App\Http\Controllers\ComponentController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\FileUploadController;
use App\Http\Controllers\HouseController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\JWTAuthController;
use App\Http\Middleware\JwtMiddleware;
use Illuminate\Support\Facades\Route;

Route::get('image/door/{filename}', function ($filename) {
    $path = storage_path('app/public/components/door/' . $filename);
    if (!file_exists($path)) {
        return response()->json(['error' => 'Image not found'], 404);
    }
    return response()->file($path);
});

Route::post('register', [JWTAuthController::class, 'register']);
Route::post('login', [JWTAuthController::class, 'login']);
Route::get('categories',[ComponentController::class,'index']);
Route::get('components/{type}',[ComponentController::class,'show']);
Route::get('components/{type}',[DesignerController::class,'show']);
Route::middleware([JwtMiddleware::class])->group(function () {
    Route::get('myfiles',[FileController::class,'index']);

    Route::get('user', [JWTAuthController::class, 'getUser']);
Route::post('logout', [JWTAuthController::class, 'logout']);
Route::post('/upload', [FileUploadController::class, 'upload']);
Route::get('/house', [HouseController::class, 'show']);
Route::get('files/{path}', [FileController::class, 'serve'])->where('path', '.*');
});
