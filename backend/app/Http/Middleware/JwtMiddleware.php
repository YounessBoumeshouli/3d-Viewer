<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class JwtMiddleware
{
    public function handle($request, Closure $next)
    {
        try {
            if ($request->is('api/broadcasting/auth') || $request->is('broadcasting/auth')) {
                $user = JWTAuth::parseToken()->authenticate();
                return $next($request);
            }

            $user = JWTAuth::parseToken()->authenticate();
            auth()->login($user);

        } catch (JWTException $e) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $next($request);
    }
}
