import { Link } from '@inertiajs/react';
const HeaderSection = () => {
    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 px-8 py-16 text-white shadow-2xl">
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
                                ['📋', '✓', '👤', '⭐'][
                                    Math.floor(Math.random() * 4)
                                ]
                            }
                        </div>
                    </div>
                ))}
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

            {/* Top Decorative Border */}
            <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500"></div>

            <div className="relative z-10 mx-auto max-w-7xl">
                <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                    {/* Left Section - Title */}
                    <div className="flex-1 text-center md:text-left">
                        <div className="mb-4 inline-flex items-center space-x-4">
                            <div className="animate-bounce rounded-2xl bg-white/20 p-4 shadow-lg backdrop-blur-sm">
                                <span className="text-5xl">📋</span>
                            </div>
                            <div>
                                <h1 className="bg-gradient-to-r from-blue-200 via-blue-100 to-white bg-clip-text pb-3 text-6xl font-black tracking-tight text-transparent drop-shadow-lg">
                                    Participant Registration
                                </h1>
                                <div className="mt-2 h-1 w-48 rounded-full bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400"></div>
                            </div>
                        </div>

                        {/* Subtitle with Icons */}
                        <div className="inline-block rounded-2xl border border-white/20 bg-white/10 px-6 py-4 shadow-lg backdrop-blur-md">
                            <p className="flex items-center justify-center space-x-3 text-xl font-medium text-blue-100 md:justify-start">
                                <span className="flex items-center space-x-2 rounded-lg bg-blue-500/30 px-3 py-1">
                                    <span className="text-2xl">✍️</span>
                                    <span>Manual Entry</span>
                                </span>
                                <span className="text-blue-300">or</span>
                                <span className="flex items-center space-x-2 rounded-lg bg-indigo-500/30 px-3 py-1">
                                    <span className="text-2xl">📱</span>
                                    <span>QR Scan</span>
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Right Section - Back Button */}
                    <div>
                        <Link
                            href="/raffle/home"
                            className="group relative flex transform items-center space-x-3 rounded-2xl border-2 border-white/30 bg-white/20 px-8 py-4 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white/50 hover:bg-white/30 hover:shadow-2xl"
                        >
                            <div className="rounded-full bg-white/20 p-2 transition-all duration-300 group-hover:scale-110 group-hover:bg-white/30">
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
                        <div className="h-2 w-2 animate-pulse rounded-full bg-blue-400"></div>
                        <div
                            className="h-2 w-2 animate-pulse rounded-full bg-indigo-400"
                            style={{ animationDelay: '0.2s' }}
                        ></div>
                        <div
                            className="h-2 w-2 animate-pulse rounded-full bg-purple-400"
                            style={{ animationDelay: '0.4s' }}
                        ></div>
                    </div>
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                </div>
            </div>

            {/* Bottom Shadow Effect */}
            <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-20 bg-gradient-to-t from-black/20 to-transparent"></div>

            {/* Corner Decorations */}
            <div className="absolute top-0 left-0 h-40 w-40 rounded-br-full bg-gradient-to-br from-blue-400/20 to-transparent"></div>
            <div className="absolute right-0 bottom-0 h-40 w-40 rounded-tl-full bg-gradient-to-tl from-indigo-400/20 to-transparent"></div>
        </div>
    );
};

export default HeaderSection;
