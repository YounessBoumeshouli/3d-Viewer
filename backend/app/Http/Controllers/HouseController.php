<?php

namespace App\Http\Controllers;

use App\Http\Middleware\JwtMiddleware;
use App\Models\DxfFile;
use Illuminate\Http\Request;

class HouseController extends Controller
{
    public function show()
    {
      return  DxfFile::find(1);
    }
}
