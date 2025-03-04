<?php

namespace App\Http\Controllers\Api;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\LoginRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(LoginRequest $request): JsonResponse
    {
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $tokenName = $request->device_name ?? $request->userAgent() ?? 'api-token';
        $token = $user->createToken($tokenName)->plainTextToken;

        return response()->json([
            ...Helper::getUserAuthInfo($user),
            "token" => $token,
        ]);
    }

    public function logout()
    {
        auth()->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Token revoked successfully'
        ]);
    }

    public function me()
    {
        return response()->json(auth()->user());
    }

    public function tokens()
    {
        return response()->json([
            'tokens' => auth()->user()->tokens
        ]);
    }

    public function revokeToken(string $tokenId)
    {
        auth()->user()->tokens()->where('id', $tokenId)->delete();

        return response()->json([
            'message' => 'Token revoked successfully'
        ]);
    }

    public function revokeAllTokens()
    {
        auth()->user()->tokens()->delete();

        return response()->json([
            'message' => 'All tokens revoked successfully'
        ]);
    }
}
