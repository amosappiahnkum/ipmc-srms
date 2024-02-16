@extends('layouts.login')
@section('header')
    <h3 class="text-3xl font-bold">Forgot Password!</h3>
    <p class="text-gray-500 text-sm">Enter your email to receive a reset link.</p>
@endsection
@section('content')
    <form method="POST" action="{{ route('password.email') }}">
        @csrf

        <div class="mb-3">
                <label for="email" class="sr-only">{{ __('E-Mail Address') }}</label>
                <input placeholder="Enter your email address" id="email" type="email"
                       class="border bg-transparent w-full @error('email') is-invalid @enderror"
                       name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>
        </div>

        <div class="form-group row mb-5">
            <div class="col-md-12">
                <button type="submit" class="btn bg-red-500 w-full p-3 text-center text-white uppercase">
                    {{ __('Reset Password') }}
                </button>
            </div>
        </div>

        <div class="mb-5 text-center">
            @if (Route::has('password.request'))
                <a class="" href="/">
                    {{ __('Login Here') }}
                </a>
            @endif
        </div>
    </form>
@endsection
