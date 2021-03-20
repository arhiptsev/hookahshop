import React, { Component } from 'react';
import './RegDialog.scss';
import Axios from "axios";
import RegForm from "./reg-form/RegForm";
import { Card } from 'react-bootstrap';
import Config from '../../../common/config';

export default class RegDialog extends Component<any, any> {

    public registration({ username, password }): void {
        Axios.post(
            Config.graphQlUrl,
            {
                query: `
                {
                    registration (username: "${username}", password: "${password}") {
                        isSuccess
                    }
                }
                `
            }
        ).then(res => {
        });
    }


    render() {
        return (
            <Card>
                <Card.Body>
                    <Card.Title>Регистрация</Card.Title>
                    <Card.Body>
                        <RegForm onSubmit={this.registration.bind(this)}></RegForm>
                    </Card.Body>
                </Card.Body>
            </Card>
        )
    };
}

