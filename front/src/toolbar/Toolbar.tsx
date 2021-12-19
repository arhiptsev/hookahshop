import React from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { AuthRender } from '../common/AuthRender';
import { UserButton } from '../components/Authentification/userButton/UserButton';
import { CartButttonStyled, NavbarStyled } from './styled';

export const Toolbar = ({ toogle }) => {
  const history = useHistory();

  return (
    <NavbarStyled bg="light" expand="lg">
      <Button variant="primary" onClick={toogle}>
        Категории
      </Button>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            Главная
          </Nav.Link>
          <Nav.Link as={Link} to="/products">
            Кальяны
          </Nav.Link>
          <AuthRender>
            <Nav.Link as={Link} to="/manage-products">
              Управление товарами
            </Nav.Link>
          </AuthRender>
        </Nav>
      </Navbar.Collapse>
      <AuthRender>
        <Button
          variant="primary"
          onClick={() => history.push('/orders')}
          className="cartButton"
        >
          Заказы
        </Button>
      </AuthRender>
      <AuthRender>
        <CartButttonStyled />
      </AuthRender>
      <UserButton></UserButton>
    </NavbarStyled>
  );
};
