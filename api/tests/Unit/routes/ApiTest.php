<?php

namespace Tests\Unit\routes;

use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\Models\User;
use Illuminate\Http\Response;
use App\Models\Balance;
use App\Models\Payment;

class ApiTest extends TestCase
{
    use DatabaseTransactions;

    /**
     *  @test
     */
    public function testRegisterRouteSuccess()
    {
        $response = $this->post('/api/register', [
            'name' => 'Test User',
            'email' => 'user.to.regitser@payments.com',
            'password' => 'password',
            'password_confirmation' => 'password'
        ]);

        $response->assertStatus(Response::HTTP_CREATED);
    }

    /**
     *  @test
     */
    public function testLoginRouteSuccess()
    {
        $user = User::factory()->create([
            'email' => 'test.user@payment.com',
            'password' => bcrypt('password'),
        ]);

        $response = $this->post('/api/login', [
            'email' =>  $user->email,
            'password' => 'password',
        ]);

        $response->assertStatus(Response::HTTP_OK);
    }

    /**
     *  @test
     */
    public function testUnauthorizedLogoutError()
    {
        $response = $this->post('/api/logout');
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);

        $response->assertJson([
            'message' => 'Unauthorized.'
        ]);
    }

    /**
     *  @test
     */
    public function testUnauthorizedBalancePostRouteError()
    {
        $response = $this->post('/api/balance');
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);

        $response->assertJson([
            'message' => 'Unauthorized.'
        ]);
    }

    /**
     *  @test
     */
    public function testBalancePostRouteSuccess()
    {
        $user = User::factory()->create();
        $token = $user->createToken('token')->plainTextToken;

        $response =  $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->post('/api/balance', [
            'name' => 'Balance Test',
            'description' => 'Balance Test description',
            'initial_value' => 10000.99,
        ]);

        $response->assertStatus(Response::HTTP_CREATED);
    }

    /**
     *  @test
     */
    public function testBalanceGetRouteSuccess()
    {
        $user = User::factory()->create();
        $token = $user->createToken('token')->plainTextToken;

        $response =  $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->get('/api/balance');

        $response->assertStatus(Response::HTTP_OK);
    }

    /**
     *  @test
     */
    public function testBalanceGetByIdRouteSuccess()
    {

        $user = User::factory()->create();
        $balance = Balance::factory()->create();

        $token = $user->createToken('token')->plainTextToken;

        $response =  $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->get('/api/balance/' . $balance->id);

        $response->assertStatus(Response::HTTP_OK);
    }

    /**
     *  @test
     */
    public function testBalanceUpdateRouteSuccess()
    {

        $user = User::factory()->create();
        $balance = Balance::factory()->create();

        $token = $user->createToken('token')->plainTextToken;

        $response =  $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->patch(
            '/api/balance/' . $balance->id,
            [
                'name' => 'Balance Test Update',
                'description' => 'Balance Test description Update',
            ]
        );

        $response->assertStatus(Response::HTTP_OK);
    }

    /**
     *  @test
     */
    public function testBalanceDeleteRouteSuccess()
    {

        $user = User::factory()->create();
        $balance = Balance::factory()->create();

        $token = $user->createToken('token')->plainTextToken;

        $response =  $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->delete(
            '/api/balance/' . $balance->id
        );

        $response->assertStatus(Response::HTTP_OK);
    }

    /**
     *  @test
     */
    public function testPaymentPostRouteSuccess()
    {
        $user = User::factory()->create();
        $balance = Balance::factory()->create();

        $token = $user->createToken('token')->plainTextToken;

        $response =  $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->post('/api/payment', [
            'name' => 'Balance Test',
            'description' => 'Balance Test description',
            'value' => $balance->initial_value,
            'balance_id' => $balance->id

        ]);

        $response->assertStatus(Response::HTTP_CREATED);
    }

    /**
     *  @test
     */
    public function testPaymentGetRouteSuccess()
    {
        $user = User::factory()->create();

        $token = $user->createToken('token')->plainTextToken;

        $response =  $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->get('/api/payment');

        $response->assertStatus(Response::HTTP_OK);
    }

    /**
     *  @test
     */
    public function testPaymentGetByIdRouteSuccess()
    {

        $user = User::factory()->create();
        $payment = Payment::factory()->create();

        $token = $user->createToken('token')->plainTextToken;

        $response =  $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->get('/api/payment/' . $payment->id);

        $response->assertStatus(Response::HTTP_OK);
    }

    /**
     *  @test
     */
    public function testPaymentUpdateRouteSuccess()
    {

        $user = User::factory()->create();
        $payment = Payment::factory()->create();

        $token = $user->createToken('token')->plainTextToken;

        $response =  $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->patch('/api/payment/' . $payment->id, [
            'name' => 'Balance Test',
            'description' => 'Balance Test description'

        ]);

        $response->assertStatus(Response::HTTP_OK);
    }

    /**
     *  @test
     */
    public function testPaymentDeleteRouteSuccess()
    {

        $user = User::factory()->create();
        $payment = Payment::factory()->create();

        $token = $user->createToken('token')->plainTextToken;

        $response =  $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->delete(
            '/api/payment/' . $payment->id
        );

        $response->assertStatus(Response::HTTP_OK);
    }
}
