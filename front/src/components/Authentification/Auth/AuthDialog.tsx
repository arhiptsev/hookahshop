import React, { Component } from 'react';
import './AuthDialog.scss';
import AuthForm from "./auth-form/AuthForm";
import { connect } from 'react-redux';
import { CurrentUser } from '../../../types/user';
import { getLoginAction } from './actions';
import { Card } from 'react-bootstrap';
import { apolloClient } from '../../..';
import { gql } from '@apollo/client';
import { NotificationsServies } from '../../../common/notifications/notifications.service';

const LOGIN_QUERY = gql`
  query login($username: String, $password: String){
    login (username: $username, password: $password) {
      access_token
    }
  }
`;


class AuthDialog extends Component<any, any> {

  private notifications = NotificationsServies.getInstance();

  public login({ username, password }): void {

    apolloClient.query({
      query: LOGIN_QUERY, variables: {
        username,
        password
      }
    })
      .then(res => {
        const userData = res.data.login;

        if (userData) {
          this.props.login(userData);
        }

        this.notifications.addSuccess(`Добро пожаловать ${username} !`)


      })
      .catch(() => this.notifications.addError('Ошибка авторизации'));
  }


  render() {
    return (
      <Card>
        <Card.Body>
          <Card.Title>Авторизация</Card.Title>
          <Card.Body>
            <AuthForm onSubmit={this.login.bind(this)}></AuthForm>
          </Card.Body>
        </Card.Body>
      </Card>
    )
  };
}

export default connect<any, any, any>(
  undefined,
  (dispatch: any) => ({
    login: (userData: CurrentUser) => dispatch(getLoginAction(userData))
  })
)(AuthDialog)


