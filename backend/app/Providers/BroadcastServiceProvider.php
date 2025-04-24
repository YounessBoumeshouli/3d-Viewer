<?php

namespace App\Providers;

use App\Http\Middleware\JwtMiddleware;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\ServiceProvider;

class BroadcastServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Broadcast::routes([
            'middleware' => ['api', 'jwt'],
            'prefix' => 'api',
            ]);


        require base_path('routes/channels.php');
    }
}
