import Pagination from '@/app/_components/pagination';

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

export default function PaginationSection() {
    const queryParams = new URLSearchParams(window.location.search);
    const currentPage = parseInt(queryParams.get('page') || '1', 10);
    const perPage = 5;
    const totalItems = winnersStaticData.length;
    const lastPage = Math.ceil(totalItems / perPage);

    // Create pagination data structure
    const paginationData = {
        current_page: currentPage,
        last_page: lastPage,
        per_page: perPage,
        from: (currentPage - 1) * perPage + 1,
        to: Math.min(currentPage * perPage, totalItems),
        total: totalItems,
        data: winnersStaticData.slice(
            (currentPage - 1) * perPage,
            currentPage * perPage,
        ),
    };

    return <Pagination data={paginationData} />;
}
