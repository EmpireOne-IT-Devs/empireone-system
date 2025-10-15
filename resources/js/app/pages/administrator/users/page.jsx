import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '../../../components/placeholder-pattern';
import Layout from '../layout';
import { Button } from '../../../components/button';
import { Card, CardHeader, CardTitle } from '../../../components/card';

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
           
        </Layout>
    );
}
