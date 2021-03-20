import { connect } from "react-redux"
import React from 'react';

const AuthRender = ({  isAuth, children }) => {
    if (!isAuth) { return null; }
    return (<React.Fragment>{children}</React.Fragment>);
}

export default connect<any, any, any, any>(
    store => ({ isAuth: Boolean(store.currentUser) })
)(AuthRender)