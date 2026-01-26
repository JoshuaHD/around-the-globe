import { csvParseRows } from 'd3-dsv';
import type { FlatResult } from 'index-array-by';
import indexBy from 'index-array-by';
import airportsCSV from './airports-extended.dat?raw';

console.log({ airportsCSV });

export type Airport = {
    airportId: string;
    name: string;
    city: string;
    country: string;
    iata: string;
    icao: string;
    lat: string;
    lng: string;
    alt: string;
    timezone: string;
    dst: string;
    tz: string;
    type: string;
    source: string;
};

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

export const airports = csvParseRows(airportsCSV, airportParse);
export const byIata = indexBy(airports, 'iata', false) as FlatResult;
export const byId = indexBy(airports, 'airportId', false) as FlatResult;

export const getFilteredAirports = (iataCodes: (keyof typeof byIata|string)[]): Airport[] => {
    return iataCodes
        .map((code) => byIata[code as keyof typeof byIata])
        .filter((airport) => airport !== undefined);
}