import moment from 'moment';

export default function DetailSection({ raffle }) {
    return (
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="flex justify-between px-4 py-6 sm:px-6">
                <div className="items-start">
                    <h3 className="text-base font-semibold text-gray-900">
                        Event Information
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Details and description of the event.
                    </p>
                </div>
            </div>

            <div className="border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    {/* Name */}
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">
                            Name
                        </dt>
                        <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                            {raffle?.name}
                        </dd>
                    </div>

                    {/* Description */}
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">
                            Description
                        </dt>
                        <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                            {raffle?.description}
                        </dd>
                    </div>

                    {/* Start Event */}
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">
                            Start event
                        </dt>
                        <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                            {raffle?.start
                                ? moment(raffle.start).format('LLL')
                                : '—'}
                        </dd>
                    </div>

                    {/* End Event */}
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">
                            End event
                        </dt>
                        <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                            {raffle?.end_event
                                ? moment(raffle.end_event).format('LLL')
                                : '—'}
                        </dd>
                    </div>

                    {/* Winner */}
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">
                            Winner
                        </dt>
                        <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                            {raffle?.winner || '—'}
                        </dd>
                    </div>
                </dl>

                <div className="border-t border-gray-200" />

                {/* Empty Table Template */}
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border border-gray-200 text-left text-sm text-gray-700">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-3 py-2">Prizes</th>
                                <th className="border px-3 py-2">
                                    Prizes Name
                                </th>
                                <th className="border px-3 py-2">Quantity</th>
                                <th className="border px-3 py-2">Value</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td
                                    colSpan={4}
                                    className="border px-3 py-4 text-center text-gray-500 italic"
                                >
                                    No prize data available
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
