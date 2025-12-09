import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../../../../../../components/table';
import Button from '../../../../../../_components/button';

const winnersStaticData = [
    {
        id: 1,
        rank: 1,
        name: 'Sarah Williams',
        email: 'sarah.williams@example.com',
        contact: '+63 945 678 9012',
        prize: 'Grand Prize - Laptop',
        prizeValue: '₱50,000',
        dateWon: '2025-12-15',
        status: 'claimed',
    },
    {
        id: 2,
        rank: 2,
        name: 'John Doe',
        email: 'john.doe@example.com',
        contact: '+63 912 345 6789',
        prize: '2nd Prize - Smart Phone',
        prizeValue: '₱20,000',
        dateWon: '2025-12-15',
        status: 'pending',
    },
    {
        id: 3,
        rank: 3,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        contact: '+63 923 456 7890',
        prize: '3rd Prize - Gift Certificate',
        prizeValue: '₱5,000',
        dateWon: '2025-12-15',
        status: 'pending',
    },
    {
        id: 4,
        rank: 4,
        name: 'Mark Johnson',
        email: 'mark.johnson@example.com',
        contact: '+63 934 567 8901',
        prize: 'Consolation Prize - Shopping Voucher',
        prizeValue: '₱2,000',
        dateWon: '2025-12-15',
        status: 'claimed',
    },
    {
        id: 5,
        rank: 5,
        name: 'Alice Brown',
        email: 'alice.brown@example.com',
        contact: '+63 956 789 0123',
        prize: 'Consolation Prize - Shopping Voucher',
        prizeValue: '₱2,000',
        dateWon: '2025-12-15',
        status: 'pending',
    },
    {
        id: 6,
        rank: 6,
        name: 'Bob White',
        email: 'bob.white@example.com',
        contact: '+63 967 890 1234',
        prize: 'Consolation Prize - Gift Card',
        prizeValue: '₱1,500',
        dateWon: '2025-12-15',
        status: 'claimed',
    },
    {
        id: 7,
        rank: 7,
        name: 'Carol Green',
        email: 'carol.green@example.com',
        contact: '+63 978 901 2345',
        prize: 'Consolation Prize - Gift Card',
        prizeValue: '₱1,500',
        dateWon: '2025-12-15',
        status: 'pending',
    },
    {
        id: 8,
        rank: 8,
        name: 'David Black',
        email: 'david.black@example.com',
        contact: '+63 989 012 3456',
        prize: 'Consolation Prize - Merchandise',
        prizeValue: '₱1,000',
        dateWon: '2025-12-15',
        status: 'claimed',
    },
];

export default function TableSection({ raffle }) {
    const queryParams = new URLSearchParams(window.location.search);
    const currentPage = parseInt(queryParams.get('page') || '1', 10);
    const perPage = 5;

    // Calculate pagination
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    const currentWinners = winnersStaticData.slice(startIndex, endIndex);
    const totalItems = winnersStaticData.length;

    const hasWinners = true;

    const handleDrawWinners = () => {
        console.log('Drawing winners...');
    };

    return (
        <div className="overflow-hidden  shadow-sm sm:rounded-lg">
            <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Winners List</h3>
                    {hasWinners && (
                        <span className="text-sm text-gray-500">
                            Total Winners: {totalItems}
                        </span>
                    )}
                </div>

                {hasWinners ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Rank</TableHead>
                                <TableHead>Winner</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Contact</TableHead>
                                <TableHead>Prize</TableHead>
                                <TableHead>Prize Value</TableHead>
                                <TableHead>Date Won</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentWinners.map((winner) => (
                                <TableRow key={winner.id}>
                                    <TableCell className="font-semibold">
                                        #{winner.rank}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {winner.name}
                                    </TableCell>
                                    <TableCell className="">
                                        {winner.email}
                                    </TableCell>
                                    <TableCell className="">
                                        {winner.contact}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {winner.prize}
                                    </TableCell>
                                    <TableCell className="font-semibold text-green-600">
                                        {winner.prizeValue}
                                    </TableCell>
                                    <TableCell className="text-gray-60">
                                        {winner.dateWon}
                                    </TableCell>
                                    <TableCell>
                                        <span
                                            className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                                                winner.status === 'claimed'
                                                    ? 'bg-green-50 text-green-700 ring-green-600/20'
                                                    : 'bg-yellow-50 text-yellow-700 ring-yellow-600/20'
                                            }`}
                                        >
                                            {winner.status === 'claimed'
                                                ? 'Claimed'
                                                : 'Pending'}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <div className="py-12 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                            <svg
                                className="h-8 w-8 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                            </svg>
                        </div>
                        <h3 className="mb-2 text-lg font-medium text-gray-900">
                            No winners selected yet
                        </h3>
                        <p className="mb-4 text-sm text-gray-500">
                            Draw winners from the participants to select the lucky ones
                        </p>
                        <Button variant="primary" onClick={handleDrawWinners}>
                            🎲 Draw Winners
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
