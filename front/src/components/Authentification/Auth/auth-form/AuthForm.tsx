import { Form } from 'react-bootstrap';
import React from 'react';
import { Formik } from 'formik';
import { LoginButton } from './styled';

export const AuthForm = ({ onSubmit }) => (
  <div>
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, handleChange, values }) => {
        return (
          <Form onSubmit={handleSubmit as any}>
            <Form.Label>Имя пользователя</Form.Label>
            <Form.Control
              type="text"
              value={values.username}
              onChange={handleChange}
              placeholder="Имя пользователя"
              id="username"
              name="username"
            />
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              type="password"
              placeholder="Пароль"
            />
            <LoginButton
              variant="primary"
              type="submit"
              className="login-button"
            >
              Войти
            </LoginButton>
          </Form>
        );
      }}
    </Formik>
  </div>
);
