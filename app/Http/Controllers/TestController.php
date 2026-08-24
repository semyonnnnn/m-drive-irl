<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
/////////////////////////////////////////////
use App\Http\Requests\Test\TestStoreRequest;
use App\Http\Requests\Test\TestUpdateRequest;
use App\Http\Requests\Test\TestAttemptRequest;
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
            'passed_tests' => $passed_tests,
            'current_user_id' => $userId
        ]);
    }

    public function store(TestStoreRequest $r)
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
        $test = Test::find($id);
        $name = $test['title'];

        if ($test->user_id !== Auth::id()) {
            abort(403, 'You are not authorized to delete this test.');
        }

        Test::destroy($id);
        return back()->with('success', "Тест '$name' успешно удалён!");
    }

    public function create()
    {
        return Inertia::render('Test/Create');
    }

    public function show(int $id)
    {
        $test = Test::findOrFail($id);

        return Inertia::render('Test/Show', [
            'test' => $test
        ]);
    }

    public function edit(int $id)
    {
        $test = Test::findOrFail($id);

        $content = is_string($test->content) ? json_decode($test->content, true) : $test->content;

        $testData = [
            'id' => $test->id,
            'title' => $test->title,
            'description' => $test->description,
            'questions' => $content,
        ];

        return Inertia::render('Test/Edit', [
            'test' => $testData
        ]);
    }

    //TestUpdateRequest
    public function update(TestUpdateRequest $r)
    {
        $data = $r->validated();
        $test = Test::find($r->id);
        $test_name = $test['title'];

        // Prepare the data for update
        $updateData = [
            'title' => $data['title'],
            'description' => $data['description'],
            'content' => $data['questions'], // Laravel will automatically cast to JSON
            'questions_count' => count($data['questions']),
            'is_published' => $data['is_published'] ?? $test->is_published,
        ];

        $test->update($updateData);

        return redirect()->route('tests.index')->with('success', "Тест '$test_name' успешно обновлён!");
    }

    public function attempt(TestAttemptRequest $r)
    {
        $test = Test::findOrFail($r->input('id'));
        $questions = is_string($test->content) ? json_decode($test->content, true) : $test->content;

        $submittedAnswers = $r->input('answers', []);
        $results = [];

        foreach ($questions as $question) {
            $qId = $question['id'];
            $userSelectedOptId = $submittedAnswers[$qId] ?? null;

            $correctOption = collect($question['options'])->firstWhere('isCorrect', true);
            $userSelectedOption = collect($question['options'])->firstWhere('id', $userSelectedOptId);

            $isCorrect = $userSelectedOptId && $correctOption && $userSelectedOptId === $correctOption['id'];

            $results[$question['text']] = [
                'user_answer' => $userSelectedOption['text'] ?? null,
                'correct_answer' => $correctOption['text'] ?? null,
                'is_correct' => $isCorrect,
            ];
        }

        dd([
            'test_title' => $test->title,
            'evaluation' => $results,
        ]);
    }
}
