<?php

namespace App\Console\Commands;

use App\Imports\EmployeeImport;
use Illuminate\Console\Command;

class ImportExcel extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'import:excel';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Laravel Excel Importer';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $items = [
            'applied_arts',
            'applied_sciences',
            'built',
            'business',
            'centre_for_languages',
            'engineering',
            'non_teaching_junior_staff',
            'non_teaching_senior_members',
            'non_teaching_senior_staff',
            'secondment_staff',
        ];

        $this->output->title('Starting import');

        foreach ($items as $item) {
            (new EmployeeImport)->withOutput($this->output)->import(public_path('data/' . $item . '.xlsx'));
        }

        $this->output->success('Import successful');
    }
}
