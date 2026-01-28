import type {  GlobeProps } from 'react-globe.gl';
import { ControlButton } from '@/pages/rtw/components/ControlButton';
import { MapSwitcherButton, toggleMaps } from '@/pages/rtw/components/MapSwitcherButton';

type GlobeControlBar = {
    config: GlobeProps;
    setConfig: React.Dispatch<React.SetStateAction<GlobeProps>>;
    buttons?: ControlButton[]
};

export default ({ config, setConfig, buttons }: GlobeControlBar) => {
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
            {buttons?.map((b, i) => <ControlButton key={i} {...b} />)}
        </div>
    );
};