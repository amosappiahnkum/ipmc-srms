<?php

namespace App\Console\Commands;

use App\Imports\QuestionImport;
use Illuminate\Console\Command;

class ImportQuestionCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'import:questions';

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
        $this->output->title('Importing Questions');

        (new QuestionImport())->withOutput($this->output)->import(public_path('data/questions.xlsx'));

        $this->output->success('Questions Import successful');
    }
}
