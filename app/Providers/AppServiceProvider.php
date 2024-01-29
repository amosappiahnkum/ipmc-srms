<?php

namespace App\Providers;

use App\Models\RegularExam;
use App\Models\ResitExam;
use App\Models\Staff;
use App\Models\Student;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot(): void
    {
        JsonResource::withoutWrapping();
        RateLimiter::for("login", static function () {
            Limit::perMinute(5);
        });

        Relation::morphMap([
            'Staff' => Staff::class,
            'Student' => Student::class,
            'Resit' => ResitExam::class,
            'Regular' => RegularExam::class,
        ]);
    }
}
