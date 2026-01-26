import type { RefObject } from 'react';
import { useEffect, useRef, useState } from 'react';
import type { GlobeMethods } from 'react-globe.gl';
import Globe from 'react-globe.gl';
import { maps } from '@/pages/rtw/config';
import { MapSwitcherButton, toggleMaps } from '@/pages/rtw/MapSwitcherButton';

// helper to wrap pointOfView in a promise

const fly =
    (ref: RefObject<GlobeMethods | undefined>) =>
    (lat: number, lng: number, altitude = 2, duration = 2000) =>
        new Promise<void>((resolve) => {
            ref.current?.pointOfView({ lat, lng, altitude }, duration);
            // resolve after duration
            setTimeout(resolve, duration);
        });

export default () => {
    const [map, setMap] = useState<string>(maps.night);
    const globeEl = useRef<GlobeMethods | undefined>(undefined);

    const goToNextCity = async () => {
        const moveTo = fly(globeEl);
        await moveTo(40.7128, -74.006, 2); // NYC
    };

    useEffect(() => {
        const animate = async () => {
            if (!globeEl.current) return;

            const moveTo = fly(globeEl);
            await moveTo(40.7128, -74.006, 2); // NYC
            await moveTo(51.5074, -0.1278, 1.5); // London
            await moveTo(35.6895, 139.6917, 2); // Tokyo
        };

        animate();
    }, []);

    return (
        <div>
            <Globe ref={globeEl} globeImageUrl={map} />
            <div className={'absolute bottom-1 z-20 bg-blue-900 p-2'}>
                <MapSwitcherButton
                    onClick={() => {
                        setMap(toggleMaps(map));
                    }}
                />
                <button onClick={goToNextCity}>next</button>
            </div>
        </div>
    );
};
