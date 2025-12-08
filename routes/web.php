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
    Route::get('/administrator/dashboard', function () {
        return Inertia::render('administrator/dashboard/page');
    })->name('dashboard');
    Route::get('/administrator/users/users1', function () {
        return Inertia::render('administrator/users/page');
    });
    Route::get('/administrator/users/create', function () {
        return Inertia::render('administrator/users/page');
    });
    Route::get('/administrator/departments/departments1', function () {
        return Inertia::render('administrator/users/page');
    });
    Route::get('/administrator/departments/create', function () {
        return Inertia::render('administrator/users/page');
    });
});

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('dashboard');
//     })->name('dashboard');
// });



require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
