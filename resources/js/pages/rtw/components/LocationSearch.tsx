import axios from 'axios';
import {useEffect, useRef, useState} from 'react';
import {Input} from '@/components/ui/input';
import {Badge} from '@/components/ui/badge';

type LocationSearch = {
    value?: string,
    onChange?:  React.Dispatch<React.SetStateAction<string>>;
}

export default ({value, onChange}: LocationSearch) => {
    const [open, setOpen] = useState(false);
    const [searchInput, setSearchInput] = useState(value ?? "");
    const [results, setResults] = useState([]);
    const inputRef = useRef();
    const debounceRef = useRef();
    const cancelTokenRef = useRef();

    const searchLocations = (q) => async () => {
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

    function handleSearch(e) {
        setSearchInput(e.target.value);
        if(debounceRef.current)
            clearTimeout(debounceRef.current)

        debounceRef.current = setTimeout(searchLocations(e.target.value), 1000);
    }

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return <div className="relative w-80">
        <Input
            ref={inputRef}
            value={searchInput}
            onChange={(e) => {
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
                            if(onChange)
                                onChange(r.iata);
                            setSearchInput(r.iata);
                            setOpen(false);
                        }}
                    >
                        <Badge>{r.iata}</Badge> <Badge>{r.city}, {r.country}</Badge><br />{r.name}
                    </div>
                ))}
            </div>
        )}
    </div>

}