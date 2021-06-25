<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function today(Request $request)
    {
        return Auth::user()->tasks()
            ->whereDate('deadline', Carbon::today())
            ->get();
    }

    public function week(Request $request)
    {
        return Auth::user()->tasks()
            ->whereDate('deadline', '>=', Carbon::today())
            ->whereDate('deadline', '<=', Carbon::today()->addWeek())
            ->get();
    }

    public function month(Request $request)
    {
        return Auth::user()->tasks()
            ->whereDate('deadline', '>=', Carbon::today())
            ->whereDate('deadline', '<=', Carbon::today()->addMonth())
            ->get();
    }

    public function year(Request $request)
    {
        return Auth::user()->tasks()
            ->whereDate('deadline', '>=', Carbon::today())
            ->whereDate('deadline', '<=', Carbon::today()->addYear())
            ->get();
    }

    public function index(Request $request)
    {
        return Auth::user()->tasks()->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'priority' => 'required|integer|min:1|max:5',
            'deadline' => 'required|date',
            'project_id' => 'required|integer',
        ]);

        $data['user_id'] = Auth::user()->id;
        $data['is_complete'] = false;
        Task::create($data);
    }

    public function show($id)
    {
        return Auth::user()->tasks()
                ->where('id', $id)
                ->first() ?? response('Not found', 404);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'title' => 'string',
            'description' => 'string',
            'priority' => 'integer',
            'deadline' => 'date',
            'is_complete' => 'boolean',
        ]);

        $task = Auth::user()->tasks()->where('id', $id)->first();
        if ($task == null)
            return response('', 404);

        $task->fill($data);
        $task->save();
    }

    public function destroy($id)
    {
        return Auth::user()->tasks()
            ->where('id', $id)
            ->delete() ? response('', 200) : response('', 404);
    }
}
