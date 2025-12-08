import { Link } from "@inertiajs/react";
import { FcUpLeft } from "react-icons/fc";

export default function BackSection() {
    return (
        <div>
            <Link
                href="/administrator/engagement/raffle"
                className="flex gap-3 text-2xl font-semibold text-gray-900 my-3"
            >
                <FcUpLeft /> Back
            </Link>
            
        </div>
    );
}
