<?php

namespace App\Providers;

use App\Models\ContactDetail;
use App\Models\Employee;
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
        RateLimiter::for("login", function () {
            Limit::perMinute(5);
        });

        Relation::morphMap([
            'employee' => Employee::class,
            'contact_detail' => ContactDetail::class,
        ]);
    }
}
