import React from "react";
import HeaderSection from "./sections/header-section";
import ActionCardSection from "./sections/action-card-section";
import StatsSection from "./sections/stats-section";
import RaffleListSection from "./sections/raffle-list-section";
import { router } from "@inertiajs/react";

const Page = () => {
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white">
                <HeaderSection />
                <div className="max-w-6xl mx-auto px-8 mt-8 mb-12">
                    <ActionCardSection />

                    <StatsSection />

                    <RaffleListSection />
                </div>
            </div>
        </>
    );
};

export default Page;
