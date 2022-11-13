<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Human Resource Management System') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'>
    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <style>
        button{
            border-radius: 10px !important;
            border: none !important;
        }

        input{
            border-top-left-radius: 0 !important;
            border-bottom-left-radius: 0 !important;
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
        .login-body {
            border-radius: 10px;
        }
        .addon {
            color: #3490dc !important;
            background: transparent;
            font-size: 15px !important;
            text-align: center !important;
            width: 45px !important;
            border-top-left-radius: 10px !important;
            border-bottom-left-radius: 10px !important;

        }
    </style>
    <link href="{{ asset('css/fontawesome.min.css') }}" rel="stylesheet">

</head>
<body style="background: #ffffff">
    <div style="background: #ffffff">
        <main class="">
            @yield('content')
        </main>
    </div>
</body>
</html>
