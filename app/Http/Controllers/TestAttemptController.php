<?php

namespace App\Http\Controllers;

use App\Models\TestAttempt;
use Illuminate\Http\Request;
use App\Http\Requests\Test\TestAttemptRequest;
use App\Services\TestEvaluationService;
use App\Models\Test;

class TestAttemptController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TestAttemptRequest $r, TestEvaluationService $evaluator)
    {
        $test = Test::findOrFail($r->input('id'));
        $results = $evaluator->evaluate($r, $test);

        dd([
            'test_title' => $test->title,
            'evaluation' => $results,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(TestAttempt $testAttempt)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TestAttempt $testAttempt)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TestAttempt $testAttempt)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TestAttempt $testAttempt)
    {
        //
    }
}
