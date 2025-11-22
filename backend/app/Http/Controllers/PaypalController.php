<?php

namespace App\Http\Controllers;

use App\Enums\offers;
use App\Models\Offer;
use App\Models\Payment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Srmklive\PayPal\Services\PayPal as PayPalClient;

class PaypalController extends Controller
{
    public function paypal(Request $request, $id)
    {
        $offer = Offer::find($id);
        if (!$offer) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        $provider = new PayPalClient;
        $provider->setApiCredentials(config('paypal'));
        $paypalToken = $provider->getAccessToken();
//        if (isset($paypalToken['access_token'])) {
//            Log::info('PayPal Token OK');
//        } else {
//            Log::error('PayPal Token Failed', $paypalToken);
//            return response()->json([
//                'status' => 'error',
//                'message' => 'Failed to get PayPal access token',
//                'details' => $paypalToken
//            ], 500);
//        }

        $response = $provider->createOrder([
            "intent" => "CAPTURE",
            "application_context" => [
                "return_url" => config('app.frontend_url') . "/payment/success?order_id=" .$offer->id,
                "cancel_url" => config('app.frontend_url') . "/payment/cancel?order_id=" . $offer->id
            ],
            "purchase_units" => [
                [
                    "reference_id" => $offer->id,
                    "description" => $offer->title,
                    "amount" => [
                        "currency_code" => "USD",
                        "value" => $offer->price
                    ]
                ]
            ]
        ]);
//        Log::info('PayPal createOrder response:', $response);
//        if (isset($response['id'])) {
//            Log::info('id offer is OK',$response['id']);
//        } else {
//            Log::error('id offer is Failed', $paypalToken);
//
//        }
        if (isset($response['id']) && $response['id'] != null) {

            session(['offer_id' => $offer->id]);
//            if (isset($response['links'])) {
//                Log::info('links offer is OK',$response['links']);
//            } else {
//                Log::error('links offer is Failed', $paypalToken);
//
//            }
            foreach ($response['links'] as $link) {
                if ($link['rel'] === 'approve') {
                    return response()->json([
                        'status' => 'success',
                        'redirect_url' => $link['href']
                    ]);
                }
            }
        }

        return response()->json([
            'status' => 'error',
            'message' => 'Could not create PayPal order'
        ], 500);
    }

    public function success(Request $request)
    {
        $request->validate([
            'order_id' => 'required',
            'token' => 'required|string'
        ]);

        $offer = Offer::find($request->order_id);
        $offerEnum = $offer->type;

        $provider = new PayPalClient;
        $provider->setApiCredentials(config('paypal'));
        $paypalToken = $provider->getAccessToken();
        if (Payment::where('payment_id', $request->token)->exists()) {
            return response()->json([
                'status' => 'success',
                'message' => 'Payment already processed.',
            ]);
        }
        $response = $provider->capturePaymentOrder($request->token);
        Log::info('PayPal response:', $response);

        if (isset($response['status']) && $response['status'] === 'COMPLETED') {
            $endDate = now()->addDays($offerEnum->days());
            $designer = auth()->user()->designer;
            auth()->user()->role = "creator";
            auth()->user()->save();
            if (!$designer) {
                $designer = auth()->user()->designer()->create([
                    'user_id' => auth()->id(),
                    'bio' => 'new Designer'
                ]);

            }

            $userOffer = $designer->useroffer()->create([
                'offer_id' => $request->order_id,
                'start_date' => now()->format('Y-m-d'),
                'end_date' => $endDate->format('Y-m-d')
            ]);

            $userOffer->paymentStatus = 'paid';
            $userOffer->save();

            $payment = new Payment([
                'payment_id' => $response['id'],
                'service_title' => $offer->title,
                'quantity' => 1,
                'designer_id'=>$designer->id,
                'amount' => $response['purchase_units'][0]['payments']['captures'][0]['amount']['value'],
                'currency' => $response['purchase_units'][0]['payments']['captures'][0]['amount']['currency_code'],
                'payer_name' => $response['payer']['name']['given_name'] . ' ' . $response['payer']['name']['surname'],
                'payer_email' => $response['payer']['email_address'],
                'payment_status' => $response['status'],
                'payment_method' => 'PayPal',
                'offer_id' => $userOffer->id
            ]);
            $payment->save();
            return response()->json([
                'status' => 'success',
                'message' => 'Payment successful',
                'order_id' => $userOffer->id
            ]);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'Payment failed'
        ], 400);
    }

    public function cancel(Request $request): JsonResponse
    {
        return response()->json([
            'status' => 'cancelled',
            'message' => 'Payment cancelled by user'
        ]);
    }
}
