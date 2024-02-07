<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Student Resource Management System') }}</title>

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
            padding: 10px 20px;
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
            font-family: Poppins, sans-serif !important;
        }
    </style>
</head>
<body>
<div style="background-image: url({{asset('/images/login.jpg')}});
    background-size: cover; background-position: left center">
    <main>
        <div class="container-fluid">
            <div class="relative">
                <a class="border broder-black p-3 rounded-lg absolute" style="top: 20px; right: 30px"
                   href="{{ route('make-enquiry') }}" target="_blank">Make Enquiry</a>
            </div>
            <div>
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
                <div class="grid grid-cols-2 h-screen">
                    <div class="text-center flex flex-col items-center justify-center">

                    </div>
                    <div class="text-center bg-white flex items-center justify-center">
                        <div class="p-4">
                            <div class="mb-5">
                                <img height="auto" class="mx-auto mb-5" width="100" alt="logo"
                                     src="{{asset('images/logo.png')}}"/>

                                <h3 class="text-3xl font-bold">Welcome!</h3>
                                <p class="text-gray-500 text-sm">Enter your credential to access your Portal.</p>
                            </div>
                            <div>
                                @yield('content')
                                <div class="text-center">
                                    <small>&copy; {{date('Y')}} - Powered by TechLineAfrica</small>
                                </div>
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
