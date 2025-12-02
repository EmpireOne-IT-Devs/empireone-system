import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { Button } from '../../../../components/button';
import {
    CardContent,
    CardHeader,
    CardTitle,
} from '../../../../components/card';
import { Input } from '../../../../components/input';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../../../../components/table';

// Example data type

const initialData = [
    {
        id: 1,
        name: 'Ava Santos',
        email: 'ava@example.com',
        role: 'Admin',
        lastActive: '2025-11-28',
    },
    {
        id: 2,
        name: 'Miguel Cruz',
        email: 'miguel@example.com',
        role: 'Editor',
        lastActive: '2025-11-30',
    },
    {
        id: 3,
        name: 'Lina Reyes',
        email: 'lina@example.com',
        role: 'Viewer',
        lastActive: '2025-11-25',
    },
    {
        id: 4,
        name: 'Jonah Perez',
        email: 'jonah@example.com',
        role: 'Editor',
        lastActive: '2025-11-22',
    },
    {
        id: 5,
        name: 'Sara Lim',
        email: 'sara@example.com',
        role: 'Admin',
        lastActive: '2025-11-29',
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
                u.email.toLowerCase().includes(q) ||
                u.role.toLowerCase().includes(q)
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
                    <CardTitle>Users</CardTitle>
                    <p className="text-sm text-muted-foreground">
                        Manage your team's users and permissions.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <Input
                        placeholder="Search by name, email or role..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="max-w-xs"
                    />
                    <Button
                        onClick={() => {
                            setQuery('');
                            setSortKey('name');
                            setSortDir('asc');
                        }}
                    >
                        Reset
                    </Button>
                </div>
            </CardHeader>

            <CardContent>
                <Table>
                    <TableCaption>
                        List of users — sortable, searchable, responsive.
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
                                onClick={() => toggleSort('email')}
                            >
                                Email{' '}
                                {sortKey === 'email'
                                    ? sortDir === 'asc'
                                        ? '▲'
                                        : '▼'
                                    : ''}
                            </TableHead>
                            <TableHead
                                className="cursor-pointer"
                                onClick={() => toggleSort('role')}
                            >
                                Role{' '}
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
                                Last active
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
                                                {u.email}
                                            </span>
                                        </div>
                                    </div>
                                </TableCell>

                                <TableCell className="hidden md:table-cell">
                                    {u.email}
                                </TableCell>
                                <TableCell>{u.role}</TableCell>
                                <TableCell className="hidden sm:table-cell">
                                    {u.lastActive}
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button size="sm">View</Button>
                                        <Button variant="ghost" size="sm">
                                            Edit
                                        </Button>
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
