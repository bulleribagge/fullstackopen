const reducer = (state = [{ msg: '', isError: false }], action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.data;
        case 'CLEAR_NOTIFICATION':
            return '';
        default:
            return state;
    }
}

export const setNotificationMessage = (data) => {
    return async (dispatch) => {
        dispatch({
            type: 'SET_NOTIFICATION',
            data: data
        });
    };
};

export const clearNotificationMessage = () => {
    return async (dispatch) => {
        dispatch({
            type: 'CLEAR_NOTIFICATION'
        });
    };
};

export default reducer;