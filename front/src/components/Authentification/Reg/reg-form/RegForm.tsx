import { Button, Form } from "react-bootstrap";
import React from 'react';
import './RegForm.scss';
import { Formik } from "formik";


export default function RegForm({ onSubmit }) {

  return (
    <div>
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        onSubmit={onSubmit}
      >

        {({
          handleSubmit,
          handleChange,
          values
        }) => {
          return (
            <Form onSubmit={(handleSubmit as any)}>
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
          )
        }}
      </Formik>
    </div>
  );
}
