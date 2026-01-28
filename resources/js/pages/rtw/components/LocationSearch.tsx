import type { CancelTokenSource } from 'axios';
import axios from 'axios';
import type { ChangeEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

type LocationSearch = {
    value?: string;
    onChange?: React.Dispatch<React.SetStateAction<string>>;
};

type LocationSearchResult = {
    iata: string;
    name: string;
    city: string;
    country: string;
};

export default ({ value, onChange }: LocationSearch) => {
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

    function handleSearch(e: ChangeEvent<HTMLInputElement>) {
        setSearchInput(e.target.value);
        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(searchLocations(e.target.value), 500);
    }

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <div className="relative w-80">
            <Input
                ref={inputRef}
                value={searchInput}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    handleSearch(e);
                    setOpen(true);
                }}
                onFocus={() => setOpen(true)}
            />

            {open && results.length > 0 && (
                <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-background text-foreground shadow">
                    {results.map((r) => (
                        <div
                            key={r.iata}
                            className="cursor-pointer px-3 py-2 hover:bg-accent"
                            onClick={(e) => {
                                e.stopPropagation();
                                if (onChange) onChange(r.iata);
                                setSearchInput(r.iata);
                                setOpen(false);
                            }}
                        >
                            <Badge>{r.iata ?? '-'}</Badge>{' '}
                            <Badge>
                                {r.city}, {r.country}
                            </Badge>
                            <br />
                            {r.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};