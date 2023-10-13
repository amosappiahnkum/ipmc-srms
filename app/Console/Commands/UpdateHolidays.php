<?php

namespace App\Console\Commands;

use App\Models\Holiday;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Symfony\Component\Console\Command\Command as CommandAlias;

class UpdateHolidays extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'update:holidays';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update Holidays';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->output->title('Update Started');
        try {
            $holidays = Http::get(env('HOLIDAY_BASE_URL'))->json();

            foreach ($holidays['items'] as $holiday) {
                $startDate = Carbon::parse($holiday['start']['date']);
                $startDate->year;

                if ($startDate->year == date('Y')) {
                    Holiday::updateOrCreate([
                        'description' => $holiday['summary']
                    ], [
                        'description' => $holiday['summary'],
                        'start_date' => $holiday['start']['date'],
                        'end_date' => $holiday['end']['date']
                    ]);
                }
            }

            $this->output->success('Holidays updated');

            return CommandAlias::SUCCESS;
        } catch (\Exception $exception) {
            Log::error('Holiday Update Error', [$exception]);
            $this->output->title('Holiday Update Failed');

            return CommandAlias::FAILURE;
        }
    }
}
