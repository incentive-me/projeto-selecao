<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BalanceController;
use App\Http\Controllers\PaymentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::controller(AuthController::class)->group(function () {
    Route::post('/login', 'login');
    Route::post('/register', 'register');
    Route::middleware('auth:sanctum')->post('/logout', 'logout');
});

Route::controller(BalanceController::class)->group(function () {
    Route::middleware('auth:sanctum')->post('/balance', 'createBalance');
    Route::middleware('auth:sanctum')->get('/balance', 'getAllBalances');
    Route::middleware('auth:sanctum')->get('/balance/{id}', 'getBalanceById');
    Route::middleware('auth:sanctum')->patch('/balance/{id}', 'updateBalance');
    Route::middleware('auth:sanctum')->delete('/balance/{id}', 'deleteBalance');
});

Route::controller(PaymentController::class)->group(function () {
    Route::middleware('auth:sanctum')->post('/payment', 'createPayment');
    Route::middleware('auth:sanctum')->get('/payment', 'getAllPayments');
    Route::middleware('auth:sanctum')->get('/payment/{id}', 'getPaymentById');
    Route::middleware('auth:sanctum')->patch('/payment/{id}', 'updatePayment');
    Route::middleware('auth:sanctum')->delete('/payment/{id}', 'deletePayment');
});


Route::fallback(function () {
    return response()->json(['message' => 'Not found.'], 404);
});

Route::match(['post', 'patch', 'put', 'delete'], '{any}', function (Request $request) {
    return response()->json(['message' => 'Method not allowed.'], 405);
})->where('any', '.*');
