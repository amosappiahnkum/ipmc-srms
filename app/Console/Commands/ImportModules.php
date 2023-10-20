<?php

namespace App\Console\Commands;

use App\Imports\AllProgramsImport;
use Illuminate\Console\Command;

class ImportModules extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'import:modules';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->output->title('Importing Programs');

        (new \App\Imports\ImportModules)->withOutput($this->output)->import(public_path('data/modules.xlsx'));

        $this->output->success('Programs Import successful');
    }
}
