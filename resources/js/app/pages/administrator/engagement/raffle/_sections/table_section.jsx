import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import {
    CardContent,
    CardHeader,
    CardTitle,
} from '../../../../../components/card';
import { Input } from '../../../../../components/input';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../../../../../components/table';
import CreateSection from './create_section';
import EditSection from './edit_section';
import ResetSection from './reset_section';
import ViewSection from './view_section';

const initialData = [
    {
        id: 1,
        event_name: 'Year End Party 2025',
        event_type: 'Company Event',
        description: 'Raffle event for the year end party celebration',
        start_date: '2025-12-20',
        end_date: '2025-12-31',
        participant_source: 'manual',
        participants: [
            'John Doe',
            'Jane Smith',
            'Mark Johnson',
            'Sarah Williams',
        ],
        number_of_winners: 3,
        prizes: [
            { name: 'Grand Prize - Laptop', quantity: 1, value: '50,000' },
            { name: '2nd Prize - Smart Phone', quantity: 2, value: '20,000' },
            {
                name: '3rd Prize - Gift Certificate',
                quantity: 5,
                value: '5,000',
            },
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
        participants: [
            'Alice Brown',
            'Bob White',
            'Carol Green',
            'David Black',
            'Emma Gray',
        ],
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
            {
                name: 'Grand Prize - Home Appliance Set',
                quantity: 1,
                value: '75,000',
            },
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

export default function TableSection() {
    const [query, setQuery] = useState('');
    const [data] = useState(initialData);
    const [sortKey, setSortKey] = useState('name');
    const [sortDir, setSortDir] = useState('asc');
    const [editingRaffle, setEditingRaffle] = useState(null);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        const result = data.filter((u) => {
            if (!q) return true;
            return (
                u.event_name.toLowerCase().includes(q) ||
                u.description.toLowerCase().includes(q) ||
                u.start_date.toLowerCase().includes(q) ||
                u.end_date.toLowerCase().includes(q)
            );
        });

        if (!sortKey) return result;

        return [...result].sort((a, b) => {
            const A = String(a[sortKey] ?? '').toLowerCase();
            const B = String(b[sortKey] ?? '').toLowerCase();
            if (A < B) return sortDir === 'asc' ? -1 : 1;
            if (A > B) return sortDir === 'asc' ? 1 : -1;
            return 0;
        });
    }, [data, query, sortKey, sortDir]);

    function toggleSort(key) {
        if (sortKey === key) {
            setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortKey(key);
            setSortDir('asc');
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32 }}
            className="w-full"
        >
            <CardHeader className="my-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <CardTitle>Raffle Management</CardTitle>
                    <p className="text-sm text-muted-foreground">
                        Organize raffle events, manage participants, and track
                        winners effortlessly.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Input
                        placeholder="Search by name, description or date..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-64 h-10 max-w-lg"
                    />
                    <div className="flex items-center gap-3">
                        <ResetSection />
                        <CreateSection />
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                <Table>
                    <TableCaption>
                        List of Events — sortable, searchable, responsive.
                    </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead
                                className="cursor-pointer"
                                onClick={() => toggleSort('event_name')}
                            >
                                Name{' '}
                                {sortKey === 'event_name'
                                    ? sortDir === 'asc'
                                        ? '▲'
                                        : '▼'
                                    : ''}
                            </TableHead>
                            <TableHead
                                className="hidden cursor-pointer md:table-cell"
                                onClick={() => toggleSort('description')}
                            >
                                Description{' '}
                                {sortKey === 'description'
                                    ? sortDir === 'asc'
                                        ? '▲'
                                        : '▼'
                                    : ''}
                            </TableHead>
                            <TableHead
                                className="cursor-pointer"
                                onClick={() => toggleSort('start_date')}
                            >
                                Start Event{' '}
                                {sortKey === 'start_date'
                                    ? sortDir === 'asc'
                                        ? '▲'
                                        : '▼'
                                    : ''}
                            </TableHead>
                            <TableHead
                                className="hidden cursor-pointer sm:table-cell"
                                onClick={() => toggleSort('end_date')}
                            >
                                End Event{' '}
                                {sortKey === 'end_date'
                                    ? sortDir === 'asc'
                                        ? '▲'
                                        : '▼'
                                    : ''}
                            </TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtered.map((u) => (
                            <TableRow key={u.id} className="align-middle">
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-sm font-medium">
                                            {u.event_name
                                                .split(' ')
                                                .map((s) => s[0])
                                                .slice(0, 2)
                                                .join('')}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-medium">
                                                {u.event_name}
                                            </span>
                                            <span className="text-xs text-muted-foreground md:hidden">
                                                {u.description}
                                            </span>
                                        </div>
                                    </div>
                                </TableCell>

                                <TableCell className="hidden md:table-cell">
                                    {u.description}
                                </TableCell>
                                <TableCell>{u.start_date}</TableCell>
                                <TableCell className="hidden sm:table-cell">
                                    {u.end_date}
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <ViewSection raffle={u} />
                                        <EditSection />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}

                        {filtered.length === 0 && (
                            <TableRow>
                                <TableCell
                                    colSpan={5}
                                    className="py-6 text-center"
                                >
                                    No results found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </motion.div>
    );
}
