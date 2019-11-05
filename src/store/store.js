import React, { useReducer } from 'react';
import globalReducer from './globalreducer';

const GlobalStore = React.createContext();

const intialState = {
    global: {
        collapse: localStorage.getItem('collapse') === 'false',
        //user: JSON.parse(localStorage.getItem('user')),
        loginVisible: false,
        notification: 0,
    }
};

const mainReducer = (state, action) => {
    return {
        global: globalReducer(state.global, action),
    }
}

const StoreProvider = ({ children }) => {
    const store = useReducer(mainReducer, intialState)

    /*React.useEffect(() => {
        if (localStorage.getItem('token'))
            Fetch.get('/notification/count').then(r => store[1]({ type: 'SET_NOTIFICATION', payload: r.count }))
    }, [store])*/

    return <GlobalStore.Provider value={store}>
        {children}
    </GlobalStore.Provider>
}

export { GlobalStore, StoreProvider }