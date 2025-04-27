<?php

namespace App\Http\Controllers;

use App\Enums\offers;
use App\Models\Offer;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Enum;

class OfferController extends Controller
{
    public function offersEnum()
    {
        $options = [];

        foreach (offers::cases() as $offer) {
            $options[$offer->value] = $offer->name;
        }
      return $options;

    }
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title'=>'required|string|min:5',
            'description'=>'string|min:5',
            'type'=>['required',new Enum(offers::class)],
            'price'=>'numeric'
        ]);

    }

}
