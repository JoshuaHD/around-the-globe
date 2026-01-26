import type { RefObject } from 'react';
import type { GlobeMethods } from 'react-globe.gl';

export const fly =
    (ref: RefObject<GlobeMethods | undefined>) =>
    (lat: number, lng: number, altitude = 2, duration = 2000) =>
        new Promise<void>((resolve) => {
            ref.current?.pointOfView({ lat, lng, altitude }, duration);

            // resolve after duration
            setTimeout(resolve, duration);
        });
