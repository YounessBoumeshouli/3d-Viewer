
<?php


use App\Http\Controllers\ImageController;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Support\Facades\Route;

// In your routes/web.php (not api.php)
// This puts the routes outside the API middleware stack
Route::get('direct-image/door/{filename}', function ($filename) {
    $path = storage_path('app/public/components/door/' . $filename);
    if (!file_exists($path)) {
        return response()->json(['error' => 'Image not found'], 404);
    }
    return response()->file($path);
})->withoutMiddleware(\App\Http\Middleware\Cors::class);

Route::get('direct-image/window/{filename}', function ($filename) {
    $path = storage_path('app/public/components/window/' . $filename);
    if (!file_exists($path)) {
        return response()->json(['error' => 'Image not found'], 404);
    }
    return response()->file($path);
})->withoutMiddleware(\App\Http\Middleware\Cors::class);


Route::get('image/{directory}/{filename}', [ImageController::class, 'getImage']);



