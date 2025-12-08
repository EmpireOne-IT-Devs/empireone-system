import moment from 'moment';
import BackSection from './back-section';

export default function DetailSection({ raffle }) {
    return (
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
           <div className="mb-4 px-4 sm:px-6"><BackSection /></div> 
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
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">
                            Event Name
                        </dt>
                        <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                            {raffle?.event_name || raffle?.name || '—'}
                        </dd>
                    </div>

                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">
                            Event Type
                        </dt>
                        <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10 ring-inset">
                                {raffle?.event_type || '—'}
                            </span>
                        </dd>
                    </div>

                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">
                            Description
                        </dt>
                        <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                            {raffle?.description || '—'}
                        </dd>
                    </div>

                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">
                            Start Date
                        </dt>
                        <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                            {raffle?.start_date
                                ? moment(raffle.start_date).format(
                                      'MMMM DD, YYYY',
                                  )
                                : '—'}
                        </dd>
                    </div>

                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">
                            End Date
                        </dt>
                        <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                            {raffle?.end_date
                                ? moment(raffle.end_date).format(
                                      'MMMM DD, YYYY',
                                  )
                                : '—'}
                        </dd>
                    </div>

                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">
                            Winners
                        </dt>
                        <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                            {raffle?.winners ||
                                raffle?.number_of_winners ||
                                '—'}
                        </dd>
                    </div>

                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">
                            Participant Source
                        </dt>
                        <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                            <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-gray-600/20 ring-inset">
                                {raffle?.participant_source === 'manual'
                                    ? 'Manual Input'
                                    : raffle?.participant_source === 'csv'
                                      ? 'CSV Upload'
                                      : '—'}
                            </span>
                        </dd>
                    </div>

                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">
                            Participants
                        </dt>
                        <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                            {raffle?.participants ? (
                                Array.isArray(raffle.participants) ? (
                                    <div className="flex flex-wrap gap-1">
                                        {raffle.participants.map(
                                            (participant, idx) => (
                                                <span
                                                    key={idx}
                                                    className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset"
                                                >
                                                    {participant}
                                                </span>
                                            ),
                                        )}
                                    </div>
                                ) : (
                                    raffle.participants
                                )
                            ) : (
                                '—'
                            )}
                        </dd>
                    </div>

                    <div className="px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">
                            Prizes
                        </dt>
                        <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0 sm:pl-4">
                            {raffle?.prizes &&
                            Array.isArray(raffle.prizes) &&
                            raffle.prizes.length > 0 ? (
                                <div className="space-y-2">
                                    {raffle.prizes.map((prize, idx) => (
                                        <div
                                            key={idx}
                                            className="rounded-lg border border-gray-200 bg-gray-50 p-3"
                                        >
                                            <div className="font-medium text-gray-900">
                                                {idx + 1}. {prize.name}
                                            </div>
                                            <div className="mt-1 text-sm text-gray-600">
                                                Quantity: {prize.quantity}
                                                {prize.value && (
                                                    <span className="ml-3">
                                                        Value: {prize.value}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                '—'
                            )}
                        </dd>
                    </div>

                    {/* Created At */}
                    {/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">
                            Created At
                        </dt>
                        <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                            {raffle?.created_at
                                ? moment(raffle.created_at).format(
                                      'MMMM DD, YYYY hh:mm A',
                                  )
                                : '—'}
                        </dd>
                    </div> */}
                </dl>
            </div>
        </div>
    );
}
