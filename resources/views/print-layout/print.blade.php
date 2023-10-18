<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'IPMC - SRMS') }}</title>
    <style>
        body, html, table, th, td, p {
            font-family: Arial, sans-serif;
        }
    </style>
</head>
<body>
@yield('print-content')
</body>
</html>
