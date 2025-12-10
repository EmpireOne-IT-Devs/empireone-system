import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../../../../../../components/table';

const participantsStaticData = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        contact: '+63 912 345 6789',
        department: 'IT Department',
        status: 'active',
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        contact: '+63 923 456 7890',
        department: 'HR Department',
        status: 'active',
    },
    {
        id: 3,
        name: 'Mark Johnson',
        email: 'mark.johnson@example.com',
        contact: '+63 934 567 8901',
        department: 'Finance Department',
        status: 'active',
    },
    {
        id: 4,
        name: 'Sarah Williams',
        email: 'sarah.williams@example.com',
        contact: '+63 945 678 9012',
        department: 'Marketing Department',
        status: 'active',
    },
    {
        id: 5,
        name: 'Alice Brown',
        email: 'alice.brown@example.com',
        contact: '+63 956 789 0123',
        department: 'Operations',
        status: 'active',
    },
    {
        id: 6,
        name: 'Bob White',
        email: 'bob.white@example.com',
        contact: '+63 967 890 1234',
        department: 'Sales Department',
        status: 'active',
    },
    {
        id: 7,
        name: 'Carol Green',
        email: 'carol.green@example.com',
        contact: '+63 978 901 2345',
        department: 'Customer Service',
        status: 'active',
    },
    {
        id: 8,
        name: 'David Black',
        email: 'david.black@example.com',
        contact: '+63 989 012 3456',
        department: 'IT Department',
        status: 'active',
    },
    {
        id: 9,
        name: 'Emma Gray',
        email: 'emma.gray@example.com',
        contact: '+63 990 123 4567',
        department: 'Marketing Department',
        status: 'active',
    },
    {
        id: 10,
        name: 'Frank Miller',
        email: 'frank.miller@example.com',
        contact: '+63 901 234 5678',
        department: 'Finance Department',
        status: 'active',
    },
    {
        id: 11,
        name: 'Grace Lee',
        email: 'grace.lee@example.com',
        contact: '+63 912 345 6780',
        department: 'HR Department',
        status: 'active',
    },
    {
        id: 12,
        name: 'Henry Wilson',
        email: 'henry.wilson@example.com',
        contact: '+63 923 456 7891',
        department: 'Operations',
        status: 'active',
    },
    {
        id: 13,
        name: 'Isabel Martinez',
        email: 'isabel.martinez@example.com',
        contact: '+63 934 567 8902',
        department: 'Sales Department',
        status: 'active',
    },
    {
        id: 14,
        name: 'Jack Anderson',
        email: 'jack.anderson@example.com',
        contact: '+63 945 678 9013',
        department: 'IT Department',
        status: 'active',
    },
    {
        id: 15,
        name: 'Karen Thomas',
        email: 'karen.thomas@example.com',
        contact: '+63 956 789 0124',
        department: 'Customer Service',
        status: 'active',
    },
];

export default function TableSection({ raffle }) {
    const queryParams = new URLSearchParams(window.location.search);
    const currentPage = parseInt(queryParams.get('page') || '1', 10);
    const perPage = 10;

    // Calculate pagination
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    const currentParticipants = participantsStaticData.slice(startIndex, endIndex);
    const totalItems = participantsStaticData.length;

    return (
        <div className="overflow-hidden  shadow-sm sm:rounded-lg">
            <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold  ">Participants List</h3>
                    <span className="text-sm text-gray-500">
                        Total: {totalItems} participants
                    </span>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Contact Number</TableHead>
                            <TableHead>Department</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentParticipants.length > 0 ? (
                            currentParticipants.map((participant, idx) => (
                                <TableRow key={participant.id}>
                                    <TableCell className=" ">{startIndex + idx + 1}</TableCell>
                                    <TableCell className="font-medium ">
                                        {participant.name}
                                    </TableCell>
                                    <TableCell className="">
                                        {participant.email}
                                    </TableCell>
                                    <TableCell className="">
                                        {participant.contact}
                                    </TableCell>
                                    <TableCell className="">
                                        {participant.department}
                                    </TableCell>
                                    <TableCell>
                                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                            {participant.status}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="py-6 text-center">
                                    No participants yet
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
