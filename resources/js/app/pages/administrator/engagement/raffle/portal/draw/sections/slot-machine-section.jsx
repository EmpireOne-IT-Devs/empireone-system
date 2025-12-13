import { get_participants_thunk } from '@/app/redux/raffle-thunk';
import store from '@/app/store/store';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { get_prizes_thunk } from '../../../../../../../redux/raffle-thunk';
import SelectPrizeSection from './select-prize-section';

const ITEM_HEIGHT = 100;
const MARGIN_VERTICAL = 10;
const TOTAL_ITEM_HEIGHT = ITEM_HEIGHT + 2 * MARGIN_VERTICAL;
const VIEWPORT_HEIGHT = 370;
const VIEWPORT_CENTER = VIEWPORT_HEIGHT / 2;
const SCALING_RANGE = TOTAL_ITEM_HEIGHT * 1.5;

// OPTIMIZATION: Reduce loop count for large datasets
const getOptimalLoopCount = (participantCount) => {
    if (participantCount > 200) return 8;  // For 360 participants
    if (participantCount > 100) return 12;
    return 20;
};

// OPTIMIZATION: Only render visible items + buffer
const VISIBLE_ITEMS = Math.ceil(VIEWPORT_HEIGHT / TOTAL_ITEM_HEIGHT) + 4; // 4 buffer items

/* -----------------------------------------
    Scaling Item (Optimized)
----------------------------------------- */
const ScalingItem = React.memo(
    ({
        item,
        itemIndex,
        listY,
        isSpinning,
        spinPhase,
        isFullscreen,
        containerHeight,
    }) => {
        const itemCenterOffset =
            itemIndex * TOTAL_ITEM_HEIGHT + TOTAL_ITEM_HEIGHT / 2;

        const dynamicViewportCenter = containerHeight / 2;

        const scale = useTransform(listY, (currentY) => {
            const itemAbsoluteY = itemCenterOffset + currentY;
            const distanceFromCenter = Math.abs(
                itemAbsoluteY - dynamicViewportCenter,
            );
            const normalizedDistance = Math.min(
                distanceFromCenter,
                SCALING_RANGE,
            );

            const baseScale = 1.2 - 0.3 * (normalizedDistance / SCALING_RANGE);

            let phaseMultiplier = 1;
            if (spinPhase >= 4 && !isSpinning) {
                phaseMultiplier = 1.1;
            }

            return baseScale * phaseMultiplier;
        });

        const opacity = useTransform(listY, (currentY) => {
            const itemAbsoluteY = itemCenterOffset + currentY;
            const distanceFromCenter = Math.abs(
                itemAbsoluteY - dynamicViewportCenter,
            );
            const normalizedDistance = Math.min(
                distanceFromCenter,
                SCALING_RANGE * 1.5,
            );

            return 1 - (normalizedDistance / (SCALING_RANGE * 1.5)) * 0.5;
        });

        const baseStyles = useMemo(
            () => ({
                width: '90%',
                height: `${ITEM_HEIGHT}px`,
                margin: `${MARGIN_VERTICAL}px 5%`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#fff',
                borderRadius: '12px',
                fontWeight: '700',
                flexShrink: 0,
                scale,
                opacity,
                willChange: 'transform, opacity',
            }),
            [scale, opacity],
        );

        // OPTIMIZATION: Simplified styles during fast spinning
        const getPhaseStyles = useMemo(() => {
            if (isSpinning && spinPhase < 3) {
                // Minimal styles during fast spin
                return {
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: 'none',
                    fontSize: '1.4em',
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                };
            }

            if (spinPhase >= 4) {
                return {
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: '0 0 30px rgba(102, 126, 234, 0.8), 0 0 60px rgba(118, 75, 162, 0.6)',
                    border: '3px solid #ffd700',
                    fontSize: '1.6em',
                    textShadow: '0 0 15px rgba(255, 215, 0, 0.8), 0 2px 4px rgba(0,0,0,0.5)',
                };
            } else if (spinPhase >= 3) {
                return {
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    boxShadow: '0 0 25px rgba(240, 147, 251, 0.7)',
                    border: '2px solid #ffd700',
                    fontSize: '1.5em',
                    textShadow: '0 0 12px rgba(255, 215, 0, 0.6)',
                };
            } else {
                return {
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                    fontSize: '1.4em',
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                };
            }
        }, [spinPhase, isSpinning]);

        return (
            <motion.div style={{ ...baseStyles, ...getPhaseStyles }}>
                <div style={{ textAlign: 'center', width: '100%' }}>
                    {item.name}
                </div>
            </motion.div>
        );
    },
);

