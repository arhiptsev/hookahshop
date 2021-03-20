import { Tab, Tabs } from "react-bootstrap";
import React from 'react';
import './AuthRegTabs.scss';
import AuthDialog from "../Auth/AuthDialog";
import RegDialog from "../Reg/RegDialog";

export default function AuthRegTabs() {


    return (
        <div className="AuthRegTabs">
            <Tabs>
                <Tab eventKey="auth" title="Вход">
                    <AuthDialog></AuthDialog>
                </Tab>
                <Tab eventKey="reg" title="Регистрация">
                    <RegDialog></RegDialog>
                </Tab>
            </Tabs>
        </div>
    );
}



