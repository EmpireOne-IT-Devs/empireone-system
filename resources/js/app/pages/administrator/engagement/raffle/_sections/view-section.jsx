import { Link } from '@inertiajs/react';
import Button from '../../../../../_components/button'

export default function ViewSection({data}) {
    return (
        <Link href={`/administrator/engagement/raffle/${data.id}`}>
            <Button>
                View
            </Button>
        </Link>
    );
}
