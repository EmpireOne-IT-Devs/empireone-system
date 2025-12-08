import React, { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import store from "@/app/store/store";
import { get_participants_thunk } from "@/app/redux/participants-thunk";

const ITEM_HEIGHT = 100;
const MARGIN_VERTICAL = 10;
const TOTAL_ITEM_HEIGHT = ITEM_HEIGHT + 2 * MARGIN_VERTICAL;
const VIEWPORT_HEIGHT = 370;
const VIEWPORT_CENTER = VIEWPORT_HEIGHT / 2;
const SCALING_RANGE = TOTAL_ITEM_HEIGHT * 1.5;

/* -----------------------------------------
    Scaling Item (Enhanced with Thrill Effects)
----------------------------------------- */
const ScalingItem = ({ item, itemIndex, listY, isSpinning }) => {
    const itemCenterOffset =
        itemIndex * TOTAL_ITEM_HEIGHT + TOTAL_ITEM_HEIGHT / 2;

    const scale = useTransform(listY, (currentY) => {
        const itemAbsoluteY = itemCenterOffset + currentY;
        const distanceFromCenter = Math.abs(itemAbsoluteY - VIEWPORT_CENTER);
        const normalizedDistance = Math.min(distanceFromCenter, SCALING_RANGE);
        const baseScale = 1.2 - 0.2 * (normalizedDistance / SCALING_RANGE);
        
        // Add extra scaling effect when spinning for more drama
        return isSpinning ? baseScale * 1.1 : baseScale;
    });

    return (
        <motion.div
            style={{
                width: "90%",
                height: `${ITEM_HEIGHT}px`,
                margin: `${MARGIN_VERTICAL}px 5%`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: isSpinning ? "#2563EB" : "#1F2937",
                color: "#fff",
                borderRadius: "12px",
                fontSize: "1.4em",
                fontWeight: "700",
                boxShadow: isSpinning 
                    ? "0 0 10px rgba(37, 99, 235, 0.4)" 
                    : "0 0 3px rgba(255,255,255,0.1)",
                flexShrink: 0,
                scale,
                border: isSpinning ? "1px solid rgba(255,215,0,0.2)" : "none",
            }}
        >
            {item.attendee_name}
        </motion.div>
    );
};

/* -----------------------------------------
    Slot Machine Component
----------------------------------------- */
const SlotMachineSection = ({ participants, getWinner }) => {
    const listY = useMotionValue(0);
    const [isSpinning, setIsSpinning] = useState(false);
    const [winner, setWinner] = useState(null);
    const [duplicatedItems, setDuplicatedItems] = useState([]);

    const spinAudioRef = useRef(null);
    const winAudioRef = useRef(null);

    const LOOP_COUNT = 30;

    // Initialize duplicated items when participants change
    React.useEffect(() => {
        const newDuplicatedItems = Array.from(
            { length: LOOP_COUNT },
            () => participants
        ).flat();
        setDuplicatedItems(newDuplicatedItems);
    }, [participants]);

    /* -----------------------------------------
        SPIN LOGIC (ENHANCED WITH SLOW MOTION & THRILL)
    ----------------------------------------- */
    const spinToResult = async () => {
        if (isSpinning) return;
        setIsSpinning(true);
        setWinner(null); // Clear previous winner immediately

        await store.dispatch(get_participants_thunk());

        // Update duplicated items with fresh participant data
        const freshDuplicatedItems = Array.from(
            { length: LOOP_COUNT },
            () => participants
        ).flat();
        setDuplicatedItems(freshDuplicatedItems);

        if (spinAudioRef.current) {
            spinAudioRef.current.currentTime = 0;
            spinAudioRef.current.play();
        }

        // Always reset to the exact same starting position before spinning
        const startingPosition = 0;  // Start at the very beginning
        listY.set(startingPosition);

        const fullLoops = 10; // Increased from 3 to 10 for more loops

        // Generate a random stopping position in the duplicated items (after the minimum loops)
        const minIndex = fullLoops * participants.length;
        const maxIndex = freshDuplicatedItems.length - participants.length;
        const randomStopIndex = Math.floor(Math.random() * (maxIndex - minIndex)) + minIndex;

        /* -----------------------------------------------------
            SIMPLE 2-PHASE: FAST THEN SLOW STOP
        ------------------------------------------------------ */
        const finalY = -(randomStopIndex * TOTAL_ITEM_HEIGHT - (VIEWPORT_CENTER - TOTAL_ITEM_HEIGHT / 2));

        // Phase 1: Fast spin (4 seconds)
        await animate(listY, finalY * 0.7, {
            duration: 5,
            ease: "linear",
        });

        // Phase 2: Gradual slow down to stop (4 seconds)
        await animate(listY, finalY, {
            duration: 4,
            ease: [0.25, 0.46, 0.45, 0.94], // Smooth slow down curve
            onComplete: () => {
                if (spinAudioRef.current) spinAudioRef.current.pause();

                if (winAudioRef.current) {
                    winAudioRef.current.currentTime = 0;
                    winAudioRef.current.play();
                }

                setIsSpinning(false);

                // Determine the actual winner based on where the slot machine stopped
                const actualWinningObject = freshDuplicatedItems[randomStopIndex];

                // Call getWinner callback with the actual winner
                if (getWinner) getWinner(actualWinningObject);

                // Show the winner modal with dramatic delay
                setTimeout(() => {
                    setWinner(actualWinningObject);
                }, 1000); // Increased delay for more suspense

                // No reset needed - the next spin will handle positioning
            },
        });
    };

    return (
        <>
            <style>
                {`
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }

                    @keyframes scaleIn {
                        from { 
                            transform: scale(0.5);
                            opacity: 0;
                        }
                        to { 
                            transform: scale(1);
                            opacity: 1;
                        }
                    }

                    @keyframes flashBorder {
                        0%, 100% { 
                            box-shadow: 0 0 20px 5px rgba(255, 215, 0, 0.8);
                        }
                        50% { 
                            box-shadow: 0 0 40px 15px rgba(255, 215, 0, 1);
                        }
                    }

                    @keyframes gradient {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }

                    @keyframes confetti {
                        0% {
                            transform: translateY(0) rotate(0deg);
                            opacity: 1;
                        }
                        100% {
                            transform: translateY(100vh) rotate(720deg);
                            opacity: 0;
                        }
                    }

                    @keyframes pulse {
                        0% { transform: scale(1); }
                        50% { transform: scale(1.05); }
                        100% { transform: scale(1); }
                    }

                    @keyframes glow {
                        0%, 100% { 
                            box-shadow: 0 0 20px 5px rgba(59, 130, 246, 0.8);
                        }
                        50% { 
                            box-shadow: 0 0 40px 15px rgba(59, 130, 246, 1), 0 0 60px 25px rgba(147, 197, 253, 0.5);
                        }
                    }

                    @keyframes shake {
                        0%, 100% { transform: translateX(0); }
                        25% { transform: translateX(-5px); }
                        75% { transform: translateX(5px); }
                    }

                    .winner-modal-fade {
                        animation: fadeIn 0.3s ease-out;
                    }

                    .winner-modal-scale {
                        animation: scaleIn 0.5s ease-out;
                    }

                    .winner-flash-border {
                        animation: flashBorder 1s infinite;
                    }

                    .winner-gradient-text {
                        background-size: 200% 200%;
                        animation: gradient 3s ease infinite;
                    }

                    .winner-confetti {
                        animation: confetti linear forwards;
                    }

                    .spinning-glow {
                        animation: glow 1s infinite;
                    }

                    .spinning-pulse {
                        animation: pulse 2s infinite;
                    }
                `}
            </style>
            <div
                style={{
                    textAlign: "center",
                    fontFamily: "sans-serif",
                    backgroundColor: isSpinning ? "#0F0F0F" : "#111",
                    minHeight: "100vh",
                    paddingTop: "50px",
                    transition: "background-color 0.5s ease",
                }}
            >
                {/* Minimal Spinning Overlay Effects */}
                {isSpinning && (
                    <div className="fixed inset-0 z-10 pointer-events-none">
                        {/* Simple spotlight effect */}
                        <div 
                            className="absolute inset-0"
                            style={{
                                background: "radial-gradient(circle at center, rgba(255,215,0,0.05) 30%, rgba(0,0,0,0.3) 80%)",
                            }}
                        />
                    </div>
                )}
                {/* Audio */}
                <audio ref={spinAudioRef} src="/mp3/spin.wav" loop />
                <audio ref={winAudioRef} src="/mp3/win.wav" />

                {/* Slot Machine Viewport */}
                <div
                    className={`${isSpinning ? 'spinning-glow' : ''}`}
                    style={{
                        width: "320px",
                        height: `${VIEWPORT_HEIGHT}px`,
                        overflow: "hidden",
                        margin: "50px auto",
                        borderRadius: "24px",
                        backgroundColor: "#000",
                        border: isSpinning ? "5px solid #3b82f6" : "4px solid #FFD700",
                        boxShadow: isSpinning 
                            ? "0 0 30px rgba(59, 130, 246, 0.8)" 
                            : "0 0 20px rgba(255,215,0,0.6)",
                        position: "relative",
                        transition: "border 0.2s ease, box-shadow 0.2s ease",
                    }}
                >
                    <motion.div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            minHeight:
                                TOTAL_ITEM_HEIGHT * duplicatedItems.length +
                                "px",
                            y: listY,
                        }}
                    >
                        {duplicatedItems.map((item, idx) => (
                            <ScalingItem
                                key={idx}
                                item={item}
                                itemIndex={idx}
                                listY={listY}
                                isSpinning={isSpinning}
                            />
                        ))}
                    </motion.div>

                    {/* Center Indicator */}
                    <div
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: 0,
                            transform: "translateY(-50%)",
                            display: "flex",
                            alignItems: "center",
                            zIndex: 10,
                            width: "10%",
                        }}
                    >
                        <div
                            style={{
                                height: "10px",
                                backgroundColor: "red",
                                flex: 1,
                            }}
                        />
                        <div
                            style={{
                                width: 0,
                                height: 0,
                                borderTop: "10px solid transparent",
                                borderBottom: "10px solid transparent",
                                borderLeft: "16px solid red",
                            }}
                        />
                    </div>

                    {/* Gradient Overlay */}
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundImage:
                                "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,0) 80%, rgba(0,0,0,1) 100%)",
                            pointerEvents: "none",
                            zIndex: 5,
                        }}
                    />
                </div>

                {/* Spin Button */}
                <button
                    onClick={spinToResult}
                    disabled={isSpinning}
                    className={isSpinning ? 'spinning-pulse' : ''}
                    style={{
                        padding: "20px 40px",
                        fontSize: isSpinning ? "1.8em" : "1.5em",
                        fontWeight: "bold",
                        borderRadius: "15px",
                        border: isSpinning ? "4px solid #3b82f6" : "3px solid #FFD700",
                        backgroundColor: isSpinning ? "#2563eb" : "#1E3A8A",
                        color: isSpinning ? "#e0f2fe" : "#FFD700",
                        cursor: isSpinning ? "not-allowed" : "pointer",
                        boxShadow: isSpinning
                            ? "0 0 30px rgba(59, 130, 246, 0.8), 0 0 50px rgba(37, 99, 235, 0.6)"
                            : "0 0 15px rgba(255,215,0,0.9)",
                        marginTop: "20px",
                        transition: "all 0.3s ease",
                        textShadow: isSpinning ? "0 0 10px rgba(59, 130, 246, 0.8)" : "none",
                        transform: isSpinning ? "scale(1.1)" : "scale(1)",
                    }}
                >
                    {isSpinning ? "🎰 SPINNING... 🎰" : "🎯 SPIN THE SLOT MACHINE! 🎯"}
                </button>

                {/* Winner Modal */}
                {winner && (
                    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-90">
                        {/* Confetti - Reduced amount */}
                        <div className="absolute z-50 inset-0 overflow-hidden pointer-events-none">
                            {[...Array(20)].map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute"
                                    style={{
                                        left: `${Math.random() * 100}%`,
                                        top: `-10%`,
                                        width: "8px",
                                        height: "8px",
                                        borderRadius: "50%",
                                        backgroundColor: [
                                            "#ff6b6b",
                                            "#4ecdc4",
                                            "#45b7d1",
                                            "#f7b731",
                                            "#5f27cd",
                                        ][Math.floor(Math.random() * 5)],
                                        animation: `confetti ${
                                            2 + Math.random() * 1
                                        }s linear forwards`,
                                        animationDelay: `${Math.random() * 1}s`,
                                    }}
                                />
                            ))}
                        </div>

                        {/* Winner Card */}
                        <div className="relative bg-gradient-to-br from-yellow-400 via-yellow-300 to-orange-400 rounded-3xl shadow-2xl max-w-4xl w-full mx-8 overflow-hidden animate-scaleIn">
                            <button
                                onClick={() => setWinner(null)}
                                className="absolute top-6 right-6 bg-white hover:bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all transform hover:scale-110 z-10"
                            >
                                <svg
                                    className="w-6 h-6 text-gray-700"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>

                            <div className="relative p-12 text-center space-y-8">
                                <div className="text-9xl animate-bounce">
                                    🏆
                                </div>
                                <h2 className="text-7xl font-black text-white drop-shadow-2xl animate-pulse">
                                    🎉 WINNER! 🎉
                                </h2>
                                <p className="text-3xl font-bold text-yellow-900">
                                    Congratulations!
                                </p>

                                <div className="bg-white rounded-2xl p-8 shadow-2xl animate-pulse">
                                    <p className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-red-600 to-yellow-600">
                                        {winner.attendee_name}
                                    </p>
                                </div>

                                {winner.email && (
                                    <p className="text-2xl text-gray-700 font-semibold">
                                        📧 {winner.email}
                                    </p>
                                )}
                                {winner.contact_number && (
                                    <p className="text-2xl text-gray-700 font-semibold">
                                        📱 {winner.contact_number}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default SlotMachineSection;
