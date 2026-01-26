import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getFilteredAirports } from '@/pages/rtw/data/airports';
import type { Airport } from '@/pages/rtw/types';

type LocationEditor = {
    baseData: Airport[];
    setBaseData: React.Dispatch<React.SetStateAction<Airport[]>>;
};
export default ({ baseData, setBaseData }: LocationEditor) => {
    const [locations, setLocations] = useState<string>(
        baseData.map((d) => d.iata).join(', '),
    );
    return (
        <>
            <h2 className="mb-4 text-xl font-bold">Edit Locations</h2>
            <p>This is where you can edit your locations.</p>
            <Input
                value={locations}
                onChange={(e) => {
                    setLocations(e.target.value);
                }}
                className="mb-4 w-full"
            />
            <Button onClick={() => {
                setBaseData(getFilteredAirports(locations.split(',').map((code) => code.trim())));
            }}>Update Locations</Button>

            <Button
                onClick={() =>
                    setBaseData(getFilteredAirports(['BER', 'ZUH', 'BOG']))
                }
            >
                set party tour
            </Button>
        </>
    );
};
