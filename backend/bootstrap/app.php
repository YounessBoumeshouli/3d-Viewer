<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use App\Http\Middleware\JwtMiddleware;
use Illuminate\Cookie\Middleware\EncryptCookies;


return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        channels: __DIR__.'/../routes/channels.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->alias([
            'jwt' => \App\Http\Middleware\JwtMiddleware::class,
        ]);
        $middleware->appendToGroup('api', [
            EncryptCookies::class,
            \Illuminate\Session\Middleware\StartSession::class,
        ]);
        $middleware->validateCsrfTokens(except: [
            'api/broadcasting/auth',
            'broadcasting/auth'
        ]);
        $middleware->api(append: [
            \App\Http\Middleware\Cors::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
