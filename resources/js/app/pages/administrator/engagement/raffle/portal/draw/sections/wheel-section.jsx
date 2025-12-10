import {
    get_participants_thunk,
    get_winners_thunk,
} from '@/app/redux/raffle-thunk';
import { create_winners_service } from '@/app/services/winners-service';
import store from '@/app/store/store';
import { useSelector } from 'react-redux';
import SlotMachineSection from './slot-machine-section';
const WheelSection = () => {
    const { participants } = useSelector((store) => store.raffles);

    console.log('Winner selected: ', participants);
    async function get_winner(data) {
        console.log('Winner selected: ', data);
        try {
            await create_winners_service({
                ...data,
                participant_id: data.id,
                raffle_event_id: window.location.pathname.split('/')[4],
            });
            await store.dispatch(get_participants_thunk());
            await store.dispatch(get_winners_thunk());
        } catch (error) {}
    }

    return (
        <div className="rounded-2xl bg-white p-8 shadow-2xl lg:col-span-2">
            <div className="mb-6 text-center">
                <h2 className="mb-2 text-3xl font-bold text-gray-800">
                    Spin to Win!
                </h2>
                <p className="text-gray-600">
                    Participants remaining:{' '}
                    <span className="text-xl font-bold text-green-600">
                        {participants?.filter((p) => !p.is_winner).length || 0}
                    </span>
                </p>
            </div>

            {!participants || participants.length === 0 ? (
                <div className="flex h-96 items-center justify-center">
                    <div className="text-center">
                        <div className="mb-4 text-6xl">🎫</div>
                        <p className="text-xl text-gray-500">
                            No participants available
                        </p>
                        <p className="mt-2 text-gray-400">
                            Register participants first to start the draw
                        </p>
                    </div>
                </div>
            ) : (
                // <RouletteWheelSection
                //     participants={participants}
                //     getWinner={get_winner}
                //     // onWinnerSelected={handleWinnerSelected}
                // />
                <SlotMachineSection
                    participants={participants}
                    getWinner={get_winner}
                />
            )}
        </div>
    );
};

export default WheelSection;
