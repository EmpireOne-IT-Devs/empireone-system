import { Head } from '@inertiajs/react';
import Layout from '../layout';
import TableSection from './_sections/table-section';

const breadcrumbs = [
    // {
    //     title: 'Dashboard',
    //     href: '/administrator/dashboard',
    // },
    {
        title: 'Users',
        href: '/administrator/users',
    },
];
export default function Page() {
    return (
        <Layout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <TableSection />
           
        </Layout>
    );
}
