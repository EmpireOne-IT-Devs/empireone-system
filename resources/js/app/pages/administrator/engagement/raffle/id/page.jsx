import { Head } from '@inertiajs/react';
import Layout from '../../../layout';
import DetailSection from './_sections/detail_section';


const staticData = [
    {
        id: 1,
        event_name: 'Year End Party 2025',
        event_type: 'Company Event',
        description: 'Raffle event for the year end party celebration',
        start_date: '2025-12-20',
        end_date: '2025-12-31',
        participant_source: 'manual',
        participants: ['John Doe', 'Jane Smith', 'Mark Johnson', 'Sarah Williams'],
        number_of_winners: 3,
        prizes: [
            { name: 'Grand Prize - Laptop', quantity: 1, value: '50,000' },
            { name: '2nd Prize - Smart Phone', quantity: 2, value: '20,000' },
            { name: '3rd Prize - Gift Certificate', quantity: 5, value: '5,000' },
        ],
        winners: null,
        status: 'active',
        created_at: '2025-11-15T08:00:00Z',
    },
    {
        id: 2,
        event_name: 'Pintaflores Raffle',
        event_type: 'Festival Event',
        description: 'Annual pintaflores festival raffle event',
        start_date: '2025-11-25',
        end_date: '2025-11-30',
        participant_source: 'csv',
        participants: ['Alice Brown', 'Bob White', 'Carol Green', 'David Black', 'Emma Gray'],
        number_of_winners: 2,
        prizes: [
            { name: 'Festival Package', quantity: 1, value: '30,000' },
            { name: 'Shopping Voucher', quantity: 3, value: '10,000' },
        ],
        winners: null,
        status: 'active',
        created_at: '2025-11-01T10:30:00Z',
    },
    {
        id: 3,
        event_name: 'EmpireOne Anniversary Raffle',
        event_type: 'Anniversary Event',
        description: 'Raffle event celebrating EmpireOne 10th anniversary',
        start_date: '2025-12-01',
        end_date: '2025-12-15',
        participant_source: 'manual',
        participants: [
            'Michael Lee',
            'Patricia Davis',
            'Robert Wilson',
            'Linda Martinez',
            'James Anderson',
            'Maria Garcia',
        ],
        number_of_winners: 5,
        prizes: [
            { name: 'Grand Prize - Home Appliance Set', quantity: 1, value: '75,000' },
            { name: 'Travel Package', quantity: 2, value: '40,000' },
            { name: 'Electronics Bundle', quantity: 3, value: '25,000' },
            { name: 'Gift Hamper', quantity: 10, value: '5,000' },
        ],
        winners: null,
        status: 'pending',
        created_at: '2025-10-20T14:15:00Z',
    },
    {
        id: 4,
        event_name: 'Christmas Lucky Draw 2025',
        event_type: 'Holiday Event',
        description: 'Special Christmas raffle for all employees',
        start_date: '2025-12-10',
        end_date: '2025-12-24',
        participant_source: 'manual',
        participants: [
            'Thomas Moore',
            'Nancy Taylor',
            'Christopher Thomas',
            'Betty Jackson',
        ],
        number_of_winners: 4,
        prizes: [
            { name: 'Christmas Bonus', quantity: 1, value: '100,000' },
            { name: 'Holiday Getaway', quantity: 2, value: '50,000' },
            { name: 'Gift Cards', quantity: 5, value: '10,000' },
        ],
        winners: null,
        status: 'active',
        created_at: '2025-11-28T09:00:00Z',
    },
    {
        id: 5,
        event_name: 'New Year Raffle 2026',
        event_type: 'New Year Event',
        description: 'Welcome 2026 with exciting prizes',
        start_date: '2025-12-28',
        end_date: '2026-01-05',
        participant_source: 'csv',
        participants: ['Daniel Harris', 'Jessica Clark', 'Matthew Lewis'],
        number_of_winners: 2,
        prizes: [
            { name: 'Cash Prize', quantity: 1, value: '150,000' },
            { name: 'Gadget Bundle', quantity: 3, value: '35,000' },
        ],
        winners: null,
        status: 'pending',
        created_at: '2025-12-05T11:45:00Z',
    },
];

export default function Page() {
    // Get raffle ID from URL - you'll need to configure this based on your routing
    const raffleId = 1; // For now, default to 1
    const raffle = staticData.find(r => r.id === raffleId) || staticData[0];
    
    const breadcrumbs = [
        {
            title: 'Raffle',
            href: '/administrator/engagement/raffle',
        },
        {
            title: raffle?.event_name || 'Details',
            href: '#',
        },
    ];
    
    return (
        <Layout breadcrumbs={breadcrumbs}>
            <Head title={`Raffle - ${raffle?.event_name || 'Details'}`} />
            <DetailSection raffle={raffle} />
        </Layout>
    );
}
