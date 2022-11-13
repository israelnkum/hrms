@extends('layouts.login')
@section('content')
    <div class="container-fluid" style="background-image: url({{asset('/images/login.jpg')}}); background-size: cover; background-position: center center">
        <div class="row justify-content-center align-items-center " style="height: 100vh">
            <div class="text-center position-absolute" style="top: 20px;">
                @if(count($errors) > 0)
                    @foreach( $errors->all() as $message )
                        <div class="alert bg-danger text-white alert-dismissible">
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <span>{{ $message }}</span>
                        </div>
                    @endforeach
                @endif
            </div>
            <div class="col-md-4 text-center">
                <div class="card login-body p-4 shadow-sm border-0">
                    <div align="center">
                        <img height="auto" align="center" width="100" alt="logo" src="{{asset('images/ttuLogo.png')}}"/>
                    </div>
                    <div>
                        <div class="">
                            <h4 class="title">SMART HR</h4>
                        </div>
                        <div class="card-body">
                            <form method="POST" action="{{ route('login') }}">
                                @csrf
                                <div class="form-group row">
                                    <div class="col-md-12 mb-2">
                                        <div class="input-group">
                                            <label for="username" class="sr-only">Email</label>
                                            <div class="input-group-prepend">
                                                <span class="input-group-text addon" id="basic-addon1">
                                                    <i class="fa fa-envelope"></i>
                                                </span>
                                            </div>
                                            <input id="username" placeholder="Enter your email" type="text" class="form-control form-control-lg" name="username" value="{{ old('username') }}" required autocomplete="username" autofocus>
                                            <div class="invalid-feedback text-right mb-0">
                                                Required
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="input-group mb-2">
                                            <label for="password" class="sr-only">password</label>
                                            <div class="input-group-prepend">
                                                <span class="input-group-text addon" id="basic-addon1">
                                                    <i class="fa fa-lock" style="font-size: 22px"></i>
                                                </span>
                                            </div>
                                            <input id="password"  placeholder="Enter your password" type="password" class="form-control form-control-lg" name="password" required autocomplete="current-password">
                                            <div class="invalid-feedback text-right mb-0">
                                                Required
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <div class="col-md-6 text-left">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>
                                            <label class="custom-control-label" for="remember">{{ __('Remember Me') }}</label>
                                        </div>
                                    </div>
                                    <div class="col-md-6 text-right">
                                        @if (Route::has('password.request'))
                                            <a class="" href="{{ route('password.request') }}">
                                                {{ __('Forgot Password?') }}
                                            </a>
                                        @endif
                                    </div>
                                </div>

                                <div class="form-group row mb-0">
                                    <div class="col-md-12">
                                        <button type="submit" class="btn btn-primary btn-lg btn-block">
                                            {{ __('Login') }}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="text-center">
                            <p>SMART HR &copy; {{date('Y')}} - Powered by TPConnect</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
