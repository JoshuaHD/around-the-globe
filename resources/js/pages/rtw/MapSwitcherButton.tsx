import { maps } from '@/pages/rtw/config';
import { Globe } from 'lucide-react';
import { ControlButton } from '@/pages/rtw/ControlButton';

export const toggleMaps = (currentMap?: string|null) => {
    const mapValues = Object.values(maps);
    if(!currentMap)
        return mapValues[0];

    const currentIndex = mapValues.indexOf(currentMap);
    const nextIndex = (currentIndex + 1) % mapValues.length;
    return mapValues[nextIndex];
};

export const MapSwitcherButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <ControlButton onClick={onClick} icon={<Globe />} />
    );
};
