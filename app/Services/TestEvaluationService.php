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

        $totalValue = 0;
        $userValue = 0;

        foreach ($questions as $question) {
            $qId = $question['id'];
            $userSelectedOptId = $submittedAnswers[$qId] ?? null;

            $correctOption = collect($question['options'])->firstWhere('isCorrect', true);
            $userSelectedOption = collect($question['options'])->firstWhere('id', $userSelectedOptId);

            $isCorrect = $userSelectedOptId && $correctOption && $userSelectedOptId === $correctOption['id'];

            $totalValue += $question['value'] ?? 1;
            $userValue += $isCorrect ? ($question['value'] ?? 1) : 0;

            $results[$question['text']] = [
                'id' => $qId,
                'value' => $question['value'] ?? 1,
                'user_answer' => $userSelectedOption['text'] ?? null,
                'correct_answer' => $correctOption['text'] ?? null,
                'is_correct' => $isCorrect,
            ];
        }



        $percent = (int)ceil($userValue / $totalValue * 100);

        return array_merge($results, ['totalValue' => $totalValue, 'userValue' => $userValue, 'percent' => $percent]);
    }
}
