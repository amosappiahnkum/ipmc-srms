<?php

namespace App\Providers;

use App\Models\ContactDetail;
use App\Models\Dependant;
use App\Models\Education;
use App\Models\EmergencyContact;
use App\Models\Employee;
use App\Models\JobDetail;
use App\Models\NextOfKin;
use App\Models\Photo;
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
            'Employee' => Employee::class,
            'ContactDetail' => ContactDetail::class,
            'NextOfKin' => NextOfKin::class,
            'EmergencyContact' => EmergencyContact::class,
            'Dependant' => Dependant::class,
            'Education' => Education::class,
            'Photo' => Photo::class,
            'JobDetail' => JobDetail::class,
        ]);
    }
}
