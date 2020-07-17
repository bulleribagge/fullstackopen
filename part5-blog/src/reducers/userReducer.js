const reducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_USER':
            return action.data;
        case 'CLEAR_USER':
            return null;
        default:
            return state;
    }
};

export const setLoggedInUser = (loggedInUser) => {
    return async (dispatch) => {
        dispatch({
            type: 'SET_USER',
            data: loggedInUser
        });
    };
};

export const clearLoggedInUser = () => {
    return async (dispatch) => {
        dispatch({
            type: 'CLEAR_USER'
        });
    };
};

export default reducer;