import { Head } from '@inertiajs/react';
import Layout from '../../layout';

import TableSection from './_sections/table_section';

export default function Page() {
    const breadcrumbs = [
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
