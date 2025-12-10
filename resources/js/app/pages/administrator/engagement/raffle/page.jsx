import { Head } from '@inertiajs/react';
import Layout from '../../layout';
import store from "@/app/store/store";
import TableSection from './_sections/table-section';
import { useEffect } from 'react';
import { get_events_thunk } from '../../../../redux/raffle-thunk';

export default function Page() {
    const breadcrumbs = [
        {
            title: 'Raffle',
            href: '/administrator/engagement/raffle',
        },
    ];

    useEffect(()=>{
       store.dispatch(get_events_thunk());
    },[]);
    return (
        <Layout breadcrumbs={breadcrumbs}>
            <Head title="Raffle" />
            <TableSection />
        </Layout>
    );
}
