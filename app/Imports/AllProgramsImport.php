<?php

namespace App\Imports;

use App\Models\AllPrograms;
use App\Models\Duration;
use App\Models\Program;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithProgressBar;

class AllProgramsImport implements ToModel, WithHeadingRow, WithProgressBar
{
    use Importable;

    /**
    * @param array $row
    */
    public function model(array $row)
    {
        $duration = (new Duration)->firstOrCreate([
            'duration' => ucwords(strtolower($row['duration'])),
            'duration_type' => ucwords(strtolower($row['duration_type']))
        ]);

        $allProgram = AllPrograms::updateOrCreate([
            'name' => $row['name']
        ], [
            'name' => $row['name'],
            'fee' => $row['fee'],
            'registration_fee' => $row['registration_fee'],
            'total_fee' => $row['fee'] + $row['registration_fee'],
            'type' => $row['type'],
            'installments' => $row['installments'],
        ]);

        $program = Program::updateOrCreate( [
            'all_programs_id' => $allProgram->id,
            'duration_id' => $duration->id,
            'year' => $row['yearlevel'],
        ]);
    }
}
