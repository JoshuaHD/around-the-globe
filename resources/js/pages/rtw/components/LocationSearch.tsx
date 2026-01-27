import {useEffect, useRef, useState} from 'react';
import { Input } from '@/components/ui/input';
import axios from 'axios';

type LocationSearch = {

}

export default ({}: LocationSearch) => {
    const [searchInput, setSearchInput] = useState("");
    const [selectedResult, setSelectedResult] = useState("");
    const [results, setResults] = useState([]);
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

    return <div className={"w-80 h-80"}>
        <Input value={searchInput} onChange={handleSearch} />
        <Input readOnly value={selectedResult} />
        <div>
            <pre>
                {JSON.stringify(results, null, 4)}
            </pre>
        </div>
    </div>
}