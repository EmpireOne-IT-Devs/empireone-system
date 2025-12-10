
import { useSelector } from "react-redux";
import { create_winners_service } from "@/app/services/winners-service";
import store from "@/app/store/store";
import { get_winners_thunk } from "@/app/redux/winner-thunk";
import SlotMachineSection from "./slot-machine-section";

const WheelSection = () => {
    const { participants } = useSelector((store) => store.participants);

    async function get_winner(data) {
        console.log("Winner selected: ", data);
        try {
            await create_winners_service({
                ...data,
                participant_id: data.id,
                raffle_id: 1,
            });
            store.dispatch(get_winners_thunk());
        } catch (error) {}
    }

    return (
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    Spin to Win!
                </h2>
                <p className="text-gray-600">
                    Participants remaining:{" "}
                    <span className="font-bold text-green-600 text-xl">
                        {participants?.filter((p) => !p.is_winner).length || 0}
                    </span>
                </p>
            </div>

            {!participants || participants.length === 0 ? (
                <div className="flex justify-center items-center h-96">
                    <div className="text-center">
                        <div className="text-6xl mb-4">🎫</div>
                        <p className="text-gray-500 text-xl">
                            No participants available
                        </p>
                        <p className="text-gray-400 mt-2">
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
                <SlotMachineSection participants={participants} getWinner={get_winner} />
            )}
        </div>
    );
};

export default WheelSection;
