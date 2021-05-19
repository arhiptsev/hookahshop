import React, { useContext } from 'react';
import { RxContext } from "../context/rx-context";
import { useObservable } from "../utils/hooks/useObservable";

export const AuthRender = ({ children }) => {
    const { currentUserObservable } = useContext(RxContext);
    const isAuth = useObservable(currentUserObservable);
    if (!isAuth) { return null; }
    return (<React.Fragment>{children}</React.Fragment>);
}