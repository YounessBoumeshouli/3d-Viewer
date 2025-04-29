<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\CommentReplyController;
use App\Http\Controllers\ComponentController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\DesignerController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\FileUploadController;
use App\Http\Controllers\FollowerController;
use App\Http\Controllers\HouseController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\JWTAuthController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\PaypalController;
use App\Http\Middleware\JwtMiddleware;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;


Route::get('image/{directory}/{filename}', [ImageController::class, 'getImage']);
Route::get('/offersEnum', [OfferController::class, 'offersEnum']);
Route::get('/offers', [OfferController::class, 'index']);
Route::get('/offers/{offer}', [OfferController::class, 'show']);
Route::get('/storage-proxy/components/window/{path}', function ($path) {
    while (ob_get_level()) ob_end_clean();

    $filePath = storage_path('app/public/components/window/' . $path);

    if (!file_exists($filePath)) {
        echo "File not found";
        exit;
    }

    header('Content-Type: application/octet-stream');
    header('Content-Length: ' . filesize($filePath));
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Expose-Headers: Content-Disposition');

    $fp = fopen($filePath, 'rb');
    fpassthru($fp);
    fclose($fp);
    exit;

});
Route::get('/storage-proxy/components/door/{path}', function ($path) {
    while (ob_get_level()) ob_end_clean();

    $filePath = storage_path('app/public/components/door/' . $path);

    if (!file_exists($filePath)) {
        echo "File not found";
        exit;
    }

    header('Content-Type: image/jpeg');
    header('Content-Length: ' . filesize($filePath));
    header('Access-Control-Allow-Origin: *');

    $fp = fopen($filePath, 'rb');
    fpassthru($fp);
    fclose($fp);
    exit;
})->where('path', '.*');
Route::get('houses', [HouseController::class,'index']);
Route::post('/offers/{id}/paypal', [PaypalController::class, 'paypal']);

Route::post('/payment/success', [PaypalController::class, 'success']);

Route::post('/payment/cancel', [PaypalController::class, 'cancel']);
Route::get('/test-fixed-image', function () {
    $filePath = "C:\\Users\\youco\\Desktop\\FilRouge\\FillRouge\\backend\\storage\\app\\public\\components\\door\\door2.jpg";

    if (!file_exists($filePath)) {
        return "File doesn't exist!";
    }

    $fileContent = file_get_contents($filePath);

    return response($fileContent, 200)
        ->header('Content-Type', 'image/jpeg')
        ->header('Access-Control-Allow-Origin', '*');
});
Route::post('register', [JWTAuthController::class, 'register']);
Route::post('login', [JWTAuthController::class, 'login']);
Route::get('categories',[ComponentController::class,'index']);
Route::get('components/{type}',[ComponentController::class,'show']);
Route::get('designers',[DesignerController::class,'index']);
Route::get('designers/{id}',[DesignerController::class,'show']);
Route::get('designers/{designer}/models',[DesignerController::class,'modelsByCreator']);

    Route::post('/test-broadcast-auth', function(Request $request) {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            return response()->json(['success' => true, 'user' => $user->id]);
        } catch (JWTException $e) {
            return response()->json(['error' => $e->getMessage()], 401);
        }
    });
Route::middleware([JwtMiddleware::class])->group(function () {


Route::post('follow/{user}',[FollowerController::class,'follow']);
Route::get('conversations',[ConversationController::class,'index']);
Route::post('conversations',[ConversationController::class,'store']);
Route::get('conversations/{conversation}',[ConversationController::class,'show']);
Route::post('conversations/{conversation}/messages',[ConversationController::class,'sendMessage']);
Route::post('unfollow/{user}',[FollowerController::class,'unfollow']);
Route::get('followers',[FollowerController::class,'followers']);
Route::get('following',[FollowerController::class,'following']);
Route::get('friends',[FollowerController::class,'friends']);
Route::get('notifications',[NotificationController::class,'index']);
Route::get('MyProfile',[DesignerController::class,'profile']);
Route::get('myfiles',[FileController::class,'index']);
Route::post('categories',[ComponentController::class,'store']);
Route::get('creator/models',[HouseController::class,'ModelsByCreator']);
Route::post('houses', [HouseController::class,'store']);
Route::put('houses/{house}', [HouseController::class,'update']);
Route::get('houses/{house}', [HouseController::class,'show']);
Route::apiResource('house.comments',CommentController::class);
Route::apiResource('comments.replies',CommentReplyController::class);
Route::get('user', [JWTAuthController::class, 'getUser']);
Route::post('logout', [JWTAuthController::class, 'logout']);
Route::post('/upload', [FileUploadController::class, 'upload']);
Route::get('/house/{id}', [FileController::class, 'show']);
Route::post('/offers', [OfferController::class, 'store']);

Route::get('files/{path}', [FileController::class, 'serve'])->where('path', '.*');


});
