<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('auth/login/page');
});

Route::get('/auth/register', function () {
    return Inertia::render('auth/register/page');
});


Route::prefix('raffle')->group(function () {
    Route::get('/draw', function () {
        return Inertia::render('raffle/draw/page');
    });
    Route::get('/home', function () {
        return Inertia::render('raffle/home/page');
    });
    Route::get('/registration', function () {
        return Inertia::render('raffle/registration/page');
    });
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('administrator')->group(function () {
        Route::get('dashboard', function () {
            return Inertia::render('administrator/dashboard/page');
        })->name('dashboard');

        Route::prefix('engagement')->group(function () {
            Route::get('raffle', function () {
                return Inertia::render('administrator/engagement/raffle/page');
            });
            Route::get('raffle/{id}', function () {
                return Inertia::render('administrator/engagement/raffle/id/page');
            });
            Route::prefix('raffle/{id}')->group(function () {
                Route::get('/home', function () {
                    return Inertia::render('administrator/engagement/raffle/portal/home/page');
                });
                Route::get('/draw', function () {
                    return Inertia::render('administrator/engagement/raffle/portal/draw/page');
                });
                Route::get('/registration', function () {
                    return Inertia::render('administrator/engagement/raffle/portal/registration/page');
                });
            });
        });

        Route::get('users/users1', function () {
            return Inertia::render('administrator/users/page');
        });
        Route::get('users/create', function () {
            return Inertia::render('administrator/users/page');
        });
        Route::get('departments/departments1', function () {
            return Inertia::render('administrator/users/page');
        });
        Route::get('departments/create', function () {
            return Inertia::render('administrator/users/page');
        });
    });
});

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('dashboard');
//     })->name('dashboard');
// });



require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
