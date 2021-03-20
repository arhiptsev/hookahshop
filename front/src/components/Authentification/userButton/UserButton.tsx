import { Button } from "react-bootstrap";
import React from 'react';
import './UserButton.scss';
import { connect } from "react-redux";
import { getLogoutAction } from "./actions";
import AuthRegDialog from "../AuthRegDialog/AuthRegDialog";


function UserButton({ currentUser, logout }) {



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

export default connect<any, any, any>(
    (store: any) => ({ currentUser: store.currentUser }),
    (dispatch: any) => ({
        logout: () => dispatch(getLogoutAction())
    })
)(UserButton)

