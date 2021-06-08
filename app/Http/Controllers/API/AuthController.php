<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request) {
        $credentials = $request->validate([
            'name' => 'required|string|min:5',
            'password' => 'required|min:8',
        ]);

        $remember_me = $request->boolean('rememberMe', false);

        if (!Auth::attempt($credentials, $remember_me)) {
            return response('Authentication failed', 401);
        }

        return Auth::user()->createToken("authToken")->accessToken;
    }

    public function register(Request $request) {
        $credentials = $request->validate([
            'email' => 'required|string|email',
            'name' => 'required|string|min:5',
            'password' => 'required|min:8',
        ]);

        $credentials['password'] = bcrypt($credentials['password']);

        $user = User::create($credentials);

        return response(['user' => $user, 'token' => $user->createToken("authToken")->accessToken], 200);
    }

    public function logout(Request $request) {
        Auth::user()->token()->revoke();
        return response("logged out", 200);
    }
}
