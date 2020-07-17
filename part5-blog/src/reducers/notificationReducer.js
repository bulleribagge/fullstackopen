const reducer = (state = [{ msg: '', isError: false }], action) => {
    switch (action.type) {
        case 'SET':
            return action.data;
        case 'CLEAR':
            return '';
        default:
            return state;
    }
}

export const setNotificationMessage = (data) => {
    return async (dispatch) => {
        dispatch({
            type: 'SET',
            data: data
        });
    };
};

export const clearNotificationMessage = () => {
    return async (dispatch) => {
        dispatch({
            type: 'CLEAR'
        });
    };
};

export default reducer;