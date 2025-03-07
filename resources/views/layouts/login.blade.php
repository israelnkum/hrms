<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Human Resource Management System') }}</title>

    <!-- Scripts -->
{{--    <script src="{{ asset('js/app.js') }}" defer></script>--}}

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'>
    <!-- Styles -->
{{--    <link href="{{ asset('css/app.css') }}" rel="stylesheet">--}}
    <!-- resources/views/layouts/app.blade.php -->
    @vite(['resources/js/app.tsx', 'resources/css/app.css'])

    <style>

        input{
            background: none !important;
            font-size: 15px !important;
        }

        input:hover,
        input:active,
        input:focus
        {
            box-shadow: none !important;
            outline: 0 !important;
            background: none !important;
        }
        ::placeholder {
            font-family: Montserrat, sans-serif !important;
        }
    </style>

</head>
<body style="background: #ffffff">
<div style="background-image: url({{asset('/images/login.jpg')}}); background-size: cover; background-position: center center">
    <main class="h-screen flex items-center justify-center">
        <div class="w-sm mx-auto">
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

                @if (session('status'))
                    <div class="alert alert-success" role="alert">
                        {{ session('status') }}
                    </div>
                @endif
            </div>
            <div class="bg-white p-4 shadow-sm border-0 rounded-md">
                <div align="center">
                    <img height="auto" align="center" width="150" alt="logo" src="{{asset('images/ttuLogo.png')
                            }}"/>
                </div>
                <div>
                    <div class="text-center mb-5">
                        <h4 class="title">SMART HR</h4>
                    </div>
                    <div class="card-body">
                        @yield('content')
                    </div>
                    <div class="text-center">
                        <small class="text-gray-500">SMART HR &copy; {{date('Y')}} - Powered by Directorate of ICT</small>
                    </div>
                </div>
            </div>
        </div>
    </main>
</div>
</body>
</html>
