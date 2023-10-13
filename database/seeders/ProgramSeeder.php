<?php

namespace Database\Seeders;

use App\Enums\ProgramType;
use App\Models\Program;
use Illuminate\Database\Seeder;

class ProgramSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $programs = [
            [
                "name" => "Software Engineering",
                "duration" => "48",
                "fee" => 0,
                "type" => ProgramType::PROFESSIONAL
            ],
            [
                "name" => "Systems Engineering",
                "duration" => "48",
                "fee" => 0,
                "type" => ProgramType::PROFESSIONAL
            ],
            [
                "name" => "Graphic and Web Design",
                "duration" => "48",
                "fee" => 0,
                "type" => ProgramType::PROFESSIONAL
            ],
            [
                "name" => "Database Technology",
                "duration" => "48",
                "fee" => 0,
                "type" => ProgramType::PROFESSIONAL
            ],
            [
                "name" => "Cyber Security",
                "duration" => "48",
                "fee" => 0,
                "type" => ProgramType::PROFESSIONAL
            ],
            [
                "name" => "Artificial Intelligence",
                "duration" => "48",
                "fee" => 0,
                "type" => ProgramType::PROFESSIONAL
            ],
            [
                "name" => "Digital Marketing",
                "duration" => "48",
                "fee" => 0,
                "type" => ProgramType::PROFESSIONAL
            ],
            [
                "name" => "GBCE (WAEC Certified)",
                "duration" => "48",
                "fee" => 0,
                "type" => ProgramType::PROFESSIONAL
            ],
            [
                "name" => "Basics of Software Programming",
                "duration" => "48",
                "fee" => 0,
                "type" => ProgramType::SHORT_TERM
            ],
            [
                "name" => "Android Mobile App",
                "duration" => "48",
                "fee" => 0,
                "type" => ProgramType::SHORT_TERM
            ],
            [
                "name" => "CompTIA Network",
                "duration" => "48",
                "fee" => 0,
                "type" => ProgramType::SHORT_TERM
            ],
            [
                "name" => "Analytics with Excel",
                "duration" => "48",
                "fee" => 0,
                "type" => ProgramType::SHORT_TERM
            ],
            [
                "name" => "Cloud Computing",
                "duration" => "48",
                "fee" => 0,
                "type" => ProgramType::SHORT_TERM
            ],
            [
                "name" => "Tally Erp",
                "duration" => "48",
                "fee" => 0,
                "type" => ProgramType::SHORT_TERM
            ],
            [
                "name" => "Microsoft Office",
                "duration" => "48",
                "fee" => 0,
                "type" => ProgramType::SHORT_TERM
            ],
            [
                "name" => "Graphic Design",
                "duration" => "48",
                "fee" => 0,
                "type" => ProgramType::SHORT_TERM
            ],
            [
                "name" => "Accounting with I.T (Tally)",
                "duration" => "48",
                "fee" => 0,
                "type" => ProgramType::SHORT_TERM
            ],
            [
                "name" => "L3DC - Diploma in Computing",
                "duration" => "48",
                "fee" => 0,
                "type" => ProgramType::DEGREE
            ],
            [
                "name" => "L4DBIT - Diploma in Business Information Technology",
                "duration" => "48",
                "fee" => 0,
                "type" => ProgramType::DEGREE
            ],
            [
                "name" => "L5DBIT - Advance Diploma in Business Information Technology",
                "duration" => "48",
                "fee" => 0,
                "type" => ProgramType::DEGREE
            ],
            [
                "name" => "BSc (Hon) Computing",
                "duration" => "48",
                "fee" => 0,
                "type" => ProgramType::DEGREE
            ],
            [
                "name" => "BSc (Hon) Information Technology",
                "duration" => "48",
                "fee" => 0,
                "type" => ProgramType::DEGREE
            ],
            [
                "name" => "BSc (Hon) Multimedia and Animation Design",
                "duration" => "48",
                "fee" => 0,
                "type" => ProgramType::DEGREE
            ],
            [
                "name" => "BSc (Hon) Business Admin",
                "duration" => "48",
                "fee" => 0,
                "type" => ProgramType::DEGREE
            ]
        ];

        foreach ($programs as $program) {
            Program::updateOrCreate([
                'name' => $program['name'],
                'program_type' => $program['type'],
            ], [
                'name' => $program['name'],
                'duration' => $program['duration'],
                'fee' => $program['fee'],
                'program_type' => $program['type'],
            ]);
        }
    }
}
