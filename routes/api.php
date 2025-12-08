<?php

use App\Http\Controllers\RaffleParticipantController;
use App\Http\Controllers\RaffleWinnerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



Route::resource('participants', RaffleParticipantController::class);
Route::resource('winners', RaffleWinnerController::class);