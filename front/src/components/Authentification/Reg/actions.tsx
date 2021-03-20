import { CurrentUser } from "../../../types/user";

export const getRegAction = (userData: CurrentUser) => (dispatch, getState) => {
        dispatch({
            type: 'SET_CURRENT_USER',
            payload: userData
        })
}

