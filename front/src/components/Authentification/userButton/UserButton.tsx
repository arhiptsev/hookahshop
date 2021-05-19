import { Button } from "react-bootstrap";
import React, { useContext } from 'react';
import { AuthRegDialog } from "../AuthRegDialog/AuthRegDialog";
import { RxContext } from "../../../context/rx-context";
import { useObservable } from "../../../utils/hooks/useObservable";

export const UserButton = () => {
    const { currentUserObservable } = useContext(RxContext);

    const currentUser = useObservable(currentUserObservable);

    const logout = () => {
        localStorage.removeItem('currentUser');
        currentUserObservable.next(null);
    }

  let showDialog: () => void;
    function onAuth(fn: () => void) {
        showDialog = fn;
    }  

    return currentUser ?
        (
            <Button variant="primary" onClick={() => logout()}>
                Выйти
            </Button>
        )
        : (
            <div>
                <Button variant="primary" onClick={() => {
                    showDialog()
                }}>
                    Вход/Регистрация
                </Button>
                <AuthRegDialog onShow={onAuth}></AuthRegDialog>
            </div>
        );
}



