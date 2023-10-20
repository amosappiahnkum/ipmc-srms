<?php

namespace App\Imports;

use App\Models\Duration;
use App\Models\Program;
use App\Models\Subjects;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithProgressBar;

class ImportModules implements ToModel, WithHeadingRow, WithProgressBar
{
    use Importable;

    public function model(array $row)
    {
        $duration = (new Duration)->firstOrCreate([
            'duration' => ucwords(strtolower($row['duration'])),
            'duration_type' => 'Weeks'
        ]);

        $program = Program::where('program_code', $row['program_code'])->first();

        if (!$program) {
            Log::info('eee', [$row['module_name']]);
        }
        return Subjects::updateOrCreate([
            'code' => $row['module_code']
        ], [
            'program_id' => $program->id,
            'name' => $row['module_name'],
            'duration_id' => $duration->id,
            'contact_hours' => 2,
            'year' => $program->year,
            'semester' => $row['sem'],
            'code' => $row['module_code'],
            'user_id' => 1
        ]);
    }
}
