import { useSelector } from 'react-redux';

export default function SelectPrizeSection({
    selectedPrize,
    setSelectedPrize,
    // prizeWinners,
}) {
    const { prizes } = useSelector((state) => state.raffles);

    return (
        <div className="space-y-4 p-4">
            <style>{`
                @keyframes pulse {
                    0%, 100% {
                        transform: scale(1);
                        box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.7);
                    }
                    50% {
                        transform: scale(1.05);
                        box-shadow: 0 0 0 10px rgba(251, 191, 36, 0);
                    }
                }
                
                @keyframes pulse-blue {
                    0%, 100% {
                        transform: scale(1);
                        box-shadow: 0 0 0 0 rgba(236, 232, 0, 0.7);
                    }
                    50% {
                        transform: scale(1.05);
                        box-shadow: 0 0 0 8px rgba(59, 130, 246, 0);
                    }
                }
                
                .pulse-grand {
                    animation: pulse 2s infinite;
                }
                
                .pulse-regular {
                    animation: pulse-blue 3s infinite;
                }
            `}</style>

            {/* Regular Prizes */}
            <div className="flex w-full flex-row flex-wrap items-center justify-center gap-4">
                {prizes.map((prize, index) => {
                    // const hasWinner2 = prizeWinners[prize.id];
                    const hasWinner = prize?.winner;
                    const isSelected = selectedPrize?.id === prize?.id;
                    console.log('prize', prize?.winner);
                    return (
                        <button
                            key={index}
                            onClick={() =>
                                !hasWinner && setSelectedPrize(prize)
                            }
                            disabled={hasWinner}
                            className={`pulse-regular relative flex h-24 w-40 flex-col items-center justify-center rounded-md border-2 p-1.5 transition-all ${
                                hasWinner
                                    ? 'cursor-not-allowed border-gray-400 bg-gray-200 opacity-60'
                                    : isSelected
                                      ? 'scale-105 border-blue-500 bg-blue-50 text-blue-700'
                                      : 'border-gray-300 hover:border-gray-400'
                            }`}
                        >
                            {/* PRIZE Label at the top */}
                            <div className="absolute top-0.5 right-0 left-0">
                                <span
                                    className={`text-[10px] font-semibold tracking-wider uppercase ${hasWinner ? 'text-gray-400' : 'text-yellow-500'}`}
                                >
                                    <strong>
                                        {hasWinner ? '✓ Won' : 'Prize'}
                                    </strong>
                                </span>
                            </div>

                            {/* Prize Content */}
                            <div className="mt-3 flex h-full flex-col items-center justify-center gap-1">
                                {hasWinner ? (
                                    <>
                                        <img
                                            src={prize.url}
                                            alt={prize.name}
                                            className="max-h-10 max-w-full object-contain opacity-50"
                                            onError={(e) => {
                                                e.target.src =
                                                    '/images/placeholder.jpg';
                                            }}
                                        />
                                        <span className="text-center text-[8px] font-bold text-green-600">
                                            🏆 {hasWinner.name}
                                        </span>
                                    </>
                                ) : isSelected ? (
                                    <img
                                        src={prize.url}
                                        alt={prize.name}
                                        className="max-h-full max-w-full object-contain"
                                        onError={(e) => {
                                            e.target.src =
                                                '/images/placeholder.jpg';
                                        }}
                                    />
                                ) : (
                                    <span className="px-1 text-center text-sm leading-tight font-semibold">
                                        <strong>{prize.name}</strong>
                                    </span>
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
