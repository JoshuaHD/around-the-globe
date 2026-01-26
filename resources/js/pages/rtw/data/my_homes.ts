import { getFilteredAirports } from '@/pages/rtw/data/airports';
import type { Airport } from '@/pages/rtw/types';

export default getFilteredAirports([
    'loc-ES-MEL',
    'ZUH',
    'BOG',
    'BER',
    'CEB',
    'HAN',
]) as Airport[];
