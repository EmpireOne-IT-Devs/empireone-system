const RaffleListSection = () => {
    const raffles = [];

    return (
        <div className="mb-12">
            <div className="mb-6 flex items-center">
                <div className="mr-3 h-8 w-1 rounded-full bg-blue-600"></div>
                <h2 className="text-3xl font-bold text-gray-800">
                    Active Raffles
                </h2>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-md">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {!raffles ||
                        (raffles.length === 0 && (
                            <div className="rounded-lg bg-white p-6 text-center shadow">
                                <p className="text-gray-500">
                                    No raffles available
                                </p>
                            </div>
                        ))}
                    {raffles.map((raffle) => (
                        <div
                            key={raffle.id}
                            className="rounded-lg bg-white p-6 shadow-lg transition hover:shadow-xl"
                        >
                            <h3 className="mb-2 text-xl font-bold">
                                {raffle.raffle_name}
                            </h3>
                            <p className="mb-4 text-gray-600">
                                {raffle.description}
                            </p>
                            <div className="flex items-center justify-between">
                                <span
                                    className={`rounded-full px-3 py-1 text-sm ${
                                        raffle.status === 'active'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-gray-100 text-gray-800'
                                    }`}
                                >
                                    {raffle.status}
                                </span>
                                <button className="text-blue-500 hover:text-blue-700">
                                    View Details →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RaffleListSection;
