import { CurrentUser } from "../../../types/user";

export const getLoginAction = (userData: CurrentUser) => (dispatch, getState) => {
    localStorage.setItem('currentUser', JSON.stringify(userData));
    dispatch({
        type: 'SET_CURRENT_USER',
        payload: userData
    })
}

