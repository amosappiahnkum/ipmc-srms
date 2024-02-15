@extends('layouts.login')
@section('content')
    <form method="POST" action="{{ route('login') }}">
        @csrf
        <div class="mb-2">
            <label for="username" class="sr-only">Email</label>
            <input id="username" placeholder="Enter your username" type="text"
                   class="border bg-transparent w-full"
                   name="username" value="{{ old('username') }}" required autocomplete="username" autofocus>
        </div>

        <div class="mb-2">
            <label for="password" class="sr-only">password</label>
            <input style="background: transparent !important;"
                   id="password" placeholder="Enter your password" type="password"
                   class="border bg-transparent w-full"
                   name="password" required autocomplete="current-password">
        </div>

        <div class="flex items-center justify-between w-full my-3 text-sm">
            <div class="flex items-center gap-x-1 cursor-pointer">
                <input type="checkbox" class="cursor-pointer" name="remember"
                       id="remember" {{ old('remember') ? 'checked' : '' }}>
                <label class="cursor-pointer" for="remember">{{ __('Remember Me') }}</label>
            </div>
            <div class="text-right">
                @if (Route::has('password.request'))
                    <a class="text-primary" href="{{ route('password.request') }}">
                        {{ __('Forgot Password?') }}
                    </a>
                @endif
            </div>
        </div>

        <div class="mb-3">
            <button type="submit" class="btn bg-red-500 w-full p-3 text-center text-white uppercase">
                {{ __('Login') }}
            </button>
        </div>
    </form>
@endsection
