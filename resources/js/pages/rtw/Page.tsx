import { useEffect, useRef, useState } from 'react';
import type { GlobeMethods, GlobeProps } from 'react-globe.gl';
import Globe from 'react-globe.gl';
import { fly } from '@/pages/rtw/actions';
import { maps } from '@/pages/rtw/config';
import ControlBar from '@/pages/rtw/ControlBar';
import type { Airport} from '@/pages/rtw/data/airports';
import { getFilteredAirports } from '@/pages/rtw/data/airports';

const myAirports = getFilteredAirports([
    'DUS',
    'BAM',
    'LPA',
    'LEJ',
    'ZUH',
    'LEJ',
    'BOG',
    'BER',
    'CEB',
    'HAN',
    'CEB',
    'HAN',
    'YYZ',
]) as object[];

export default () => {
    const [config, setConfig] = useState<GlobeProps>({
        globeImageUrl: maps.night,
        pointsData: myAirports,
        pointLabel: (d: Airport|any) => `${d.city} ${d.country}`,
        pointsMerge: true,
        pointAltitude: 0.01,
    });
    //const [map, setMap] = useState<string>(maps.night);
    const globeEl = useRef<GlobeMethods | undefined>(undefined);

    useEffect(() => {
        const animate = async () => {
            if (!globeEl.current) return;

            const moveTo = fly(globeEl);

            for (const airport of myAirports) {
                const lat = parseFloat((airport as Airport).lat);
                const lng = parseFloat((airport as Airport).lng);
                await moveTo(lat, lng, 1);
            }
        };

        animate();
    }, []);

    return (
        <div>
            <Globe ref={globeEl} {...config} />
            <ControlBar config={config} setConfig={setConfig} globeRef={globeEl} />
        </div>
    );
};
