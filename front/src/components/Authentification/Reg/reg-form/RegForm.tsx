import { Button, Form } from 'react-bootstrap';
import React from 'react';
import { FieldValidator, Formik } from 'formik';
import { TextField } from '../../../forms/uncontrols';
import { FieldContainer } from './styled';
import { ApolloClient, useApolloClient } from '@apollo/client';
import { IS_USER_EXISTING_QUERY } from '../../../../graphql';

const INITIAL_VALUES = {
  username: '',
  password: '',
  dublicatePassword: '',
};
const regFormValidator = ({
  password,
  dublicatePassword,
}: typeof INITIAL_VALUES): Partial<typeof INITIAL_VALUES> => {
  const errors: Partial<typeof INITIAL_VALUES> = {};

  if (password?.length < 3)
    errors.password = 'Пароль дожен соодержать не менее шести символов';
  if (dublicatePassword !== password)
    errors.dublicatePassword = 'Пароли должны совпадать';

  return errors;
};

const getUsernameValidator = (
  apolloClient: ApolloClient<object>
): FieldValidator => (username: string) => {
  if (username?.length < 3)
    return 'Имя пользовтеля должно соодержать не менее трех символов';

  apolloClient
    .query<{ isUserExisting: boolean }>({
      query: IS_USER_EXISTING_QUERY,
      variables: { username },
    })
    .then(({ data }) =>
      data.isUserExisting
        ? 'Пользователь с таким именем уже существует'
        : undefined
    );
};

export const RegForm = ({ onSubmit }) => {
  const apolloInstance = useApolloClient();

  return (
    <div>
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={onSubmit}
        validate={regFormValidator}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit as any}>
            <FieldContainer>
              <TextField
                label="Имя пользователя"
                name="username"
                validate={getUsernameValidator(apolloInstance)}
              />
            </FieldContainer>
            <FieldContainer>
              <TextField label="Пароль" name="password" />
            </FieldContainer>
            <FieldContainer>
              <TextField label="Пароль" name="dublicatePassword" />
            </FieldContainer>
            <Button variant="primary" type="submit" className="login-button">
              Зарегистрироваться
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
