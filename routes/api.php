<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\TaskController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('get-user', function (Request $request) {
    return $request->user();
});

Route::post('login', [LoginController::class, 'login']);
Route::post('logout', [LoginController::class, 'logout']);
Route::post('register', [RegisterController::class, 'register']);
Route::middleware('auth:sanctum')->post('task', [TaskController::class, 'create']);
Route::middleware('auth:sanctum')->get('task', [TaskController::class, 'getAll']);
Route::middleware('auth:sanctum')->get('task/{id}', [TaskController::class, 'getOne']);
Route::middleware('auth:sanctum')->put('task/{id}', [TaskController::class, 'update']);