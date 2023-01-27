<?php

namespace App\Http\Controllers;

use App\Models\User;
use Auth;
use Exception;
use Hash;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;
use Log;

class SocialAuthController
{
    /**
     * @return RedirectResponse
     */
    public function redirectToGoogle(): RedirectResponse
    {
        return Socialite::driver('google')->redirect();
    }

    /**
     * @return Exception|RedirectResponse
     */
    public function handleGoogleCallback(): Exception|RedirectResponse
    {
        try {
            $socialUser = Socialite::driver('google')->user();

            if (!$socialUser->token) {
                return back('Something went wrong');
            }

            $checkUser = User::where('email', $socialUser->email)->first();

            if (!$checkUser) {
                $user = User::create([
                    'name' => $socialUser->getName(),
                    'username' => $socialUser->getEmail(),
                    'email' => $socialUser->getEmail(),
                    'email_verified_at' => Carbon::now(),
                    'provider' => 'google',
                    'provider_id' => $socialUser->id,
                    'password' => Hash::make(Str::random(8))
                ]);

                $checkUser = $user;
            }

            Auth::login($checkUser);

            return redirect()->intended('home');
        } catch (Exception $exception) {
            Log::error($exception);

            return $exception;
        }
    }
}
