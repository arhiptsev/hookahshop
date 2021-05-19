import { Tab, Tabs } from 'react-bootstrap';
import React from 'react';
import { AuthDialog } from '../Auth/AuthDialog';
import { RegDialog } from '../Reg/RegDialog';
import { Container } from './styled';

export const AuthRegTabs = () => (
  <Container>
    <Tabs>
      <Tab eventKey="auth" title="Вход">
        <AuthDialog></AuthDialog>
      </Tab>
      <Tab eventKey="reg" title="Регистрация">
        <RegDialog></RegDialog>
      </Tab>
    </Tabs>
  </Container>
);
