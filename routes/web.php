<?php

use App\Http\Controllers\PublicPageController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/debug/{path?}', [PublicPageController::class, 'debug'])
    ->where('path','.*');

Route::get('/enquiry/{path?}', [PublicPageController::class, 'index'])
    ->where('path','.*');

Route::middleware(['auth'])->get('/{path?}', function () {
    return view('home');
})->where('path', '.*')->name('home');
