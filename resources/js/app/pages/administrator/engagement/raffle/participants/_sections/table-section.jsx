import Table from '@/app/_components/table';

import { useSelector } from 'react-redux';

export default function TableSection() {
    const { daily_expenses } = useSelector((state) => state.accounting);

    const columns = [
        { header: 'Name of Participant', accessor: 'participants_id' },
        { header: 'Email', accessor: 'email' },
        { header: 'Contact Number', accessor: 'contact_number' },
    ];
    console.log('winners', winners);
    function limitString(str, maxLength = 20) {
        return str.length > maxLength ? str.slice(0, maxLength) + '...' : str;
    }
    return (
        <>
            <Table
                columns={columns}
                data={daily_expenses?.map((res, i) => ({
                    participants_name: limitString(res.participants_name),
                    email: limitString(res.email),
                    contact_number: res.contact_number,

                    // action: (
                    //     <Link
                    //         href={`/users/ticketing/${department_slug().replace(
                    //             " ",
                    //             "_"
                    //         )}/${res.ticket_id}/details?${
                    //             page ? `page=${page}` : ""
                    //         }`}
                    //     >
                    //         <FcFinePrint className="h-6 w-6" />
                    //     </Link>
                    // ),
                }))}
            />
        </>
    );
}
