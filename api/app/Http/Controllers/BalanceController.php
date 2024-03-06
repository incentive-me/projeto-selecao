<?php

namespace App\Http\Controllers;

use App\Models\Balance;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;

class BalanceController extends Controller
{

    public function createBalance(Request $request): JsonResponse
    {

        try {

            $validatedData = $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'description' => ['required', 'string',  'max:255'],
                'initial_value' => ['required', 'numeric'],
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

        $validatedData['remaining_value'] =  $validatedData['initial_value'];

        $balance = Balance::create($validatedData);

        return response()->json(
            [
                'message' => 'Balance created successfully!',
                'balance' => $balance
            ],
            Response::HTTP_CREATED
        );
    }

    public function getAllBalances(): JsonResponse
    {

        try {

            $balancesToProcess = Balance::orderBy('id', 'desc')->get();
            $balances = $this->usedValueProcessing($balancesToProcess);

            return response()->json(
                [
                    'message' => 'All balances retrieved successfully!',
                    'balances' => $balances
                ],
                Response::HTTP_OK
            );
        } catch (\Exception $e) {
            return response()->json(
                [
                    'message' => 'Failed to retrieve balances. Please try again later.'
                ],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    public function usedValueProcessing($balances): array
    {
        $processedBalances = [];
        foreach ($balances as $balance) {

            $usedValue = floatval($balance->initial_value) - floatval($balance->remaining_value);

            $processedBalances[] = [
                'id' => $balance->id,
                'name' => $balance->name,
                'description' => $balance->description,
                'initial_value' => $balance->initial_value,
                'used_value' =>  (string)$usedValue,
                'remaining_value' => $balance->remaining_value,
                'created_at' => $balance->created_at,
                'created_at' => $balance->created_at,


            ];
        }

        return $processedBalances;
    }

    public function getBalanceById($id): JsonResponse
    {
        try {
            $balance = Balance::findOrFail($id);

            return response()->json(
                [
                    'message' => 'Balance retrieved successfully!',
                    'balance' => $balance
                ],
                Response::HTTP_OK
            );
        } catch (ModelNotFoundException $e) {
            return response()->json(
                [
                    'message' => 'Balance not found.'
                ],
                Response::HTTP_NOT_FOUND
            );
        } catch (\Exception $e) {
            return response()->json(
                [
                    'message' => 'Failed to retrieve balance. Please try again later.'
                ],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    public function updateBalance(Request $request, $id): JsonResponse
    {

        try {
            $validatedData = $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'description' => ['required', 'string', 'max:255'],
            ]);

            $balance = Balance::findOrFail($id);
            $balance->update($validatedData);
        } catch (ModelNotFoundException $e) {
            return response()->json(
                [
                    'message' => 'Balance not found.'
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
                    'message' => 'Failed to update balance. Please try again later.'
                ],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }

        return response()->json(
            [
                'message' => 'Balance updated successfully!'
            ],
            Response::HTTP_OK
        );
    }

    public function deleteBalance($id): JsonResponse
    {

        try {
            $balance = Balance::findOrFail($id);
            $balance->delete();
        } catch (ModelNotFoundException $e) {
            return response()->json(
                [
                    'message' => 'Balance not found.'
                ],
                Response::HTTP_NOT_FOUND
            );
        } catch (QueryException $e) {
            return response()->json(
                [
                    'message' => 'It is not possible to delete this balance as there are payments related to this balance.'
                ],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        } catch (\Exception $e) {
            return response()->json(
                [
                    'message' => 'Failed to delete balance. Please try again later.'
                ],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }

        return response()->json(
            [
                'message' => 'Balance deleted successfully!'
            ],
            Response::HTTP_OK
        );
    }
}
