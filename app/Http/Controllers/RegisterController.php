<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\RegisterRequest;
use \Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class RegisterController extends Controller
{
    // ユーザの新規登録
    public function register(RegisterRequest $request)
    {
        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        //ユーザの作成が完了するとjsonを返す
        $json = [
            'data' => $user,
            'message' => 'User registration success!',
            'error' => ''
        ];
        return response()->json($json, Response::HTTP_OK);
    }
}