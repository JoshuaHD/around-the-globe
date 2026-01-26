import { maps } from '@/pages/rtw/config';

export const toggleMaps = (currentMap: string) => {
    const mapValues = Object.values(maps);
    const currentIndex = mapValues.indexOf(currentMap);
    const nextIndex = (currentIndex + 1) % mapValues.length;
    return mapValues[nextIndex];
};

export const MapSwitcherButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <button className={'z-20 bg-amber-900 p-2'} onClick={onClick}>
            bg
        </button>
    );
};
