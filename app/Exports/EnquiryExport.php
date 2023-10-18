<?php

namespace App\Exports;

use App\Http\Resources\ProgramResource;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithPreCalculateFormulas;

class EnquiryExport implements FromCollection, WithHeadings,
    WithMapping, ShouldAutoSize, WithPreCalculateFormulas
{

    /** @var Collection */
    private Collection $data;

    /**
     * @param Collection $enquiry
     */
    public function __construct(Collection $enquiry)
    {
        $this->data = $enquiry;
    }

    /**
     * @return Collection
     */
    public function collection(): Collection
    {
        return $this->data;
    }

    /**
     * @return array
     */
    public function headings(): array
    {
        return [
            'First Name',
            'Last Name',
            'Other Name',
            'Date of Birth',
            'Mobile No 1',
            'Mobile No 2',
            'Email',
            'Country',
            'Nationality',
            'Gender',
            'Address',
            'Box Address',
            'House Number',
            'Digital Address',
            'ID Type',
            'Id Number',
            'Education Qualifications',
            'Other Qualification',
            'Sponsor Name',
            'Sponsor Number',
            'Sponsor Email',
            'Sponsor Relationship',
            'Programs',
            'Other Program',
            'Preferred Timings',
            'Other Preferred Timing',
            'Heard about IPMC',
            'School Name',
        ];
    }

    /**
     * @param $row
     * @return array
     */
    public function map($row): array
    {

        $programs = ProgramResource::collection($row->enquiryPrograms());
        return [
            $row->student->first_name,
            $row->student->last_name,
            $row->student->other_name,
            $row->student->dob,
            $row->student->phone_number,
            $row->student->alt_phone_number,
            $row->student->email,
            $row->student->country,
            $row->student->nationality,
            $row->student->gender,
            $row->student->address,
            $row->student->box_address,
            $row->student->house_number,
            $row->student->digital_address,
            $row->student->id_type,
            $row->student->id_number,
            implode(',', $row->student->education_qualifications),
            $row->student->other_qualification,
            $row->student->sponsor->name,
            $row->student->sponsor->email,
            $row->student->sponsor->phone_number,
            $row->student->sponsor->relationship,
            $programs->collection->pluck('allPrograms.name')->implode(','),
            $row->other_program,
            implode(',', $row->preferred_timings),
            $row->other_preferred_timing,
            implode(',', $row->heard),
            $row->school_name,
        ];
    }
}
