import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { RxContext } from '../context/rx-context';
import { useObservable } from '../utils/hooks/useObservable';

export const AuthRoute = ({ component: Component, ...rest }) => {
    const { currentUserObservable } = useContext(RxContext);
    const isAuth = useObservable(currentUserObservable);

    return (
        <Route
            {...rest}
            render={props => !isAuth
                ? <Redirect to="/" />
                : <Component {...props} />
            }
        />
    );
}

