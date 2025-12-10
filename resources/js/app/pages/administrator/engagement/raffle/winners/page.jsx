import { Head } from '@inertiajs/react';
import Layout from '../../../layout';
import TabsSection from '../id/_sections/tabs-section';
import TableSection from './_sections/table-section';
import PaginationSection from './_sections/pagination-section';

export default function Page({ raffle }) {
    const breadcrumbs = [
        {
            title: 'Raffle',
            href: '/administrator/engagement/raffle',
        },
        {
            title: raffle?.event_name || 'Event',
            href: `/administrator/engagement/raffle/${raffle?.id}`,
        },
        {
            title: 'Winners',
            href: '#',
        },
    ];

    return (
        <Layout breadcrumbs={breadcrumbs}>
            <Head title={`Winners - ${raffle?.event_name || 'Raffle'}`} />
            <div className="space-y-6">
                <TabsSection raffleId={raffle?.id} />
                <TableSection raffle={raffle} />
                <PaginationSection />
            </div>
        </Layout>
    );
}
