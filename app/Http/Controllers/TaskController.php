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
            $tasks = Task::where('userId', '=', Auth::id())->get();
            $resultTask = array(
                'Jan' => array(),
                'Feb' => array(),
                'Mar' => array(),
                'Apr' => array(),
                'May' => array(),
                'Jun' => array(),
                'Jul' => array(),
                'Aug' => array(),
                'Sep' => array(),
                'Oct' => array(),
                'Nov' => array(),
                'Dec' => array(),
            );
            // タスクを月毎に分別する
            foreach ($tasks as $task) {
                switch ($task['month']) {
                    case 1:
                        array_push($resultTask['Jan'], $task);
                        break;
                    case 2:
                        array_push($resultTask['Feb'], $task);
                        break;
                    case 3:
                        array_push($resultTask['Mar'], $task);
                        break;
                    case 4:
                        array_push($resultTask['Apr'], $task);
                        break;
                    case 5:
                        array_push($resultTask['May'], $task);
                        break;
                    case 6:
                        array_push($resultTask['Jun'], $task);
                        break;
                    case 7:
                        array_push($resultTask['Jul'], $task);
                        break;
                    case 8:
                        array_push($resultTask['Aug'], $task);
                        break;
                    case 9:
                        array_push($resultTask['Sep'], $task);
                        break;
                    case 10:
                        array_push($resultTask['Oct'], $task);
                        break;
                    case 11:
                        array_push($resultTask['Nov'], $task);
                        break;
                    case 12:
                        array_push($resultTask['Dec'], $task);
                        break;
                }
            }
            return response()->json($resultTask, Response::HTTP_OK);
        } catch (Exception $e) {
            return response()->json($e, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // タスクを1つ取得
    public function getOne($id)
    {
        try {
            $task = Task::find($id);
            return response()->json($task, Response::HTTP_OK);
        } catch (Exception $e) {
            return response()->json($e, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // タスクを1つ更新
    public function update(Request $request, $id)
    {
        try {
            // 作業前のタスクを更新
            if ($request->timing === 'before') {
                $task = Task::where('id', $id)->update([
                    'month' => $request->month,
                    'day' => $request->day,
                    'scheduleBefore' => $request->scheduleBefore,
                    'remaingTaskBefore' => $request->remaingBefore,
                    'remaingTaskAfter' => $request->remaingAfter ?? $request->remaingBefore,
                    'content' => $request->content ?? $request->scheduleBefore
                ]);
            }
            // 作業後のタスクを更新
            if ($request->timing === 'after') {
                $task = Task::where('id', $id)->update([
                    'month' => $request->month,
                    'day' => $request->day,
                    'scheduleAfter' => $request->scheduleAfter,
                    'remaingTaskAfter' => $request->remaingAfter,
                    'content' => $request->content,
                    'impression' => $request->impression
                ]);
            }
            return response()->json($task, Response::HTTP_OK);
        } catch (Exception $e) {
            return response()->json($e, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}