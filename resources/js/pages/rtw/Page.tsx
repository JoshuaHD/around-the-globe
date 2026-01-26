import {  Rotate3D } from 'lucide-react';
import { useRef, useState } from 'react';
import type { GlobeMethods, GlobeProps } from 'react-globe.gl';
import Globe from 'react-globe.gl';
import { maps } from '@/pages/rtw/config/config';
import ControlBar from '@/pages/rtw/components/ControlBar';
import locations from '@/pages/rtw/data/dataLoader'
import type {
    GlobeCallbackProps,
} from '@/pages/rtw/types';
import { useTravelAnimation } from '@/pages/rtw/hooks/useTravelAnimation';

export default () => {
    const baseData = locations.defaultLocation;

    const [config, setConfig] = useState<GlobeProps>({
        globeImageUrl: maps.blue,
        pointsData: baseData,
        pointLabel: (d: GlobeCallbackProps ) => `${d.city} ${d.country}`,
        pointsMerge: true,
        pointAltitude: 0.005,

        labelsData: baseData,
        labelLat: (d: GlobeCallbackProps) => d.lat,
        labelLng: (d: GlobeCallbackProps) => d.lng,
        labelText: (d: GlobeCallbackProps) => d.city ?? 'no idea',
        labelColor: () => 'rgba(255, 165, 0, 0.75)',
        labelResolution: 2,
    });

    const globeEl = useRef<GlobeMethods | undefined>(undefined);
    const { animate, getPointRadius, getLabelSize } = useTravelAnimation(globeEl);


    const callbacks = {
        labelSize: getLabelSize,
        pointRadius: getPointRadius,
    }
    return (
        <div>
            <Globe
                ref={globeEl}
                {...config}
                {...callbacks}
            />
            <ControlBar
                config={config}
                setConfig={setConfig}
                globeRef={globeEl}
                buttons={[
                    {
                        onClick: animate(baseData),
                        icon: <Rotate3D />,
                    },
                ]}
            />
        </div>
    );
};
