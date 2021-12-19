import React from 'react';
import { RegForm } from './reg-form/RegForm';
import { Card } from 'react-bootstrap';
import { useMutation } from '@apollo/client';

import { REGISRATION } from '../../../graphql/user';
import { NotificationsService } from '../../../common/notifications/notifications.service';

export const RegDialog = () => {
  const notifications = NotificationsService.getInstance();

  const [registration, { data, loading }] = useMutation(REGISRATION, {
    onCompleted() {
      notifications.addSuccess('Вы успешно зарегистрированы');
    },
    onError() {
      notifications.addError('Ошибка регистрации');
    },
  });

  const registrate = ({ username, password }) =>
    registration({ variables: { username, password } });

  return (
    <Card>
      <Card.Body>
        <Card.Title>Регистрация</Card.Title>
        <Card.Body>
          <RegForm onSubmit={registrate}></RegForm>
        </Card.Body>
      </Card.Body>
    </Card>
  );
};
