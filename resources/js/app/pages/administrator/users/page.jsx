import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '../../../components/placeholder-pattern';
import Layout from '../layout';
import { Button } from '../../../components/button';
import { Card, CardHeader, CardTitle } from '../../../components/card';
import TableSection from './_sections/table-section';
import CreateSection from './_sections/create-section';

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
