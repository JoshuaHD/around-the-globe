import { TrashIcon } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import LocationSearch from '@/pages/rtw/components/LocationSearch';
import { getFilteredAirports } from '@/pages/rtw/data/airports';
import type { Airport } from '@/pages/rtw/types';

type LocationEditor = {
    baseData: Airport[];
    setBaseData: React.Dispatch<React.SetStateAction<Airport[]>>;
};
export default ({ baseData, setBaseData }: LocationEditor) => {
    const [locations, setLocations] = useState<string[]>(
        baseData.map((d) => d.iata),
    );

    const updateBaseData = (newLocations: string[]) => {
        setBaseData(
            getFilteredAirports(
                newLocations.map((l) => l.trim()).filter((l) => l),
            ),
        );
    }
    const handleLocationChange =
        (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
            const newLocations = [...locations];
            newLocations[index] = e.target.value;
            setLocations(newLocations);

           updateBaseData(newLocations);
        };

    function handleAddLocation() {
        setLocations([...locations, '']);
    }

    function handleRemoveLocation(index: number) {
        return () => {
            const newLocations = [...locations];
            newLocations.splice(index, 1);
            setLocations(newLocations);
            updateBaseData(newLocations);
        };
    }

    const handleInsertAtIndex = (index: number) => (e: React.MouseEvent) => {
        const newLocations = [...locations];
        newLocations.splice(index, 0, '');
        setLocations(newLocations);
    };
    return (
        <>
            <h2 className="mb-4 text-xl font-bold">Edit Locations</h2>
            <p>This is where you can edit your locations.</p>

            <div className={'max-h-96 w-full overflow-auto p-2'}>
                {locations.map((location: string, index: number) => {
                    return (
                        <div key={index}>
                            <div
                                className="group relative h-4 cursor-pointer"
                                onClick={handleInsertAtIndex(index)}
                            >
                                {/* Hover line */}
                                <div className="absolute inset-x-0 top-1/2 h-px bg-border opacity-0 transition-opacity group-hover:opacity-100" />
                            </div>
                            <div
                                className={'flex w-full items-center gap-2'}
                                key={index}
                            >
                                <LocationSearch
                                    value={location}
                                    onChange={(value) => {
                                        handleLocationChange(index)({
                                            target: { value },
                                        } as React.ChangeEvent<HTMLInputElement>);
                                    }}
                                    key={`${location}-${index}`}
                                />
                                <button
                                    onClick={handleRemoveLocation(index)}
                                    className={
                                        'cursor-pointer hover:text-red-400'
                                    }
                                >
                                    <TrashIcon />
                                </button>
                            </div>
                        </div>
                    );
                })}
                <br />
                <Button onClick={handleAddLocation}>Add Location</Button>
            </div>
            <br />
            <Button
                onClick={() => {
                    const filteredAirports = getFilteredAirports([
                        'BER',
                        'ZUH',
                        'BOG',
                    ]);
                    setBaseData(filteredAirports);
                    setLocations(filteredAirports.map((d) => d.iata));
                }}
            >
                Party Tour
            </Button>
            <Button
                onClick={() => {
                    const filteredAirports = getFilteredAirports([
                        'HAN',
                        'BKK',
                        'TYO',
                    ]);
                    setBaseData(filteredAirports);
                    setLocations(filteredAirports.map((d) => d.iata));
                }}
            >
                Food Tour
            </Button>
        </>
    );
};
