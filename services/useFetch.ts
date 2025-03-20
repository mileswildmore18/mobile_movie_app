// Create a custom hook to fetch data requests from the API

// Fetch movie or movie details

//useFetch(fetchMovies)

import {useEffect, useState} from "react";

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    // fetch data of the movie
    const fetchData = async () => {
        // look for data of movie
        try {
            setLoading(true);
            setError(null)

            const result = await fetchFunction();

            setData(result);
        } catch (err) {
            // send error message if error occurs
            // @ts-ignore
            setError(err instanceof  Error ? err : new Error("An error occurred"));
        } finally {
            setLoading(false);
        }
    }
    // reset the data
    const reset = () => {
        setData(null);
        setLoading(false);
        setError(null);
    }

    // Do something when the component mounts
    useEffect(() => {
        if(autoFetch) {
            fetchData();
        }
    }, []);
    // return the data of the movie searched
    return {data, loading, error, refetch: fetchData, reset};
}

export default useFetch;