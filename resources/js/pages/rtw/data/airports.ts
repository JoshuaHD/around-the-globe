import { csvParseRows } from 'd3-dsv';
import type { FlatResult } from 'index-array-by';
import indexBy from 'index-array-by';
import type { Airport } from '@/pages/rtw/types';
import airportsCSV from './airports-extended.dat?raw';
import customLocationsCSV from './my_locations.dat?raw';

console.log({ airportsCSV });

export const airportParse = ([
    airportId,
    name,
    city,
    country,
    iata,
    icao,
    lat,
    lng,
    alt,
    timezone,
    dst,
    tz,
    type,
    source,
]: string[]) => ({
    airportId,
    name,
    city,
    country,
    iata,
    icao,
    lat,
    lng,
    alt,
    timezone,
    dst,
    tz,
    type,
    source,
});

const airports = csvParseRows(airportsCSV, airportParse);
const customLocations = csvParseRows(customLocationsCSV, airportParse);
const allLocations = [...airports, ...customLocations];

export const byIata = indexBy(allLocations, 'iata', false) as FlatResult;
export const byId = indexBy(allLocations, 'airportId', false) as FlatResult;

export const getFilteredAirports = (iataCodes: (keyof typeof byIata|string)[]): Airport[] => {
    return iataCodes
        .map((code) => byIata[code as keyof typeof byIata])
        .filter((airport) => airport !== undefined);
}