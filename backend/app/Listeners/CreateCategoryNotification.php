<?php

namespace App\Listeners;

use App\Events\createCategoryEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class CreateCategoryNotification
{
    
    public function __construct()
    {
        
    }

    
    public function handle(createCategoryEvent $event): void
    {
        
    }
}
