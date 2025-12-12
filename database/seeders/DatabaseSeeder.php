<?php

namespace Database\Seeders;

use App\Models\Raffle;
use App\Models\RaffleEvent;
use App\Models\RaffleParticipant;
use App\Models\RafflePrize;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create default raffle
        $raffle_event = RaffleEvent::create([
            'name' => 'EmpireOne Year End Party Raffle 2025',
            'description' => 'Win amazing prizes this Year End Party season!',
            'start_at' => now(),
            'end_at' => now()->addDays(30),
        ]);

        // Sample names
        // $firstNames = [
        //     'John',
        //     'Jane',
        //     'Michael',
        //     'Sarah',
        //     'David',
        //     'Emily',
        //     'James',
        //     'Emma',
        //     'Robert',
        //     'Olivia',
        //     'William',
        //     'Ava',
        //     'Richard',
        //     'Isabella',
        //     'Joseph',
        //     'Sophia',
        //     'Thomas',
        //     'Mia',
        //     'Charles',
        //     'Charlotte',
        //     'Daniel',
        //     'Amelia',
        //     'Matthew',
        //     'Harper',
        //     'Anthony',
        //     'Evelyn',
        //     'Mark',
        //     'Abigail',
        //     'Donald',
        //     'Elizabeth',
        //     'Steven',
        //     'Sofia',
        //     'Paul',
        //     'Ella',
        //     'Andrew',
        //     'Madison',
        //     'Joshua',
        //     'Scarlett',
        //     'Kenneth',
        //     'Victoria',
        //     'Kevin',
        //     'Aria',
        //     'Brian',
        //     'Grace',
        //     'George',
        //     'Chloe',
        //     'Edward',
        //     'Camila',
        //     'Ronald',
        //     'Penelope'
        // ];

        // $lastNames = [
        //     'Smith',
        //     'Johnson',
        //     'Williams',
        //     'Brown',
        //     'Jones',
        //     'Garcia',
        //     'Miller',
        //     'Davis',
        //     'Rodriguez',
        //     'Martinez',
        //     'Hernandez',
        //     'Lopez',
        //     'Gonzalez',
        //     'Wilson',
        //     'Anderson',
        //     'Thomas',
        //     'Taylor',
        //     'Moore',
        //     'Jackson',
        //     'Martin',
        //     'Lee',
        //     'Perez',
        //     'Thompson',
        //     'White',
        //     'Harris',
        //     'Sanchez',
        //     'Clark',
        //     'Ramirez',
        //     'Lewis',
        //     'Robinson',
        //     'Walker',
        //     'Young',
        //     'Allen',
        //     'King',
        //     'Wright',
        //     'Scott',
        //     'Torres',
        //     'Nguyen',
        //     'Hill',
        //     'Flores',
        //     'Green',
        //     'Adams',
        //     'Nelson',
        //     'Baker',
        //     'Hall',
        //     'Rivera',
        //     'Campbell',
        //     'Mitchell',
        //     'Carter',
        //     'Roberts'
        // ];

        // Create 300 participants
        // for ($i = 1; $i <= 350; $i++) {
        //     $firstName = $firstNames[array_rand($firstNames)];
        //     $lastName = $lastNames[array_rand($lastNames)];
        //     $fullName = $firstName . ' ' . $lastName;
        //     $email = strtolower($firstName . '.' . $lastName . $i . '@example.com');
        //     $contactNumber = '+639' . rand(100000000, 999999999);

        //     RaffleParticipant::create([
        //         'raffle_event_id' => 1,
        //         'name' => $fullName,
        //         'employee_id' => $contactNumber,
        //         'account' => $email,
        //         'is_winner' => false,
        //     ]);
        // }


        $items = [
            (object)[
                'name' => 'Mobile Phones',
                'quantity' => 3,
                'url' => '/images/cellphone-removebg-preview.png'
            ],
            (object)[
                'name' => 'Stand Fan',
                'quantity' => 5,
                'url' => '/images/electric-fan.webp'
            ],
            (object)[
                'name' => 'Sack of 25 kilos of Rice',
                'quantity' => 5,
                'url' => '/images/Rice-removebg-preview.png'
            ],
            (object)[
                'name' => 'Sack of 5 kilos of Rice',
                'quantity' => 2,
                'url' => '/images/Rice-removebg-preview.png'
            ],
            (object)[
                'name' => 'Bath Essentials',
                'quantity' => 3,
                'url' => '/images/bath.png'
            ],
        ];
        foreach ($items as $item) {
            for ($i = 0; $i < $item->quantity; $i++) {
                RafflePrize::create([
                    'raffle_event_id' => $raffle_event->id,
                    'name' => $item->name,
                    'status' => 'available',
                    'url' => $item->url,
                ]);
            }
        }

        User::firstOrCreate(
            ['email' => 'webdev@empireonegroup.com'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('admin'),
                'email_verified_at' => now(),
            ]
        );
        $this->command->info('✅ Created 1 raffle and 300 participants successfully!');
    }
}
