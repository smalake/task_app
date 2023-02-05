<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \Symfony\Component\HttpFoundation\Response;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;
use Exception;

class TaskController extends Controller
{
    // タスクの新規作成
    public function create(Request $request)
    {
        try {
            // 新規作成
            $task = Task::create([
                'userId' => Auth::id(),
                'month' => date('n'),
                'day' => date('j'),
                'content' => '',
                'scheduleBefore' => '',
                'scheduleAfter' => '',
                'remaingTaskBefore' => '',
                'remaingTaskAfter' => '',
                'impression' => ''
            ]);
            return response()->json($task, Response::HTTP_OK);
        } catch (Exception $e) {
            return response()->json($e, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // タスクを全て取得
    public function getAll()
    {
        try {
            // ログイン中のユーザのメモを全て取得
            $task = Task::where('userId', '=', Auth::id())->get();
            return response()->json($task, Response::HTTP_OK);
        } catch (Exception $e) {
            return response()->json($e, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}