/* -----------------------------------------
    Slot Machine Component
----------------------------------------- */
const SlotMachineSection = ({ participants, getWinner }) => {
    const listY = useMotionValue(0);
    const [isSpinning, setIsSpinning] = useState(false);
    const [spinPhase, setSpinPhase] = useState(0);
    const [winner, setWinner] = useState(null);
    const [duplicatedItems, setDuplicatedItems] = useState([]);
    const [hasWinner, setHasWinner] = useState(false);
    const idleAnimationRef = useRef(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const containerRef = useRef(null);
    const spinAudioRef = useRef(null);
    const winAudioRef = useRef(null);
    const tadaAudioRef = useRef(null);
    const slotContainerRef = useRef(null);
    const [containerHeight, setContainerHeight] = useState(VIEWPORT_HEIGHT);
    const [selectedPrize, setSelectedPrize] = useState(null);

    // OPTIMIZATION: Calculate optimal loop count based on participant size
    const LOOP_COUNT = useMemo(() => getOptimalLoopCount(participants.length), [participants.length]);

    useEffect(() => {
        if (winner) {
            store.dispatch(get_prizes_thunk());
        }
    }, [winner]);
    // const [prizeWinners, setPrizeWinners] = useState({});
    // ADD THIS STATE TO STORE PRIZE INFO
    // const [currentPrizeInfo, setCurrentPrizeInfo] = useState(null);

    // ADD THIS HELPER TO GET PRIZE INFO
    // const getPrizeInfo = (prizeKey) => {
    //     const prizes = [
    //         {
    //             name: 'Sack Of Rice',
    //             image: '/images/Rice-removebg-preview.png',
    //         },
    //         {
    //             name: 'Sack Of Rice',
    //             image: '/images/Rice-removebg-preview.png',
    //         },
    //         {
    //             name: 'Sack Of Rice',
    //             image: '/images/Rice-removebg-preview.png',
    //         },
    //         {
    //             name: 'Sack Of Rice',
    //             image: '/images/Rice-removebg-preview.png',
    //         },
    //         {
    //             name: 'Sack Of Rice',
    //             image: '/images/Rice-removebg-preview.png',
    //         },
    //         {
    //             name: 'Airconditioner',
    //             image: '/images/Aircon-removebg-preview.png',
    //         },
    //         {
    //             name: 'Airconditioner',
    //             image: '/images/Aircon-removebg-preview.png',
    //         },
    //         {
    //             name: 'Cellphone',
    //             image: '/images/cellphone-removebg-preview.png',
    //         },
    //         {
    //             name: 'Cellphone',
    //             image: '/images/cellphone-removebg-preview.png',
    //         },
    //         {
    //             name: 'Cellphone',
    //             image: '/images/cellphone-removebg-preview.png',
    //         },
    //         {
    //             name: 'Cellphone',
    //             image: '/images/cellphone-removebg-preview.png',
    //         },
    //         { name: 'Television', image: '/images/TV1-removebg-preview.png' },
    //         { name: 'Stand Fan', image: '/images/electric-fan.webp' },
    //         { name: 'Stand Fan', image: '/images/electric-fan.webp' },
    //         { name: 'Stand Fan', image: '/images/electric-fan.webp' },
    //     ];

    //     return prizes[prizeKey];
    // };

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);

            // Update container height when fullscreen changes
            setTimeout(() => {
                if (slotContainerRef.current) {
                    const height = slotContainerRef.current.clientHeight;
                    setContainerHeight(height);
                }
            }, 100);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);

        return () => {
            document.removeEventListener(
                'fullscreenchange',
                handleFullscreenChange,
            );
        };
    }, []);

    // Update container height on resize or initial load
    useEffect(() => {
        const updateHeight = () => {
            if (slotContainerRef.current) {
                const height = slotContainerRef.current.clientHeight;
                setContainerHeight(height);
            }
        };

        updateHeight();
        window.addEventListener('resize', updateHeight);

        return () => {
            window.removeEventListener('resize', updateHeight);
        };
    }, [isFullscreen]);

    const toggleFullscreen = () => {
        const el = containerRef.current;
        if (!document.fullscreenElement) {
            if (el.requestFullscreen) {
                el.requestFullscreen()
                    .then(() => setIsFullscreen(true))
                    .catch(console.error);
            } else if (el.webkitRequestFullscreen) {
                /* Safari */
                el.webkitRequestFullscreen();
                setIsFullscreen(true);
            } else if (el.msRequestFullscreen) {
                /* IE11 */
                el.msRequestFullscreen();
                setIsFullscreen(true);
            }
        } else {
            document
                .exitFullscreen()
                .then(() => setIsFullscreen(false))
                .catch(console.error);
        }
    };
    // Get CSS class names based on current state
    const getButtonClass = () => {
        if (spinPhase >= 4) return 'btn-phase-4';
        if (spinPhase >= 3) return 'btn-phase-3';
        if (isSpinning) return 'btn-spinning';
        return 'btn-idle';
    };

    const getContainerClass = () => {
        if (spinPhase >= 4) return 'container-phase-4';
        if (spinPhase >= 3) return 'container-phase-3';
        if (isSpinning) return 'container-spinning';
        return 'container-idle';
    };

    // OPTIMIZATION: Initialize duplicated items
    React.useEffect(() => {
        const newDuplicatedItems = Array.from(
            { length: LOOP_COUNT },
            () => participants,
        ).flat();
        setDuplicatedItems(newDuplicatedItems);
    }, [participants, LOOP_COUNT]);

    // Idle animation effect - slow continuous spin when not spinning and no winner
    React.useEffect(() => {
        const stopIdleAnimation = () => {
            if (idleAnimationRef.current) {
                idleAnimationRef.current.stop();
                idleAnimationRef.current = null;
            }
        };

        const startIdleAnimation = () => {
            if (!isSpinning && !hasWinner && duplicatedItems.length > 0) {
                // Create a slow, continuous upward spin movement
                const currentY = listY.get();

                idleAnimationRef.current = animate(listY, currentY - 10000, {
                    duration: 350,
                    repeat: Infinity,
                    ease: 'linear',
                });
            }
        };

        // Always stop animation first when spinning or has winner
        if (isSpinning || hasWinner) {
            stopIdleAnimation();
        } else if (duplicatedItems.length > 0) {
            // Small delay before starting idle animation only when no winner
            const timeout = setTimeout(startIdleAnimation, 500);
            return () => {
                clearTimeout(timeout);
                stopIdleAnimation();
            };
        }

        return stopIdleAnimation;
    }, [isSpinning, hasWinner, duplicatedItems]);

    /* -----------------------------------------
        SPIN LOGIC (MODIFIED TO CHECK PRIZE SELECTION)
    ----------------------------------------- */
    const spinToResult = async () => {
        if (!selectedPrize && selectedPrize !== 0) {
            alert('Please select a prize first!');
            return;
        }

        if (isSpinning) return;
        setIsSpinning(true);
        setSpinPhase(1);
        setWinner(null);
        setHasWinner(false);

        store.dispatch(get_participants_thunk());

        const freshDuplicatedItems = Array.from(
            { length: LOOP_COUNT },
            () => participants,
        ).flat();
        setDuplicatedItems(freshDuplicatedItems);

        if (spinAudioRef.current) {
            spinAudioRef.current.currentTime = 0;
            spinAudioRef.current.loop = true;
            const playPromise = spinAudioRef.current.play();

            if (playPromise !== undefined) {
                playPromise.catch((error) => {
                    console.log('Audio play failed:', error);
                });
            }
        }

        if (idleAnimationRef.current) {
            idleAnimationRef.current.stop();
            idleAnimationRef.current = null;
        }

        const startingPosition = 0;
        listY.set(startingPosition);

        // OPTIMIZATION: Reduce loops for large datasets (already spinning 8 times = 2,880 items visible)
        const fullLoops = participants.length > 200 ? 5 : 12;

        const minIndex = fullLoops * participants.length;
        const maxIndex = freshDuplicatedItems.length - participants.length;
        const randomStopIndex =
            Math.floor(Math.random() * (maxIndex - minIndex)) + minIndex;

        const finalY = -(
            randomStopIndex * TOTAL_ITEM_HEIGHT -
            (containerHeight / 2 - TOTAL_ITEM_HEIGHT / 2)
        );

        // OPTIMIZATION: Faster initial phases for large datasets
        setSpinPhase(1);
        await animate(listY, finalY * 0.4, {
            duration: participants.length > 200 ? 2 : 3,
            ease: 'linear',
        });

        setSpinPhase(2);
        await animate(listY, finalY * 0.75, {
            duration: participants.length > 200 ? 2.5 : 3.5,
            ease: [0.2, 0, 0.8, 1],
        });

        setSpinPhase(3);
        if (spinAudioRef.current) {
            spinAudioRef.current.playbackRate = 0.7;
        }
        await animate(listY, finalY * 0.95, {
            duration: 4.5,
            ease: [0.4, 0, 0.6, 1],
        });

        setSpinPhase(4);
        if (spinAudioRef.current) {
            spinAudioRef.current.playbackRate = 0.4;
        }
        await animate(listY, finalY, {
            duration: 7,
            ease: [0.08, 0.82, 0.17, 1],
        });

        setSpinPhase(5);
        if (spinAudioRef.current) {
            spinAudioRef.current.pause();
        }

        await animate(listY, finalY + TOTAL_ITEM_HEIGHT * 0.15, {
            duration: 0.4,
            ease: 'easeOut',
        });

        await animate(listY, finalY, {
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94],
        });

        if (tadaAudioRef.current) {
            tadaAudioRef.current.volume = 1.0;
            tadaAudioRef.current.currentTime = 0;
            tadaAudioRef.current.play().catch((error) => {
                console.log('Tada audio play failed:', error);
            });
        }

        setIsSpinning(false);
        setSpinPhase(0);
        setHasWinner(true);

        const actualWinningObject = freshDuplicatedItems[randomStopIndex];
        setWinner(actualWinningObject);
        if (getWinner)
            getWinner({
                ...actualWinningObject,
                participant_id: actualWinningObject.id,
                prize_id: selectedPrize.id,
            });

        if (spinAudioRef.current) {
            spinAudioRef.current.playbackRate = 1.0;
        }

        if (idleAnimationRef.current) {
            idleAnimationRef.current.stop();
            idleAnimationRef.current = null;
        }

        setTimeout(() => {
            if (winAudioRef.current) {
                winAudioRef.current.currentTime = 0;
                winAudioRef.current.play();
            }
        }, 1000);
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

                    @keyframes dramaticPulse {
                        0%, 100% { 
                            transform: scale(1);
                            box-shadow: 0 0 20px rgba(30, 64, 175, 0.8);
                        }
                        50% { 
                            transform: scale(1.08);
                            box-shadow: 0 0 60px rgba(30, 64, 175, 1), 0 0 100px rgba(59, 130, 246, 0.6);
                        }
                    }

                    @keyframes slowMotionGlow {
                        0%, 100% { 
                            filter: brightness(1) contrast(1);
                        }
                        50% { 
                            filter: brightness(1.3) contrast(1.2);
                        }
                    }

                    @keyframes finalMomentShake {
                        0%, 100% { transform: translateY(0) scale(1); }
                        25% { transform: translateY(-2px) scale(1.02); }
                        50% { transform: translateY(0) scale(1.05); }
                        75% { transform: translateY(-1px) scale(1.02); }
                    }

                    @keyframes rainbowGlow {
                        0% { 
                            box-shadow: 0 0 30px 10px rgba(255, 0, 0, 0.8);
                        }
                        16% { 
                            box-shadow: 0 0 30px 10px rgba(255, 127, 0, 0.8);
                        }
                        33% { 
                            box-shadow: 0 0 30px 10px rgba(255, 255, 0, 0.8);
                        }
                        50% { 
                            box-shadow: 0 0 30px 10px rgba(0, 255, 0, 0.8);
                        }
                        66% { 
                            box-shadow: 0 0 30px 10px rgba(0, 0, 255, 0.8);
                        }
                        83% { 
                            box-shadow: 0 0 30px 10px rgba(139, 0, 255, 0.8);
                        }
                        100% { 
                            box-shadow: 0 0 30px 10px rgba(255, 0, 0, 0.8);
                        }
                    }

                    @keyframes colorShift {
                        0% { filter: hue-rotate(0deg) brightness(1.2); }
                        50% { filter: hue-rotate(180deg) brightness(1.4); }
                        100% { filter: hue-rotate(360deg) brightness(1.2); }
                    }

                    @keyframes neonPulse {
                        0%, 100% { 
                            box-shadow: 0 0 20px rgba(255, 0, 255, 0.8), 0 0 40px rgba(0, 255, 255, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.1);
                        }
                        50% { 
                            box-shadow: 0 0 40px rgba(255, 0, 255, 1), 0 0 80px rgba(0, 255, 255, 0.8), inset 0 0 40px rgba(255, 255, 255, 0.2);
                        }
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
                        animation: none;
                    }

                    .spinning-pulse {
                        animation: none;
                    }

                    /* Button styles for better performance */
                    .btn-base {
                        padding: 20px 40px;
                        font-weight: bold;
                        border-radius: 15px;
                        margin-top: 20px;
                        transition: all 0.15s ease;
                    }

                    .btn-idle {
                        font-size: 1.5em;
                        border: 3px solid #FFD700;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: #FFD700;
                        cursor: pointer;
                        box-shadow: 0 0 20px rgba(255, 215, 0, 0.9), 0 5px 15px rgba(0, 0, 0, 0.3);
                        transform: scale(1);
                        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
                    }

                    .btn-idle:hover {
                        background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
                        box-shadow: 0 0 30px rgba(255, 215, 0, 1), 0 5px 20px rgba(0, 0, 0, 0.4);
                        transform: scale(1.05);
                    }

                    .btn-spinning {
                        font-size: 1.8em;
                        border: 4px solid #00f2fe;
                        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
                        color: #ffffff;
                        cursor: not-allowed;
                        box-shadow: 0 0 20px rgba(79, 172, 254, 0.7);
                        text-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
                        transform: scale(1.1);
                    }

                    .btn-phase-3 {
                        font-size: 2em;
                        border: 4px solid #f5576c;
                        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                        color: #ffffff;
                        cursor: not-allowed;
                        box-shadow: 0 0 30px rgba(240, 147, 251, 0.7);
                        text-shadow: 0 0 12px rgba(255, 255, 255, 0.7);
                        transform: scale(1.15);
                    }

                    .btn-phase-4 {
                        font-size: 2.2em;
                        border: 5px solid #ffd700;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
                        color: #ffffff;
                        cursor: not-allowed;
                        box-shadow: 0 0 60px rgba(255, 215, 0, 1), 0 0 100px rgba(102, 126, 234, 0.9);
                        text-shadow: 0 0 20px rgba(255, 215, 0, 1), 0 2px 4px rgba(0, 0, 0, 0.5);
                        transform: scale(1.2);
                        animation: dramaticPulse 0.8s infinite, rainbowGlow 1.5s infinite;
                    }

                    /* Container styles for better performance */
                    .container-base {
                        width: 320px;
                        height: ${VIEWPORT_HEIGHT}px;
                        overflow: hidden;
                        margin: 50px auto;
                        border-radius: 24px;
                        color: #ffffffff;
                        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
                        position: relative;
                        transition: all 0.15s ease;
                    }

                    .container-idle {
                        border: 4px solid #FFD700;
                        box-shadow: 0 0 30px rgba(255, 215, 0, 0.7), inset 0 0 30px rgba(255, 215, 0, 0.1);
                        transform: scale(1);
                    }

                    .container-spinning {
                        border: 5px solid #00f2fe;
                        box-shadow: 0 0 20px rgba(79, 172, 254, 0.5);
                        transform: scale(1);
                    }

                    .container-phase-3 {
                        border: 5px solid #f5576c;
                        box-shadow: 0 0 30px rgba(240, 147, 251, 0.6);
                        transform: scale(1.01);
                    }

                    .container-phase-4 {
                        border: 6px solid #ffd700;
                        box-shadow: 0 0 60px rgba(255, 215, 0, 1), 0 0 120px rgba(102, 126, 234, 0.7);
                        transform: scale(1.05);
                        animation: rainbowGlow 2s infinite;
                    }
                `}
            </style>

            <button
                onClick={toggleFullscreen}
                className="btn-base border border-gray-400 bg-gray-800 text-white hover:bg-gray-700"
            >
                {isFullscreen ? '🡽 Exit Fullscreen' : '🡾 Fullscreen'}
            </button>
            <div
                ref={containerRef}
                className={`container-base ${getContainerClass()} ${isSpinning ? 'spinning-glow' : ''}`}
                style={{
                    width: '100%',
                    height: `${VIEWPORT_HEIGHT}px`,
                    textAlign: 'center',
                    fontFamily: 'sans-serif',
                    background:
                        'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                    // background:
                    //     spinPhase >= 4
                    //         ? 'radial-gradient(circle at center, #667eea 0%, #764ba2 30%, #f093fb 60%, #0a0a0a 100%)'
                    //         : spinPhase >= 3
                    //           ? 'radial-gradient(circle at center, #f093fb 0%, #f5576c 40%, #1a1a2e 100%)'
                    //           : 'linear-gradient(180deg, #0a0a0a 0%, #1a1a2e 100%)',
                    minHeight: '100vh',
                    paddingTop: '50px',
                    // transition: 'background 0.3s ease',
                    // willChange: 'background',
                }}
            >
                {/* Minimal Spinning Overlay Effects - Only show when NOT spinning fast */}

                {/* Audio */}
                <audio
                    ref={spinAudioRef}
                    src="/mp3/1209.WAV"
                    loop
                    preload="auto"
                    onEnded={() => {
                        // Ensure seamless looping
                        if (isSpinning && spinAudioRef.current) {
                            spinAudioRef.current.currentTime = 0;
                            spinAudioRef.current.play();
                        }
                    }}
                />
                <audio ref={winAudioRef} src="/mp3/win.wav" preload="auto" />
                <audio
                    ref={tadaAudioRef}
                    src="/mp3/tada.wav"
                    preload="auto"
                    volume="9.0"
                />

                {/* Slot Machine Viewport */}
                <div className="flex flex-row-reverse items-center justify-center ">
                    <div className={isFullscreen ? 'w-[30%] ' : ''}>
                        {isFullscreen && (
                            <SelectPrizeSection
                                selectedPrize={selectedPrize}
                                setSelectedPrize={setSelectedPrize}
                                // prizeWinners={prizeWinners}
                            />
                        )}
                    </div>

                    <div
                        ref={slotContainerRef}
                        className={`${isFullscreen ? 'w-[50%]' : ''} container-base ${getContainerClass()} ${isSpinning ? 'spinning-glow' : ''}`}
                        style={{
                            width: isFullscreen ? '50%' : '320px',
                            maxWidth: isFullscreen ? 'none' : '320px',
                            height: isFullscreen
                                ? '70vh'
                                : `${VIEWPORT_HEIGHT}px`,
                        }}
                    >
                        <motion.div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                minHeight:
                                    TOTAL_ITEM_HEIGHT * duplicatedItems.length +
                                    'px',
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
                                    spinPhase={spinPhase}
                                    isFullscreen={isFullscreen}
                                    containerHeight={containerHeight}
                                />
                            ))}
                        </motion.div>

                        {/* Center Indicator - More colorful */}
                        <div
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: 0,
                                transform: 'translateY(-50%)',
                                display: 'flex',
                                alignItems: 'center',
                                zIndex: 10,
                                width: '10%',
                            }}
                        >
                            <div
                                style={{
                                    height: '12px',
                                    background:
                                        'linear-gradient(90deg, #ff0080, #ff8c00, #ffd700)',
                                    flex: 1,
                                    boxShadow:
                                        '0 0 15px rgba(255, 215, 0, 0.8)',
                                }}
                            />
                            <div
                                style={{
                                    width: 0,
                                    height: 0,
                                    borderTop: '12px solid transparent',
                                    borderBottom: '12px solid transparent',
                                    borderLeft: '18px solid #ffd700',
                                    filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))',
                                }}
                            />
                        </div>

                        {/* Gradient Overlay - More colorful */}
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                backgroundImage:
                                    'linear-gradient(to bottom, rgba(26, 26, 46, 1) 0%, rgba(26, 26, 46, 0) 20%, rgba(26, 26, 46, 0) 80%, rgba(26, 26, 46, 1) 100%)',
                                pointerEvents: 'none',
                                zIndex: 5,
                            }}
                        />
                    </div>
                </div>

                {/* Spin Button - MODIFIED TO CHECK PRIZE SELECTION */}
                <button
                    onClick={spinToResult}
                    disabled={
                        isSpinning || (!selectedPrize && selectedPrize !== 0)
                    }
                    className={`btn-base ${getButtonClass()} ${isSpinning ? 'spinning-pulse' : ''} ${!selectedPrize && selectedPrize !== 0 ? 'cursor-not-allowed opacity-50' : ''}`}
                >
                    {!selectedPrize && selectedPrize !== 0
                        ? '⚠️ SELECT A PRIZE FIRST! ⚠️'
                        : isSpinning
                          ? '🎰 SPINNING... 🎰'
                          : '🎯 SPIN THE SLOT MACHINE! 🎯'}
                </button>

                {/* Winner Modal - MODIFIED TO SHOW PRIZE */}
                {winner && (
                    <div className="bg-opacity-90 fixed inset-0 z-30 flex items-center justify-center bg-black">
                        {/* Confetti */}
                        <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden">
                            {[...Array(20)].map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute"
                                    style={{
                                        left: `${Math.random() * 100}%`,
                                        top: `-10%`,
                                        width: '8px',
                                        height: '8px',
                                        borderRadius: '50%',
                                        backgroundColor: [
                                            '#ff6b6b',
                                            '#4ecdc4',
                                            '#45b7d1',
                                            '#f7b731',
                                            '#5f27cd',
                                        ][Math.floor(Math.random() * 5)],
                                        animation: `confetti ${2 + Math.random() * 1}s linear forwards`,
                                        animationDelay: `${Math.random() * 1}s`,
                                    }}
                                />
                            ))}
                        </div>

                        {/* Winner Card */}
                        <div className="animate-scaleIn relative w-full max-w-4xl overflow-hidden rounded-3xl bg-gradient-to-br from-yellow-400 via-yellow-300 to-orange-400 shadow-2xl">
                            <button
                                onClick={() => {
                                    setWinner(null);
                                    setHasWinner(false);
                                    // DON'T reset selectedPrize - keep it so prize list can update properly
                                    // setSelectedPrize(null);
                                    setTimeout(() => {
                                        if (
                                            !isSpinning &&
                                            duplicatedItems.length > 0
                                        ) {
                                            const currentY = listY.get();
                                            idleAnimationRef.current = animate(
                                                listY,
                                                currentY - 10000,
                                                {
                                                    duration: 350,
                                                    repeat: Infinity,
                                                    ease: 'linear',
                                                },
                                            );
                                        }
                                    }, 100);
                                }}
                                className="absolute top-6 right-6 z-10 flex h-12 w-12 transform items-center justify-center rounded-full bg-white shadow-lg transition-all hover:scale-110 hover:bg-gray-100"
                            >
                                <svg
                                    className="h-6 w-6 text-gray-700"
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

                            <div className="relative space-y-8 p-12 text-center">
                                <div className="animate-bounce text-9xl">
                                    🏆
                                </div>
                                <h2 className="animate-pulse text-7xl font-black text-white drop-shadow-2xl">
                                    🎉 WINNER! 🎉
                                </h2>
                                <p className="text-3xl font-bold text-yellow-900">
                                    Congratulations!
                                </p>

                                <div className="animate-pulse rounded-2xl bg-white p-8 shadow-2xl">
                                    <p className="bg-gradient-to-r from-yellow-600 via-red-600 to-yellow-600 bg-clip-text text-6xl font-extrabold text-transparent">
                                        {winner.name}
                                    </p>
                                </div>

                                {/* PRIZE SECTION */}
                                <div className="space-y-4">
                                    <p className="text-3xl font-bold text-yellow-900">
                                        {/* {currentPrizeInfo.isGrand
                                            ? 'GRAND PRIZE'
                                            : 'Prize Won'} */}
                                        Prize Won
                                    </p>

                                    <div className="flex items-center justify-center gap-6 rounded-2xl bg-white p-6 shadow-2xl">
                                        <img
                                            src={selectedPrize.url}
                                            alt={selectedPrize.name}
                                            className="h-32 w-auto animate-pulse object-contain"
                                            onError={(e) => {
                                                e.target.src =
                                                    '/images/placeholder.jpg';
                                            }}
                                        />
                                        <div className="text-left">
                                            <p className="bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-600 bg-clip-text text-4xl font-extrabold text-transparent">
                                                {selectedPrize.name}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {winner.email && (
                                    <p className="text-2xl font-semibold text-gray-700">
                                        📧 {winner.email}
                                    </p>
                                )}
                                {winner.contact && (
                                    <p className="text-2xl font-semibold text-gray-700">
                                        📱 {winner.contact}
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
