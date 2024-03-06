<?php

namespace Tests\Unit\app\Http\Controllers;

use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\Http\Controllers\BalanceController;
use App\Http\Controllers\PaymentController;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Balance;

class BalanceControllerTest extends TestCase
{
    use DatabaseTransactions, WithFaker;

    protected $balanceController;
    protected $paymentController;

    public function setUp(): void
    {
        parent::setUp();
        $this->balanceController = new BalanceController();
        $this->paymentController = new PaymentController();
    }

    /**
     *  @test
     */
    public function testCreateBalanceSuccess()
    {
        $requestData = [
            'name' => 'Balance Test',
            'description' => 'Balance Test description',
            'initial_value' => 10000.99,
        ];

        $request = new Request($requestData);

        $response = $this->balanceController->createBalance($request);

        $this->assertEquals(Response::HTTP_CREATED, $response->getStatusCode());

        $responseData = $response->getData(true);

        $this->assertEquals('Balance created successfully!', $responseData['message']);
        $this->assertArrayHasKey('balance', $responseData);
        $this->assertEquals($requestData['name'], $responseData['balance']['name']);
        $this->assertEquals($requestData['description'], $responseData['balance']['description']);
        $this->assertEquals($requestData['initial_value'], $responseData['balance']['initial_value']);

        $balance = Balance::where('id', $responseData['balance']['id'])->first();
        $this->assertNotNull($balance);

        $this->assertEquals($requestData['name'], $balance->name);
        $this->assertEquals($requestData['description'], $balance->description);
        $this->assertEquals($requestData['initial_value'], $balance->initial_value);
    }

    /**
     *  @test
     */
    public function testValidationEmptyFieldsBalanceError()
    {

        $request = new Request(array());

        $response = $this->balanceController->createBalance($request);

        $this->assertEquals(Response::HTTP_UNPROCESSABLE_ENTITY, $response->getStatusCode());

        $responseData = $response->getData(true);

        $this->assertEquals('The name field is required.', $responseData['message']['name'][0]);
        $this->assertEquals('The description field is required.', $responseData['message']['description'][0]);
        $this->assertEquals('The initial value field is required.', $responseData['message']['initial_value'][0]);

        $this->assertArrayHasKey('name', $responseData['message']);
        $this->assertArrayHasKey('description', $responseData['message']);
        $this->assertArrayHasKey('initial_value', $responseData['message']);
    }

    /**
     *  @test
     */
    public function testValidationFieldInicialValueNumberError()
    {
        $requestData = [
            'name' => 'Balance Test',
            'description' => 'Balance Test description',
            'initial_value' => 'needs-be-a-number',
        ];

        $request = new Request($requestData);

        $response = $this->balanceController->createBalance($request);

        $this->assertEquals(Response::HTTP_UNPROCESSABLE_ENTITY, $response->getStatusCode());

        $responseData = $response->getData(true);

        $this->assertEquals('The initial value field must be a number.', $responseData['message']['initial_value'][0]);

        $this->assertArrayHasKey('initial_value', $responseData['message']);
    }

    /**
     *  @test
     */
    public function testBalanceGetAllSuccess()
    {

        Balance::factory()->count(3)->create();

        $response = $this->balanceController->getAllBalances();

        $this->assertEquals(Response::HTTP_OK, $response->getStatusCode());

        $this->assertArrayHasKey('message', $response->original);
        $this->assertArrayHasKey('balances', $response->original);

        $balances = Balance::all()->count();
        $this->assertCount($balances, $response->original['balances']);
    }

    /**
     *  @test
     */
    public function testBalanceGetByIdSuccess()
    {
        $balance = Balance::factory()->create();

        $response = $this->balanceController->getBalanceById($balance->id);

        $this->assertEquals(Response::HTTP_OK, $response->getStatusCode());

        $this->assertArrayHasKey('message', $response->original);
        $this->assertArrayHasKey('balance', $response->original);
    }

    /**
     *  @test
     */
    public function testBalanceUpdateSuccess()
    {

        $balance = Balance::factory()->create();

        $requestData = [
            'name' => 'Balance Test Update',
            'description' => 'Balance Test description update',
            'initial_value' => 10001.99,
        ];

        $request = new Request($requestData);

        $response = $this->balanceController->updateBalance($request, $balance->id);

        $this->assertEquals(Response::HTTP_OK, $response->getStatusCode());

        $responseData = $response->getData(true);

        $this->assertEquals('Balance updated successfully!', $responseData['message']);
    }

    /**
     *  @test
     */
    public function testBalanceUpdateBalanceNotFoundError()
    {

        $requestData = [
            'name' => 'Balance Test Update',
            'description' => 'Balance Test description update',
            'initial_value' => 10001.99,
        ];

        $request = new Request($requestData);

        $response = $this->balanceController->updateBalance($request, 0);

        $this->assertEquals(Response::HTTP_NOT_FOUND, $response->getStatusCode());

        $responseData = $response->getData(true);

        $this->assertEquals('Balance not found.', $responseData['message']);
    }

    /**
     *  @test
     */
    public function testBalanceDeleteSuccess()
    {

        $balance = Balance::factory()->create();

        $response = $this->balanceController->deleteBalance($balance->id);

        $this->assertEquals(Response::HTTP_OK, $response->getStatusCode());

        $responseData = $response->getData(true);

        $this->assertEquals('Balance deleted successfully!', $responseData['message']);
    }

    /**
     *  @test
     */
    public function testBalanceDeleteBalanceWithPaymentError()
    {

        $balance = Balance::factory()->create();

        $requestData = [
            'name' => 'Payment Test',
            'description' => 'Payment Test description',
            'value' => $balance->initial_value,
            'balance_id' =>  $balance->id,
        ];

        $request = new Request($requestData);

        $this->paymentController->createPayment($request);

        $response = $this->balanceController->deleteBalance($balance->id);

        $this->assertEquals(Response::HTTP_INTERNAL_SERVER_ERROR, $response->getStatusCode());

        $responseData = $response->getData(true);

        $this->assertEquals('It is not possible to delete this balance as there are payments related to this balance.', $responseData['message']);
    }


    /**
     *  @test
     */
    public function testBalanceDeleteNotFoundError()
    {

        $response = $this->balanceController->deleteBalance(0);

        $this->assertEquals(Response::HTTP_NOT_FOUND, $response->getStatusCode());

        $responseData = $response->getData(true);

        $this->assertEquals('Balance not found.', $responseData['message']);
    }
}
