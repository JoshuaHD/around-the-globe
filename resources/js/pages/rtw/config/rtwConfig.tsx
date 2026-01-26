import type { GlobeProps } from 'react-globe.gl';
import type { Trip } from '@/pages/rtw/types';

const OPACITY = 0.7;

export const initialRtwConfig: GlobeProps = {
    arcLabel: (d: Trip) => {
        if (d.type === 'bus') return `Bus: ${d.route}`;

        return `${d.airline}: ${d.srcIata} &#8594; ${d.dstIata}`;
    },
    arcStroke: 0.3,
    arcStartLat: (d: Trip) => +d.srcAirport.lat,
    arcStartLng: (d: Trip) => +d.srcAirport.lng,
    arcEndLat: (d: Trip) => +d.dstAirport.lat,
    arcEndLng: (d: Trip) => +d.dstAirport.lng,
    arcDashLength: 10,
    arcDashGap: 4,
    arcDashInitialGap: () => Math.random(),
    arcDashAnimateTime: 1000,
    arcsData: [{ type: 'bus' }, { type: 'plane' }],
    arcColor: () => [
        `rgba(0, 255, 0, ${OPACITY})`,
        `rgba(255, 0, 0, ${OPACITY})`,
    ],

    pointColor: (d: Trip) => {
        if (d.visits == 1) return 'blue';
        if (d.visits == 2) return 'lightblue';

        if (d.visits >= 15) return 'red';

        if (d.visits >= 6) return 'orange';

        return 'yellow';
    },
    pointAltitude: (d: Trip) => {
        return d.visits / 1000;
    },
    pointRadius: (d: Trip) => {
        return Math.max(d.visits / 100, 0.1);
    },
    pointsMerge: true,
};
