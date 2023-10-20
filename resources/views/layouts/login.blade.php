<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Student Resource Management System') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'>
    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <style>
        button {
            border-radius: 0 !important;
            border: none !important;
        }

        input {
            border-radius: 0 !important;
            background: none !important;
            font-size: 15px !important;
        }

        /* Change the white to any color */
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 30px rgba(213, 195, 185, 0) inset !important;
        }

        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
            transition: background-color 5000s ease-in-out 0s;
        }

        input:hover,
        input:active,
        input:focus {
            box-shadow: none !important;
            outline: 0 !important;
            background: transparent !important;
        }

        ::placeholder {
            font-family: Montserrat, sans-serif !important;
        }

        .login-body {
            border-radius: 10px;
        }
    </style>
    <link href="{{ asset('css/fontawesome.min.css') }}" rel="stylesheet">

</head>
<body style="background: #ffffff">
<div
    style="background-image: url({{asset('/images/login.jpg')}}); background-size: cover; background-position: center center">
    <main>
        <div class="container-fluid">
            <div class="relative">
                <a class="btn btn-outline-dark absolute" style="top: 20px; right: 30px" href="{{ route('make-enquiry') }}" target="_blank">Make Enquiry</a>
            </div>
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

                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif
                </div>
                <div class="col-md-4 text-center">
                    <div class="login-body shadow-md p-4 bg-white">
                        <img height="auto" class="mx-auto" width="100" alt="logo" src="{{asset('images/logo.png')}}"/>
                        <div>
                            <div class="card-body">
                                @yield('content')
                            </div>
                            <div class="text-center">
                                <p>&copy; {{date('Y')}} - Powered by TechLineAfrica</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</div>
</body>
</html>
