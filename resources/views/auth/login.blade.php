@extends('layouts.login')
@section('content')
    <form method="POST" action="{{ route('login') }}">
        @csrf
        <div class="form-group row">
            <div class="col-md-12 mb-2">
                <div class="input-group">
                    <label for="username" class="sr-only">Email</label>
                    <input id="username"
                           placeholder="Enter your email" type="text" class="auth-input"
                           name="username" value="{{ old('username') }}" required autocomplete="username" autofocus>
                </div>
            </div>

            <div class="mb-2">
                <label for="password" class="sr-only">password</label>
                <input id="password"
                       class="auth-input"
                       placeholder="Enter your password"
                       type="password" name="password" required
                       autocomplete="current-password">
            </div>
        </div>

        <div class="flex items-center justify-between text-sm py-3 text-gray-500">
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" name="remember"
                       id="remember" {{ old('remember') ? 'checked' : '' }}>
                <label class="custom-control-label" for="remember">{{ __('Remember Me') }}</label>
            </div>
            <div class="text-right">
                @if (Route::has('password.request'))
                    <a target="_blank" class="text-primary" href="https://forms.gle/MJnWgTh24Lmex5iy5">
                        {{ __('Forgot Password?') }}
                    </a>
                    {{--<a class="text-primary" href="{{ route('password.request') }}">
                        {{ __('Forgot Password?') }}
                    </a>--}}
                @endif
            </div>
        </div>

        <div class="form-group row mb-0">
            <div class="col-md-12 mb-3">
                <button type="submit" class="btn btn-primary btn-lg btn-block">
                    {{ __('Login') }}
                </button>
            </div>

            <div class="col-md-12 py-1">
                <a href="{{ url('auth/google/redirect') }}" class="text-decoration-none">
                    <button type="button" class="btn btn-light">
                        <img width="20" src="{{asset('assets/img/google.svg')}}" class="mr-2" alt="icon">
                        {{ __('Login with Google') }}
                    </button>
                </a>
            </div>
        </div>
    </form>
@endsection
