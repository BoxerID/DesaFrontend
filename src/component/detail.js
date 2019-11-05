import React from 'react';
import Fetch from '../Fetch';

const useDetail = (url, initialState) => {
    const [state, setState] = React.useState({ loading: true, record: {}, ...initialState })

    React.useEffect(() => {
        const fetchData = async () => {
            const data = await Fetch.get(url);
            setState(s => { return { ...s, loading: false, record: data } })
        }
        fetchData();
    }, [url]);

    const fetchData = async () => {
        const data = await Fetch.get(url);
        setState(s => { return { ...s, loading: false, record: data } })
    }

    return [state, {
        fetchData: fetchData,
    }];
}

export { useDetail }