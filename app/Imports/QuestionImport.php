<?php

namespace App\Imports;

use App\Models\QuestionBank;
use Illuminate\Support\Facades\Hash;
use JsonException;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithProgressBar;

class QuestionImport implements ToModel, WithHeadingRow, WithProgressBar
{
    use Importable;

    /**
     * @throws JsonException
     */
    public function model(array $row)
    {
        $answers = [
            'a' => $row['answer_a'],
            'b' => $row['answer_b'],
            'c' => $row['answer_c'],
            'd' => $row['answer_d'],
            'e' => $row['answer_e']
        ];

        return QuestionBank::updateOrCreate(
            ['module_id' => 5, 'text' => $row['question']],
            [
                'module_id' => 5,
                'text' => $row['question'],
                'type' => $row['type'],
                'answers' => json_encode($answers, JSON_THROW_ON_ERROR),
                'correct_answer' => Hash::make($row['correct_answer']),
                'mark' => 1,
                'timed' => false,
                'time' => null
            ]
        );
    }
}
