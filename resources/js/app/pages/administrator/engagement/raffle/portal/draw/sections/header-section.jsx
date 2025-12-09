import { Link } from '@inertiajs/react';

const HeaderSection = () => {
    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 px-8 py-8 text-white shadow-2xl">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${3 + Math.random() * 2}s`,
                        }}
                    >
                        <div className="text-2xl text-white opacity-50">
                            {
                                ['🎰', '🎲', '🍀', '⭐'][
                                    Math.floor(Math.random() * 4)
                                ]
                            }
                        </div>
                    </div>
                ))}
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

            <div className="relative z-10 mx-auto max-w-7xl">
                <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                    {/* Left Section - Title */}
                    <div className="flex-1 text-center md:text-left">
                        <div className="mb-4 inline-flex items-center space-x-4">
                            <div className="animate-bounce rounded-2xl bg-white/20 p-4 shadow-lg backdrop-blur-sm">
                                <span className="text-5xl">🎰</span>
                            </div>
                            <div>
                                <h1 className="bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 bg-clip-text text-6xl font-black tracking-tight text-transparent drop-shadow-lg">
                                    Raffle Draw
                                </h1>
                                <div className="mt-2 h-1 w-32 rounded-full bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400"></div>
                            </div>
                        </div>
                        <p className="flex items-center justify-center space-x-2 text-xl font-medium text-green-100 md:justify-start">
                            <span
                                className="animate-spin text-2xl"
                                style={{ animationDuration: '3s' }}
                            >
                                🎡
                            </span>
                            <span>Spin the wheel to select lucky winners</span>
                            <span className="text-2xl">✨</span>
                        </p>
                    </div>

                    {/* Right Section - Back Button */}
                    <div>
                        <Link
                            href={`/administrator/engagement/raffle/id_ni_sya/home`}
                            className="group relative flex transform items-center space-x-3 rounded-2xl border-2 border-white/30 bg-white/20 px-8 py-4 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white/50 hover:bg-white/30 hover:shadow-2xl"
                        >
                            <div className="rounded-full bg-white/20 p-2 transition-all duration-300 group-hover:bg-white/30">
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                    />
                                </svg>
                            </div>
                            <span className="text-lg font-bold">
                                Back to Dashboard
                            </span>
                        </Link>
                    </div>
                </div>

                {/* Bottom Decorative Elements */}
                <div className="mt-8 flex items-center justify-center space-x-4">
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                    <div className="flex space-x-2">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-yellow-400"></div>
                        <div
                            className="h-2 w-2 animate-pulse rounded-full bg-orange-400"
                            style={{ animationDelay: '0.2s' }}
                        ></div>
                        <div
                            className="h-2 w-2 animate-pulse rounded-full bg-yellow-400"
                            style={{ animationDelay: '0.4s' }}
                        ></div>
                    </div>
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                </div>
            </div>

            {/* Bottom Shadow Effect */}
            <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-20 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
    );
};

export default HeaderSection;
