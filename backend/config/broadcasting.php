<?php
return [
    'default' => env('BROADCAST_DRIVER', 'null'),
    'connections' => [
        'pusher' => [
            'driver' => 'pusher',
            'key' => 'filrouge-key',
            'secret' => 'filrouge-secret',
            'app_id' => 'filrouge-app-id',
            'options' => [
                'cluster' => env('PUSHER_APP_CLUSTER', 'mt1'),
                'useTLS' => false,
                'host' => '127.0.0.1',
                'port' => 8080,
                'scheme' => 'http',
            ],
        ],
        'reverb' => [
            'driver' => 'reverb',
            'key' => 'filrouge-key',
            'secret' => 'filrouge-secret',
            'app_id' => 'filrouge-app-id',
            'options' => [
                'host' => '127.0.0.1',
                'port' => 8080,
                'scheme' => 'http',
                'useTLS' => false,
            ],
        ],
    ],
];
