import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Layout from '../../../layout';
import TabsSection from '../id/_sections/tabs_section';
import TableSection from './_sections/table_section';
import PaginationSection from './_sections/pagination_section';


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
            title: 'Participants',
            href: '#',
        },
    ];

    return (
        <Layout breadcrumbs={breadcrumbs}>
            <Head title={`Participants - ${raffle?.event_name || 'Raffle'}`} />
            <div className="space-y-6">
                <TabsSection raffleId={raffle?.id} />
                <TableSection raffle={raffle} />
                <PaginationSection />
            </div>
        </Layout>
    );
}
