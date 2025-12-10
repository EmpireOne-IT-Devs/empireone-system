import store from '@/app/store/store';
import { useEffect } from 'react';
import { get_events_by_id_thunk } from '../../../../../../redux/raffle-thunk';
import ActionCardSection from './sections/action-card-section';
import HeaderSection from './sections/header-section';
import RaffleListSection from './sections/raffle-list-section';
import StatsSection from './sections/stats-section';
const Page = () => {
    useEffect(() => {
        store.dispatch(get_events_by_id_thunk());
    }, []);
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white">
                <HeaderSection />
                <div className="mx-auto mt-8 mb-12 max-w-6xl px-8">
                    <ActionCardSection />

                    <StatsSection />

                    <RaffleListSection />
                </div>
            </div>
        </>
    );
};

export default Page;
