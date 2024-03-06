<?php

namespace App\Http\Controllers;

use App\Models\Balance;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class PaymentController extends Controller
{

    const SUBTRACT = 1;
    const REVERSAL = 2;

    public function createPayment(Request $request): JsonResponse
    {

        try {

            $validatedData = $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'description' => ['required', 'string',  'max:255'],
                'value' => ['required', 'numeric'],
                'balance_id' => ['required', 'numeric'],
            ]);
        } catch (ValidationException $e) {
            $errors = $e->validator->errors()->toArray();
            return response()->json(
                [
                    'message' => $errors
                ],
                Response::HTTP_UNPROCESSABLE_ENTITY
            );
        }

        if (!$this->balanceExists($validatedData['balance_id'])) {
            return response()->json(
                [
                    'message' => 'Balance not found.',
                ],
                Response::HTTP_NOT_FOUND
            );
        }

        if (!$this->hasBalance($validatedData['balance_id'], $validatedData['value'])) {
            return response()->json(
                [
                    'message' => 'Insufficient balance.',
                ],
                Response::HTTP_UNPROCESSABLE_ENTITY
            );
        }

        $payment = Payment::create($validatedData);

        $this->updateRemainingValue($payment, PaymentController::SUBTRACT);
        return response()->json(
            [
                'message' => 'Payment created successfully!',
                'payment' => $payment
            ],
            Response::HTTP_CREATED
        );
    }

    protected function hasBalance($balanceId, $value): bool
    {
        $balance = Balance::find($balanceId);

        return $balance->remaining_value >= $value;
    }

    protected function balanceExists($balanceId): bool
    {

        if (!Balance::find($balanceId)) {
            return false;
        }

        return true;
    }

    public function getAllPayments(): JsonResponse
    {
        try {

            $payments = Payment::orderBy('id', 'desc')->get();

            return response()->json(
                [
                    'message' => 'All payments retrieved successfully!',
                    'payments' => $payments
                ],
                Response::HTTP_OK
            );
        } catch (\Exception $e) {
            return response()->json(
                [
                    'message' => 'Failed to retrieve payments. Please try again later.'
                ],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    public function getPaymentById($id): JsonResponse
    {

        try {
            $payment = Payment::with('balance')->findOrFail($id);

            return response()->json(
                [
                    'message' => 'Payment retrieved successfully!',
                    'payment' => $payment
                ],
                Response::HTTP_OK
            );
        } catch (ModelNotFoundException $e) {
            return response()->json(
                [
                    'message' => 'Payment not found.'
                ],
                Response::HTTP_NOT_FOUND
            );
        } catch (\Exception $e) {
            return response()->json(
                [
                    'message' => 'Failed to retrieve payment. Please try again later.'
                ],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    public function updatePayment(Request $request, $id): JsonResponse
    {

        try {
            $validatedData = $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'description' => ['required', 'string', 'max:255'],
            ]);

            $payment = Payment::findOrFail($id);
            $payment->update($validatedData);
        } catch (ModelNotFoundException $e) {
            return response()->json(
                [
                    'message' => 'Payment not found.'
                ],
                Response::HTTP_NOT_FOUND
            );
        } catch (ValidationException $e) {
            $errors = $e->validator->errors()->toArray();
            return response()->json(
                [
                    'message' => $errors
                ],
                Response::HTTP_UNPROCESSABLE_ENTITY
            );
        } catch (\Exception $e) {
            return response()->json(
                [
                    'message' => 'Failed to update payment. Please try again later.'
                ],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }

        return response()->json(
            [
                'message' => 'Payment updated successfully!'
            ],
            Response::HTTP_OK
        );
    }

    public function deletePayment($id): JsonResponse
    {

        try {

            $payment = Payment::findOrFail($id);

            $payment->delete();

            $this->updateRemainingValue($payment, PaymentController::REVERSAL);
        } catch (ModelNotFoundException $e) {
            return response()->json(
                [
                    'message' => 'Payment not found.'
                ],
                Response::HTTP_NOT_FOUND
            );
        } catch (\Exception $e) {
            return response()->json(
                [
                    'message' => 'Failed to delete payment. Please try again later.'
                ],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }

        return response()->json(
            [
                'message' => 'Payment deleted successfully!'
            ],
            Response::HTTP_OK
        );
    }

    protected function updateRemainingValue(Payment $payment, $metod)
    {
        try {
            $balance = Balance::findOrFail($payment->balance_id);

            $paymentValue = $payment->getValue($payment);
            $remainingValue = $balance->getRemainingValue();

            if ($metod == PaymentController::SUBTRACT) {
                $newRemaingingValue = $this->subtract($paymentValue, $remainingValue);
            }

            if ($metod == PaymentController::REVERSAL) {
                $newRemaingingValue = $this->reversal($paymentValue, $remainingValue);
            }

            $balance->update(array('remaining_value' => $newRemaingingValue));
        } catch (\Throwable $e) {
            return response()->json(
                [
                    'message' => 'Failed to delete payment. Please try again later.'
                ],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    protected function subtract($paymentValue, $remainingValue)
    {
        $newRemaingingValue = $remainingValue - $paymentValue;
        return $newRemaingingValue;
    }

    protected function reversal($paymentValue, $remainingValue)
    {
        $newRemaingingValue = $remainingValue + $paymentValue;
        return $newRemaingingValue;
    }
}
