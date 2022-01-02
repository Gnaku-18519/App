//Custom Hook
import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const abortCount = new AbortController(); //associate with a Fetch and stop the Fetch
        //Used to avoid Error: "Can't perform a React state update on an unmounted component"

        setTimeout(() => {
            fetch(url, { signal: abortCount.signal })
                .then(res => {
                    //console.log(res);
                    if (!res.ok) {
                        throw Error('Failed to fetch data from resource');
                    }
                    return res.json(); //asynchronous, res is a just response object, and we need res.json() to gets the data
                })
                .then(data => {
                    setData(data);
                    setIsPending(false);
                    setError(null);
                })
                .catch(err => {
                    if (err.name === 'AbortError') {
                        console.log('Fetch Aborted');
                    }
                    else {
                        //err stands for any internet error
                        setError(err.message);
                        setIsPending(false);
                    }
                });
        }, 1000); //setTimeout() here is just for demo isPending

        return () => abortCount.abort();

    }, [url]); //re-run the function when url changes

    return { data, isPending, error };
}

export default useFetch;