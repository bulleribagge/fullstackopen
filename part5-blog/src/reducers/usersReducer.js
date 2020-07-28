const reducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_USERS':
            return action.data;
        default:
            return state;
    }
};

export const setUsers = (users) => {
    return async (dispatch) => {
        dispatch({
            type: 'SET_USERS',
            data: users
        });
    };
};

export default reducer;
