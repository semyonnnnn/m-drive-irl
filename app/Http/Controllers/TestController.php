<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\TestRequest;
use App\Models\Test;

class TestController extends Controller
{
    public function index()
    {
        $userId = Auth::id();

        // 1. Tests created by the authenticated user
        $my_tests = Test::select(['id', 'title', 'description', 'user_id', 'questions_count', 'created_at'])
            ->where('user_id', $userId)
            ->latest()
            ->orderBy('id', 'desc')
            ->paginate(6, ['*'], 'my_page'); // Custom paginator page name if needed

        // 2. Available tests (not created by user, and not yet passed)
        $available_tests = Test::select(['id', 'title', 'description', 'user_id', 'questions_count', 'created_at'])
            ->where('user_id', '!=', $userId)
            ->whereDoesntHave('passedUsers', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })
            ->latest()
            ->orderBy('id', 'desc')
            ->paginate(6, ['*'], 'available_page');

        // 3. Passed tests (not created by user, but already passed)
        $passed_tests = Test::select(['id', 'title', 'description', 'user_id', 'questions_count', 'created_at'])
            ->where('user_id', '!=', $userId)
            ->whereHas('passedUsers', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })
            ->latest()
            ->orderBy('id', 'desc')
            ->paginate(6, ['*'], 'passed_page');

        return Inertia::render('Test/Index', [
            'my_tests' => $my_tests,
            'available_tests' => $available_tests,
            'passed_tests' => $passed_tests
        ]);
    }

    public function store(TestRequest $r)
    {
        $questions = $r->questions;

        Test::create([
            'title' => $r->title,
            'description' => $r->description,
            'content' => $questions,
            'questions_count' => count($questions),
            'user_id' => Auth::id(),
        ]);

        return redirect()->route('tests.index')->with('success', "Тест успешно создан!");
    }

    public function destroy(int $id)
    {
        Test::destroy($id);
    }

    public function create()
    {
        return Inertia::render('Test/Create');
    }

    public function show(int $id)
    {
        $test = Test::findOrFail($id);

        return Inertia::render('Test/Item', [
            'test' => $test
        ]);
    }
}
