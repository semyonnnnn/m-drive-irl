<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
//////////////////////////////////////
use App\Http\Requests\TestRequest;
use App\Models\Test;

class TestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tests = Test::select(['id', 'title', 'description', 'user_id', 'questions_count', 'is_published', 'created_at'])
            ->latest()
            ->paginate(6);

        // Calculate descending serial numbers directly on the backend
        $tests->through(function ($test, $index) use ($tests) {
            $test->row_number = $tests->total() - (($tests->currentPage() - 1) * $tests->perPage() + $index);
            return $test;
        });

        return Inertia::render('Test/Index', [
            'tests' => $tests
        ]);
    }

    public function store(TestRequest $r)
    {
        $questions = $r->questions;

        Test::create([
            'title' => $r->title,
            'description' => $r->description,
            'content' => $questions,
            'questions_count' => count($questions), // Calculate and save
            'user_id' => Auth::id(),
        ]);

        return redirect()->route('tests.index')->with('success', "Тест успешно создан!");
    }

    public function destroy(int $id)
    {
        \App\Models\Test::destroy($id);
    }

    public function create()
    {
        return Inertia::render('Test/Create');
    }

    public function show(int $id)
    {
        $test = \App\Models\Test::findOrFail($id);

        return Inertia::render('Test/Item', [
            'test' => $test
        ]);
    }
}
