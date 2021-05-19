import React from 'react';
import './RegDialog.scss';
import RegForm from "./reg-form/RegForm";
import { Card } from 'react-bootstrap';
import { useMutation } from '@apollo/client';

import { REGISRATION } from '../../../graphql/user';

export const RegDialog = () => {
  const [registration, { data }] = useMutation(REGISRATION);

  const registrate = ({ username, password }) => registration({ variables: { username, password } });

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
}

