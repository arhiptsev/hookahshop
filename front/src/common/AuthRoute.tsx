import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';


const AuthRoute = ({ isAuth, component: Component, ...rest }) =>
    (
        <Route
            {...rest}
            render={props => !isAuth
                ? <Redirect to="/" />
                : <Component {...props} />
            }
        />
    );

export default connect<any, any, any, any>(
    store => ({ isAuth: Boolean(store.currentUser) })
)(AuthRoute)