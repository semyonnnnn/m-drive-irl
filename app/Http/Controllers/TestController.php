<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
/////////////////////////////////////////////
use App\Http\Requests\Test\TestStoreRequest;
use App\Http\Requests\Test\TestUpdateRequest;
use App\Models\Test;
use App\Models\TestAttempt;

class TestController extends Controller
{
    public function index(Request $request)
    {
        $userId = Auth::id();
        $activeTab = $request->query('tab', 'available'); // defaults to 'available' if not specified

        return Inertia::render('Test/Index', [
            'active_tab' => $activeTab,

            'available_tests' => $activeTab === 'available'
                ? $this->getAvailableTests($userId)
                : Inertia::lazy(fn() => $this->getAvailableTests($userId)),

            'my_tests' => $activeTab === 'my'
                ? $this->getMyTests($userId)
                : Inertia::lazy(fn() => $this->getMyTests($userId)),

            'passed_tests' => $activeTab === 'passed'
                ? $this->getPassedTests($userId)
                : Inertia::lazy(fn() => $this->getPassedTests($userId)),

            'current_user_id' => $userId,
        ]);
    }

    private function getAvailableTests(int $userId)
    {
        return Test::select(['id', 'title', 'description', 'user_id', 'questions_count', 'created_at'])
            ->where('user_id', '!=', $userId)
            ->whereDoesntHave('passedUsers', fn($q) => $q->where('user_id', $userId))
            ->latest()
            ->orderBy('id', 'desc')
            ->paginate(6, ['*'], 'available_page');
    }

    private function getMyTests(int $userId)
    {
        return Test::select(['id', 'title', 'description', 'user_id', 'questions_count', 'created_at'])
            ->where('user_id', $userId)
            ->latest()
            ->orderBy('id', 'desc')
            ->paginate(6, ['*'], 'my_page');
    }

    private function getPassedTests(int $userId)
    {
        return Test::select(['id', 'title', 'description', 'user_id', 'questions_count', 'created_at'])
            ->where('user_id', '!=', $userId)
            ->whereHas('testAttempts', function ($q) use ($userId) {
                $q->where('user_id', $userId)
                    ->where('has_passed', true);
            })
            ->latest()
            ->orderBy('id', 'desc')
            ->paginate(6, ['*'], 'passed_page');
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

        return redirect()->route('tests.index')->with('success', "Тест '$r->title' успешно создан!");
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
        // dd($content);

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
}
