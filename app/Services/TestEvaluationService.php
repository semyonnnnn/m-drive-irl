<?php

namespace App\Services;

use App\Models\Test;
use App\Http\Requests\Test\TestAttemptRequest;

class TestEvaluationService
{
    public function evaluate(TestAttemptRequest $r, Test $test)
    {
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

        return $results;
    }
    
}