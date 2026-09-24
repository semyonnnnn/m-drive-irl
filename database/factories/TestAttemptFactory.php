<?php

namespace Database\Factories;

use App\Models\Test;
use App\Models\User;
use App\Models\TestAttempt;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TestAttempt>
 */
class TestAttemptFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $percent = fake()->numberBetween(0, 100);

        $grade = match (true) {
            $percent >= 85 => 5,
            $percent >= 70 => 4,
            $percent >= 50 => 3,
            $percent >= 30 => 2,
            default => 1,
        };

        return [
            'user_id' => User::factory(),
            'test_id' => Test::factory(),
            'attempt' => 1,
            'has_passed' => $percent >= 50,
            'content' => [
                [
                    'question_text' => fake()->sentence() . '?',
                    'user_answer' => fake()->word(),
                    'correct_answer' => fake()->word(),
                    'is_correct' => $percent >= 50,
                    'point_value' => 1,
                ],
            ],
            'percent' => $percent,
            'grade' => $grade,
        ];
    }

    /**
     * Automatically assign a random existing test and compute the next valid attempt number.
     */
    public function forRandomExistingTest(User|int $user): static
    {
        $userId = $user instanceof User ? $user->id : $user;

        // Fetch a random test ID that actually exists in the database
        $testId = Test::inRandomOrder()->value('id');

        if (!$testId) {
            throw new \Exception("Cannot create test attempt: No tests found in the database.");
        }

        // Find the current highest attempt for this specific user/test pair
        $latestAttempt = TestAttempt::where('user_id', $userId)
            ->where('test_id', $testId)
            ->max('attempt') ?? 0;

        $nextAttempt = $latestAttempt + 1;

        if ($nextAttempt > 3) {
            // If this test already has 3 attempts, recurse to find a different test
            return $this->forRandomExistingTest($userId);
        }

        return $this->state(fn(array $attributes) => [
            'user_id' => $userId,
            'test_id' => $testId,
            'attempt' => $nextAttempt,
        ]);
    }
}
