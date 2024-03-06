<?php

namespace Tests\Unit\app\Http\Controllers;

use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Testing\WithFaker;

class AuthControllerTest extends TestCase
{
    use DatabaseTransactions, WithFaker;

    protected $authController;

    public function setUp(): void
    {
        parent::setUp();
        $this->authController = new AuthController();
    }

    /**
     *  @test
     */
    public function testRegisterSuccess()
    {
        $requestData = [
            'name' => 'Test User',
            'email' => 'user.to.regitser@payments.com',
            'password' => 'password',
            'password_confirmation' => 'password'
        ];
        $request = new Request($requestData);

        $response = $this->authController->register($request);

        $this->assertEquals(Response::HTTP_CREATED, $response->getStatusCode());

        $responseData = $response->getData(true);

        $this->assertEquals('User registered successfully!', $responseData['message']);
        $this->assertArrayHasKey('user', $responseData);
        $this->assertEquals($requestData['name'], $responseData['user']['name']);
        $this->assertEquals($requestData['email'], $responseData['user']['email']);
        $user = User::where('email', $requestData['email'])->first();

        $user = User::where('email', $requestData['email'])->first();
        $this->assertNotNull($user);
        $this->assertEquals($requestData['name'], $user->name);
        $this->assertTrue(Hash::check($requestData['password'], $user->password));
    }

    /**
     *  @test
     */
    public function testRegisterValidationEmptyFieldsError()
    {

        $requestData = [
            'name' => '',
            'email' => '',
            'password' => '',
        ];

        $request = new Request($requestData);

        $response = $this->authController->register($request);

        $this->assertEquals(Response::HTTP_UNPROCESSABLE_ENTITY, $response->getStatusCode());

        $responseData = $response->getData(true);

        $this->assertEquals('The name field is required.', $responseData['message']['name'][0]);
        $this->assertEquals('The email field is required.', $responseData['message']['email'][0]);
        $this->assertEquals('The password field is required.', $responseData['message']['password'][0]);

        $this->assertArrayHasKey('name', $responseData['message']);
        $this->assertArrayHasKey('email', $responseData['message']);
        $this->assertArrayHasKey('password', $responseData['message']);
    }

    /**
     *  @test
     */
    public function testRegisterValidationEmailTypeError()
    {

        $requestData = [
            'name' => 'Test User',
            'email' => 'invalidemail',
            'password' => 'password',
            'password_confirmation' => 'password'
        ];

        $request = new Request($requestData);

        $response = $this->authController->register($request);

        $this->assertEquals(Response::HTTP_UNPROCESSABLE_ENTITY, $response->getStatusCode());

        $responseData = $response->getData(true);

        $this->assertEquals('The email field must be a valid email address.', $responseData['message']['email'][0]);

        $this->assertArrayHasKey('email', $responseData['message']);
    }

    /**
     *  @test
     */
    public function testRegisterValidationEmailExistsError()
    {
        $user = User::factory()->create([
            'email' => 'test.user@payment.com',
            'password' => bcrypt('password'),
        ]);

        $requestData = [
            'name' => $user->name,
            'email' => $user->email,
            'password' => 'password',
            'password_confirmation' => 'password'
        ];

        $request = new Request($requestData);

        $response = $this->authController->register($request);

        $this->assertEquals(Response::HTTP_UNPROCESSABLE_ENTITY, $response->getStatusCode());

        $responseData = $response->getData(true);

        $this->assertEquals('The email has already been taken.', $responseData['message']['email'][0]);

        $this->assertArrayHasKey('email', $responseData['message']);
    }

    /**
     *  @test
     */
    public function testRegisterValidationPasswordAndConfirmPasswordDifferentError()
    {
        $requestData = [
            'name' => 'Test User',
            'email' => 'user.to.regitser@payments.com',
            'password' => 'password',
            'password_confirmation' => 'different_password'
        ];

        $request = new Request($requestData);

        $response = $this->authController->register($request);

        $this->assertEquals(Response::HTTP_UNPROCESSABLE_ENTITY, $response->getStatusCode());

        $responseData = $response->getData(true);

        $this->assertEquals('The password field confirmation does not match.', $responseData['message']['password'][0]);

        $this->assertArrayHasKey('password', $responseData['message']);
    }

    /**
     *  @test
     */
    public function testLoginSuccess()
    {
        $user = User::factory()->create();

        $response = $this->post('/api/login', [
            'email' =>  $user->email,
            'password' => 'password',
        ]);

        $response->assertStatus(Response::HTTP_OK)
            ->assertJson([
                'message' => 'Login successfully!',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email
                ],
                'token' => $response->original['token']
            ]);

        $this->assertAuthenticatedAs($user);
    }


    /**
     *  @test
     */
    public function testLoginValidationEmptyFieldsError()
    {

        $requestData = [
            'email' => '',
            'password' => '',
        ];

        $request = new Request($requestData);

        $response = $this->authController->login($request);

        $this->assertEquals(Response::HTTP_UNPROCESSABLE_ENTITY, $response->getStatusCode());

        $responseData = $response->getData(true);

        $this->assertEquals('The email field is required.', $responseData['message']['email'][0]);
        $this->assertEquals('The password field is required.', $responseData['message']['password'][0]);

        $this->assertArrayHasKey('email', $responseData['message']);
        $this->assertArrayHasKey('password', $responseData['message']);
    }

    /**
     *  @test
     */
    public function testLoginInvalidEmailTypeError()
    {

        $requestData = [
            'email' => 'invalid',
            'password' => 'invalid',
        ];

        $request = new Request($requestData);

        $response = $this->authController->login($request);

        $this->assertEquals(Response::HTTP_UNPROCESSABLE_ENTITY, $response->getStatusCode());

        $responseData = $response->getData(true);

        $this->assertEquals('The email field must be a valid email address.', $responseData['message']['email'][0]);
        $this->assertArrayHasKey('email', $responseData['message']);
    }

    /**
     *  @test
     */
    public function testLoginInvalidLoginOrPasswordError()
    {

        $requestData = [
            'email' => 'invalid@payments.com',
            'password' => 'invalid',
        ];

        $request = new Request($requestData);

        $response = $this->authController->login($request);

        $this->assertEquals(Response::HTTP_UNAUTHORIZED, $response->getStatusCode());

        $responseData = $response->getData(true);

        $this->assertEquals('Incorrect email or password.', $responseData['message']);
    }

    /**
     *  @test
     */
    public function testLogout()
    {

        $user = User::factory()->create();
        $token = $user->createToken('token')->plainTextToken;

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)->post('/api/logout');

        $response->assertStatus(Response::HTTP_OK)
            ->assertJson([
                'message' => 'Logout successful!'
            ]);

        $this->assertEmpty($user->tokens);
    }
}
