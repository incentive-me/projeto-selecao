<?php

namespace Tests\Unit\app\Http\Controllers;

use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\Http\Controllers\PaymentController;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Payment;
use App\Models\Balance;

class PaymentControllerTest extends TestCase
{
    use DatabaseTransactions, WithFaker;

    protected $paymentController;

    public function setUp(): void
    {
        parent::setUp();
        $this->paymentController = new PaymentController();
    }

    /**
     *  @test
     */
    public function testCreatePaymentSuccess()
    {
        $balance = Balance::factory()->create();

        $requestData = [
            'name' => 'Payment Test',
            'description' => 'Payment Test description',
            'value' => $balance->initial_value,
            'balance_id' => $balance->id
        ];

        $request = new Request($requestData);

        $response = $this->paymentController->createPayment($request);

        $this->assertEquals(Response::HTTP_CREATED, $response->getStatusCode());

        $responseData = $response->getData(true);

        $this->assertEquals('Payment created successfully!', $responseData['message']);
        $this->assertArrayHasKey('payment', $responseData);
        $this->assertEquals($requestData['name'], $responseData['payment']['name']);
        $this->assertEquals($requestData['description'], $responseData['payment']['description']);
        $this->assertEquals($requestData['value'], $responseData['payment']['value']);
        $this->assertEquals($requestData['balance_id'], $responseData['payment']['balance_id']);

        $payment = Payment::where('id', $responseData['payment']['id'])->first();
        $this->assertNotNull($payment);

        $this->assertEquals($requestData['name'], $payment->name);
        $this->assertEquals($requestData['description'], $payment->description);
        $this->assertEquals($requestData['value'], $payment->value);
        $this->assertEquals($requestData['balance_id'], $payment->balance_id);
    }

    /**
     *  @test
     */
    public function testValidationEmptyFieldsPaymentError()
    {

        $request = new Request(array());

        $response = $this->paymentController->createPayment($request);

        $this->assertEquals(Response::HTTP_UNPROCESSABLE_ENTITY, $response->getStatusCode());

        $responseData = $response->getData(true);

        $this->assertEquals('The name field is required.', $responseData['message']['name'][0]);
        $this->assertEquals('The description field is required.', $responseData['message']['description'][0]);
        $this->assertEquals('The value field is required.', $responseData['message']['value'][0]);
        $this->assertEquals('The balance id field is required.', $responseData['message']['balance_id'][0]);

        $this->assertArrayHasKey('name', $responseData['message']);
        $this->assertArrayHasKey('description', $responseData['message']);
        $this->assertArrayHasKey('value', $responseData['message']);
        $this->assertArrayHasKey('balance_id', $responseData['message']);
    }

    /**
     *  @test
     */
    public function testValidateHasBalanceError()
    {

        $requestBalanceData = [
            'name' => 'Balance Test',
            'description' => 'Balance Test description',
            'initial_value' => 100,
            'remaining_value' => 100,
        ];

        $balance = Balance::create($requestBalanceData);

        $requestData = [
            'name' => 'Payment Test',
            'description' => 'Payment Test description',
            'value' => 200,
            'balance_id' => $balance->id
        ];

        $request = new Request($requestData);

        $response = $this->paymentController->createPayment($request);

        $this->assertEquals(Response::HTTP_UNPROCESSABLE_ENTITY, $response->getStatusCode());

        $responseData = $response->getData(true);

        $this->assertEquals('Insufficient balance.', $responseData['message']);
    }

    /**
     *  @test
     */
    public function testValidateBalanceExistsError()
    {

        $requestData = [
            'name' => 'Payment Test',
            'description' => 'Payment Test description',
            'value' => 200,
            'balance_id' => 0
        ];

        $request = new Request($requestData);

        $response = $this->paymentController->createPayment($request);

        $this->assertEquals(Response::HTTP_NOT_FOUND, $response->getStatusCode());

        $responseData = $response->getData(true);

        $this->assertEquals('Balance not found.', $responseData['message']);
    }

    /**
     *  @test
     */
    public function testValidateValueFieldIsNumericError()
    {

        $balance = Balance::factory()->create();

        $requestData = [
            'name' => 'Payment Test',
            'description' => 'Payment Test description',
            'value' => 'needs-be-a-number',
            'balance_id' => 'needs-be-a-number',
        ];

        $request = new Request($requestData);

        $response = $this->paymentController->createPayment($request);

        $this->assertEquals(Response::HTTP_UNPROCESSABLE_ENTITY, $response->getStatusCode());

        $responseData = $response->getData(true);

        $this->assertEquals('The value field must be a number.', $responseData['message']['value'][0]);
        $this->assertEquals('The balance id field must be a number.', $responseData['message']['balance_id'][0]);

        $this->assertArrayHasKey('value', $responseData['message']);
        $this->assertArrayHasKey('balance_id', $responseData['message']);
    }

    /**
     *  @test
     */
    public function testPaymentGetAllSuccess()
    {

        Payment::factory()->count(3)->create();

        $response = $this->paymentController->getAllPayments();

        $this->assertEquals(Response::HTTP_OK, $response->getStatusCode());

        $this->assertArrayHasKey('message', $response->original);
        $this->assertArrayHasKey('payments', $response->original);

        $payments = payment::all()->count();
        $this->assertCount($payments, $response->original['payments']);
    }

    /**
     *  @test
     */
    public function testPaymentGetByIdSuccess()
    {
        $payment = Payment::factory()->create();

        $response = $this->paymentController->getPaymentById($payment->id);

        $this->assertEquals(Response::HTTP_OK, $response->getStatusCode());

        $this->assertArrayHasKey('message', $response->original);
        $this->assertArrayHasKey('payment', $response->original);
    }

    public function testPaymentUpdateSuccess()
    {
        $payment = Payment::factory()->create();

        $requestData = [
            'name' => 'Payment Test Update',
            'description' => 'Payment Test description update',
        ];

        $request = new Request($requestData);

        $response = $this->paymentController->updatePayment($request, $payment->id);

        $this->assertEquals(Response::HTTP_OK, $response->getStatusCode());

        $this->assertArrayHasKey('message', $response->original);

        $responseData = $response->getData(true);

        $this->assertEquals('Payment updated successfully!', $responseData['message']);
    }

    /**
     *  @test
     */
    public function testPaymentDeleteSuccess()
    {

        $payment = Payment::factory()->create();

        $response = $this->paymentController->deletePayment($payment->id);

        $this->assertEquals(Response::HTTP_OK, $response->getStatusCode());

        $responseData = $response->getData(true);

        $this->assertEquals('Payment deleted successfully!', $responseData['message']);
    }
}
