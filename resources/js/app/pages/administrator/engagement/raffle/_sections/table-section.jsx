import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
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

export default function TableSection() {
    const [query, setQuery] = useState('');
    const [sortKey, setSortKey] = useState('name');
    const [sortDir, setSortDir] = useState('asc');
    const { events: data } = useSelector((store) => store.raffles);

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
                        className="h-10 w-64 max-w-lg"
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
                                                ?.split(' ')
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
                                <TableCell>{u.start_at}</TableCell>
                                <TableCell className="hidden sm:table-cell">
                                    {u.end_at}
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <a
                                            target="_blank"
                                            className="rounded-lg bg-red-700 p-3 text-xs font-semibold text-white transition hover:bg-red-800"
                                            href={`/administrator/engagement/raffle/${u.id}/home`}
                                        >
                                            PORTAL
                                        </a>
                                        <ViewSection data={u} />
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
