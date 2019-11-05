const globalReducer = (state, action) => {
    switch (action.type) {
        case 'TOGGLE_SIDE_BAR': {
            localStorage.setItem('collapse', state.collapse);
            return { ...state, collapse: !state.collapse }
        }
        case 'UPDATE_USER': {
            return { ...state, user: action.payload }
        }
        case 'OPEN_AUTHORIZE': {
            return { ...state, loginVisible: action.payload, loginCallback: action.callback }
        }
        case 'SET_NOTIFICATION': {
            return { ...state, notification: action.payload }
        }
        case 'CHANGE_TEST': {
            return { ...state, test: action.payload }
        }
        default: {
            return state;
        }
    }
}

export default globalReducer;