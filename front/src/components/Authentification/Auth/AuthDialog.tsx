import React, { useContext } from 'react';
import { AuthForm } from "./auth-form/AuthForm";
import { Card } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { NotificationsServies } from '../../../common/notifications/notifications.service';
import { LOGIN } from '../../../graphql/user';
import { RxContext } from '../../../context/rx-context';

export const AuthDialog = () => {
  const notifications = NotificationsServies.getInstance();

  const { currentUserObservable } = useContext(RxContext)

  const [loginMutation] = useMutation(LOGIN, {
    onCompleted({ login: loginData }) {
      if (loginData) {
        localStorage.setItem('currentUser', JSON.stringify(loginData));
        currentUserObservable.next(loginData);
        notifications.addSuccess(`Добро пожаловать!`);
      }
    },
    onError() {
      notifications.addError('Ошибка авторизации');
    }
  });

  const login = ({ username, password }) => {
    loginMutation({ variables: { username, password } });
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>Авторизация</Card.Title>
        <Card.Body>
          <AuthForm onSubmit={login}></AuthForm>
        </Card.Body>
      </Card.Body>
    </Card>
  )
}
