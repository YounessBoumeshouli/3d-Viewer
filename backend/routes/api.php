<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\CommentReplyController;
use App\Http\Controllers\ComponentController;
use App\Http\Controllers\DesignerController;
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
Route::get('image/window/{filename}', function ($filename) {
    $path = storage_path('app/public/components/window/' . $filename);
    if (!file_exists($path)) {
        return response()->json(['error' => 'Image not found'], 404);
    }
    return response()->file($path);
});

Route::post('register', [JWTAuthController::class, 'register']);
Route::post('login', [JWTAuthController::class, 'login']);
Route::get('categories',[ComponentController::class,'index']);
Route::get('components/{type}',[ComponentController::class,'show']);
Route::get('designers',[DesignerController::class,'index']);
Route::get('designers/{id}',[DesignerController::class,'show']);
Route::get('designers/{designer}/models',[DesignerController::class,'modelsByCreator']);

Route::middleware([JwtMiddleware::class])->group(function () {
    Route::get('MyProfile',[DesignerController::class,'profile']);
    Route::get('myfiles',[FileController::class,'index']);
    Route::post('categories',[ComponentController::class,'store']);
    Route::get('creator/models',[HouseController::class,'ModelsByCreator']);
    Route::apiResource('houses', HouseController::class);
    Route::apiResource('house.comments',CommentController::class);
    Route::apiResource('comments.replies',CommentReplyController::class);
    Route::get('user', [JWTAuthController::class, 'getUser']);
Route::post('logout', [JWTAuthController::class, 'logout']);
Route::post('/upload', [FileUploadController::class, 'upload']);
Route::get('/house/{id}', [FileController::class, 'show']);
Route::get('files/{path}', [FileController::class, 'serve'])->where('path', '.*');
});
