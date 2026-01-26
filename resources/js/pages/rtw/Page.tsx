import { EditIcon, RainbowIcon, Rotate3D } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { GlobeMethods, GlobeProps } from 'react-globe.gl';
import Globe from 'react-globe.gl';
import ControlBar from '@/pages/rtw/components/ControlBar';
import LocationEditor from '@/pages/rtw/components/LocationEditor';
import Modal from '@/pages/rtw/components/Modal';
import { maps } from '@/pages/rtw/config/config';
import locations from '@/pages/rtw/data/dataLoader';
import { useTravelAnimation } from '@/pages/rtw/hooks/useTravelAnimation';
import type { Airport, GlobeCallbackProps } from '@/pages/rtw/types';

function getArcsData(baseData: Airport[]) {
    return baseData.slice(1).map((d, i) => ({
        startLat: baseData[i].lat,
        startLng: baseData[i].lng,
        endLat: d.lat,
        endLng: d.lng,
    }));
}

export default () => {
    const [baseData, setBaseData] = useState(locations.defaultLocation);
    const [arcsData, setArcsData] = useState( getArcsData(baseData))
    const [settings, setSettings] = useState({
        showArcs: false
    })
    const [config, setConfig] = useState<GlobeProps>({
        globeImageUrl: maps.blue,
        pointLabel: (d: GlobeCallbackProps) => `${d.city} ${d.country}`,
        pointsMerge: true,
        pointAltitude: 0.005,
        labelLat: (d: GlobeCallbackProps) => d.lat,
        labelLng: (d: GlobeCallbackProps) => d.lng,
        labelText: (d: GlobeCallbackProps) => d.city,
        labelColor: () => 'rgba(255, 165, 0, 0.75)',
        labelResolution: 2,
    });

    const globeEl = useRef<GlobeMethods | undefined>(undefined);
    const { animate, getPointRadius, getLabelSize } = useTravelAnimation(globeEl);

    const [open, setOpen] = useState(false);

    const callbacks = {
        labelSize: getLabelSize,
        pointRadius: getPointRadius,
        labelsData: baseData,
        pointsData: baseData,
        arcsData: (settings.showArcs) ? arcsData : [],

    };
    const openModal = () => {
        setOpen(!open);
    };

    useEffect(() =>{
        setArcsData( getArcsData(baseData));
    }, [baseData])

    return (
        <div>
            <Globe ref={globeEl} {...config} {...callbacks} />
            <ControlBar
                config={config}
                setConfig={setConfig}
                globeRef={globeEl}
                buttons={[
                    {
                        onClick: animate(baseData),
                        icon: <Rotate3D />,
                    },
                    {
                        onClick: () => setSettings({
                            ...settings,
                            showArcs: !settings.showArcs
                        }),
                        icon: <RainbowIcon />,
                        className: (settings.showArcs) ? 'text-green-500' : ' text-red-500',
                    },
                    {
                        onClick: openModal,
                        icon: <EditIcon />,
                    },
                ]}
            />
            {open && (
                <Modal setOpen={setOpen}>
                    <LocationEditor
                        setBaseData={setBaseData}
                        baseData={baseData}
                    />
                </Modal>
            )}
        </div>
    );
};
