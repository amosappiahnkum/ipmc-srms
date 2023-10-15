<?php

namespace App\Console\Commands;

use App\Imports\AllProgramsImport;
use Illuminate\Console\Command;

class ImportExcel extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'import:programs';

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
            'programs',
        ];

        $this->output->title('Starting import');

        foreach ($items as $item) {
            (new AllProgramsImport)->withOutput($this->output)->import(public_path('data/' . $item . '.xlsx'));
        }

        $this->output->success('Import successful');
    }
}
