<?php

namespace App\Console\Commands;

use App\Imports\AllProgramsImport;
use Illuminate\Console\Command;

class ImportProgramsCommand extends Command
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
        $this->output->title('Importing Programs');

        (new AllProgramsImport)->withOutput($this->output)->import(public_path('data/programs.xlsx'));

        $this->output->success('Programs Import successful');
    }
}
