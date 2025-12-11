import React from 'react';
import { useSelector } from 'react-redux';

const HeaderSection = () => {
    const { events } = useSelector((state) => state.raffles);
    // Add the font import
    React.useEffect(() => {
        const link = document.createElement('link');
        link.href =
            'https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cinzel:wght@400;700&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }, []);

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white shadow-2xl">
            <div className="absolute inset-0 opacity-10">
                {[...Array(25)].map((_, i) => (
                    <img
                        key={i}
                        src="/images/empireone.png-removebg-preview.png"
                        alt=""
                        className="absolute animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            width: `${50 + Math.random() * 70}px`,
                            height: `${50 + Math.random() * 70}px`,
                            animationDelay: `${Math.random() * 4}s`,
                            animationDuration: `${4 + Math.random() * 4}s`,
                            transform: `rotate(${Math.random() * 360}deg)`,
                        }}
                    />
                ))}
            </div>

            <div className="absolute inset-0 opacity-30">
                {[...Array(150)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 3}s`,
                        }}
                    >
                        <div
                            className="rounded-full bg-white shadow-lg"
                            style={{
                                width: `${1 + Math.random() * 3}px`,
                                height: `${1 + Math.random() * 3}px`,
                                boxShadow: '0 0 4px rgba(255, 255, 255, 0.8)',
                            }}
                        />
                    </div>
                ))}
            </div>

            <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-0 left-1/4 h-96 w-96 animate-pulse rounded-full bg-purple-500 opacity-20 blur-3xl"></div>
                <div
                    className="absolute right-1/4 bottom-0 h-96 w-96 animate-pulse rounded-full bg-blue-500 opacity-20 blur-3xl"
                    style={{ animationDelay: '1s' }}
                ></div>
            </div>

            <div className="relative z-10 mx-auto max-w-6xl">
                <div className="space-y-8 text-center">
                    <div className="inline-block animate-bounce">
                        <img
                            src="/images/newlogo.png"
                            alt="Slot Machine"
                            className="mb-2 h-12 w-40 drop-shadow-2xl"
                            style={{
                                filter: 'drop-shadow(0 0 20px rgba(0, 191, 255, 0.8))',
                            }}
                        />
                    </div>

                    <div className="space-y-5">
                        <h1
                            className="text-9xl tracking-tight"
                            style={{
                                // fontFamily: "'Great Vibes', cursive",
                                textShadow:
                                    '0 0 40px rgba(255, 215, 0, 0.5), 0 0 80px rgba(255, 215, 0, 0.3)',
                            }}
                        >
                            <span className="bg-gradient-to-r from-yellow-200 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
                                <strong>EmpireOne</strong>
                            </span>
                        </h1>
                        <h2
                            className="overflow-visible text-7xl tracking-wider"
                            style={{
                                // fontFamily: "'Great Vibes', cursive",
                                textShadow: '0 0 30px rgba(147, 197, 253, 0.5)',
                            }}
                        >
                            <span className="bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
                                <strong>Grand Raffle Draw</strong>
                            </span>
                        </h2>
                    </div>

                    <div className="flex items-center justify-center space-x-6 py-6">
                        <div className="flex items-center space-x-2">
                            <div className="text-2xl opacity-60">✨</div>
                            <div className="h-0.5 w-32 rounded-full bg-gradient-to-r from-transparent via-yellow-400 to-yellow-400"></div>
                        </div>
                        <div
                            className="animate-spin text-5xl"
                            style={{
                                animationDuration: '4s',
                                filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))',
                            }}
                        >
                            ⭐
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="h-0.5 w-32 rounded-full bg-gradient-to-l from-transparent via-yellow-400 to-yellow-400"></div>
                            <div className="text-2xl opacity-60">✨</div>
                        </div>
                    </div>

                    <div className="inline-block transform rounded-3xl border-2 border-yellow-400/40 bg-gradient-to-r from-white/10 to-white/5 px-10 py-5 shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-yellow-400/60">
                        <p
                            className="text-4xl font-bold text-yellow-300 drop-shadow-lg"
                            style={{
                                fontFamily: "'Cinzel', serif",
                                textShadow: '0 0 20px rgba(253, 224, 71, 0.5)',
                            }}
                        >
                            🎉 {events?.name ?? 'Year End Party'} 🎉
                        </p>
                    </div>

                    <div className="flex items-center justify-center space-x-10 pt-6 text-3xl">
                        <span
                            className="transform animate-bounce cursor-pointer opacity-80 transition-transform hover:scale-125"
                            style={{
                                animationDelay: '0s',
                                animationDuration: '2s',
                                filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))',
                            }}
                        >
                            🎁
                        </span>
                        <span
                            className="transform animate-bounce cursor-pointer opacity-80 transition-transform hover:scale-125"
                            style={{
                                animationDelay: '0.2s',
                                animationDuration: '2s',
                                filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))',
                            }}
                        >
                            ✨
                        </span>
                        <span
                            className="transform animate-bounce cursor-pointer opacity-80 transition-transform hover:scale-125"
                            style={{
                                animationDelay: '0.4s',
                                animationDuration: '2s',
                                filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))',
                            }}
                        >
                            🏆
                        </span>
                        <span
                            className="transform animate-bounce cursor-pointer opacity-80 transition-transform hover:scale-125"
                            style={{
                                animationDelay: '0.6s',
                                animationDuration: '2s',
                                filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))',
                            }}
                        >
                            ✨
                        </span>
                        <span
                            className="transform animate-bounce cursor-pointer opacity-80 transition-transform hover:scale-125"
                            style={{
                                animationDelay: '0.8s',
                                animationDuration: '2s',
                                filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))',
                            }}
                        >
                            🎁
                        </span>
                    </div>
                </div>
            </div>

            <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-40 bg-gradient-to-t from-black via-black/50 to-transparent opacity-40"></div>
        </div>
    );
};

export default HeaderSection;
