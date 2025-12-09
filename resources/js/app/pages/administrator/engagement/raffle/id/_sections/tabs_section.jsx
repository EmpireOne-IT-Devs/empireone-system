import { Link, router } from '@inertiajs/react';
import { FcConferenceCall } from 'react-icons/fc';
import { HiOutlineTrophy } from 'react-icons/hi2';
import { IoDocumentsSharp } from 'react-icons/io5';
import { HiMiniDocumentMagnifyingGlass } from "react-icons/hi2";
function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function TabsSection({ raffleId }) {
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    const isCurrentSub = pathSegments[4];

    const currentRaffleId = raffleId || pathSegments[3];

    if (!currentRaffleId) {
        console.error('TabsSection: raffleId is required');
        return null;
    }

    const tabs = [
        {
            name: 'Details',
            href: `/administrator/engagement/raffle/${currentRaffleId}`,
            icon: HiMiniDocumentMagnifyingGlass ,
            iconColor: 'text-blue-500',

            current: !isCurrentSub,
        },
        {
            name: 'Participants',
            href: `/administrator/engagement/raffle/${currentRaffleId}/participants`,
            icon: FcConferenceCall,
            current: isCurrentSub === 'participants',
        },
        {
            name: 'Winners',
            href: `/administrator/engagement/raffle/${currentRaffleId}/winners`,
            icon: HiOutlineTrophy,
            iconColor: 'text-yellow-500',
            current: isCurrentSub === 'winners',
        },
    ];

    return (
        <div>
            <div className="sm:hidden">
                <select
                    value={tabs.find((t) => t.current)?.href || tabs[0].href}
                    onChange={(e) => router.visit(e.target.value)}
                    aria-label="Select a tab"
                    className="block w-full rounded-md border-gray-300 py-2 pr-10 pl-3 text-base focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
                >
                    {tabs.map((tab, i) => (
                        <option value={tab.href} key={i}>
                            {tab.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="hidden sm:block">
                <div className="border-b border-gray-200">
                    <nav aria-label="Tabs" className="-mb-px flex space-x-8">
                        {tabs.map((tab, i) => (
                            <Link
                                key={i}
                                href={tab.href}
                                aria-current={tab.current ? 'page' : undefined}
                                className={classNames(
                                    tab.current
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                    'group inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium',
                                )}
                            >
                                <tab.icon
                                    className={classNames(
                                        tab.iconColor ||
                                            (tab.current
                                                ? 'text-indigo-500'
                                                : 'text-gray-400 group-hover:text-gray-500'),
                                        'mr-2 -ml-0.5 h-5 w-5',
                                    )}
                                />
                                <span>{tab.name}</span>
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
}
