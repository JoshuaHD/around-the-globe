import type { CancelTokenSource } from 'axios';
import axios from 'axios';
import type { ChangeEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from '@/components/ui/combobox';

type LocationSearch = {
    value?: string;
    onChange?: React.Dispatch<React.SetStateAction<string>>;
    autofocus?: boolean;
};

type LocationSearchResult = {
    iata: string;
    name: string;
    city: string;
    country: string;
};

export default ({ value, onChange, autofocus }: LocationSearch) => {
    const [open, setOpen] = useState(false);
    const [searchInput, setSearchInput] = useState(value ?? '');
    const [results, setResults] = useState<LocationSearchResult[]>([]);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const cancelTokenRef = useRef<CancelTokenSource | null>(null);

    const searchLocations = (q: string) => async () => {
        if (cancelTokenRef.current) {
            //cancelTokenRef.current.cancel();
        }

        cancelTokenRef.current = axios.CancelToken.source();

        try {
            const { data } = await axios.get('/search/locations', {
                params: { q: q },
                cancelToken: cancelTokenRef.current.token,
            });

            setResults(data);
        } catch (error) {
            if (!axios.isCancel(error)) {
                console.error(error);
            }
        }
    };

    function handleSearch(e: ChangeEvent<HTMLInputElement> | string) {
        const searchNeedle = typeof e === 'string' ? e : e.target?.value;

        if(!searchNeedle){
            setResults([]);
            return;
        }
        setSearchInput(searchNeedle);
        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(searchLocations(searchNeedle), 500);
    }

    useEffect(() => {
        if (autofocus) inputRef.current?.focus();
    }, [autofocus]);

    return (
        <Combobox
            items={results}
            defaultInputValue={searchInput}
            onInputValueChange={(e: string) => {
                handleSearch(e);
                setOpen(true);
            }}
            onValueChange={(value: string | null) => {
                setOpen(false);
                onChange?.(value ?? '');
            }}
            onOpenChange={() => {
                handleSearch(searchInput);
                setOpen(false);
            }}
        >
            <ComboboxInput
                placeholder="Search IATA or city"
                ref={inputRef}
                value={searchInput}
            />
            <ComboboxContent>
                <ComboboxEmpty>
                    {open ? 'No items found.' : 'loading...'}
                </ComboboxEmpty>
                <ComboboxList>
                    {(item: LocationSearchResult) => (
                        <ComboboxItem key={item.iata} value={item.iata}>
                            <div>
                                <Badge>{item.iata ?? '-'}</Badge>{' '}
                                <Badge>
                                    {item.city}, {item.country}
                                </Badge>
                                <br />
                                {item.name}
                            </div>
                        </ComboboxItem>
                    )}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    );
};
