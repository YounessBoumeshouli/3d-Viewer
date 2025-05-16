<?php

namespace App\Http\Controllers;

use App\Models\Designer;
use Illuminate\Http\Request;

class StatsController extends Controller
{
    public function index()
    {
        $monthly_stats = Designer::selectRaw('EXTRACT(MONTH FROM created_at) AS month , count(*) as total')->whereRaw('EXTRACT(YEAR FROM created_at) =  ?',[now()->year])->groupBy("month")->orderBy('month')->get();
        return [
            'monthly_stats'=> $monthly_stats,
        ];
    }
}
