<?php

namespace App\Exports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithPreCalculateFormulas;

class FollowUpExport implements  FromCollection, WithHeadings,
    WithMapping, ShouldAutoSize, WithPreCalculateFormulas
{
    /** @var Collection */
    private Collection $data;

    /**
     * @param Collection $followUp
     */
    public function __construct(Collection $followUp)
    {
        $this->data = $followUp;
    }

    public function headings(): array
    {
        return [
            'Student',
            'Date',
            'Mode',
            'Feedback'
        ];
    }

    public function map($row): array
    {
        return [
            $row->enquiry->student->name,
            $row->follow_up_date,
            $row->mode->value,
            $row->feedback
        ];
    }

    public function collection()
    {
        return $this->data;
    }
}
