<?php

namespace App\Imports;

use App\Models\Duration;
use App\Models\Program;
use App\Models\Module;
use App\Models\ProgramModule;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithProgressBar;

class ImportModules implements ToModel, WithHeadingRow, WithProgressBar
{
    use Importable;

    public function model(array $row): void
    {
        $duration = (new Duration)->firstOrCreate([
            'duration' => ucwords(strtolower($row['duration'])),
            'duration_type' => 'Weeks'
        ]);

        $program = Program::where('program_code', $row['program_code'])->first();

        $module = Module::updateOrCreate([
            'code' => $row['module_code']
        ], [
            'name' => $row['module_name'],
            'code' => $row['module_code'],
            'user_id' => 1
        ]);

        ProgramModule::updateOrCreate([
            'module_id' => $module->id,
            'program_id' => $program->id,
            'year' => $program->year,
        ],[
            'program_id' => $program->id,
            'duration_id' => $duration->id,
            'contact_hours' => 2,
            'year' => $program->year,
            'semester' => $row['sem'],
            'user_id' => 1
        ]);

        if ($row['level_code']) {
            $level = Program::query()->where('program_code', $row['level_code'])->firstOrFail();

            ProgramModule::updateOrCreate([
                'module_id' => $module->id,
                'program_id' => $program->id,
                'year' => $level->year,
            ],[
                'program_id' => $level->id,
                'duration_id' => $duration->id,
                'contact_hours' => 2,
                'year' => $level->year,
                'semester' => null,
                'user_id' => 1
            ]);
        }
    }
}
