<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Test>
 */
class TestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $russianFaker = \Faker\Factory::create('ru_RU');


        
        $questions = [];
        for ($i = 0; $i < rand(10, 30); $i++) {
            $options = [];
            $correctIndex = $russianFaker->numberBetween(0, 3);

            for ($j = 0; $j < 4; $j++) {
                $options[] = [
                    'id' => 'opt_' . $russianFaker->uuid(),
                    'text' => ucfirst($russianFaker->word()),
                    'isCorrect' => ($j === $correctIndex),
                ];
            }

            $questions[] = [
                'id' => 'q_' . $russianFaker->uuid(),
                'text' => rtrim($russianFaker->sentence(), '.') . '?',
                'options' => $options,
            ];
        }

        return [
            'title' => ucfirst($russianFaker->sentence(3)),
            'description' => $russianFaker->paragraph(),
            'content' => [
                'questions' => $questions,
            ],
            'questions_count' => count($questions),
            'user_id' => '1'
        ];
    }
}