<?php

use App\Events\CommentEvent;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Log;
Route::get('/', function () {
    return view('welcome');
});

Route::get('/test-broadcast', function () {
    event(new CommentEvent("This is a test comment 🚀"));
    return 'Broadcast event sent.';
});
