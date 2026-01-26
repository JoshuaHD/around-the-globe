import { Home, PlaneTakeoff } from 'lucide-react';
import type { GlobeMethods, GlobeProps } from 'react-globe.gl';
import { fly } from '@/pages/rtw/actions';
import { ControlButton } from '@/pages/rtw/components/ControlButton';
import { MapSwitcherButton, toggleMaps } from '@/pages/rtw/components/MapSwitcherButton';

type GlobeControlBar = {
    config: GlobeProps;
    setConfig: React.Dispatch<React.SetStateAction<GlobeProps>>;
    globeRef: React.RefObject<GlobeMethods | undefined>;
    buttons?: {
        onClick: () => void;
        icon: React.ReactNode;
    }[]
};

export default ({ config, setConfig, globeRef, buttons }: GlobeControlBar) => {
    const goToNextCity = async () => {
        const moveTo = fly(globeRef);
        await moveTo(40.7128, -74.006, 2); // NYC
    };
    const goHome = async () => {
        const moveTo = fly(globeRef);
        await moveTo(0, 0, 1, 1000); // NYC
    };

    return (
        <div className={'absolute bottom-1 z-20'}>
            <MapSwitcherButton
                onClick={() => {
                    setConfig({
                        ...config,
                        globeImageUrl: toggleMaps(config.globeImageUrl),
                    });
                }}
            />
            <ControlButton onClick={goToNextCity} icon={<PlaneTakeoff />} />
            <ControlButton onClick={goHome} icon={<Home />} />
            {buttons?.map((b, i) => <ControlButton key={i} onClick={b.onClick} icon={b.icon} />)}
        </div>
    );
};