import { Button, Form } from 'react-bootstrap';
import React from 'react';
import { Formik } from 'formik';
import { FieldContainer } from './styled';
import { TextField } from '../../../forms/uncontrols';

const INITIAL_VALUES = {
  username: '',
  password: '',
};

export const AuthForm = ({ onSubmit }) => (
  <div>
    <Formik initialValues={INITIAL_VALUES} onSubmit={onSubmit}>
      {({ handleSubmit }) => {
        return (
          <Form onSubmit={handleSubmit as any}>
            <FieldContainer>
              <TextField label="Имя пользователя" name="username" />
            </FieldContainer>
            <FieldContainer>
              <TextField label="Пароль" name="password" />
            </FieldContainer>
            <Button variant="primary" type="submit" className="login-button">
              Войти
            </Button>
          </Form>
        );
      }}
    </Formik>
  </div>
);
