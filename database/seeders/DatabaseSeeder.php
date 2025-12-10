<?php

namespace Database\Seeders;

use App\Models\Raffle;
use App\Models\RaffleEvent;
use App\Models\RaffleParticipant;
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
        $raffle = RaffleEvent::create([
            'name' => 'EmpireOne Christmas Raffle 2024',
            'description' => 'Win amazing prizes this Christmas season!',
            'start_at' => now(),
            'end_at' => now()->addDays(30),
        ]);

        // Sample names
        $firstNames = [
            'John',
            'Jane',
            'Michael',
            'Sarah',
            'David',
            'Emily',
            'James',
            'Emma',
            'Robert',
            'Olivia',
            'William',
            'Ava',
            'Richard',
            'Isabella',
            'Joseph',
            'Sophia',
            'Thomas',
            'Mia',
            'Charles',
            'Charlotte',
            'Daniel',
            'Amelia',
            'Matthew',
            'Harper',
            'Anthony',
            'Evelyn',
            'Mark',
            'Abigail',
            'Donald',
            'Elizabeth',
            'Steven',
            'Sofia',
            'Paul',
            'Ella',
            'Andrew',
            'Madison',
            'Joshua',
            'Scarlett',
            'Kenneth',
            'Victoria',
            'Kevin',
            'Aria',
            'Brian',
            'Grace',
            'George',
            'Chloe',
            'Edward',
            'Camila',
            'Ronald',
            'Penelope'
        ];

        $lastNames = [
            'Smith',
            'Johnson',
            'Williams',
            'Brown',
            'Jones',
            'Garcia',
            'Miller',
            'Davis',
            'Rodriguez',
            'Martinez',
            'Hernandez',
            'Lopez',
            'Gonzalez',
            'Wilson',
            'Anderson',
            'Thomas',
            'Taylor',
            'Moore',
            'Jackson',
            'Martin',
            'Lee',
            'Perez',
            'Thompson',
            'White',
            'Harris',
            'Sanchez',
            'Clark',
            'Ramirez',
            'Lewis',
            'Robinson',
            'Walker',
            'Young',
            'Allen',
            'King',
            'Wright',
            'Scott',
            'Torres',
            'Nguyen',
            'Hill',
            'Flores',
            'Green',
            'Adams',
            'Nelson',
            'Baker',
            'Hall',
            'Rivera',
            'Campbell',
            'Mitchell',
            'Carter',
            'Roberts'
        ];

        // Create 300 participants
        for ($i = 1; $i <= 3; $i++) {
            $firstName = $firstNames[array_rand($firstNames)];
            $lastName = $lastNames[array_rand($lastNames)];
            $fullName = $firstName . ' ' . $lastName;
            $email = strtolower($firstName . '.' . $lastName . $i . '@example.com');
            $contactNumber = '+639' . rand(100000000, 999999999);

            RaffleParticipant::create([
                'raffle_event_id' => 1,
                'name' => $fullName,
                'contact' => $contactNumber,
                'email' => $email,
                'qr_code_data' => 'QR_CODE_' . str_pad($i, 4, '0', STR_PAD_LEFT),
                'is_winner' => false,
                'scanned_at' => now(),
            ]);
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
