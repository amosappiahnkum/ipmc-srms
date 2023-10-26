<?php

namespace Database\Seeders;

use App\Models\Branch;
use Illuminate\Database\Seeder;

class BranchSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $branches = [
            [
                'name' => 'Circle',
                'address' => 'P.O.Box GP 2066, Kwame Nkrumah Avenue Accra, Ghana.'
            ],
            [
                'name' => 'Shiashie',
                'address' => 'Shiashie GA-297-9289 Tanbu ln, East Legon, Shiashie, Accra, Ghana.'
            ],
            [
                'name' => 'North Legon',
                'address' => 'Koffi Annan Ave, North Legon, Accra, Ghana.'
            ],
            [
                'name' => 'Kumasi',
                'address' => 'Nhyiaeso, Opposite Golf, .Osei Tuffour Bypass, Kumasi, Ghana.'
            ],
            [
                'name' => 'Tema-25',
                'address' => 'C-25 Mall Junction, vtraco Courts Rd, Tema Community-25, Ghana.'
            ],
            [
                'name' => 'Takoradi',
                'address' => 'Opp of Star of sea Catholic Church, Library Building, 53 Paa Grant Blvd, Takoradi, Ghana.'
            ],
            [
                'name' => 'Dansoman',
                'address' => 'Exhibition Street, Near Dansoman Market, Dansoman, Accra, Ghana.'
            ],
            [
                'name' => 'Tema-6',
                'address' => 'Obetsebi Lamptey Street, Tema Community-6 , Ghana.'
            ]
        ];

        foreach ($branches as $branch) {
            Branch::updateOrCreate(['name' => $branch['name']],
                [
                    'name' => $branch['name'],
                    'address' => $branch['address']
                ]);
        }
    }
}
