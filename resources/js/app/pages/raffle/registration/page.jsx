import React, { useEffect } from "react";
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchParticipants, scanQRCode } from '../../redux/raffle-thunk';
import HeaderSection from "./sections/header-section";
import RegistrationFormSection from "./sections/registration-form-section";
import QRScannerSection from "./sections/qr-scanner-section";
import ParticipantsListSection from "./sections/participants-list-section";
import store from "@/app/store/store";
import { get_participants_thunk } from "@/app/redux/raffle-thunk";

const Page = () => {
    useEffect(() => {
        store.dispatch(get_participants_thunk());
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <HeaderSection />

            <div className="max-w-7xl mx-auto px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <RegistrationFormSection />

                    <QRScannerSection />
                </div>
                <ParticipantsListSection />
            </div>
        </div>
    );
};

export default Page;
