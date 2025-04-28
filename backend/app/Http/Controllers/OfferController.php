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
    public function index()
    {

        return Offer::all();

    }
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|min:5',
            'description' => 'string|min:5',
            'type' => ['required'],
            'price' => 'numeric|nullable'
        ]);

        $Offer = new Offer();

        $Offer->title = $validatedData['title'];
        $Offer->description = $validatedData['description'] ?? null;
        $Offer->price = $validatedData['price'] ?? null;

        $Offer->type = $validatedData['type'];
        $Offer->save();

        return response()->json('Plan added successfully', 201);
    }
    public function show($offer)
    {
        return    Offer::where('type',$offer)->first();

    }

}
