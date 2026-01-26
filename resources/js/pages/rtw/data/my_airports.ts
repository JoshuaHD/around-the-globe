import { getFilteredAirports } from '@/pages/rtw/data/airports';
import { flights } from '@/rtw/trips';

export default getFilteredAirports(
    flights
        .toSorted(
            // (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
            (a, b) => a.id - b.id,
        )
        .flatMap((flight) => [
            flight.departure.airport_code,
            flight.arrival.airport_code,
        ]),
);
