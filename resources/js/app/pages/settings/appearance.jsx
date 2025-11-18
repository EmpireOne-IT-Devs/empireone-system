import { Head } from '@inertiajs/react';

import AppearanceTabs from './_sections/appearance-tabs';
import HeadingSmall from '../../components/heading-small';

import SettingsLayout from './layout';
import { edit as editAppearance } from '../../routes/appearance';

import Layout from '../administrator/layout';
const breadcrumbs = [
    {
        title: 'Appearance settings',
        href: editAppearance().url,
    },
];

export default function Appearance() {
    return (
        <Layout breadcrumbs={breadcrumbs}>
            <Head title="Appearance settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Appearance settings"
                        description="Update your account's appearance settings"
                    />
                    <AppearanceTabs />
                </div>
            </SettingsLayout>
        </Layout>
    );
}
