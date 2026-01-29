import type { RefObject} from 'react';
import { useRef, useState } from 'react';
import type { GlobeMethods } from 'react-globe.gl';
import { fly } from '@/pages/rtw/actions';
import type { Airport, GlobeCallbackProps } from '@/pages/rtw/types';


export const useTravelAnimation = (globeElRef: RefObject<GlobeMethods | undefined>) =>{

    const [currentCity, setCurrentCity] = useState<string>('');
    const [visitedCities, setVisitedCities] = useState<{
        [key: string]: number;
    }>({});

    const abortControllerRef = useRef(true);

    const resetAnimation = () => {
        setVisitedCities({});
    };

    const animate = (myAirports: Airport[]) => async () => {
        if (!globeElRef?.current) return;
        abortControllerRef.current = !abortControllerRef.current;

        const moveTo = fly(globeElRef);

        for (const airport of myAirports) {
            if (abortControllerRef.current) {
                return;
            }

            const lat = parseFloat(airport.lat);
            const lng = parseFloat(airport.lng);
            setCurrentCity(airport.airportId);
            setVisitedCities((prevState) => ({
                ...prevState,
                [airport.airportId]: 1,
            }));
            await moveTo(lat, lng, 1);
        }

        resetAnimation();
        abortControllerRef.current = true;
    };

    function getPointRadius(d: GlobeCallbackProps) {
        return visitedCities[d.airportId] ? 0.2 : 0;
    }

    function getLabelSize(d: GlobeCallbackProps) {
        return currentCity === d.airportId ? 1 : 0.05;
    }

    return { animate, getPointRadius, getLabelSize };
}