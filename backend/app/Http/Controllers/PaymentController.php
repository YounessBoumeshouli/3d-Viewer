<?php

namespace App\Http\Controllers;

use App\Models\Offer;
use App\Models\Payment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Srmklive\PayPal\Services\PayPal as PayPalClient;

class PaypalController extends Controller
{
    public function paypal(Request $request, $id): JsonResponse
    {
        $offer = Offer::find($id);

        if (!$offer) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        $provider = new PayPalClient;
        $provider->setApiCredentials(config('paypal'));
        $paypalToken = $provider->getAccessToken();

        $response = $provider->createOrder([
            "intent" => "CAPTURE",
            "application_context" => [
                "return_url" => config('app.frontend_url') . "/payment/success?order_id=" . $offer->id,
                "cancel_url" => config('app.frontend_url') . "/payment/cancel?order_id=" . $offer->id
            ],
            "purchase_units" => [
                [
                    "reference_id" => $offer->id,
                    "description" => $offer->service->title . " - " . $offer->package->name,
                    "amount" => [
                        "currency_code" => "USD",
                        "value" => $offer->amount
                    ]
                ]
            ]
        ]);

        if (isset($response['id']) && $response['id'] != null) {

            session(['offer_id' => $offer->id]);

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

    public function success(Request $request): JsonResponse
    {
        $request->validate([
            'order_id' => 'required|exists:orders,id',
            'token' => 'required|string',
        ]);

        $offer_id = $request->offer_id;
        $offer = Offer::find($offer_id);

        $provider = new PayPalClient;
        $provider->setApiCredentials(config('paypal'));
        $paypalToken = $provider->getAccessToken();

        $response = $provider->capturePaymentOrder($request->token);

        if (isset($response['status']) && $response['status'] == 'COMPLETED') {

            $offer->payment_status = 'paid';
            $offer->save();

            $payment = new Payment([
                'payment_id' => $response['id'],
                'service_title' => $offer->service->title,
                'quantity' => 1,
                'amount' => $response['purchase_units'][0]['payments']['captures'][0]['amount']['value'],
                'currency' => $response['purchase_units'][0]['payments']['captures'][0]['amount']['currency_code'],
                'payer_name' => $response['payer']['name']['given_name'] . ' ' . $response['payer']['name']['surname'],
                'payer_email' => $response['payer']['email_address'],
                'payment_status' => $response['status'],
                'payment_method' => 'PayPal',
                'offer_id' => $offer->id
            ]);
            $payment->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Payment successful',
                'order_id' => $offer->id
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
