@extends('layouts.login')
@section('header')
    <h3 class="text-3xl font-bold">Reset your password!</h3>
    <p class="text-gray-500 text-sm">Enter your credential to access your Portal.</p>
@endsection
@section('content')
    <form method="POST" action="{{ route('password.update') }}">
        @csrf

        <input type="hidden" name="token" value="{{ $token }}">

        <div class="text-left mb-3">
            <label for="email" class="">{{ __('E-Mail Address') }}</label>

            <div>
                <input id="email" type="email"
                       class="border !bg-gray-100 hover:!bg-gray-100 w-full @error('email') is-invalid @enderror"
                       name="email"
                       value="{{ $email ?? old('email') }}" required autocomplete="email" autofocus>

                @error('email')
                <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                @enderror
            </div>
        </div>

        <div class="text-left mb-3">
            <label for="password">{{ __('Password') }}</label>

            <div>
                <input id="password" type="password"
                       class="border bg-transparent w-full @error('password') is-invalid @enderror" name="password"
                       required autocomplete="new-password">

                @error('password')
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                @enderror
            </div>
        </div>

        <div class="text-left mb-3">
            <label for="password-confirm">{{ __('Confirm Password') }}</label>
            <div>
                <input id="password-confirm" type="password" class="border bg-transparent w-full"
                       name="password_confirmation" required autocomplete="new-password">
            </div>
        </div>

        <div class="form-group row mb-0">
            <div class="col-md-6 offset-md-4">
                <button type="submit" class="btn bg-red-500 w-full p-3 text-center text-white uppercase">
                    {{ __('Reset Password') }}
                </button>
            </div>
        </div>
    </form>
@endsection
