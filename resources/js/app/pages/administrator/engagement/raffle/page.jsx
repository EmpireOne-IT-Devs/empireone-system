import { Head } from '@inertiajs/react';
import Layout from '../../layout';
import CreateSection from './_sections/create-section';
import TableSection from './_sections/table-section';

export default function Page() {
    const breadcrumbs = [
        // {
        //     title: 'Dashboard',
        //     href: '/administrator/dashboard',
        // },
        {
            title: 'Raffle',
            href: '/administrator/engagement/raffle',
        },
    ];
    return (
        <Layout breadcrumbs={breadcrumbs}>
            <Head title="Raffle" />
          
            <TableSection />
        </Layout>
    );
}
