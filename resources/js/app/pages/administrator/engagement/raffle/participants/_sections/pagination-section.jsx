import Pagination from '@/app/_components/pagination';

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

export default function PaginationSection() {
    const queryParams = new URLSearchParams(window.location.search);
    const currentPage = parseInt(queryParams.get('page') || '1', 10);
    const perPage = 5;
    const totalItems = participantsStaticData.length;
    const lastPage = Math.ceil(totalItems / perPage);

    // Create pagination data structure
    const paginationData = {
        current_page: currentPage,
        last_page: lastPage,
        per_page: perPage,
        from: (currentPage - 1) * perPage + 1,
        to: Math.min(currentPage * perPage, totalItems),
        total: totalItems,
        data: participantsStaticData.slice(
            (currentPage - 1) * perPage,
            currentPage * perPage,
        ),
    };

    return <Pagination data={paginationData} />;
}
