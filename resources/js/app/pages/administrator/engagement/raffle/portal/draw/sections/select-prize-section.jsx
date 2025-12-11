import { useState } from 'react';

export default function SelectPrizeSection({ selectedPrize, setSelectedPrize, prizeWinners }) {
    const grandPrize = {
        name: 'Motorcycle',
        image: '/images/Motorcycle-removebg-preview.png',
        isGrand: true,
    };

    const prizes = [
        { name: 'Sack Of Rice', image: '/images/Rice-removebg-preview.png' },
        { name: 'Sack Of Rice', image: '/images/Rice-removebg-preview.png' },
        { name: 'Sack Of Rice', image: '/images/Rice-removebg-preview.png' },
        { name: 'Sack Of Rice', image: '/images/Rice-removebg-preview.png' },
        { name: 'Sack Of Rice', image: '/images/Rice-removebg-preview.png' },
        { name: 'Airconditioner', image: '/images/Aircon-removebg-preview.png' },
        { name: 'Airconditioner', image: '/images/Aircon-removebg-preview.png' },
        { name: 'Cellphone', image: '/images/cellphone-removebg-preview.png' },
        { name: 'Cellphone', image: '/images/cellphone-removebg-preview.png' },
        { name: 'Cellphone', image: '/images/cellphone-removebg-preview.png' },
        { name: 'Cellphone', image: '/images/cellphone-removebg-preview.png' },
        { name: 'Television', image: '/images/TV1-removebg-preview.png' },
        { name: 'Stand Fan', image: '/images/electric-fan.webp' },
        { name: 'Stand Fan', image: '/images/electric-fan.webp' },
        { name: 'Stand Fan', image: '/images/electric-fan.webp' },
    ];

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

            {/* Grand Prize */}
            <div className="flex justify-center">
                <button
                    onClick={() => !prizeWinners['grand'] && setSelectedPrize('grand')}
                    disabled={prizeWinners['grand']}
                    className={`pulse-grand relative h-24 w-40 overflow-hidden rounded-xl border-3 transition-all duration-300 ${
                        prizeWinners['grand']
                            ? 'opacity-60 cursor-not-allowed border-gray-400 bg-gray-200'
                            : selectedPrize === 'grand'
                                ? 'scale-105 border-amber-400 bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-50 shadow-2xl'
                                : 'border-amber-300 bg-gradient-to-br from-amber-100 via-yellow-100 to-amber-100 shadow-xl hover:scale-105 hover:shadow-2xl'
                    }`}
                >
                    <div className="absolute top-0 right-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
                    <div className="absolute right-0 bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>

                    <div className="flex h-full w-full flex-col items-center justify-center gap-1 p-2">
                        <span className="text-[10px] font-semibold tracking-widest text-amber-600 uppercase">
                            ⭐ Grand Prize ⭐
                        </span>
                        {prizeWinners['grand'] ? (
                            <div className="flex flex-col items-center">
                                <img
                                    src={grandPrize.image}
                                    alt={grandPrize.name}
                                    className="max-h-10 w-auto object-contain opacity-50"
                                />
                                <span className="text-[8px] font-bold text-green-600 mt-1">
                                    🏆 {prizeWinners['grand'].name}
                                </span>
                            </div>
                        ) : selectedPrize === 'grand' ? (
                            <img
                                src={grandPrize.image}
                                alt={grandPrize.name}
                                className="max-h-14 w-auto object-contain"
                            />
                        ) : (
                            <span className="text-md bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-600 bg-clip-text font-bold text-transparent">
                                {grandPrize.name}
                            </span>
                        )}
                    </div>
                </button>
            </div>

            {/* Regular Prizes */}
            <div className="flex w-full flex-row flex-wrap items-center justify-center gap-4">
                {prizes.map((prize, index) => {
                    const hasWinner = prizeWinners[index];
                    const isSelected = selectedPrize === index;
                    
                    return (
                        <button
                            key={index}
                            onClick={() => !hasWinner && setSelectedPrize(index)}
                            disabled={hasWinner}
                            className={`pulse-regular relative flex h-24 w-40 flex-col items-center justify-center rounded-md border-2 p-1.5 transition-all ${
                                hasWinner
                                    ? 'opacity-60 cursor-not-allowed border-gray-400 bg-gray-200'
                                    : isSelected
                                        ? 'border-blue-500 bg-blue-50 text-blue-700 scale-105'
                                        : 'border-gray-300 hover:border-gray-400 '
                            }`}
                        >
                            {/* PRIZE Label at the top */}
                            <div className="absolute top-0.5 right-0 left-0">
                                <span className={`text-[10px] font-semibold tracking-wider uppercase ${hasWinner ? 'text-gray-400' : 'text-yellow-500'}`}>
                                    <strong>{hasWinner ? '✓ Won' : 'Prize'}</strong>
                                </span>
                            </div>

                            {/* Prize Content */}
                            <div className="mt-3 flex h-full flex-col items-center justify-center gap-1">
                                {hasWinner ? (
                                    <>
                                        <img
                                            src={prize.image}
                                            alt={prize.name}
                                            className="max-h-10 max-w-full object-contain opacity-50"
                                            onError={(e) => {
                                                e.target.src = '/images/placeholder.jpg';
                                            }}
                                        />
                                        <span className="text-[8px] font-bold text-green-600 text-center">
                                            🏆 {hasWinner.name}
                                        </span>
                                    </>
                                ) : isSelected ? (
                                    <img
                                        src={prize.image}
                                        alt={prize.name}
                                        className="max-h-full max-w-full object-contain"
                                        onError={(e) => {
                                            e.target.src = '/images/placeholder.jpg';
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
