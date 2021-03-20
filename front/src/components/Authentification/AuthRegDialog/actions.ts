export function getLogoutAction() {
    localStorage.removeItem('currentUser');
    return dispatch => dispatch({
        type: 'LOGOUT_USER',
        payload: null
    })
}