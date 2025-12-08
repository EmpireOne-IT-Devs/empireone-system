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
import CreateSection from './create-section';
import EditSection from './edit-section';
import ResetSection from './reset-section';
import ViewSection from './view-section';

const initialData = [
    {
        id: 1,
        name: 'Year End Party 2025',
        description: 'Raffle event for the year end party',
        start_date: 'Admin',
        end_date: '2025-11-28',
    },
    {
        id: 2,
        name: 'Pintaflores Raffle',
        description: 'Annual pintaflores raffle event',
        start_date: 'Editor',
        end_date: '2025-11-30',
    },
    {
        id: 3,
        name: 'EmpireOne Anniversary Raffle',
        description: 'Raffle event for EmpireOne anniversary',
        start_date: 'Editor',
        end_date: '2025-11-30',
    },
];

export default function TableSection() {
    const [query, setQuery] = useState('');
    const [data] = useState(initialData);
    const [sortKey, setSortKey] = useState('name');
    const [sortDir, setSortDir] = useState('asc');

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        const result = data.filter((u) => {
            if (!q) return true;
            return (
                u.name.toLowerCase().includes(q) ||
                u.description.toLowerCase().includes(q) ||
                u.start_date.toLowerCase().includes(q)
                // u.end_date.toLowerCase().includes(q)
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

                <div className="flex items-center gap-2">
                    <Input
                        placeholder="Search by name, email or role..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="max-w-lg w-64  "
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
                                onClick={() => toggleSort('name')}
                            >
                                Name{' '}
                                {sortKey === 'name'
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
                                onClick={() => toggleSort('role')}
                            >
                                Start Event{' '}
                                {sortKey === 'role'
                                    ? sortDir === 'asc'
                                        ? '▲'
                                        : '▼'
                                    : ''}
                            </TableHead>
                            <TableHead
                                className="hidden cursor-pointer sm:table-cell"
                                onClick={() => toggleSort('lastActive')}
                            >
                                End Event
                            </TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtered.map((u) => (
                            <TableRow key={u.id} className="align-middle">
                                <TableCell>
                                    <div className="flex items-center">
                                        <div className="flex w-10 items-center justify-center rounded-full bg-gray-100 text-sm font-medium">
                                            {u.name
                                                .split(' ')
                                                .map((s) => s[0])
                                                .slice(0, 2)
                                                .join('')}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-medium">
                                                {u.name}
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
                                <TableCell>{u.role}</TableCell>
                                <TableCell className="hidden sm:table-cell">
                                    {u.lastActive}
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <ViewSection />
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
