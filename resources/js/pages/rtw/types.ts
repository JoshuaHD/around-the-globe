import type { TooltipContentProps } from '@radix-ui/react-tooltip';

type Accessor<In, Out> = Out | string | ((obj: In) => Out);
export type ObjAccessor<T> = Accessor<object, T>;

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

export type Trip = {
    type: string | 'bus';
    srcAirport: Airport;
    dstAirport: Airport;
    airline?: string;
    srcIata?: string;
    dstIata?: string;
    route?: string;
    visits?: number;
} & ObjAccessor<number|string> & object & any;

export type GlobeCallbackProps = ObjAccessor<TooltipContentProps> & Airport & any;