import { Button, Form } from 'react-bootstrap';
import React from 'react';
import './RegForm.scss';
import { Formik } from 'formik';

const INITIAL_VALUES = {
  username: '',
  password: '',
};

export const RegForm = ({ onSubmit }) => (
  <div>
    <Formik initialValues={INITIAL_VALUES} onSubmit={onSubmit}>
      {({ handleSubmit, handleChange, values }) => (
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
          <Button variant="primary" type="submit" className="login-button">
            Зарегистрироваться
          </Button>
        </Form>
      )}
    </Formik>
  </div>
);
