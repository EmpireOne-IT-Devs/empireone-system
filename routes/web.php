<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('auth/login/page');
});

Route::get('/auth/register', function () {
    return Inertia::render('auth/register/page');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/administrator/dashboard', function () {
        return Inertia::render('administrator/dashboard/page');
    })->name('dashboard');
    Route::get('/administrator/users', function () {
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
